<?php
// Rückrufformular der Startseite – läuft auf dem PHP des All-Inkl-Webspace.
// Antwortet mit JSON (fetch aus ContactForm.tsx) oder leitet ohne JavaScript auf /danke/ weiter.

declare(strict_types=1);

const RECIPIENT = 'info@story-base.de';
const SENDER = 'website@story-base.de';
const MIN_SECONDS = 3;

date_default_timezone_set('Europe/Berlin');

$wantsJson = str_contains($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json');

function respond(bool $ok, int $status, string $message, bool $wantsJson): never
{
    http_response_code($status);
    if ($wantsJson) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['ok' => $ok, 'message' => $message], JSON_UNESCAPED_UNICODE);
    } elseif ($ok) {
        header('Location: /danke/', true, 303);
    } else {
        header('Content-Type: text/plain; charset=utf-8');
        echo $message;
    }
    exit;
}

function field(string $name, int $max = 200): string
{
    $value = trim((string) ($_POST[$name] ?? ''));
    // Zeilenumbrüche entfernen (verhindert Header-Injection) und Länge begrenzen
    $value = preg_replace('/[\r\n\t]+/', ' ', $value) ?? '';
    return mb_substr($value, 0, $max);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(false, 405, 'Nur POST erlaubt.', $wantsJson);
}

// Spam-Schutz: Honeypot muss leer sein, Formular nicht in Sekundenbruchteilen ausgefüllt
$elapsed = isset($_POST['t']) ? (int) $_POST['t'] : MIN_SECONDS;
if (field('website') !== '' || $elapsed < MIN_SECONDS) {
    // Bots bekommen eine Erfolgsmeldung, es wird aber nichts versendet
    respond(true, 200, 'OK', $wantsJson);
}

$name = field('name', 120);
$praxis = field('praxis', 160);
$kontakt = field('kontakt', 160);
$ziel = field('ziel', 40);

if ($name === '' || $kontakt === '') {
    respond(false, 422, 'Bitte Name und Telefon oder E-Mail angeben.', $wantsJson);
}

$allowedGoals = ['Privatpatienten', 'Fachkräfte', 'Beides'];
if (!in_array($ziel, $allowedGoals, true)) {
    $ziel = 'nicht angegeben';
}

$body = "Neue Rückrufanfrage über story-base.de\n\n"
    . "Name:               {$name}\n"
    . "Praxis/Fachrichtung: " . ($praxis !== '' ? $praxis : '–') . "\n"
    . "Telefon/E-Mail:     {$kontakt}\n"
    . "Ziel:               {$ziel}\n\n"
    . 'Gesendet am ' . date('d.m.Y \u\m H:i') . " Uhr\n";

$headers = [
    'From' => 'Story Base Website <' . SENDER . '>',
    'Content-Type' => 'text/plain; charset=UTF-8',
    'Content-Transfer-Encoding' => '8bit',
    'X-Mailer' => 'story-base.de',
];
if (filter_var($kontakt, FILTER_VALIDATE_EMAIL)) {
    $headers['Reply-To'] = $kontakt;
}

$subject = '=?UTF-8?B?' . base64_encode("Rückrufanfrage: {$name}") . '?=';
$sent = mail(RECIPIENT, $subject, $body, $headers, '-f' . SENDER);

if (!$sent) {
    respond(false, 500, 'Die Anfrage konnte nicht gesendet werden.', $wantsJson);
}
respond(true, 200, 'Danke – wir melden uns.', $wantsJson);
