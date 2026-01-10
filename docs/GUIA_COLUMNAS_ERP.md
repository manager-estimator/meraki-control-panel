# GUÍA RÁPIDA: Columnas Clave para Exportar (SQL Obras)
**Uso:** Configurar los listados en el ERP. Solo necesitamos estas columnas.

---

### 1. FACTURAS EMITIDAS (Ingresos)
*Lo usamos para:* Saber cuánto facturamos por obra y previsión de cobros.
**Columnas Obligatorias:**
1.  **Nº Factura** (ID)
2.  **Fecha Emisión** (Para la contabilidad)
3.  **Cliente/Razón Social**
4.  **CÓDIGO OBRA** (¡Vital! Sin esto no sabemos qué obra gana dinero)
5.  **Base Imponible** (Neto sin IVA - Para rentabilidad)
6.  **Total Factura** (Con IVA - Para Flujo de Caja)
7.  **Fecha Vencimiento** (¿Cuándo esperamos cobrar?)

---

### 2. FACTURAS RECIBIDAS (Gastos)
*Lo usamos para:* Control de costes de obra y pagos a proveedores.
**Columnas Obligatorias:**
1.  **Nº Factura Proveedor**
2.  **Fecha Emisión**
3.  **Proveedor**
4.  **CÓDIGO OBRA** (¡Vital!)
5.  **PARTIDA / FAMILIA** (Ej: "Materiales", "Hormigón", "Subcontrata"). *Si no se puede sacar, al menos que venga separado por Obra.*
6.  **Base Imponible** (Coste real)
7.  **Total Factura** (Salida de Caja)
8.  **Fecha Vencimiento** (¿Cuándo tenemos que pagar?)

---

### 3. DINERO INVISIBLE (Deuda + Estructura)
*Lo usamos para:* Que la caja no descuadre. (Suele ser un Excel manual, no salir del ERP).
**Datos necesarios:**
*   **Nombre/Concepto**: "Préstamo ICO", "Leasing Furgoneta", "Alquiler".
*   **Día de Pago**: "Día 5 de cada mes".
*   **Importe Cuota**: "450.50 €".
*   *(Opcional refinado)*: Cuánto es Capital vs Intereses.

---

### 4. PERSONAL (Nóminas)
*Lo usamos para:* Imputar el coste de la gente a las obras o a la estructura.
**Columnas Obligatorias:**
1.  **Mes / Año**
2.  **Nombre Empleado**
3.  **OBRA ASIGNADA** (Si un empleado está 100% en una obra, indicarlo).
4.  **COSTE EMPRESA** (¡Ojo! No queremos el neto a pagar, queremos: Bruto + Seguros Sociales a cargo empresa).

---

### ❓ ¿Cobros/Pagos vs Facturas?
**Prioridad:** Empecemos con **Listado de Facturas (con Fecha Vencimiento)**.
*   *Por qué:* Es más fiable para empezar. Vemos lo que "se vendió".
*   *Cash Flow:* Cruzaremos la "Fecha Vencimiento" con el Banco real. Si el ERP tiene un módulo "Cartera de Cobros/Pagos" fiable, también nos vale, pero suele estar desactualizado en muchas pymes. **Las Facturas son la ley.**
