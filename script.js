import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getDatabase, ref, set, push, onValue, update } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

// Configuración de Firebase
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

// ** Editar Información del Tema **
const saveContentBtn = document.getElementById("saveContentBtn");
saveContentBtn.addEventListener("click", () => {
    const content = document.getElementById("editContent").value;
    set(ref(database, "pagina/tema"), { content: content });
    alert("Información guardada correctamente.");
});

// Cargar la información del tema
onValue(ref(database, "pagina/tema"), (snapshot) => {
    const data = snapshot.val();
    if (data && data.content) {
        const mainContent = document.getElementById("mainContent");
        mainContent.innerText = data.content.replace(/\n/g, "\n");
        document.getElementById("editContent").value = data.content;
    }
});

// ** Agregar Comentarios **
const addCommentBtn = document.getElementById("addCommentBtn");
addCommentBtn.addEventListener("click", () => {
    const commentText = document.getElementById("commentText").value;
    if (commentText) {
        const commentsRef = ref(database, "pagina/comentarios/");
        push(commentsRef, { text: commentText });
        document.getElementById("commentText").value = "";
        alert("Comentario agregado correctamente.");
    }
});

// Cargar Comentarios
onValue(ref(database, "pagina/comentarios"), (snapshot) => {
    const comments = snapshot.val();
    const commentsList = document.getElementById("comments-list");
    commentsList.innerHTML = "";

    if (comments) {
        for (let id in comments) {
            const commentDiv = document.createElement("div");
            commentDiv.textContent = comments[id].text;
            commentsList.appendChild(commentDiv);
        }
    }
});

// ** Tabla Editable **
const addRowBtn = document.getElementById("addRowBtn");
const tableBody = document.getElementById("tableBody");

// Función para agregar una fila nueva
addRowBtn.addEventListener("click", () => {
    const newRow = document.createElement("tr");

    newRow.innerHTML = `
        <td><input type="text" value="Nuevo Nombre" class="edit-field"></td>
        <td><input type="number" value="0" class="edit-field"></td>
        <td><input type="text" value="Nueva Ciudad" class="edit-field"></td>
        <td><button class="editRowBtn">Editar</button></td>
    `;

    tableBody.appendChild(newRow);
    attachEditButtonEvent(newRow.querySelector(".editRowBtn"));
});

// Función para manejar los botones de editar
function attachEditButtonEvent(button) {
    button.addEventListener("click", (event) => {
        const row = event.target.closest("tr");
        const inputs = row.querySelectorAll(".edit-field");
        const isEditing = event.target.textContent === "Editar";

        inputs.forEach((input) => (input.disabled = !isEditing));
        event.target.textContent = isEditing ? "Guardar" : "Editar";

        if (!isEditing) {
            const rowData = Array.from(inputs).map((input) => input.value);
            console.log("Datos guardados:", rowData); // Aquí puedes persistir en Firebase si es necesario
        }
    });
}

// Adjuntar eventos a los botones iniciales
document.querySelectorAll(".editRowBtn").forEach(attachEditButtonEvent);
