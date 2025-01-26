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

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Referencia a la base de datos
const database = firebase.database();
const commentsRef = database.ref("comments");

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


// Elementos del DOM
const commentInput = document.getElementById("comment-input");
const addCommentButton = document.getElementById("add-comment-button");
const commentsList = document.getElementById("comments-list");



// Función para agregar un comentario
addCommentButton.addEventListener("click", () => {
  const commentText = commentInput.value.trim();

  if (commentText === "") {
    alert("El comentario no puede estar vacío.");
    return;
  }

  // Guardar comentario en Firebase
  commentsRef.push(commentText);

  // Limpiar el área de texto
  commentInput.value = "";
});


// Cargar comentarios en tiempo real
commentsRef.on("value", (snapshot) => {
  commentsList.innerHTML = ""; // Limpiar lista antes de actualizar
  const comments = snapshot.val();
  for (let key in comments) {
    addCommentToDOM(comments[key]);
  }
});


// Función para agregar un comentario al DOM
function addCommentToDOM(commentText) {
  const commentItem = document.createElement("li");
  commentItem.textContent = commentText;
  commentsList.appendChild(commentItem);
}
