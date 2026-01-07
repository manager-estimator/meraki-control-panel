# Mapa de Responsabilidades del Dato (Data Governance)

Este documento define **quién** entrega **qué**, **cuándo** y en **qué formato**. Es el contrato operativo del Meraki Control Panel.

---

## 1. Carolina (Finanzas & Administración)
**Rol:** Data Steward Financiero.
**Objetivo:** Imagen fiel de la salud económica.

| Dato Entregable | Formato / Fuente | Frecuencia | SLA (Límite) | Validación |
| :--- | :--- | :--- | :--- | :--- |
| **Extractos Bancarios** | Excel/CSV (Banco) | Semanal | Lunes 10:00 | Saldo Final debe cuadrar. |
| **Facturas Emitidas (AR)** | Export ERP (SQL) | Semanal | Viernes 18:00 | Total facturado > 0. |
| **Facturas Recibidas (AP)** | Export ERP (SQL) | Semanal | Viernes 18:00 | Debe incluir Gastos Estructura. |
| **Nóminas (Coste Empresa)** | Excel/PDF Resumen | Mensual | Día 5 mes sig. | Asignación a Obra vs Estructura. |

---

## 2. Alexis (Comercial / Client Manager)
**Rol:** Data Steward Comercial.
**Objetivo:** Previsión de ingresos fiable.

| Dato Entregable | Formato / Fuente | Frecuencia | SLA (Límite) | Validación |
| :--- | :--- | :--- | :--- | :--- |
| **Pipeline (Oportunidades)** | Asana / Excel | Semanal | Viernes 15:00 | Toda Op. debe tener Importe y %. |
| **Objetivos 2026** | Excel (Metas) | Anual/Trim | Inicio Q | - |

---

## 3. Jessica (Jefa de Obras / Dirección Técnica)
**Rol:** Data Steward Producción.
**Objetivo:** Control de tiempos y realidad física vs financiera.

| Dato Entregable | Formato / Fuente | Frecuencia | SLA (Límite) | Validación |
| :--- | :--- | :--- | :--- | :--- |
| **Cronograma Maestro** | MS Project / PDF | Semanal | Viernes 15:00 | Hitos actualizados. |
| **Avance Físico (%)** | Excel / ERP | Semanal | Viernes 15:00 | Certificación no puede superar 100%. |
| **Incidencias Críticas** | Asana / Bitácora | Real Time | Inmediato | Clasificadas por Impacto (Alto/Medio). |

---

## 4. Nicolás (Estudios / Presupuestos)
**Rol:** Data Steward Costes.
**Objetivo:** Defensa del margen teórico.

| Dato Entregable | Formato / Fuente | Frecuencia | SLA (Límite) | Validación |
| :--- | :--- | :--- | :--- | :--- |
| **Presupuesto "Madre"** | Presto / Excel (Partidas) | Inicio Obra | Antes de inicio | Suma total debe coincidir con contrato. |
| **Comparativos Compras** | Excel Comparativo | Por pedido | Pre-contratación | Mínimo 3 proveedores comparados. |

---

## 5. Tony (Ejecución / Encargado)
**Rol:** Data Producer (Campo).
**Objetivo:** Evidencia física en tiempo real (reducir burocracia).

| Dato Entregable | Formato / Fuente | Frecuencia | SLA (Límite) | Validación |
| :--- | :--- | :--- | :--- | :--- |
| **Partes de Trabajo** | App Móvil / Form | Diario | 20:00 | Foto obligatoria. |
| **Recepción Materiales** | App Móvil (Foto Albarán) | Real Time | Inmediato | Foto legible. |
| **Reporte Diario** | Nota de Voz / Texto | Diario | 20:00 | - |

---

## 6. Pablo (Dirección)
**Rol:** Data Consumer & Ruler.
**Objetivo:** Definición de estrategia y alertas.

| Responsabilidad | Frecuencia | Acción |
| :--- | :--- | :--- |
| **Revisión de Alertas** | Mensual | Ajustar umbrales (ej: bajar límite caja). |
| **Revisión de Calidad** | Mensual | Feedback a Data Stewards si faltan datos. |
