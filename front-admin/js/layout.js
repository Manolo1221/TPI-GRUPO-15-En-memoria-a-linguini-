// Sidebar provisorio. Cuando Santi pase su layout, se reemplaza este archivo.
// Uso: <div id="sidebar"></div> y después renderSidebar("pedidos")

function renderSidebar(activo) {
  const items = [
    { id: "dashboard", texto: "Dashboard", href: "dashboard.html" },
    { id: "pedidos",   texto: "Pedidos",   href: "pedidos.html" },
    { id: "facturas",  texto: "Facturas",  href: "facturas.html" }
  ];

  const links = items.map(i => {
    const esActivo = i.id === activo;
    const clases = esActivo
      ? "bg-blue-700 text-white"
      : "text-slate-300 hover:bg-slate-800 hover:text-white";
    return `<a href="${i.href}" class="block rounded-md px-3 py-2 text-sm font-medium ${clases}"
              ${esActivo ? 'aria-current="page"' : ""}>${i.texto}</a>`;
  }).join("");

  document.getElementById("sidebar").innerHTML = `
    <div class="flex h-full flex-col gap-6 bg-slate-900 p-4">
      <div class="px-3 pt-2">
        <p class="text-base font-semibold text-white">Autopartes G15</p>
        <p class="text-xs text-slate-400">Panel de administración</p>
      </div>
      <nav class="flex flex-col gap-1 md:flex-1">${links}</nav>
    </div>`;
}
