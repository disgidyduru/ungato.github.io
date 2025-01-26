<?php
$file = 'comments.txt';

if (file_exists($file)) {
    $comments = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    echo json_encode($comments);
} else {
    echo json_encode([]);
}
?>
