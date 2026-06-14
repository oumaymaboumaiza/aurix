<?php
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../utils/jwt.php';

$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents('php://input'), true);

if ($GLOBALS['path'] === '/register' && $method === 'POST') {

    if (!$data['full_name'] || !$data['email'] || !$data['password']) {
        http_response_code(400);
        echo json_encode(['error' => 'Tous les champs sont requis']);
        exit;
    }

    $stmt = $pdo->prepare('SELECT id FROM users WHERE email = ?');
    $stmt->execute([$data['email']]);
    if ($stmt->fetch()) {
        http_response_code(409);
        echo json_encode(['error' => 'Email déjà utilisé']);
        exit;
    }

    $hash = password_hash($data['password'], PASSWORD_BCRYPT);
    $stmt = $pdo->prepare('INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)');
    $stmt->execute([$data['full_name'], $data['email'], $hash]);
    $userId = $pdo->lastInsertId();

    $pdo->prepare('INSERT INTO wallets (user_id) VALUES (?)')->execute([$userId]);

    $token = generateToken($userId);
    echo json_encode(['token' => $token, 'message' => 'Compte créé avec succès']);

} elseif ($GLOBALS['path'] === '/login' && $method === 'POST') {

    if (!$data['email'] || !$data['password']) {
        http_response_code(400);
        echo json_encode(['error' => 'Email et mot de passe requis']);
        exit;
    }

    $stmt = $pdo->prepare('SELECT * FROM users WHERE email = ?');
    $stmt->execute([$data['email']]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($data['password'], $user['password'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Identifiants incorrects']);
        exit;
    }

    $token = generateToken($user['id']);
    echo json_encode([
        'token' => $token,
        'user' => [
            'id' => $user['id'],
            'full_name' => $user['full_name'],
            'email' => $user['email']
        ]
    ]);
}