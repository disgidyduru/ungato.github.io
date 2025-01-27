import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getDatabase, ref, set, push, onValue } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

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

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// ** Editar Información de la Página **
function updateContent() {
    const content = document.getElementById('editContent').value;
    set(ref(database, 'pagina/tema'), { content: content });
    alert("Información guardada correctamente.");
}

// Cargar la información desde Firebase
onValue(ref(database, 'pagina/tema'), (snapshot) => {
    const data = snapshot.val();
    if (data && data.content) {
        const mainContent = document.getElementById('mainContent');
        mainContent.innerText = data.content;
        document.getElementById('editContent').value = data.content;
    }
});

// ** Agregar Comentarios **
function addComment() {
    const commentText = document.getElementById('commentText').value;
    if (commentText) {
        const commentsRef = ref(database, 'pagina/comentarios/');
        const newCommentRef = push(commentsRef);
        set(newCommentRef, { text: commentText });

        document.getElementById('commentText').value = '';
        alert("Comentario agregado correctamente.");
    }
}

// Cargar los comentarios desde Firebase
onValue(ref(database, 'pagina/comentarios'), (snapshot) => {
    const comments = snapshot.val();
    const commentsList = document.getElementById('comments-list');
    commentsList.innerHTML = '';

    if (comments) {
        for (let id in comments) {
            const comment = comments[id];
            const commentDiv = document.createElement('div');
            commentDiv.textContent = comment.text;
            commentsList.appendChild(commentDiv);
        }
    }
});

// ** Funcionalidades para la Tabla Editable **
function editRow(button) {
    const row = button.closest('tr');
    const inputs = row.querySelectorAll('input');
    const isEditing = button.textContent === "Editar";

    inputs.forEach(input => input.disabled = !isEditing);
    button.textContent = isEditing ? "Guardar" : "Editar";

    if (!isEditing) {
        saveRow(inputs);
    }
}

function saveRow(inputs) {
    const rowData = Array.from(inputs).map(input => input.value);
    console.log("Datos guardados:", rowData); // Aquí puedes guardar en Firebase si es necesario
}

export { updateContent, addComment, editRow };
