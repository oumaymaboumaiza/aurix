<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$GLOBALS['path'] = $path;

if ($path === '/register' || $path === '/login') {
    require __DIR__ . '/routes/auth.php';
} elseif ($path === '/wallet') {
    require __DIR__ . '/routes/wallet.php';
} elseif ($path === '/buy' || $path === '/sell') {
    require __DIR__ . '/routes/trade.php';
} elseif ($path === '/transactions') {
    require __DIR__ . '/routes/transactions.php';
} elseif ($path === '/ai/chat') {
    require __DIR__ . '/routes/ai.php';
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Route non trouvée']);
}