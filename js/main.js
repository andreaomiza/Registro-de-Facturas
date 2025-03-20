import { facturas } from "./factura.js";

const tablaFacturas = document.querySelector("#tablaFacturas");
const modal = document.getElementById("modal");
const btnCerrarModal = document.querySelector(".close");
const btnAbrirModal = document.getElementById("addContactBtn");
const formFactura = document.getElementById("contactForm");

// Función para renderizar facturas
function renderizarFacturas(lista = facturas) {
  tablaFacturas.innerHTML = ""; // Limpiar tabla antes de actualizar

  lista.forEach((factura) => {
    const tr = document.createElement("tr");
    tr.classList.add("border-b");

    let colorClase =
      factura.estado === "pendiente"
        ? "text-yellow-600 font-semibold"
        : "text-green-600 font-semibold";

    tr.innerHTML = `
      <td class="border p-2">${factura.id}</td>
      <td class="border p-2">${factura.numeroFactura}</td>
      <td class="border p-2">${factura.descripcion}</td>
      <td class="border p-2 ${colorClase}">${factura.estado}</td>
      <td class="border p-2">${factura.fecha}</td>
      <td class="border p-2">
        <button class="delete bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700" data-id="${factura.id}">Eliminar</button>
      </td>
    `;

    tablaFacturas.appendChild(tr);
  });
}

// Función para eliminar factura
function eliminarFactura(id) {
  const index = facturas.findIndex((factura) => factura.id === id);
  if (index !== -1) {
    facturas.splice(index, 1);
    renderizarFacturas(); // Actualizar tabla
  }
}

// Delegación de eventos para el botón "Eliminar"
tablaFacturas.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete")) {
    const id = parseInt(event.target.getAttribute("data-id"));
    eliminarFactura(id);
  }
});

// Filtros
document
  .getElementById("todos")
  .addEventListener("click", () => renderizarFacturas());
document.getElementById("pendientes").addEventListener("click", () => {
  const pendientes = facturas.filter(
    (factura) => factura.estado === "pendiente"
  );
  renderizarFacturas(pendientes);
});
document.getElementById("pagada").addEventListener("click", () => {
  const pagadas = facturas.filter((factura) => factura.estado === "pagada");
  renderizarFacturas(pagadas);
});

// Modal: Abrir y cerrar
//  Modal: Abrir y cerrar
btnAbrirModal.addEventListener("click", () => (modal.style.display = "block"));
btnCerrarModal.addEventListener("click", () => (modal.style.display = "none"));

// Agregar nueva factura
formFactura.addEventListener("submit", (e) => {
  e.preventDefault();

  const nuevaFactura = {
    id: facturas.length + 1,
    numeroFactura: document.getElementById("factura").value,
    descripcion: document.getElementById("descripcion").value,
    estado: document.getElementById("estado").value.toLowerCase(),
    fecha: document.getElementById("fecha").value,
  };

  facturas.push(nuevaFactura);
  renderizarFacturas();
  modal.classList.add("hidden");
  formFactura.reset();
});

// Cargar todas las facturas al inicio
document.addEventListener("DOMContentLoaded", renderizarFacturas);
