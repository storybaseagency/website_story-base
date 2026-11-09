<?php
// Gemeinsame Funktionen für ki-check.php und ki-check-einwilligung.php.
// Wird nur per require eingebunden; ein direkter Aufruf liefert 404.

declare(strict_types=1);

if (!defined('SB_KI_CHECK')) {
    http_response_code(404);
    exit;
}

const SITE_URL = 'https://story-base.de';
const NOTIFY_TO = 'info@story-base.de';
const SENDER_EMAIL = 'info@story-base.de';
const SENDER_NAME = 'Jan Bruchwalski';
const DATA_DIR = __DIR__ . '/.ki-check-data';
// Datendateien enden auf .php und beginnen mit dieser Zeile: Selbst wenn der
// Server die .htaccess-Sperre ignoriert, liefert ein Aufruf nur eine leere 404.
const GUARD = "<?php http_response_code(404); exit; ?>\n";
// Bestätigungslinks für die Werbe-Einwilligung gelten 30 Tage
const DOI_VALID_DAYS = 30;

date_default_timezone_set('Europe/Berlin');

function field(string $name, int $max = 200): string
{
    $value = trim((string) ($_POST[$name] ?? ''));
    $value = preg_replace('/[\r\n\t]+/', ' ', $value) ?? '';
    return mb_substr($value, 0, $max);
}

function dataDir(): string
{
    if (!is_dir(DATA_DIR)) {
        @mkdir(DATA_DIR, 0700, true);
    }
    $htaccess = DATA_DIR . '/.htaccess';
    if (!is_file($htaccess)) {
        @file_put_contents($htaccess, "Require all denied\nDeny from all\n");
    }
    return DATA_DIR;
}

function headerSafe(string $s): string
{
    return '=?UTF-8?B?' . base64_encode($s) . '?=';
}

function sendMail(string $to, string $subject, string $body, ?string $replyTo = null): bool
{
    $headers = [
        'From' => headerSafe(SENDER_NAME) . ' <' . SENDER_EMAIL . '>',
        'Content-Type' => 'text/plain; charset=UTF-8',
        'Content-Transfer-Encoding' => '8bit',
        'X-Mailer' => 'story-base.de',
    ];
    if ($replyTo !== null) {
        $headers['Reply-To'] = $replyTo;
    }
    return mail($to, headerSafe($subject), $body, $headers, '-f' . SENDER_EMAIL);
}

// ---------------------------------------------------------------------------
// Einwilligungs-Register für Werbe-Mails (Double-Opt-in)
// Datei .ki-check-data/einwilligungen.php: GUARD + JSON { token: eintrag }
// Eintrag: email, name, praxis, angefragt_am, bestaetigt_am, bestaetigt_ip,
//          widerrufen_am

function consentFile(): string
{
    return dataDir() . '/einwilligungen.php';
}

/** Liest das Register, wendet $change an und speichert es – unter Dateisperre. */
function updateConsents(callable $change): mixed
{
    $fh = fopen(consentFile(), 'c+');
    if ($fh === false) {
        return null;
    }
    flock($fh, LOCK_EX);
    $raw = stream_get_contents($fh) ?: '';
    $data = json_decode(substr($raw, strlen(GUARD)), true) ?: [];
    $result = $change($data);
    ftruncate($fh, 0);
    rewind($fh);
    fwrite($fh, GUARD . json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
    fflush($fh);
    flock($fh, LOCK_UN);
    fclose($fh);
    return $result;
}

function newToken(): string
{
    return bin2hex(random_bytes(16));
}

function isToken(string $t): bool
{
    return (bool) preg_match('/^[a-f0-9]{32}$/', $t);
}

function confirmUrl(string $token): string
{
    return SITE_URL . '/ki-check/bestaetigen/?t=' . $token;
}

function unsubscribeUrl(string $token): string
{
    return SITE_URL . '/ki-check/abmelden/?t=' . $token;
}
