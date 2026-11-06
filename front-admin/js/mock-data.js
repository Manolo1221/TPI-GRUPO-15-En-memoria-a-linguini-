// DATOS DE PRUEBA (mock). Los nombres de campos son provisorios:
// cuando llegue el CONTRATO.md se ajustan acá y en las pantallas.

const PEDIDOS_MOCK = [
  { idPedido: 1001, cliente: "Carlos Benítez",   fecha: "2026-11-02", estado: "Pendiente", total: 184500 },
  { idPedido: 1002, cliente: "Lucía Fernández",  fecha: "2026-11-02", estado: "Facturado", total: 96200 },
  { idPedido: 1003, cliente: "Taller Los Pinos", fecha: "2026-11-03", estado: "Pendiente", total: 452300 },
  { idPedido: 1004, cliente: "Martín Sosa",      fecha: "2026-11-03", estado: "Pendiente", total: 38900 },
  { idPedido: 1005, cliente: "Gomería Central",  fecha: "2026-11-04", estado: "Facturado", total: 271000 },
  { idPedido: 1006, cliente: "Valeria Ríos",     fecha: "2026-11-05", estado: "Pendiente", total: 127650 },
  { idPedido: 1007, cliente: "Autos del Sur",    fecha: "2026-11-05", estado: "Facturado", total: 530800 },
  { idPedido: 1008, cliente: "Diego Paz",        fecha: "2026-11-06", estado: "Pendiente", total: 64300 }
];

// Líneas de cada pedido (lo que el cliente puso en el carrito).
// La suma de cantidad x precioUnitario da el total del pedido.
const DETALLES_MOCK = {
  1001: [
    { autoparte: "Pastillas de freno delanteras", marca: "Bosch",   cantidad: 2, precioUnitario: 42500 },
    { autoparte: "Filtro de aceite",              marca: "Mann",    cantidad: 3, precioUnitario: 8500 },
    { autoparte: "Amortiguador trasero",          marca: "Monroe",  cantidad: 1, precioUnitario: 74000 }
  ],
  1002: [
    { autoparte: "Batería 12V 65Ah",              marca: "Moura",   cantidad: 1, precioUnitario: 96200 }
  ],
  1003: [
    { autoparte: "Kit de embrague",               marca: "Sachs",   cantidad: 1, precioUnitario: 312300 },
    { autoparte: "Correa de distribución",        marca: "Gates",   cantidad: 2, precioUnitario: 70000 }
  ],
  1004: [
    { autoparte: "Bujía",                         marca: "NGK",     cantidad: 4, precioUnitario: 6500 },
    { autoparte: "Filtro de aire",                marca: "Fram",    cantidad: 1, precioUnitario: 12900 }
  ],
  1005: [
    { autoparte: "Disco de freno",                marca: "Fremax",  cantidad: 2, precioUnitario: 58000 },
    { autoparte: "Pastillas de freno delanteras", marca: "Bosch",   cantidad: 2, precioUnitario: 42500 },
    { autoparte: "Aceite sintético 5W30 (1 L)",   marca: "Total",   cantidad: 5, precioUnitario: 14000 }
  ],
  1006: [
    { autoparte: "Faro delantero",                marca: "Valeo",   cantidad: 1, precioUnitario: 98650 },
    { autoparte: "Lámpara H7",                    marca: "Philips", cantidad: 2, precioUnitario: 14500 }
  ],
  1007: [
    { autoparte: "Radiador",                      marca: "Valeo",   cantidad: 1, precioUnitario: 215800 },
    { autoparte: "Bomba de agua",                 marca: "SKF",     cantidad: 2, precioUnitario: 45000 },
    { autoparte: "Kit de embrague",               marca: "Luk",     cantidad: 1, precioUnitario: 225000 }
  ],
  1008: [
    { autoparte: "Filtro de combustible",         marca: "Mann",    cantidad: 2, precioUnitario: 11150 },
    { autoparte: "Escobillas limpiaparabrisas",   marca: "Bosch",   cantidad: 2, precioUnitario: 21000 }
  ]
};

// ---------------------------------------------------------------
// Funciones que usan las pantallas. Cuando exista la API, SOLO se
// cambia el cuerpo de cada una por un apiFetch (el helper de Santi).
// ---------------------------------------------------------------

async function obtenerPedidos() {
  // Futuro: return await apiFetch("/api/pedidos");
  return PEDIDOS_MOCK;
}

// Devuelve el pedido con sus líneas, o null si no existe
async function obtenerPedidoPorId(id) {
  // Futuro: return await apiFetch(`/api/pedidos/${id}`);
  const pedido = PEDIDOS_MOCK.find(p => p.idPedido === Number(id));
  if (!pedido) return null;
  return { ...pedido, detalles: DETALLES_MOCK[pedido.idPedido] || [] };
}

// Factura el pedido. En la API real, esto lo hace el back en una
// transacción (crea factura, copia detalles, descuenta stock).
async function facturarPedido(id) {
  // Futuro: return await apiFetch(`/api/pedidos/${id}/facturar`, { method: "POST" });
  const pedido = PEDIDOS_MOCK.find(p => p.idPedido === Number(id));
  if (!pedido) throw new Error("El pedido no existe.");
  if (pedido.estado === "Facturado") throw new Error("Este pedido ya fue facturado.");
  pedido.estado = "Facturado";
  return { idFactura: 5000 + pedido.idPedido };
}

// ---------------------------------------------------------------
// FACTURAS (mock). Una factura sale de un pedido facturado: copia
// las líneas del pedido. Campos provisorios, igual que arriba.
// ---------------------------------------------------------------

const FACTURAS_MOCK = [
  { idFactura: 5002, idPedido: 1002, cliente: "Lucía Fernández", fecha: "2026-11-03", total: 96200 },
  { idFactura: 5005, idPedido: 1005, cliente: "Gomería Central", fecha: "2026-11-05", total: 271000 },
  { idFactura: 5007, idPedido: 1007, cliente: "Autos del Sur",   fecha: "2026-11-06", total: 530800 }
];

async function obtenerFacturas() {
  // Futuro: return await apiFetch("/api/facturas");
  return FACTURAS_MOCK;
}

// Devuelve la factura con sus líneas, o null si no existe
async function obtenerFacturaPorId(id) {
  // Futuro: return await apiFetch(`/api/facturas/${id}`);
  const factura = FACTURAS_MOCK.find(f => f.idFactura === Number(id));
  if (!factura) return null;
  return { ...factura, detalles: DETALLES_MOCK[factura.idPedido] || [] };
}
