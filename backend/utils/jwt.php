<?php
require_once __DIR__ . '/../vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

define('JWT_SECRET', 'aurix_super_secret_key_2024_minimum_32_characters_long');

function generateToken($userId) {
    $payload = [
        'user_id' => $userId,
        'exp' => time() + 86400
    ];
    return JWT::encode($payload, JWT_SECRET, 'HS256');
}

function verifyToken($token) {
    return JWT::decode($token, new Key(JWT_SECRET, 'HS256'));
}