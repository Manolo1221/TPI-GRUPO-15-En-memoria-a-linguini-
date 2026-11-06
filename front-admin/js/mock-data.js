// DATOS DE PRUEBA (mock). Los nombres de campos son provisorios:
// cuando llegue el CONTRATO.md se ajustan acá y en las pantallas.

const PEDIDOS_MOCK = [
  { idPedido: 1001, cliente: "Nestor kirchner",   fecha: "2026-11-02", estado: "Pendiente", total: 184500 },
  { idPedido: 1002, cliente: "Danirep",  fecha: "2026-11-02", estado: "Facturado", total: 96200 },
  { idPedido: 1003, cliente: "Wanchope Abila", fecha: "2026-11-03", estado: "Pendiente", total: 452300 },
  { idPedido: 1004, cliente: "Martin cirio",      fecha: "2026-11-03", estado: "Pendiente", total: 38900 },
  { idPedido: 1005, cliente: "Jeffrey Epstein",  fecha: "2026-11-04", estado: "Facturado", total: 271000 },
  { idPedido: 1006, cliente: "Roger-Botta lenceria",     fecha: "2026-11-05", estado: "Pendiente", total: 127650 },
  { idPedido: 1007, cliente: "ElFaraon Love Shady",    fecha: "2026-11-05", estado: "Facturado", total: 530800 },
  { idPedido: 1008, cliente: "Nico Paz",        fecha: "2026-11-06", estado: "Pendiente", total: 64300 }
];

// Cuando exista la API, SOLO se cambia el cuerpo de estas funciones
// por un apiFetch (el helper que arma Santi en auth.js).
async function obtenerPedidos() {
  // Futuro: return await apiFetch("/api/pedidos");
  return PEDIDOS_MOCK;
}
