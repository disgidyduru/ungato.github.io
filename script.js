
<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>








// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Referencia a la base de datos en tiempo real
const database = firebase.database();
const commentsRef = database.ref("comments");

// Elementos del DOM
const commentInput = document.getElementById("comment-input");
const addCommentButton = document.getElementById("add-comment-button");
const commentsList = document.getElementById("comments-list");

// Cargar comentarios en tiempo real
commentsRef.on("value", (snapshot) => {
  commentsList.innerHTML = ""; // Limpiar lista antes de actualizar
  const comments = snapshot.val();
  if (comments) {
    for (let key in comments) {
      addCommentToDOM(comments[key]);
    }
  }
});

// Función para agregar un comentario al DOM
function addCommentToDOM(commentText) {
  const commentItem = document.createElement("li");
  commentItem.textContent = commentText;
  commentsList.appendChild(commentItem);
}

// Función para agregar un comentario a Firebase
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
