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

// Función para actualizar la información de la página
function updateContent() {
    const content = document.getElementById('editContent').value;
    set(ref(database, 'pagina/tema'), {
        content: content
    });
}

// Cargar la información desde Firebase
onValue(ref(database, 'pagina/tema'), (snapshot) => {
    const data = snapshot.val();
    if (data && data.content) {
        const editContent = document.getElementById('editContent');
        editContent.value = data.content;
        document.querySelector("h2").innerText = data.content.replace(/\n/g, "\n");
    }
});

// Función para agregar comentarios
function addComment() {
    const commentText = document.getElementById('commentText').value;
    if (commentText) {
        const commentsRef = ref(database, 'pagina/comentarios/');
        const newCommentRef = push(commentsRef);
        set(newCommentRef, {
            text: commentText
        });

        document.getElementById('commentText').value = '';
    }
}

// Cargar los comentarios desde Firebase
onValue(ref(database, 'pagina/comentarios'), (snapshot) => {
    const comments = snapshot.val();
    const commentsList = document.getElementById('comments-list');
    commentsList.innerHTML = '';

    for (let id in comments) {
        const comment = comments[id];
        const commentDiv = document.createElement('div');
        commentDiv.textContent = comment.text;
        commentsList.appendChild(commentDiv);
    }
});

// Función para guardar la fila de la tabla editable
function saveRow(button) {
    const row = button.closest('tr');
    const inputs = row.querySelectorAll('input');

    inputs.forEach(input => {
        input.disabled = true;
    });

    button.textContent = "Editar";
    button.setAttribute("onclick", "editRow(this)");
}

// Función para habilitar los campos de la fila para edición
function editRow(button) {
    const row = button.closest('tr');
    const inputs = row.querySelectorAll('input');

    inputs.forEach(input => {
        input.disabled = false;
    });

    button.textContent = "Guardar";
    button.setAttribute("onclick", "saveRow(this)");
}

export { updateContent, addComment, saveRow, editRow };
