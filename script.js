// Importar las funciones necesarias de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getDatabase, ref, set, get, child, push } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

// Configuración de Firebase (como la proporcionaste)
const firebaseConfig = {
  apiKey: "AIzaSyDYrYWOwQx6476c_35NJmZnikJYOoZgrh0",
  authDomain: "mibasedefatod.firebaseapp.com",
  databaseURL: "https://mibasedefatod-default-rtdb.firebaseio.com",
  projectId: "mibasedefatod",
  storageBucket: "mibasedefatod.firebasestorage.app",
  messagingSenderId: "1024936669774",
  appId: "1:1024936669774:web:43051c93ab940bdc5c491f",
  measurementId: "G-XMXGGBK1H3"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Referencias de la base de datos
const topicRef = ref(database, "topic");
const commentsRef = ref(database, "comments");

// Elementos DOM
const topicContent = document.getElementById("topic-content");
const editButton = document.getElementById("edit-button");
const editInput = document.getElementById("edit-input");
const commentInput = document.getElementById("comment-input");
const commentButton = document.getElementById("comment-button");
const commentsList = document.getElementById("comments-list");

// Cargar el contenido de la página
function loadTopicContent() {
  get(topicRef).then((snapshot) => {
    const topic = snapshot.val();
    if (topic && topic.content) {
      topicContent.innerHTML = topic.content.replace(/\n/g, "<br>"); // Convertir saltos de línea en <br>
    } else {
      topicContent.innerHTML = "<p>No hay contenido disponible.</p>";
    }
  });
}

// Cargar los comentarios
function loadComments() {
  get(commentsRef).then((snapshot) => {
    commentsList.innerHTML = "";
    const comments = snapshot.val();
    if (comments) {
      Object.values(comments).forEach(comment => {
        const li = document.createElement("li");
        li.innerHTML = comment.comment.replace(/\n/g, "<br>"); // Convertir saltos de línea en <br>
        commentsList.appendChild(li);
      });
    }
  });
}

// Guardar el contenido del tema
editButton.addEventListener('click', () => {
  if (editInput.style.display === 'none') {
    // Modo de edición
    editInput.style.display = 'block';
    editButton.textContent = 'Guardar cambios';
    editInput.value = topicContent.innerHTML.replace(/<br>/g, "\n"); // Mostrar el contenido en formato de texto
  } else {
    // Guardar cambios
    const newContent = editInput.value.trim();
    if (newContent) {
      const formattedContent = newContent.replace(/\n/g, "<br>");
      set(topicRef, { content: formattedContent })
        .then(() => {
          topicContent.innerHTML = formattedContent; // Actualizar el contenido
          editInput.style.display = 'none';
          editButton.textContent = 'Editar Información';
        })
        .catch((error) => {
          alert("Error al guardar los cambios: " + error);
        });
    }
  }
});

// Agregar un comentario
commentButton.addEventListener('click', () => {
  const commentText = commentInput.value.trim();
  if (commentText) {
    const formattedComment = commentText.replace(/\n/g, "<br>");
    const newCommentRef = push(commentsRef);
    set(newCommentRef, { comment: formattedComment })
      .then(() => {
        commentInput.value = "";
        commentInput.style.display = 'none'; // Ocultar el campo de comentario
        loadComments(); // Recargar los comentarios
      })
      .catch((error) => {
        alert("Error al agregar comentario: " + error);
      });
  }
});

// Mostrar el campo de comentario
commentButton.addEventListener('click', () => {
  commentInput.style.display = 'block';
});

// Inicializar la página
window.onload = function() {
  loadTopicContent(); // Cargar el contenido del tema
  loadComments(); // Cargar los comentarios
};
