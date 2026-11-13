<?php
// KI-Sichtbarkeits-Check (/ki-check/) – Formular-Empfang, MVP „Option A“:
// Lead speichern, Jan benachrichtigen (inkl. ausgefüllter Prompt-Liste),
// Bestätigungs-Mail an die Praxis. Antwortet mit JSON (fetch) oder leitet auf
// /ki-check/danke/ weiter.

declare(strict_types=1);

define('SB_KI_CHECK', true);
require __DIR__ . '/ki-check-lib.inc.php';

const CALENDLY_URL = 'https://calendly.com/bruchwalski-story-base/ki-check-besprechung';
const MIN_SECONDS = 3;
const MAX_PER_IP_PER_HOUR = 5;
const DUPLICATE_DAYS = 30;

const FACHRICHTUNGEN = [
    'Ästhetische Medizin', 'Zahnmedizin & Implantologie', 'Dermatologie', 'Orthopädie',
    'Kieferorthopädie', 'Plastische Chirurgie', 'Augenheilkunde', 'Privatärztliche Allgemeinmedizin', 'Andere',
];
const ZIELE = ['Mehr Privatpatienten', 'Mehr Fachkräfte', 'Beides'];

$wantsJson = str_contains($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json');

function respond(bool $ok, int $status, bool $wantsJson, array $errors = []): never
{
    http_response_code($status);
    if ($wantsJson) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['ok' => $ok, 'errors' => (object) $errors], JSON_UNESCAPED_UNICODE);
    } elseif ($ok) {
        header('Location: /ki-check/danke/', true, 303);
    } else {
        header('Content-Type: text/plain; charset=utf-8');
        echo "Bitte prüfen Sie Ihre Angaben:\n- " . implode("\n- ", $errors);
    }
    exit;
}

function normalizeWebsite(string $raw): string
{
    if ($raw === '') {
        return '';
    }
    $url = preg_match('#^https?://#i', $raw) ? $raw : 'https://' . $raw;
    $host = parse_url($url, PHP_URL_HOST);
    if (!is_string($host) || !str_contains($host, '.') || filter_var($url, FILTER_VALIDATE_URL) === false) {
        return '';
    }
    return rtrim($url, '/');
}

// ---------------------------------------------------------------------------

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(false, 405, $wantsJson, ['Nur POST erlaubt.']);
}

// Spam-Schutz: Honeypot leer, Formular nicht in Sekundenbruchteilen abgeschickt.
// Bots erhalten eine Erfolgsmeldung, es passiert aber nichts.
$elapsed = isset($_POST['t']) ? (int) $_POST['t'] : MIN_SECONDS;
if (field('firma_url') !== '' || $elapsed < MIN_SECONDS) {
    respond(true, 200, $wantsJson);
}

// Rate-Limit pro IP (IP wird nur gehasht gespeichert)
$dir = dataDir();
$ipHash = hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '') . 'sb-ki-check');
$rateFile = $dir . '/rate.php';
$rate = is_file($rateFile) ? (json_decode(substr((string) file_get_contents($rateFile), strlen(GUARD)), true) ?: []) : [];
$now = time();
$recent = array_values(array_filter($rate[$ipHash] ?? [], fn ($ts) => $ts > $now - 3600));
if (count($recent) >= MAX_PER_IP_PER_HOUR) {
    respond(false, 429, $wantsJson, ['form' => 'Zu viele Anfragen. Bitte versuchen Sie es später erneut oder rufen Sie uns an.']);
}

$d = [
    'praxisname' => field('praxisname', 160),
    'fachrichtung' => field('fachrichtung', 60),
    'stadt' => field('stadt', 120),
    'leistung' => field('leistung', 160),
    'website' => normalizeWebsite(field('website', 300)),
    'vorname' => field('vorname', 80),
    'nachname' => field('nachname', 80),
    'email' => field('email', 160),
    'telefon' => field('telefon', 60),
    'ziel' => field('ziel', 40),
    'datenschutz' => field('datenschutz', 1),
    'marketing_einwilligung' => field('marketing_einwilligung', 1) === '1' ? 'ja' : 'nein',
];
$tracking = [];
foreach (['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'referrer', 'landing_variant'] as $k) {
    $tracking[$k] = field($k, 300);
}

$errors = [];
foreach (['praxisname', 'leistung', 'vorname', 'nachname'] as $k) {
    if ($d[$k] === '') {
        $errors[$k] = 'Bitte ausfüllen.';
    }
}
// Fachrichtung und Ort sind optional (nur gesetzt, wenn die Seite sie kennt)
if ($d['fachrichtung'] !== '' && !in_array($d['fachrichtung'], FACHRICHTUNGEN, true)) {
    $errors['fachrichtung'] = 'Bitte wählen Sie Ihre Fachrichtung.';
}
if ($d['website'] === '') {
    $errors['website'] = 'Bitte geben Sie eine gültige Website an.';
}
if (filter_var($d['email'], FILTER_VALIDATE_EMAIL) === false) {
    $errors['email'] = 'Bitte geben Sie eine gültige E-Mail-Adresse an.';
}
if (!in_array($d['ziel'], ZIELE, true)) {
    $errors['ziel'] = 'Bitte wählen Sie Ihr Ziel.';
}
if ($d['datenschutz'] !== '1') {
    $errors['datenschutz'] = 'Bitte bestätigen Sie die Datenschutzerklärung.';
}
if ($errors) {
    respond(false, 422, $wantsJson, $errors);
}

// Doppelte Anfrage für dieselbe Website innerhalb von 30 Tagen erkennen
$host = strtolower((string) parse_url($d['website'], PHP_URL_HOST));
$host = preg_replace('/^www\./', '', $host) ?? $host;
$csvFile = $dir . '/leads.php';
$duplicate = null;
if (is_file($csvFile) && ($fh = fopen($csvFile, 'r'))) {
    while (($row = fgetcsv($fh, 0, ';', '"', '')) !== false) {
        if (($row[1] ?? '') === $host && strtotime($row[0] ?? '') > $now - DUPLICATE_DAYS * 86400) {
            $duplicate = $row[0];
        }
    }
    fclose($fh);
}

// Lead speichern
$isNew = !is_file($csvFile);
if ($fh = fopen($csvFile, 'a')) {
    flock($fh, LOCK_EX);
    if ($isNew) {
        fwrite($fh, GUARD);
        fputcsv($fh, array_merge(['datum', 'domain'], array_keys($d), array_keys($tracking)), ';', '"', '');
    }
    fputcsv($fh, array_merge([date('Y-m-d H:i:s'), $host], array_values($d), array_values($tracking)), ';', '"', '');
    flock($fh, LOCK_UN);
    fclose($fh);
}
$recent[] = $now;
$rate[$ipHash] = $recent;
foreach ($rate as $k => $list) {
    $rate[$k] = array_values(array_filter($list, fn ($ts) => $ts > $now - 3600));
    if (!$rate[$k]) {
        unset($rate[$k]);
    }
}
@file_put_contents($rateFile, GUARD . json_encode($rate), LOCK_EX);

// Prompt-Liste mit eingesetzten Platzhaltern (Spezifikation Kapitel 5)
// Fehlen Ort oder Fachrichtung, bleiben Platzhalter stehen – vor dem Check von der Praxis-Website ergänzen.
$p = fn (string $tpl) => strtr($tpl, [
    '{stadt}' => $d['stadt'] !== '' ? $d['stadt'] : '[ORT]', '{leistung}' => $d['leistung'],
    '{fachrichtung}' => $d['fachrichtung'] !== '' ? $d['fachrichtung'] : '[FACHRICHTUNG]', '{praxisname}' => $d['praxisname'],
]);
$prompts = [
    'P1' => $p('Welche Praxis in {stadt} kannst du für {leistung} empfehlen?'),
    'P2' => $p('Ich suche einen erfahrenen Arzt für {leistung} in {stadt}. Wen würdest du mir empfehlen und warum?'),
    'P3' => $p('Beste Praxis für {fachrichtung} in {stadt} für Privatpatienten'),
    'P4' => $p('Was kostet {leistung} in {stadt} ungefähr und wo kann ich das machen lassen?'),
    'P5' => $p('{fachrichtung} in {stadt} mit sehr guten Bewertungen – welche Praxen gibt es?'),
    'B1' => $p('Was weißt du über {praxisname} in {stadt}?'),
    'B2' => $p('Ist {praxisname} eine gute Wahl für {leistung}?'),
];
if ($d['ziel'] !== 'Mehr Privatpatienten') {
    $prompts['R1'] = $p('Welche Arztpraxen in {stadt} sind gute Arbeitgeber für MFA?');
}
$promptText = '';
foreach ($prompts as $id => $text) {
    $promptText .= "{$id}  {$text}\n";
}

// Benachrichtigung an Jan
$lines = [
    'Neue Anfrage für den KI-Sichtbarkeits-Check',
    '',
    $duplicate ? "ACHTUNG: Für {$host} gab es bereits am {$duplicate} eine Anfrage (innerhalb von " . DUPLICATE_DAYS . ' Tagen).' : null,
    $duplicate ? '' : null,
    'PRAXIS',
    "Praxis:        {$d['praxisname']}",
    'Fachrichtung:  ' . ($d['fachrichtung'] !== '' ? $d['fachrichtung'] : '– (bitte von der Website ergänzen)'),
    'Ort:           ' . ($d['stadt'] !== '' ? $d['stadt'] : '– (bitte von der Website ergänzen)'),
    "Leistung:      {$d['leistung']}",
    "Website:       {$d['website']}",
    '',
    'KONTAKT',
    "Name:          {$d['vorname']} {$d['nachname']}",
    "E-Mail:        {$d['email']}",
    "Ziel:          {$d['ziel']}",
    'Werbe-Mails:   ' . ($d['marketing_einwilligung'] === 'ja'
        ? 'angekreuzt – Bestätigungs-Mail verschickt. Erst nach Bestätigung erlaubt, du bekommst dann eine Nachricht.'
        : 'nein – keine Werbe-Mails'),
    '',
    'HERKUNFT',
];
foreach ($tracking as $k => $v) {
    if ($v !== '') {
        $lines[] = str_pad($k . ':', 15) . $v;
    }
}
$lines = array_merge($lines, [
    '',
    'PROMPTS – jeweils in einer neuen, leeren Sitzung stellen:',
    'ChatGPT (mit Websuche) · Perplexity (Standardsuche) · Gemini (mit Google-Suche)',
    '',
    rtrim($promptText),
    '',
    'Report-Zusage: innerhalb von 2 Werktagen. Kein Report ohne Freigabe.',
    'Eingegangen am ' . date('d.m.Y \u\m H:i') . ' Uhr',
]);
// Werbe-Einwilligung: nur vormerken und Bestätigungs-Mail schicken (Double-Opt-in).
// Gültig wird sie erst mit dem Klick auf „Einwilligung bestätigen“.
if ($d['marketing_einwilligung'] === 'ja') {
    $token = newToken();
    updateConsents(function (array &$consents) use ($token, $d): void {
        $consents[$token] = [
            'email' => $d['email'],
            'name' => trim($d['vorname'] . ' ' . $d['nachname']),
            'praxis' => $d['praxisname'],
            'angefragt_am' => date('c'),
            'bestaetigt_am' => null,
            'bestaetigt_ip' => null,
            'widerrufen_am' => null,
        ];
    });
    $doiMail = "Hallo {$d['vorname']} {$d['nachname']},\n\n"
        . "Sie haben bei Ihrer Anfrage für den KI-Sichtbarkeits-Check angegeben, dass Sie weitere Tipps "
        . "zum Praxismarketing per E-Mail erhalten möchten.\n\n"
        . "Bitte bestätigen Sie das über diesen Link:\n" . confirmUrl($token) . "\n\n"
        . "Ohne Ihre Bestätigung erhalten Sie von uns keine weiteren Tipps – Ihren Report bekommen Sie selbstverständlich trotzdem. "
        . 'Der Link ist ' . DOI_VALID_DAYS . " Tage gültig. Abmelden können Sie sich jederzeit.\n\n"
        . "Falls Sie das nicht angefordert haben, ignorieren Sie diese E-Mail einfach.\n\n"
        . "Viele Grüße\nJan Bruchwalski\nStory Base Agency · Berlin-Spandau\n";
    sendMail($d['email'], 'Bitte bestätigen: Tipps zum Praxismarketing', $doiMail, SENDER_EMAIL);
}

$body = implode("\n", array_filter($lines, fn ($l) => $l !== null)) . "\n";
$subject = 'KI-Check: ' . $d['praxisname'] . ($d['stadt'] !== '' ? ", {$d['stadt']}" : '');
$notified = sendMail(NOTIFY_TO, $subject, $body, $d['email']);

// Bestätigung an die Praxis (Erfüllung der Anfrage, keine Werbung)
$confirmation = "Hallo {$d['vorname']} {$d['nachname']},\n\n"
    . "danke für Ihre Anfrage. Wir prüfen jetzt, was ChatGPT, Perplexity und Gemini über {$d['praxisname']} sagen, "
    . "wenn Patienten nach {$d['leistung']} " . ($d['stadt'] !== '' ? "in {$d['stadt']}" : 'in Ihrer Region') . " fragen.\n\n"
    . "Ihren persönlichen Report erhalten Sie innerhalb von 2 Werktagen.\n\n"
    . "Wenn Sie den Report gleich mit mir besprechen möchten, buchen Sie hier 20 Minuten:\n" . CALENDLY_URL . "\n\n"
    . "Viele Grüße\nJan Bruchwalski\nStory Base Agency · Berlin-Spandau\n"
    . "Telefon +49 30 24325402 · https://story-base.de\n";
sendMail($d['email'], 'Ihr KI-Sichtbarkeits-Check läuft', $confirmation, SENDER_EMAIL);

if (!$notified) {
    respond(false, 500, $wantsJson, ['form' => 'Die Anfrage konnte nicht gesendet werden.']);
}
respond(true, 200, $wantsJson);
