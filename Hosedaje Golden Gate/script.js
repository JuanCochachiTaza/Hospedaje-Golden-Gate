let opiniones = {
    "Cuartos con baño privado": 3314,
    "Cuartos con baño compartido": 1561,
    "Cuartos con cama doble y con baño privado": 4368,
    "Cuartos con cama doble con baño compartido": 2500,
    "Nuestros Trabajadores": 3100
};
function guardarOpinion() {
    let nuevaOpinion = {
        habitacion: hotelSeleccionado,
        puntuacion: puntuacionSeleccionada,
        fecha: new Date().toLocaleString()
    };

    // Enviar la opinión al servidor
    fetch("http://localhost:3000/opiniones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaOpinion)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.mensaje);
        mostrarHistorialOpiniones(); // Actualiza la lista
    })
    .catch(error => console.error("Error al enviar opinión:", error));
}

// Obtener y mostrar el historial de opiniones
function mostrarHistorialOpiniones() {
    fetch("http://localhost:3000/opiniones")
    .then(response => response.json())
    .then(data => {
        let listaOpiniones = document.getElementById("historial-opiniones");
        listaOpiniones.innerHTML = "";

        data.forEach(opinion => {
            let item = document.createElement("li");
            item.innerText = `(${opinion.fecha}) ${opinion.habitacion}: ${opinion.puntuacion} estrellas`;
            listaOpiniones.appendChild(item);
        });
    })
    .catch(error => console.error("Error al obtener opiniones:", error));
}

let hotelSeleccionado = "";
let puntuacionSeleccionada = 0;

function mostrarPrecio(hotelNombre) {
    alert(`Para Opinar "${hotelNombre}", debes ser cliente.`);
}

function Opinar(habitacion) {
    hotelSeleccionado = habitacion;
    puntuacionSeleccionada = 0;

    // Asegura que el modal esté limpio antes de abrirlo
    resetearEstrellas();

    document.getElementById("modal-title").innerText = `Opinión sobre: ${habitacion}`;
    let modal = document.getElementById("modal-opinion");
    
    modal.style.display = "flex";
    modal.style.position = "fixed";
    modal.style.top = "50%";
    modal.style.left = "50%";
    modal.style.transform = "translate(-50%, -50%)";
    modal.style.background = "#ffffff";
    modal.style.padding = "20px";
    modal.style.borderRadius = "10px";
    modal.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.1)";
    modal.style.width = "40%";
    modal.style.textAlign = "center";
    modal.style.zIndex = "1000";

    document.getElementById("overlay").style.display = "block";

    // Asegurar que el botón de cierre (X) siempre esté presente
    let closeButton = document.getElementById("close-button");
    if (!closeButton) {
        closeButton = document.createElement("span");
        closeButton.innerHTML = "&times;";
        closeButton.id = "close-button";
        closeButton.style.position = "absolute";
        closeButton.style.top = "10px";
        closeButton.style.right = "15px";
        closeButton.style.fontSize = "20px";
        closeButton.style.cursor = "pointer";
        closeButton.onclick = cerrarModal;
        modal.appendChild(closeButton);
    }
}

// Función para cerrar el modal correctamente
function cerrarModal() {
    if (hotelSeleccionado && puntuacionSeleccionada > 0) {
        opiniones[hotelSeleccionado]++;
        actualizarOpiniones();
    }
    document.getElementById("modal-opinion").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}

// Agregar esta función para cerrar el modal después de calificar
function calificar(puntuacion) {
    puntuacionSeleccionada = puntuacion;
    let estrellas = document.querySelectorAll(".star");

    estrellas.forEach((star, index) => {
        if (index < puntuacion) {
            star.style.color = "gold";
        } else {
            star.style.color = "gray";
        }
    });

    // Cerrar el modal después de calificar (opcional, si quieres que se cierre automáticamente)
    setTimeout(cerrarModal, 1000); // Se cerrará después de 1 segundo
}

// Restablecer estrellas al abrir otro modal de opinión
function resetearEstrellas() {
    let estrellas = document.querySelectorAll(".star");
    estrellas.forEach(star => star.style.color = "gray");
}


function cerrarModal() {
    if (hotelSeleccionado && puntuacionSeleccionada > 0) {
        opiniones[hotelSeleccionado]++;
        actualizarOpiniones();
    }
    document.getElementById("modal-opinion").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}

function calificar(puntuacion) {
    puntuacionSeleccionada = puntuacion;
    let estrellas = document.querySelectorAll(".star");
    estrellas.forEach((star, index) => {
        if (index < puntuacion) {
            star.style.color = "gold";
        } else {
            star.style.color = "gray";
        }
    });
}

function resetearEstrellas() {
    let estrellas = document.querySelectorAll(".star");
    estrellas.forEach(star => star.style.color = "gray");
}

function actualizarOpiniones() {
    document.querySelectorAll(".hotel-card").forEach(card => {
        let titulo = card.querySelector("h2").innerText;
        let rating = card.querySelector(".rating");
        if (opiniones[titulo] !== undefined) {
            let estrellas = rating.innerText.split(" ")[0];
            rating.innerText = `${estrellas} ${opiniones[titulo]} opiniones`;
        }
    });
}

document.addEventListener("DOMContentLoaded", actualizarOpiniones);

// Mejorar el botón de cierre
let closeButton = document.createElement("span");
closeButton.innerHTML = "&times;";
closeButton.style.position = "absolute";
closeButton.style.top = "10px";
closeButton.style.right = "15px";
closeButton.style.fontSize = "20px";
closeButton.style.cursor = "pointer";
closeButton.onclick = cerrarModal;
document.getElementById("modal-opinion").appendChild(closeButton);
document.getElementById('modal-opinion').addEventListener('click', function(event) {
    if (event.target === this) {
        cerrarModal();
    }
});



