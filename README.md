# Ecommerce de libros para la librería Lecturama

## Descripción
Este proyecto es un ecommerce desarrollado para la librería Lecturama, que permite a los usuarios explorar, buscar y comprar una amplia variedad de libros. Además de la funcionalidad básica de compra, el sitio web también proporciona características como la gestión de cuentas de usuario, almacenamiento seguro de un método de pago y gran cantidad de libros para la compra, además de contar con un historial de compras realizada por cada usuario.

## Características Principales (Para el cliente)
- Crear una cuenta de usuario para realizar un seguimiento de las compras, gestion del método de pago y revisar el historial de compras.
- Explorar y buscar libros por título, y tener información detallado de cada uno.
- los detalles de los libros incluye descripción, autor, precio, etc.
- Agregar libros al carrito de compras y proceder con la compra.
- Que el usuario quiera actualizar alguna información suya.

## Características Principales (Para el administrador)
- Manejo de una cuenta como administrador para la gestión de libros en la tienda virtual
- Crear nuevos libros junto con detalles como título, autor, descripción, precio, etc.
- Ver la lista completa de libros almacenados en la base de datos.
- Actualizar la información de libros existentes, como título, autor, caracterísitcas, precio, etc.
- Deshabilitar libros que ya no están disponibles o que no se desean mantener en el inventario.
- Crear nuevas categorías para organizar los libros por género, autor, tema, etc.
- Ver la lista completa de categorías almacenadas en la base de datos.
- Asignar categorías a cada libro para facilitar la navegación y búsqueda de los usuarios.

## Herramientas utilizadas
- Django Framework, para realizar el backend.
- Astro + React, para realizar el frontend.
- Visual Studio Code, para programar el proyecto.

## Instalación
1. Clona este repositorio.
   ```bash
   git clone git@github.com:JoArDiTo-DEV/Proyecto_CASOR.git
   ```
2.  Abrir nuestro editor de código y abrir la terminal

3. Dirigirnos a la carpeta Backend.
   ```bash
   cd Backend/
   ```
4. Descargar virtualenv de python usando pip.
   ```bash
   pip install virtualenv
   ```
5. Crear un entorno virtual a la carpeta backend.
   ```bash
   virtualenv venv
   ```

6. Activar el entorno virtual para la instalación de dependencias.
   ```bash
   source venv/Scripts/activate
   ```

7. Instalar las siguientes dependencias dependencias.
   ```bash
   pip install django djangorestframework djangorestframework-jwt setuptools django-cors-headers djangorestframework-simplejwt coreapi mysqlclient
   ```

8. En nuestro base de datos MySQL, creamos una base de datos llamada librería.
   ```sql
   CREATE DATABASE libreriadb;
   ```