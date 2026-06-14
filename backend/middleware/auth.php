<?php
require_once __DIR__ . '/../utils/jwt.php';

function authenticate() {
    $headers = getallheaders();
    $auth = $headers['Authorization'] ?? '';
    $token = str_replace('Bearer ', '', $auth);

    if (!$token) {
        http_response_code(401);
        echo json_encode(['error' => 'Token manquant']);
        exit;
    }

    try {
        $decoded = verifyToken($token);
        return $decoded->user_id;
    } catch (Exception $e) {
        http_response_code(401);
        echo json_encode(['error' => 'Token invalide']);
        exit;
    }
}