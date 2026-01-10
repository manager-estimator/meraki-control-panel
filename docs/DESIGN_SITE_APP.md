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
    *   **Tipo**: Normal / Extra.
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
3.  **Exportación ERP**:
    *   Botón "Generar Fichero Importación".
    *   Salida: `CSV` o `TXT Ancho Fijo` (según especificación SQL Obras).
    *   El ERP ingesta el archivo y las horas quedan imputadas.

---

## 2. Modelo de Datos (Supabase)

### Tablas Maestras (Vienen del ERP)
*   `erp_projects`: `id` (uuid), `erp_code` (text), `name` (text), `status` (active/closed).
*   `erp_resources`: `id` (uuid), `erp_id` (text), `name` (text), `category` (oficial, peon...).
*   `erp_tasks`: `id` (uuid), `erp_id` (text), `concept` (text), `project_id` (fk).

### Tablas Transaccionales (Generadas por la App)
*   `work_reports`:
    *   `id`, `date`, `project_id`, `status` (draft, submitted, approved, exported), `created_by` (Tony), `reviewer_id`.
*   `work_report_lines`:
    *   `report_id`, `resource_id`, `task_id`, `hours`, `hour_type` (normal/extra), `notes`.

---

## 3. Requerimientos Técnicos (Stack)
*   **Frontend**: Next.js (Mismo proyecto `meraki-control-panel`).
    *   Ruta: `/app/site/` (Vista móvil optimizada).
*   **Backend**: Supabase (Postgres + Auth).
*   **Offline**: PWA básica (Service Worker) para guardar borrador si se va la cobertura en el sótano.

---

## 4. Datos Necesarios para Configurar (Siguiente Paso)
Para que esto funcione el "Día 1", necesitamos pedir a TI/Admin:

1.  **Listado de Recursos**: Excel con `Nombre` e `ID de Empleado` (el que usa el ERP).
2.  **Listado de Proyectos**: Códigos exactos (ej: `2024-001`).
3.  **Listado de Conceptos/Partidas**: ¿A qué partidas puede imputar Tony? (¿Generales o específicas por obra?).
4.  **Formato de Importación**: Ejemplo del archivo `.txt` o `.csv` que traga el ERP.
