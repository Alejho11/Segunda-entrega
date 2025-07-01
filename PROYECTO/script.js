const cargos = ["Oftalmólogo", "Optómetra", "Enfermero jefe", "Auxiliar de enfermería","Instrumentador", "Anestesiólogo", "Médico general", "Digitador","Admisiones", "Administrativos", "Servicios generales", "Otros"];
const momentos = [ "Antes de tocar al paciente",
  "Antes de realizar una tarea aséptica",
  "Después de contacto con fluidos",
  "Después de contacto con el paciente",
  "Después de contacto con entorno del paciente"];
const productos = ["Jabón", "Alcohol", "Avagard"];
const tecnicas = ["Cumple", "No cumple"];

function poblarOpciones(selectId, opciones) {
  const select = document.getElementById(selectId);
  opciones.forEach(opcion => {
    const opt = document.createElement("option");
    opt.value = opcion;
    opt.textContent = opcion;
    select.appendChild(opt);
  });
}

function guardarEnStorage(registro) {
  const registros = JSON.parse(localStorage.getItem("lavados")) || [];
  registros.push(registro);
  localStorage.setItem("lavados", JSON.stringify(registros));
}

function mostrarResumen(registro) {
  const div = document.getElementById("resultado");
  div.innerHTML = `
    <h3>Registro Guardado</h3>
    <p><strong>Cargo:</strong> ${registro.cargo}</p>
    <p><strong>Momento:</strong> ${registro.momento}</p>
    <p><strong>Producto:</strong> ${registro.producto}</p>
    <p><strong>Técnica:</strong> ${registro.tecnica}</p>
    <p><strong>Resultado:</strong> ${registro.resultado}</p>
  `;
}

function evaluarTecnica(tecnica) {
  return tecnica === "Cumple" ? "Técnica correcta" : "Debe mejorar técnica";
}

document.addEventListener("DOMContentLoaded", () => {
  poblarOpciones("cargo", cargos);
  poblarOpciones("momento", momentos);
  poblarOpciones("producto", productos);
  poblarOpciones("tecnica", tecnicas);

  const form = document.getElementById("formRegistro");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const registro = {
      cargo: form.cargo.value,
      momento: form.momento.value,
      producto: form.producto.value,
      tecnica: form.tecnica.value,
      resultado: evaluarTecnica(form.tecnica.value)
    };

    guardarEnStorage(registro);
    mostrarResumen(registro);
    form.reset();
  });
});
function mostrarHistorial() {
  const registros = JSON.parse(localStorage.getItem("lavados")) || [];

  const historialPrevio = document.getElementById("historial");
  if (historialPrevio) historialPrevio.remove();

  const contenedor = document.createElement("section");
  contenedor.id = "historial";
  contenedor.className = "historial";
  contenedor.innerHTML = "<h3>Historial de registros con técnica correcta</h3>";

  const tecnicasBuenas = registros.filter(reg => reg.tecnica === "Cumple");

  if (tecnicasBuenas.length === 0) {
    contenedor.innerHTML += "<p>No hay registros válidos por ahora.</p>";
  } else {
    tecnicasBuenas.forEach((registro, i) => {
      const card = document.createElement("div");
      card.className = "registro-card";
      card.innerHTML = `
        <h4>#${i + 1} - ${registro.cargo}</h4>
        <p><strong>Momento:</strong> ${registro.momento}</p>
        <p><strong>Producto:</strong> ${registro.producto}</p>
        <p><strong>Técnica:</strong> ✅ ${registro.tecnica}</p>
        <p class="resultado">${registro.resultado}</p>
      `;
      contenedor.appendChild(card);
    });
  }

  document.body.appendChild(contenedor);
}

