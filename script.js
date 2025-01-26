

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAY2knx6PUZy_0yNOg6FtAMYTwAh0N5qCg",
  authDomain: "distribuidos-e6287.firebaseapp.com",
  projectId: "distribuidos-e6287",
  storageBucket: "distribuidos-e6287.firebasestorage.app",
  messagingSenderId: "825551235043",
  appId: "1:825551235043:web:4d554b343c2ceaef50a2d6",
  measurementId: "G-C2BZ9EPY5N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


// Configuración de Firebase (reemplaza con tu configuración)
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  databaseURL: "TU_DATABASE_URL",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Referencia a la base de datos en tiempo real
const database = firebase.database();
const commentsRef = database.ref("comments");


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

// Cargar comentarios en tiempo real
commentsRef.on("value", (snapshot) => {
  commentsList.innerHTML = ""; // Limpiar lista antes de actualizar
  const comments = snapshot.val();
  for (let key in comments) {
    addCommentToDOM(comments[key]);
  }
});
