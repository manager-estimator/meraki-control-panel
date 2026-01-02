# Especificación de Datos: Módulo Financiero
**Destinatario:** Carolina (Administración/Finanzas)
**Objetivo:** Estandarizar los ficheros Excel para la carga automática en el Meraki Control Panel.

---

## 🏗️ Instrucciones Generales
1. **Formato**: Excel (`.xlsx`) o CSV.
2. **Ubicación**: Guardar en carpeta Dropbox `Meraki/00_Data_Inputs/Finanzas`.
3. **Frecuencia**: Actualizar semanalmente (ej: viernes cierre).
4. **Nombres de archivo**:
   - `Maestro_Cuentas.xlsx` (Solo al inicio o cambios)
   - `Facturas_Emitidas_2024.xlsx` (Acumulado anual)
   - `Facturas_Recibidas_2024.xlsx` (Acumulado anual)

---

## 1. Archivo: Facturas Emitidas (Clientes)
**Nombre:** `invoices_ar`
**Fuente sugerida:** SQL Obras (Ventas > Facturas)

| Columna Excel (Cabecera) | Descripción | Ejemplo | Obligatorio |
| :--- | :--- | :--- | :---: |
| **Nº Factura** | Código único de la factura | `F-2024/001` | SÍ |
| **Fecha Emisión** | Fecha de la factura | `01/01/2026` | SÍ |
| **Cliente** | Razón Social del cliente | `Inversiones Norte SL` | SÍ |
| **Obra / Proyecto** | Nombre o Código de la obra (Crucial para rentabilidad) | `Residencial Meraki I` | SÍ |
| **Base Imponible** | Importe antes de impuestos | `10000,00` | SÍ |
| **Total Factura** | Importe cobrar | `12100,00` | SÍ |
| **Estado Cobro** | Situación actual | `Cobrada`, `Pdte`, `Vencida` | SÍ |
| **Fecha Vencimiento** | Cuándo debería cobrarse | `30/01/2026` | NO |

---

## 2. Archivo: Facturas Recibidas (Proveedores/Gastos)
**Nombre:** `invoices_ap`
**Fuente sugerida:** SQL Obras (Compras > Facturas Recibidas)

| Columna Excel (Cabecera) | Descripción | Ejemplo | Obligatorio |
| :--- | :--- | :--- | :---: |
| **Nº Factura Prov** | Número de factura del proveedor | `B-99881` | SÍ |
| **Fecha Emisión** | Fecha del documento | `15/01/2026` | SÍ |
| **Proveedor** | Razón Social | `Materiales Construcción SA` | SÍ |
| **Obra / Proyecto** | A qué obra se imputa el gasto (o "Estructura" si es gasto fijo) | `Residencial Meraki I` | SÍ |
| **Concepto / Partida** | Naturaleza del gasto (Materiales, Subcontrata, Nómina...) | `Materiales` | SÍ |
| **Base Imponible** | Coste real sin IVA | `500,00` | SÍ |
| **Total a Pagar** | Total con IVA | `605,00` | SÍ |
| **Estado Pago** | Situación actual | `Pagada`, `Pdte` | SÍ |
| **Fecha Pago** | Cuándo se pagó (si aplica) | `20/01/2026` | NO |

---

## 3. Archivo: Maestro de Cuentas (Inicialización)
**Nombre:** `accounts`
**Fuente sugerida:** Manual (Excel simple)

| Columna Excel | Descripción | Ejemplo |
| :--- | :--- | :--- |
| **Alias** | Nombre interno para identificarla | `Santander Principal` |
| **Banco** | Entidad | `Santander` |
| **IBAN** | Últimos 4 dígitos (para identificar) | `...8993` |
| **Saldo Inicial** | Saldo de arranque (a fecha 1 Enero) | `15400,00` |

---

## 💡 Notas para TI (ERP)
* Si SQL Obras exporta columnas extra no pasa nada, N8N las ignorará. Lo importante es que **no falten** las marcadas como "Obligatorio".
* El campo **"Obra / Proyecto"** es el pegamento de todo el sistema. Debe escribirse siempre igual (ej: no usar "Obra A" un día y "Proy. A" otro).
