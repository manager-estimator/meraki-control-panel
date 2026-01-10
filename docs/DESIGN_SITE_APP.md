# Diseño Técnico: Meraki Site App (Gestión de Partes de Trabajo)

**Objetivo:** Digitalizar la entrada de datos desde obra (Tony Montesdeoca) para eliminar el caos de WhatsApp y automatizar la imputación de costes en el ERP.

---

## 1. El Flujo de Trabajo (Workflow)

### A. En Obra (Móvil - Tony)
1.  **Login simplificado** (Email/Pin).
2.  **Nueva Parte Diario**:
    *   Selecciona **Proyecto** (Lista desplegable filtrada por "Activas").
    *   Selecciona **Fecha** (Default: Hoy).
3.  **Añadir Líneas de Mano de Obra (MO)**:
    *   **Recurso**: Busca "Pepe", "Juan" (La app guarda el ID interno `0043`).
    *   **Partida/Tarea**: Busca "Alicatado", "Estructura" (O "POR ASIGNAR" si duda).
    *   **Horas**: Número (ej: 8).
    *   **Tipo**: Normal / Extra (Mapeado a "HORAS NORMALES" etc).
    *   **Comentario**: (Opcional) "Rematando esquina norte".
4.  **Confirmar y Enviar**:
    *   Botón grande "Cerrar Parte".
    *   Estado pasa de `DRAFT` a `SUBMITTED`.

### B. En Oficina (Escritorio - Admin/Jessica)
1.  **Dashboard de Revisión**:
    *   Lista de Partes entrantes ("3 partes pendientes de revisión").
2.  **Validación**:
    *   Si una línea está en "POR ASIGNAR", la oficina asigna la partida correcta.
    *   Check de coherencia (¿80 horas en un día? Alerta).
3.  **Exportación ERP (Formato Exacto)**:
    *   Botón "Generar Fichero Importación".
    *   Salida: `Excel (.xlsx)` con estructura exacta `PLANTILLA_IMPORTACION_V3`.

---

## 2. Especificación Técnica de Exportación (ERP)
La App debe generar un archivo con estas columnas EXACTAS (verificadas en plantilla):

| Columna ERP | Valor / Origen | Ejemplo |
| :--- | :--- | :--- |
| **Tipo documento** | Fijo: `PARTE_MO` | `PARTE_MO` |
| **Proyecto** | Selección App (`projects.erp_code`) | `2024.001` |
| **Serie** | Fijo (Configurable) | `0` |
| **Número** | Fijo (Configurable) | `0` |
| **Fecha** | Date Picker App | `05/01/2026` |
| **Partida (código)** | Selección App (`tasks.erp_id`) | `004.001` |
| **Almacén** | Fijo (Configurable) | `0` |
| **Recurso (código)** | Selección App (`resources.erp_id`) | `1243` |
| **Horario** | Desplegable (`HORAS NORMALES`, `EXTRA`, `DIETA`) | `HORAS NORMALES` |
| **Tipo imputación** | Fijo (o Mapeado) | `1` |
| **Fecha/Hora Inicio** | (Calculado o vacío) | `8:00:00` |
| **Cantidad** | Input App (Horas) | `8,00` |
| **Observaciones** | Input App (Texto) | `Revoco fachada` |

---

## 3. Modelo de Datos (Supabase)

### Tablas Maestras (Para los desplegables)
*   `erp_projects`: `id`, `erp_code`, `name`.
*   `erp_resources`: `id`, `erp_id` (1243), `name` (Juan Gabriel), `category`.
*   `erp_tasks`: `id`, `erp_id` (004.001), `concept` (Alicatado), `project_id`.

### Tablas Transaccionales
*   `work_reports`: Cabecera del parte diario (Proyecto, Fecha, Usuario).
*   `work_report_lines`: Detalle de líneas (Recurso, Partida, Horas, Notas).

---

## 4. Próximos Pasos (Validación Técnica)
Para programar esto necesitamos una exportación real de las tablas maestras:
1.  **CSV de Empleados (Recursos)**: `Código ERP` + `Nombre`.
2.  **CSV de Partidas**: `Código ERP` + `Descripción` (Para que Tony sepa qué elegir).
