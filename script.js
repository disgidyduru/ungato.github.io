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

// Mostrar la caja de comentario cuando se hace clic en "Agregar Comentario"
commentButton.addEventListener("click", () => {
  if (commentInput.style.display === "none" || commentInput.style.display === "") {
    commentInput.style.display = "block"; // Mostrar la caja de comentario
  } else {
    const commentText = commentInput.value.trim();
    if (commentText) {
      const newCommentRef = push(commentsRef);
      set(newCommentRef, {
        comment: commentText
      }).then(() => {
        commentInput.value = ""; // Limpiar el campo de comentario
        commentInput.style.display = "none"; // Ocultar la caja de comentario
        alert("Comentario agregado.");
        loadComments(); // Recargar los comentarios
      }).catch((error) => {
        console.error("Error al agregar comentario:", error);
        alert("Ocurrió un error al agregar el comentario.");
      });
    }
  }
});

// Cargar comentarios desde Firebase
function loadComments() {
  get(commentsRef).then((snapshot) => {
    if (snapshot.exists()) {
      const comments = snapshot.val();
      commentsList.innerHTML = ""; // Limpiar la lista actual
      for (const key in comments) {
        if (comments.hasOwnProperty(key)) {
          const li = document.createElement("li");
          li.classList.add("comment");
          li.textContent = comments[key].comment;
          commentsList.appendChild(li);
        }
      }
    } else {
      commentsList.innerHTML = "<li>No hay comentarios aún.</li>";
    }
  }).catch((error) => {
    console.error("Error al cargar comentarios:", error);
  });
}

// Cargar comentarios al iniciar la página
loadComments();
