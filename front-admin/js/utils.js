// Funciones que usan TODAS las pantallas del admin.
// Así no las copiamos en cada página.

const formatoPlata = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0
});

// "2026-11-02" -> "2/11/2026"
function formatoFecha(fecha) {
  return new Date(fecha + "T00:00:00").toLocaleDateString("es-AR");
}

// Evita que un texto con < o > rompa el HTML (importante con datos reales de la API)
function esc(texto) {
  return String(texto).replace(/[&<>"']/g, c => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));
}

// Etiqueta de color según el estado del pedido
function badge(estado) {
  const clases = estado === "Facturado"
    ? "bg-emerald-100 text-emerald-800"
    : "bg-amber-100 text-amber-800";
  return `<span class="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${clases}">${esc(estado)}</span>`;
}
