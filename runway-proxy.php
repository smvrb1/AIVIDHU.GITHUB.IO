<?php
header('Content-Type: application/json');

$api_key = 'key_6135bf752983a7fdd864e2be13c4b7a5e23b67297df975bc4fb93f8d012f941a7c903635aeb20af508c37061e962f00c05890d8667d7ef3110460f02cef0030a';
$api_url = 'https://api.runwayml.com/v1/inference/gen4_turbo';

$input = json_decode(file_get_contents('php://input'), true);
$prompt_text = $input['prompt_text'] ?? '';
$prompt_image = $input['prompt_image'] ?? '';

if (!$prompt_text || !$prompt_image) {
    echo json_encode(['error' => 'Prompt text and image are required.']);
    exit;
}

$payload = [
    'model' => 'gen4_turbo',
    'prompt_image' => $prompt_image,
    'prompt_text' => $prompt_text,
    'ratio' => '1280:720',
    'duration' => 5
];

$ch = curl_init($api_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Bearer ' . $api_key
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

if ($http_code !== 200 || !$response) {
    echo json_encode(['error' => 'RunwayML API error: ' . $error]);
    exit;
}

$data = json_decode($response, true);
if (isset($data['video_url'])) {
    echo json_encode(['video_url' => $data['video_url']]);
} else {
    echo json_encode(['error' => $data['error'] ?? 'Unknown error from RunwayML API.']);
} 