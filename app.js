let partituras = [];

fetch("data.json")
  .then(r => r.json())
  .then(d => {
    partituras = d;
    mostrar(d);
    actualizarContador(d.length);
  })
  .catch(err => {
    console.error("Error al cargar partituras:", err);
    document.getElementById("contador").textContent =
      "Error al cargar partituras";
  });

function mostrar(datos) {
  const ul = document.getElementById("lista");

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

function actualizarContador(cantidad) {
  const contador = document.getElementById("contador");

  if (cantidad === 0) {
    contador.textContent = "No hay partituras disponibles";
  } else if (cantidad === 1) {
    contador.textContent = "1 partitura encontrada";
  } else {
    contador.textContent = `${cantidad} partituras encontradas`;
  }
}

document.getElementById("buscar").addEventListener("input", e => {
  const texto = e.target.value.toLowerCase();
  const filtrado = partituras.filter(p =>
    p.nombre.toLowerCase().includes(texto)
  );
  mostrar(filtrado);
  actualizarContador(filtrado.length);
});
