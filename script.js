// Importar funciones de Firebase desde CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

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

// Referencia a la base de datos en tiempo real
const commentsRef = ref(database, "comments");

// Elementos del DOM
const commentInput = document.getElementById("comment-input");
const addCommentButton = document.getElementById("add-comment-button");
const commentsList = document.getElementById("comments-list");

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
