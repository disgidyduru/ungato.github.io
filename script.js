const commentInput = document.getElementById("comment-input");
const addCommentButton = document.getElementById("add-comment-button");
const commentsList = document.getElementById("comments-list");

// Cargar comentarios desde el servidor al cargar la página
window.addEventListener("load", loadComments);

// Función para cargar comentarios
function loadComments() {
  fetch("get_comments.php")
    .then(response => response.json())
    .then(comments => {
      commentsList.innerHTML = ""; // Limpiar la lista
      comments.forEach(comment => addCommentToDOM(comment));
    })
    .catch(error => console.error("Error al cargar los comentarios:", error));
}

// Función para agregar un comentario
addCommentButton.addEventListener("click", () => {
  const commentText = commentInput.value.trim();

  if (commentText === "") {
    alert("El comentario no puede estar vacío.");
    return;
  }

  // Enviar el comentario al servidor
  fetch("save_comment.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ comment: commentText }),
  })
    .then(response => response.json())
    .then(result => {
      if (result.success) {
        addCommentToDOM(commentText);
        commentInput.value = ""; // Limpiar el campo de entrada
      } else {
        alert("Error al guardar el comentario.");
      }
    })
    .catch(error => console.error("Error al enviar el comentario:", error));
});

// Función para agregar un comentario al DOM
function addCommentToDOM(commentText) {
  const commentItem = document.createElement("li");
  commentItem.textContent = commentText;
  commentsList.appendChild(commentItem);
}
