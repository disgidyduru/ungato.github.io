
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

// Referencia a la base de datos
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
  for (let key in comments) {
    addCommentToDOM(comments[key]);
  }
});

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

// Función para agregar un comentario al DOM
function addCommentToDOM(commentText) {
  const commentItem = document.createElement("li");
  commentItem.textContent = commentText;
  commentsList.appendChild(commentItem);
}
