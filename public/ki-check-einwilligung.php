<?php
// Double-Opt-in für Werbe-Mails: bestätigt oder widerruft eine Einwilligung.
// Nimmt nur POST an (Button auf /ki-check/bestaetigen/ bzw. /ki-check/abmelden/),
// damit Link-Scanner in Firmen-Postfächern nichts automatisch bestätigen.

declare(strict_types=1);

define('SB_KI_CHECK', true);
require __DIR__ . '/ki-check-lib.inc.php';

function finish(string $status): never
{
    header('Location: /ki-check/einwilligung/?status=' . $status, true, 303);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    http_response_code(405);
    exit;
}

$token = strtolower(field('t', 64));
$action = field('aktion', 20);
if (!isToken($token) || !in_array($action, ['bestaetigen', 'abmelden'], true)) {
    finish('ungueltig');
}

$ip = (string) ($_SERVER['REMOTE_ADDR'] ?? '');

// Ergebnis: [Status, Eintrag, ob sich etwas geändert hat]
[$status, $entry, $changed] = updateConsents(function (array &$consents) use ($token, $action, $ip): array {
    if (!isset($consents[$token])) {
        return ['ungueltig', null, false];
    }
    $e = &$consents[$token];

    if ($action === 'abmelden') {
        if ($e['widerrufen_am'] !== null) {
            return ['abgemeldet', $e, false];
        }
        $e['widerrufen_am'] = date('c');
        return ['abgemeldet', $e, true];
    }

    if ($e['widerrufen_am'] !== null) {
        return ['abgemeldet', $e, false];
    }
    if ($e['bestaetigt_am'] !== null) {
        return ['bestaetigt', $e, false];
    }
    if (strtotime((string) $e['angefragt_am']) < time() - DOI_VALID_DAYS * 86400) {
        return ['abgelaufen', $e, false];
    }
    $e['bestaetigt_am'] = date('c');
    $e['bestaetigt_ip'] = $ip;
    return ['bestaetigt', $e, true];
}) ?? ['ungueltig', null, false];

if ($changed && is_array($entry)) {
    if ($status === 'bestaetigt') {
        sendMail(
            NOTIFY_TO,
            "Werbe-Einwilligung bestätigt: {$entry['praxis']}",
            "Die Werbe-Einwilligung ist jetzt gültig (Double-Opt-in bestätigt).\n\n"
                . "Name:          {$entry['name']}\n"
                . "Praxis:        {$entry['praxis']}\n"
                . "E-Mail:        {$entry['email']}\n"
                . 'Angefragt am:  ' . date('d.m.Y H:i', (int) strtotime($entry['angefragt_am'])) . " Uhr\n"
                . 'Bestätigt am:  ' . date('d.m.Y H:i', (int) strtotime($entry['bestaetigt_am'])) . " Uhr\n\n"
                . "Ab jetzt darfst du dieser Adresse Tipps und Angebote per E-Mail schicken.\n"
                . "Füge in JEDE Werbe-Mail diesen persönlichen Abmeldelink ein:\n"
                . unsubscribeUrl($token) . "\n"
        );
    } else {
        sendMail(
            NOTIFY_TO,
            "Abmeldung von Werbe-Mails: {$entry['praxis']}",
            "Diese Adresse hat sich von Werbe-Mails abgemeldet. Bitte ab sofort keine Werbe-Mails mehr schicken.\n\n"
                . "Name:          {$entry['name']}\n"
                . "Praxis:        {$entry['praxis']}\n"
                . "E-Mail:        {$entry['email']}\n"
                . 'Abgemeldet am: ' . date('d.m.Y H:i', (int) strtotime($entry['widerrufen_am'])) . " Uhr\n"
        );
    }
}

finish($status);
