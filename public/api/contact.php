<?php
/**
 * Contact form handler for cPanel / shared PHP hosting (e.g. HayHost).
 * Receives the JSON sent by src/features/contactForm.ts and emails it.
 *
 * Settings: change TO_EMAIL if requests should go to another mailbox.
 * The FROM address must be a mailbox on your own domain (create it in cPanel → Email Accounts),
 * otherwise many mail servers will reject or spam-folder the message.
 */

const TO_EMAIL   = 'info@climatesolutions.am';
const FROM_EMAIL = 'info@climatesolutions.am';
const SITE_NAME  = 'Climate Solutions';
const MAX_PER_HOUR = 5; // per visitor IP

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

function reply(int $code, array $body): void {
    http_response_code($code);
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    reply(405, ['ok' => false, 'error' => 'method']);
}

// Only accept requests coming from this same site.
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$host   = $_SERVER['HTTP_HOST'] ?? '';
if ($origin !== '' && parse_url($origin, PHP_URL_HOST) !== $host) {
    reply(403, ['ok' => false, 'error' => 'origin']);
}

$raw = file_get_contents('php://input', false, null, 0, 20000);
$data = json_decode($raw ?: '', true);
if (!is_array($data)) {
    reply(400, ['ok' => false, 'error' => 'format']);
}

$clean = static function ($v, int $max): string {
    $v = is_string($v) ? trim($v) : '';
    $v = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $v) ?? '';
    return mb_substr($v, 0, $max);
};
$oneLine = static fn(string $v): string => trim(preg_replace('/[\r\n]+/', ' ', $v) ?? '');

$name        = $oneLine($clean($data['name'] ?? '', 120));
$contact     = $oneLine($clean($data['contact'] ?? '', 160));
$projectType = $oneLine($clean($data['projectType'] ?? '', 120));
$service     = $oneLine($clean($data['service'] ?? '', 160));
$message     = $clean($data['message'] ?? '', 5000);

// Same rules as the browser-side validation.
$isEmail = (bool) filter_var($contact, FILTER_VALIDATE_EMAIL);
$isPhone = (bool) preg_match('/^[+\d\s()\-]+$/', $contact) && strlen(preg_replace('/\D/', '', $contact)) >= 8;
if ($name === '' || !($isEmail || $isPhone) || $projectType === '' || mb_strlen($message) < 10) {
    reply(422, ['ok' => false, 'error' => 'validation']);
}

// Simple rate limit per IP (stored in the server's temp folder).
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$file = sys_get_temp_dir() . '/cs_form_' . hash('sha256', $ip);
$now = time();
$hits = [];
if (is_file($file)) {
    $hits = array_filter(array_map('intval', explode(',', (string) file_get_contents($file))), fn($t) => $t > $now - 3600);
}
if (count($hits) >= MAX_PER_HOUR) {
    reply(429, ['ok' => false, 'error' => 'rate']);
}
$hits[] = $now;
@file_put_contents($file, implode(',', $hits), LOCK_EX);

$subject = 'Նոր հայտ կայքից՝ ' . $name;
$body = "Նոր հայտ " . SITE_NAME . " կայքից\n\n"
    . "Անուն՝ {$name}\n"
    . "Կապ՝ {$contact}\n"
    . "Նախագծի տեսակը՝ {$projectType}\n"
    . ($service !== '' ? "Ծառայություն՝ {$service}\n" : '')
    . "\nՀաղորդագրություն՝\n{$message}\n\n"
    . "—\nՈւղարկվել է՝ " . date('Y-m-d H:i') . ", IP՝ {$ip}\n";

$headers = [
    'From: ' . SITE_NAME . ' <' . FROM_EMAIL . '>',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'MIME-Version: 1.0',
];
if ($isEmail) {
    $headers[] = 'Reply-To: ' . $contact;
}

$sent = mail(
    TO_EMAIL,
    '=?UTF-8?B?' . base64_encode($subject) . '?=',
    $body,
    implode("\r\n", $headers),
    '-f' . FROM_EMAIL
);

if (!$sent) {
    reply(500, ['ok' => false, 'error' => 'mail']);
}
reply(200, ['ok' => true]);
