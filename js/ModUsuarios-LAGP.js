// ========================================
// VARIABLES
// ========================================
let numeroSeleccionado = null;

// ========================================
// CARGAR TABLA AL INICIAR
// ========================================
document.addEventListener("DOMContentLoaded", () => {
    cargarTabla();
    document.getElementById("btnActualizar").addEventListener("click", actualizarUsuario);
});

// ========================================
// CARGAR REGISTROS EN LA TABLA
// ========================================
function cargarTabla() {
    fetch("../../php/ModUsuarios/getUsuarios.php")
        .then(response => response.json())
        .then(data => {
            console.log("Datos recibidos:", data);

            const tbody = document.querySelector("#tablaDinamica tbody");
            tbody.innerHTML = "";

            data.forEach(row => {
                const tr = document.createElement("tr");

                tr.innerHTML = `
                    <td>${row.numeroControl}</td>
                    <td>${row.nombre}</td>
                    <td>${row.apellidoPaterno}</td>
                    <td>${row.rol}</td>
                    <td>${row.estado}</td>
                `;

                tr.addEventListener("click", () => seleccionarFila(row, tr));

                tbody.appendChild(tr);
            });
        })
        .catch(error => console.error("Error cargando tabla:", error));
}

// ========================================
// SELECCIONAR FILA
// ========================================
function seleccionarFila(row, trHTML) {
    numeroSeleccionado = row.numeroControl;

    // Remover selección previa
    document.querySelectorAll("#tablaDinamica tr")
        .forEach(f => f.classList.remove("fila-seleccionada"));

    // Marcar fila actual
    trHTML.classList.add("fila-seleccionada");

    // Cargar valores en los combos
    document.getElementById("ComboRol").value = row.id_Rol;
    document.getElementById("ComboEstado").value = row.id_Estado;
}

// ========================================
// ACTUALIZAR USUARIO
// ========================================
function actualizarUsuario() {
    if (!numeroSeleccionado) {
        mostrarMensaje("Seleccione un usuario primero", "error");
        return;
    }

    const id_Rol = document.getElementById("ComboRol").value;
    const id_Estado = document.getElementById("ComboEstado").value;

    fetch("../../php/ModUsuarios/actualizarUsuario.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            numeroControl: numeroSeleccionado,
            id_Rol: id_Rol,
            id_Estado: id_Estado
        })
    })
        .then(response => response.json())
        .then(data => {
            mostrarMensaje(data.mensaje, data.tipo);
            cargarTabla();
        })
        .catch(error => console.error("Error actualizando:", error));
}
