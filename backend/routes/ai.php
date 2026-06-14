<?php
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../middleware/auth.php';

$userId = authenticate();
$data = json_decode(file_get_contents('php://input'), true);
$message = strtolower($data['message'] ?? '');

$rules = [
    'acheter'    => 'Le prix actuel est 65 EUR/g. Vérifiez votre solde EUR avant d\'acheter.',
    'buy'        => 'Le prix actuel est 65 EUR/g. Vérifiez votre solde EUR avant d\'acheter.',
    'vendre'     => 'Prix actuel: 65 EUR/g. Réfléchissez à vos objectifs avant de vendre.',
    'sell'       => 'Prix actuel: 65 EUR/g. Réfléchissez à vos objectifs avant de vendre.',
    'portfolio'  => 'Votre valeur portfolio = balance gold × 65 EUR.',
    'volatil'    => 'La volatilité désigne la variation du prix. L\'or est historiquement un actif stable.',
    'prix'       => 'Le prix actuel de l\'or est fixé à 65 EUR par gramme.',
    'price'      => 'The current gold price is 65 EUR per gram.',
    'conseil'    => 'Diversifiez vos investissements. L\'or est une valeur refuge à long terme.',
];

$response = 'Je suis votre assistant Aurix. Posez-moi des questions sur votre portfolio, l\'or, ou vos transactions !';

foreach ($rules as $keyword => $reply) {
    if (str_contains($message, $keyword)) {
        $response = $reply;
        break;
    }
}

echo json_encode(['response' => $response]);