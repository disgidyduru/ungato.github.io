// Importar las funciones necesarias de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getDatabase, ref, set, get, child, push } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

// Configuración de Firebase (como la proporcionaste)
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

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Referencias de la base de datos
const topicRef = ref(database, "topic");
const commentsRef = ref(database, "comments");
const tableRef = ref(database, "tableData");

// Elementos DOM
const topicContent = document.getElementById("topic-content");
const editButton = document.getElementById("edit-button");
const editInput = document.getElementById("edit-input");
const commentInput = document.getElementById("comment-input");
const commentButton = document.getElementById("comment-button");
const commentsList = document.getElementById("comments-list");
const tableContainer = document.getElementById("table-container"); // Contenedor para la tabla

// Cargar el contenido de la página
function loadTopicContent() {
  get(topicRef).then((snapshot) => {
    const topic = snapshot.val();
    if (topic && topic.content) {
      topicContent.innerHTML = topic.content.replace(/\n/g, "<br>"); // Convertir saltos de línea en <br>
    } else {
      topicContent.innerHTML = "<p>No hay contenido disponible.</p>";
    }
  });
}

// Cargar los comentarios
function loadComments() {
  get(commentsRef).then((snapshot) => {
    commentsList.innerHTML = "";
    const comments = snapshot.val();
    if (comments) {
      Object.values(comments).forEach(comment => {
        const li = document.createElement("li");
        li.innerHTML = comment.comment.replace(/\n/g, "<br>"); // Convertir saltos de línea en <br>
        commentsList.appendChild(li);
      });
    }
  });
}

// Cargar la tabla
function loadTable() {
  get(tableRef).then((snapshot) => {
    tableContainer.innerHTML = ""; // Limpiar el contenedor antes de agregar contenido
    const tableData = snapshot.val();
    if (tableData) {
      const table = document.createElement("table");
      table.border = "1";

      // Crear encabezados
      const thead = document.createElement("thead");
      const headerRow = document.createElement("tr");
      ["Red", "Objetivos de la red", "Infraestructura", "Características técnicas", "Antecedentes"].forEach(header => {
        const th = document.createElement("th");
        th.textContent = header;
        headerRow.appendChild(th);
      });
      thead.appendChild(headerRow);
      table.appendChild(thead);

      // Crear cuerpo de la tabla
      const tbody = document.createElement("tbody");
      tableData.forEach(row => {
        const tr = document.createElement("tr");
        Object.values(row).forEach(cell => {
          const td = document.createElement("td");
          td.textContent = cell;
          td.contentEditable = "true"; // Hacer que las celdas sean editables
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      });
      table.appendChild(tbody);
      tableContainer.appendChild(table);

      // Agregar botón para guardar cambios
      const saveButton = document.createElement("button");
      saveButton.textContent = "Guardar cambios en la tabla";
      saveButton.addEventListener("click", saveTable);
      tableContainer.appendChild(saveButton);
    } else {
      tableContainer.innerHTML = "<p>No hay datos de tabla disponibles.</p>";
    }
  });
}

// Guardar los cambios de la tabla
function saveTable() {
  const table = tableContainer.querySelector("table");
  if (!table) return;

  const rows = table.querySelectorAll("tbody tr");
  const updatedData = [];
  rows.forEach(row => {
    const cells = row.querySelectorAll("td");
    const rowData = Array.from(cells).map(cell => cell.textContent.trim());
    updatedData.push({
      red: rowData[0],
      objectives: rowData[1],
      infrastructure: rowData[2],
      technicalFeatures: rowData[3],
      background: rowData[4],
    });
  });

  set(tableRef, updatedData)
    .then(() => alert("Tabla guardada correctamente"))
    .catch(error => alert("Error al guardar la tabla: " + error));
}

// Guardar el contenido del tema
editButton.addEventListener('click', () => {
  if (editInput.style.display === 'none') {
    // Modo de edición
    editInput.style.display = 'block';
    editButton.textContent = 'Guardar cambios';
    editInput.value = topicContent.innerHTML.replace(/<br>/g, "\n"); // Mostrar el contenido en formato de texto
  } else {
    // Guardar cambios
    const newContent = editInput.value.trim();
    if (newContent) {
      const formattedContent = newContent.replace(/\n/g, "<br>");
      set(topicRef, { content: formattedContent })
        .then(() => {
          topicContent.innerHTML = formattedContent; // Actualizar el contenido
          editInput.style.display = 'none';
          editButton.textContent = 'Editar Información';
        })
        .catch((error) => {
          alert("Error al guardar los cambios: " + error);
        });
    }
  }
});

// Agregar un comentario
commentButton.addEventListener('click', () => {
  const commentText = commentInput.value.trim();
  if (commentText) {
    const formattedComment = commentText.replace(/\n/g, "<br>");
    const newCommentRef = push(commentsRef);
    set(newCommentRef, { comment: formattedComment })
      .then(() => {
        commentInput.value = "";
        commentInput.style.display = 'none'; // Ocultar el campo de comentario
        loadComments(); // Recargar los comentarios
      })
      .catch((error) => {
        alert("Error al agregar comentario: " + error);
      });
  }
});

// Mostrar el campo de comentario
commentButton.addEventListener('click', () => {
  commentInput.style.display = 'block';
});

// Inicializar la página
window.onload = function() {
  loadTopicContent(); // Cargar el contenido del tema
  loadComments(); // Cargar los comentarios
  loadTable(); // Cargar la tabla
};
