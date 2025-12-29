// ===============================
// app.js - Buscador de Partituras
// Versión PRO (normaliza texto)
// ===============================

let partituras = [];

// Cargar datos desde data.json
fetch("data.json")
  .then(r => r.json())
  .then(d => {
    partituras = d;
    mostrar(d);
    actualizarContador(d.length);
  })
  .catch(err => {
    console.error("Error al cargar partituras:", err);
    const contador = document.getElementById("contador");
    if (contador) {
      contador.textContent = "Error al cargar partituras";
    }
  });

// Normaliza texto: quita tildes, mayúsculas, etc.
function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 ]/g, " ");
}

// Muestra la lista de partituras
function mostrar(datos) {
  const ul = document.getElementById("lista");

  if (!ul) return;

  if (datos.length === 0) {
    ul.innerHTML = `
      <div class="sin-resultados">
        <div class="sin-resultados-icon">🎼</div>
        <h3>No se encontraron partituras</h3>
        <p>Intenta con otro término de búsqueda</p>
      </div>
    `;
    return;
  }

  ul.innerHTML = "";

  datos.forEach(p => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="partitura-nombre">${p.nombre}</span>
      <a href="${p.url}" target="_blank" class="btn-descargar">
        📥 Ver / Descargar
      </a>
    `;
    ul.appendChild(li);
  });
}

// Actualiza el contador de resultados
function actualizarContador(cantidad) {
  const contador = document.getElementById("contador");
  if (!contador) return;

  if (cantidad === 0) {
    contador.textContent = "No hay partituras disponibles";
  } else if (cantidad === 1) {
    contador.textContent = "1 partitura encontrada";
  } else {
    contador.textContent = `${cantidad} partituras encontradas`;
  }
}

// Evento de búsqueda
document.getElementById("buscar").addEventListener("input", e => {
  const texto = normalizar(e.target.value);

  const palabras = texto.split(" ").filter(p => p !== "");

  const filtrado = partituras.filter(p => {
    const nombre = normalizar(p.nombre);
    return palabras.every(palabra => nombre.includes(palabra));
  });
  

  mostrar(filtrado);
  actualizarContador(filtrado.length);
});
