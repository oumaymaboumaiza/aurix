<?php
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../middleware/auth.php';

$userId = authenticate();
$data = json_decode(file_get_contents('php://input'), true);

$stmt = $pdo->prepare('SELECT * FROM wallets WHERE user_id = ?');
$stmt->execute([$userId]);
$wallet = $stmt->fetch();

if ($GLOBALS['path'] === '/buy') {
    $eurAmount = (float) $data['eur_amount'];

    if ($eurAmount <= 0) {
        http_response_code(400);
        echo json_encode(['error' => 'Montant invalide']);
        exit;
    }

    if ($wallet['eur_balance'] < $eurAmount) {
        http_response_code(400);
        echo json_encode(['error' => 'Solde EUR insuffisant']);
        exit;
    }

    $goldAmount = $eurAmount / 65;

    $pdo->prepare('UPDATE wallets SET eur_balance = eur_balance - ?, gold_balance = gold_balance + ? WHERE user_id = ?')
        ->execute([$eurAmount, $goldAmount, $userId]);

    $pdo->prepare('INSERT INTO transactions (user_id, type, eur_amount, gold_amount) VALUES (?, ?, ?, ?)')
        ->execute([$userId, 'buy', $eurAmount, $goldAmount]);

    echo json_encode(['message' => 'Achat effectué avec succès', 'gold_bought' => $goldAmount]);

} elseif ($GLOBALS['path'] === '/sell') {
    $goldAmount = (float) $data['gold_amount'];

    if ($goldAmount <= 0) {
        http_response_code(400);
        echo json_encode(['error' => 'Montant invalide']);
        exit;
    }

    if ($wallet['gold_balance'] < $goldAmount) {
        http_response_code(400);
        echo json_encode(['error' => 'Solde gold insuffisant']);
        exit;
    }

    $eurAmount = $goldAmount * 65;

    $pdo->prepare('UPDATE wallets SET gold_balance = gold_balance - ?, eur_balance = eur_balance + ? WHERE user_id = ?')
        ->execute([$goldAmount, $eurAmount, $userId]);

    $pdo->prepare('INSERT INTO transactions (user_id, type, eur_amount, gold_amount) VALUES (?, ?, ?, ?)')
        ->execute([$userId, 'sell', $eurAmount, $goldAmount]);

    echo json_encode(['message' => 'Vente effectuée avec succès', 'eur_received' => $eurAmount]);
}