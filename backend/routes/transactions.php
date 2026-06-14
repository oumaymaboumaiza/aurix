<?php
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../middleware/auth.php';

$userId = authenticate();

$stmt = $pdo->prepare('SELECT * FROM transactions WHERE user_id = ? ORDER BY created_at DESC');
$stmt->execute([$userId]);
$transactions = $stmt->fetchAll();

echo json_encode($transactions);