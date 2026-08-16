# 🍕 Gestión de Mesas · SPINZI GROUP (PWA)

Sexta app del estudio y **primera app gastronómica**: un POS de salón completo para
**restaurantes, bares y pizzerías**, construido con el skill `gestion-gastronomica-pro`
(patrón PWA del estudio: offline, instalable, dark theme, botones touch, identidad oficial).

## Qué hace (módulos gastronómicos)

| Módulo | Qué hace |
|---|---|
| 🪑 **SALÓN** | Mapa de mesas con estados por color: **libre** (borde esmeralda), **ocupada** (ámbar), **por cobrar** (rojo). Agregar/quitar mesas. Total en vivo por mesa. |
| 📖 **CARTA** | Menú con rubros (Pizzas, Lomos, Bebidas...), emoji + precio en cada tarjeta, **stock por item** (agotado se bloquea), alta de items nuevos. |
| 🧾 **COMANDA** | Tocás la mesa → tocás los items → la comanda se arma con cantidades (+/−), subtotal, **servicio 10%** y total. Enviar a cocina. |
| 👨‍🍳 **COCINA (KDS)** | Pedidos entrantes en tiempo real: **MARCAR LISTO** → **SERVIR** (la mesa pasa a "por cobrar"). |
| 💰 **COBRAR** | Cuenta formateada (items + servicio + total redondeado) lista para **enviar por WhatsApp** o confirmar cobro → la mesa vuelve a libre. |
| 💵 **CAJA** | Ventas del día, cantidad de cuentas, ticket promedio, listado y **resumen por WhatsApp** + reset del día. |

Todo se guarda solo en el equipo (localStorage): mesas, pedidos, carta, ventas.

## Archivos
| Archivo | Qué es |
|---|---|
| `index.html` | La app completa (POS gastronómico) |
| `manifest.webmanifest` + `sw.js` | PWA instalable y offline |
| `icon-identidad-192/512.png`, `favicon-identidad.png` | Identidad oficial |

## Cómo usarla (demo 2 minutos)
1. Doble clic en `index.html`.
2. **SALÓN**: tocá una mesa libre → se abre la comanda.
3. **CARTA** (pestaña): tocá "Pizza muzzarella", "Coca-Cola 1.5L"... → van al pedido.
4. **👨‍🍳 ENVIAR A COCINA** → pasá a la pestaña COCINA → **MARCAR LISTO** → **SERVIR**.
5. Volvé al salón: la mesa está en rojo (por cobrar) → **💰 COBRAR CUENTA** → confirmá.
6. **CAJA**: mirá las ventas del día y enviá el resumen por WhatsApp.
7. Instalala: menú → «Instalar aplicación» (ideal en la tablet del salón 📱).

## Personalizar para un negocio real
- Cargá tus items reales en **CARTA** (con precios, emojis y stock).
- Cambiá el % de servicio: `localStorage.setItem('servicioSpinzi','10')` en la consola.
- Cantidad de mesas: botones ➕/➖ en SALÓN.
- Enviá la cuenta/resumen por WhatsApp con el botón verde (wa.me con texto precargado).

## Publicar
Ver `apps/PUBLICAR_APPS.md` → subir a `apps/gestion-mesas/` en el repo.
