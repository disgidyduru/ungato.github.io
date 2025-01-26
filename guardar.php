<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $comentario = htmlspecialchars($_POST["comentario"]);
    $nuevoComentario = $comentario . "\n";

    // Guardar en el archivo de texto
    file_put_contents("comentarios.txt", $nuevoComentario, FILE_APPEND);

    // Redirigir de vuelta a la página principal
    header("Location: index.php");
    exit;
}
?>
