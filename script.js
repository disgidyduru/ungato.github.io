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

// Cargar los comentarios desde Firebase
function loadComments() {
  onValue(commentsRef, (snapshot) => {
    commentsList.innerHTML = ""; // Limpiar la lista actual de comentarios
    if (snapshot.exists()) {
      const comments = snapshot.val();
      // Recorrer todos los comentarios
      for (const key in comments) {
        if (comments.hasOwnProperty(key)) {
          const li = document.createElement("li");
          li.classList.add("comment");

          // Reemplazar los saltos de línea por <br> para mostrar correctamente
          li.innerHTML = comments[key].comment.replace(/\n/g, "<br>");

          commentsList.appendChild(li);
        }
      }
    } else {
      commentsList.innerHTML = "<li>No hay comentarios aún.</li>";
    }
  });
}

// Cambiar entre el modo de vista y edición del tema
editButton.addEventListener("click", () => {
  if (editInput.style.display === "none" || editInput.style.display === "") {
    // Mostrar el campo de texto para editar
    editInput.style.display = "block";
    editButton.textContent = "Guardar Cambios";
    editInput.value = topicContent.textContent.replace(/<br>/g, "\n"); // Convertir <br> a saltos de línea
  } else {
    // Guardar los cambios en Firebase
    const newContent = editInput.value.trim();
    if (newContent) {
      const formattedContent = newContent.replace(/\n/g, "<br>"); // Reemplazar saltos de línea por <br>

      set(topicRef, {
        content: formattedContent
      }).then(() => {
        alert("Contenido actualizado exitosamente.");
        topicContent.innerHTML = formattedContent; // Usamos innerHTML para que se interpreten los saltos de línea
        editButton.textContent = "Editar Información";
        editInput.style.display = "none";
      }).catch((error) => {
        console.error("Error al guardar los cambios:", error);
        alert("Ocurrió un error al guardar los cambios.");
      });
    }
  }
});

// Permitir agregar comentario al presionar "Enter"
commentButton.addEventListener("click", () => {
  if (commentInput.style.display === "none" || commentInput.style.display === "") {
    commentInput.style.display = "block"; // Mostrar la caja de comentario
  } else {
    const commentText = commentInput.value.trim();
    if (commentText) {
      const formattedComment = commentText.replace(/\n/g, "<br>"); // Reemplazar saltos de línea por <br>

      const newCommentRef = push(commentsRef);
      set(newCommentRef, {
        comment: formattedComment
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

// Detectar cuando el usuario presiona "Enter" en el campo de comentario para agregarlo automáticamente
commentInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const commentText = commentInput.value.trim();
    if (commentText) {
      const formattedComment = commentText.replace(/\n/g, "<br>"); // Reemplazar saltos de línea por <br>

      const newCommentRef = push(commentsRef);
      set(newCommentRef, {
        comment: formattedComment
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

// Cargar el contenido del tema al inicio de la página
get(topicRef).then((snapshot) => {
  if (snapshot.exists()) {
    topicContent.innerHTML = snapshot.val().content; // Cargar el contenido con HTML para que se interpreten los <br>
  } else {
    topicContent.innerHTML = "<p>No se ha definido el contenido del tema.</p>";
  }
}).catch((error) => {
  console.error("Error al cargar el contenido del tema:", error);
});

// Cargar los comentarios al iniciar la página
loadComments();
