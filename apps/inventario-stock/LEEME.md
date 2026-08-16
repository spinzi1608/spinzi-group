# 📦 Inventario de Stock · SPINZI GROUP (PWA)

Quinta app del estudio (después de Calculadora de Precios, Listado de Precios,
Cuotas Pendientes y Presupuesto Express): **controla tu stock, detectá qué reponer
y pedilo por WhatsApp en un toque**. Misma identidad y misma plantilla PWA
(offline, instalable, claro/oscuro).

## Qué hace
- Cargás **producto + rubro + stock + mínimo + costo + precio** → queda en la lista con
  semáforo de nivel: 🟢 OK · 🟡 bajo · 🔴 ¡Reponer! (basado en el mínimo que definiste).
- **+ / −** por producto para registrar entradas (compras) y salidas (ventas) al toque.
- Panel de resumen: **valor del inventario** (stock × costo), unidades totales y
  cantidad de productos con stock bajo.
- **🔍 Buscador + filtro por rubro**.
- **📱 PEDIDO DE REPOSICIÓN**: arma el mensaje de WhatsApp con todos los productos en
  rojo (actual → reponer a mínimo×3, con cantidad a pedir) listo para copiar o enviar.
- **📋 COPIAR RESUMEN**: resumen del stock completo para compartir.
- **💾 EXPORTAR / 📥 IMPORTAR**: respaldo y restauración del inventario en JSON.
- Todo se guarda solo en el equipo (localStorage).

## Archivos
| Archivo | Qué es |
|---|---|
| `index.html` | La app completa |
| `manifest.webmanifest` + `sw.js` | PWA instalable y offline |
| `icon-identidad-192/512.png`, `favicon-identidad.png` | Identidad oficial |

## Cómo usarla
1. Doble clic en `index.html`.
2. Producto: "Martillo 20 oz" · Rubro "Herramientas" · Mínimo 5 · Stock 20 · Costo 8500 · Venta 13500 → **AGREGAR**.
3. Bajá el stock con **−** hasta pasar el mínimo → se pone en rojo y aparece en el
   **PEDIDO DE REPOSICIÓN**.
4. Tocá **📱 PEDIDO** para armar el mensaje de reposición (copiar o enviar por WhatsApp).
5. Exportá el inventario periódicamente (💾) como respaldo.
6. Instalala: menú → «Instalar aplicación» (o Compartir → Agregar a pantalla de inicio).

## Publicar
Ver `apps/PUBLICAR_APPS.md` → subir a `apps/inventario-stock/` en el repo.
