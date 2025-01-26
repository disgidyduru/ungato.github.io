// Variables de los elementos del DOM
const editButton = document.getElementById("edit-button");
const contentTitle = document.getElementById("content-title");
const contentParagraph = document.getElementById("content-paragraph");

const commentInput = document.getElementById("comment-input");
const addCommentButton = document.getElementById("add-comment-button");
const commentsList = document.getElementById("comments-list");

// Cargar contenido y comentarios al iniciar
window.addEventListener("load", () => {
  // Cargar contenido editable
  const savedTitle = localStorage.getItem("contentTitle");
  const savedParagraph = localStorage.getItem("contentParagraph");
  if (savedTitle) contentTitle.textContent = savedTitle;
  if (savedParagraph) contentParagraph.textContent = savedParagraph;

  // Cargar comentarios
  const savedComments = JSON.parse(localStorage.getItem("comments")) || [];
  savedComments.forEach(comment => {
    addCommentToDOM(comment);
  });
});

// Función para editar el contenido
editButton.addEventListener("click", () => {
  // Editar título
  const newTitle = prompt("Edita el título:", contentTitle.textContent);
  if (newTitle !== null) {
    contentTitle.textContent = newTitle;
    localStorage.setItem("contentTitle", newTitle); // Guardar en localStorage
  }

  // Editar párrafo
  const newParagraph = prompt("Edita el contenido:", contentParagraph.textContent);
  if (newParagraph !== null) {
    contentParagraph.textContent = newParagraph;
    localStorage.setItem("contentParagraph", newParagraph); // Guardar en localStorage
  }
});

// Función para agregar comentarios
addCommentButton.addEventListener("click", () => {
  const commentText = commentInput.value.trim();
  if (commentText === "") {
    alert("El comentario no puede estar vacío.");
    return;
  }

  // Agregar comentario al DOM
  addCommentToDOM(commentText);

  // Guardar en localStorage
  const savedComments = JSON.parse(localStorage.getItem("comments")) || [];
  savedComments.push(commentText);
  localStorage.setItem("comments", JSON.stringify(savedComments));

  // Limpiar el área de texto
  commentInput.value = "";
});

// Función para agregar un comentario al DOM
function addCommentToDOM(commentText) {
  const commentItem = document.createElement("li");
  commentItem.textContent = commentText;
  commentsList.appendChild(commentItem);
}
