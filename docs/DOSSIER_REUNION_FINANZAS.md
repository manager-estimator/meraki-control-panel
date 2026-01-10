# 📂 DOSSIER EJECUTIVO: Estrategia de Datos Financieros
**Para:** Reunión Técnica con Carolina (Finanzas)
**Objetivo:** Definir el estándar de intercambio de datos para el *Meraki Control Panel*.

---

## 1. El Objetivo (El "Por Qué")
No queremos cambiar la forma de trabajar de Administración.
Queremos crear un **"Cable Digital"** para que los datos fluyan automáticamente desde el Banco y el ERP hacia un Dashboard de Dirección, eliminando el reporte manual.

**Lo que conseguiremos:**
*   Vision de Caja Real en tiempo real (Caja + Deuda + Impuestos).
*   Semáforo de Rentabilidad por Obra Automático.
*   Conciliación Bancaria asistida.

---

## 2. Plan de Acción Semanal (Lo que necesitamos)
Carolina subirá estos archivos a Dropbox cada **Viernes (o Lunes)**. Son exportaciones directas, sin maquillar.

### A. TESORERÍA (Control de Caja)
*   **Archivo 1:** `TESORERIA_Vencimientos.xlsx`
    *   *Qué es:* El informe estándar de Vencimientos de SQL Obras.
    *   *Para qué:* Calcular el Cash Flow futuro (cobros y pagos pendientes).
*   **Archivo 2:** `FINANZAS_PoolBancario.xlsx` (Solo cambios)
    *   *Qué es:* Saldo actual de cuentas y límite disponible de pólizas.
    *   *Para qué:* Saber cuánto oxígeno tenemos hoy.

### B. RENTABILIDAD (Control de Obras)
*   **Archivo 3:** `OBRAS_AnalisisCapitulos.xlsx`
    *   *Qué es:* Informe "Análisis Económico" (Nivel Capítulos).
    *   *Para qué:* Ver si una obra pierde dinero sin tener que mirar facturas sueltas.

---

## 3. El "Dinero Invisible" (Pagos Fijos)
El ERP suele controlar facturas, pero no lo que se debita directo. Necesitamos un **Excel Maestro de Fijos** (`FINANZAS_PagosFijos.xlsx`) con 3 pestañas:

1.  **IMPUESTOS**: Calendario de salidas de caja (IVA, IRPF, Sociedades).
2.  **DEUDA**: Cuadro de amortización de Préstamos/Leasing (Cuota mensual + fecha).
3.  **NÓMINAS**: Total coste empresa mensual (o desglosado si es variable).

---

## 4. Guía Técnica de Columnas (Para Configurar ERP)
Si preguntan *"¿Qué columnas saco?"*, aquí está la respuesta:

**Para Facturas / Vencimientos:**
*   `Fecha Vencimiento` (CRÍTICO)
*   `Pagador/Cliente` o `Proveedor`
*   `Importe`
*   `Pendiente de Cobro/Pago`
*   `Código de Obra` (Si está disponible)

**Para Análisis Económico:**
*   `Obra / Proyecto`
*   `Capítulo`
*   `Coste Previsto` (Presupuesto)
*   `Coste Producido` (Real)
*   `% Desviación`

---

## 5. Patrimonio (Opcional / Mensual)
Para ver la foto completa de la riqueza de la empresa:
*   **Archivo:** `FINANZAS_Inversiones.xlsx`
*   *Contenido:* Fondos, Plazos Fijos, Huchas. (Saldo, Rentabilidad y Disponibilidad).
