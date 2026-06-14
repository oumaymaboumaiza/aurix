<?php
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../middleware/auth.php';

$userId = authenticate();

$stmt = $pdo->prepare('SELECT * FROM wallets WHERE user_id = ?');
$stmt->execute([$userId]);
$wallet = $stmt->fetch();

echo json_encode([
    'eur_balance'     => (float) $wallet['eur_balance'],
    'gold_balance'    => (float) $wallet['gold_balance'],
    'gold_price'      => 65,
    'portfolio_value' => (float) $wallet['gold_balance'] * 65
]);