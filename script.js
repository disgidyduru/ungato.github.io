// Importar funciones de Firebase desde CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getDatabase, ref, set, onValue, push, get } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCOlxixdTjAmu-i6orZvPlwFozLgz9b7Ao",
  authDomain: "basededatosfinal-cc8a6.firebaseapp.com",
  databaseURL: "https://basededatosfinal-cc8a6-default-rtdb.firebaseio.com",
  projectId: "basededatosfinal-cc8a6",
  storageBucket: "basededatosfinal-cc8a6.firebasestorage.app",
  messagingSenderId: "880268232566",
  appId: "1:880268232566:web:2abe4f3d3f7b3dddb1dc57",
  measurementId: "G-TBKZQ59Z4D"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Referencias de la base de datos
const topicRef = ref(database, "topic");
const commentsRef = ref(database, "comments");

// Elementos del DOM
const topicContent = document.getElementById("topic-content");
const editButton = document.getElementById("edit-button");
const editInput = document.getElementById("edit-input");
const commentInput = document.getElementById("comment-input");
const commentButton = document.getElementById("comment-button");
const commentsList = document.getElementById("comments-list");

// Escuchar cambios en el tema (base de datos)
onValue(topicRef, (snapshot) => {
  const data = snapshot.val();
  if (data) {
    topicContent.textContent = data.content || "No se ha definido el contenido.";
  }
});

// Cambiar entre modo de vista y edición del tema
editButton.addEventListener("click", () => {
  if (editInput.style.display === "none" || editInput.style.display === "") {
    // Mostrar el campo de texto para editar
    editInput.style.display = "block";
    editButton.textContent = "Guardar Cambios";
    editInput.value = topicContent.textContent;
  } else {
    // Guardar los cambios en Firebase
    const newContent = editInput.value.trim();
    if (newContent) {
      set(topicRef, {
        content: newContent
      }).then(() => {
        alert("Contenido actualizado exitosamente.");
        topicContent.textContent = newContent;
        editButton.textContent = "Editar Información";
        editInput.style.display = "none";
      }).catch((error) => {
        console.error("Error al guardar los cambios:", error);
        alert("Ocurrió un error al guardar los cambios.");
      });
    }
  }
});





// Escuchar comentarios en tiempo real
onValue(commentsRef, (snapshot) => {
  commentsList.innerHTML = ""; // Limpiar la lista antes de actualizar
  const data = snapshot.val();
  if (data) {
    Object.values(data).forEach((comment) => {
      addCommentToDOM(comment);
    });
  }
});

// Función para agregar un comentario al DOM
function addCommentToDOM(commentText) {
  const listItem = document.createElement("li");
  listItem.textContent = commentText;
  commentsList.appendChild(listItem);
}

// Agregar un nuevo comentario a Firebase
addCommentButton.addEventListener("click", () => {
  const commentText = commentInput.value.trim();

  if (commentText === "") {
    alert("El comentario no puede estar vacío.");
    return;
  }

  // Enviar comentario a Firebase
  push(commentsRef, commentText);

  // Limpiar el campo de entrada
  commentInput.value = "";
});
