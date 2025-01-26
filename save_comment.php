<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $comment = $input['comment'] ?? '';

    if ($comment !== '') {
        $file = 'comments.txt';
        file_put_contents($file, $comment . PHP_EOL, FILE_APPEND);
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Comentario vacío']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Método no permitido']);
}
?>
