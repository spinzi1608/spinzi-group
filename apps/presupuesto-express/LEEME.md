# 🧾 Presupuesto Express · SPINZI GROUP (PWA)

Cuarta app del estudio: **armá presupuestos profesionales en 1 minuto y enviálos por
WhatsApp** (o exportalos a PDF). Misma identidad y misma plantilla PWA
(offline, instalable, claro/oscuro) que las apps anteriores.

## Qué hace
- Cargás **cliente + WhatsApp + líneas de producto/servicio** (descripción, cantidad, precio).
- Aplicás **descuento %** y **IVA 21%** automático, con **redondeo "lindo"** opcional del total.
- **📄 GENERAR**: crea el documento con número (SP-25-001), fecha, validez en días e historial guardado.
- **📱 ENVIAR POR WHATSAPP**: abre wa.me con el presupuesto armado en texto.
- **🖨️ PDF / IMPRIMIR**: versión impresa profesional del documento (Guardar como PDF).
- **📋 COPIAR TEXTO**: copiá el presupuesto para pegarlo donde quieras.
- **🗂️ HISTORIAL**: todos los presupuestos quedan guardados en el equipo (localStorage).

## Archivos
| Archivo | Qué es |
|---|---|
| `index.html` | La app completa |
| `manifest.webmanifest` + `sw.js` | PWA instalable y offline |
| `icon-identidad-192/512.png`, `favicon-identidad.png` | Identidad oficial |

## Cómo usarla
1. Doble clic en `index.html` (o abrí la URL publicada).
2. Cliente: "Ferretería Don Juan" · WhatsApp "54911..."
3. Línea: "Mantenimiento mensual" · Cant. 1 · Precio 45000 → **＋ AGREGAR LÍNEA** si querés más.
4. Descuento 10% · Validez 15 días → **📄 GENERAR PRESUPUESTO**.
5. **📱 ENVIAR** (abre el chat) · **🖨️ PDF** (Guardar como PDF) · se guarda solo en el Historial.
6. Instalala: menú → «Instalar aplicación» (o Compartir → Agregar a pantalla de inicio).

## Publicar
Ver `apps/PUBLICAR_APPS.md` → subir a `apps/presupuesto-express/` en el repo.
