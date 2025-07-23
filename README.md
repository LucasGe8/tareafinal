# Guía de uso - Mc Donald's

## Cómo instalar y ejecutar la aplicación

**Backend:**
1. `cd apps/backend`
2. `npm install`
3. `npm start`

**Frontend:**
1. `cd apps/frontend`
2. `npm install`
3. `npm run dev`

## Funcionalidades principales

- Gestión de productos: agregar, editar, eliminar y listar productos.
- Gestión de categorías: crear, editar, eliminar y listar categorías.
- Visualización de productos por categoría.
- Interfaz amigable con React y Tailwind.

## Módulos CRUD implementados y cómo interactúan los datos

- **Productos:** Permite crear, leer, actualizar y eliminar productos. Cada producto está asociado a una categoría.
- **Categorías:** Permite crear, leer, actualizar y eliminar categorías. Los productos dependen de las categorías; no se puede eliminar una categoría si tiene productos asociados.
- Los datos se gestionan desde el frontend ([apps/frontend/src/pages/Lucas.tsx](apps/frontend/src/pages/Lucas.tsx) y [apps/frontend/src/pages/Categorias.tsx](apps/frontend/src/pages/Categorias.tsx)), que interactúan con el backend mediante llamadas API REST.

## Cómo acceder y generar el reporte

- Accede a la aplicación ejecutando el frontend (`npm run dev`) y abre [http://localhost:5173](http://localhost:5173) en tu navegador.
- Para ver el listado de productos y categorías, navega a las páginas correspondientes desde el menú principal.
- El reporte de productos y categorías se visualiza directamente en la interfaz, mostrando los datos actualizados en tiempo real tras cada operación CRUD.