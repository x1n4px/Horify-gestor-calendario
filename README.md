# Gestor de Horarios - Horify

Este es el proyecto para la creación y mantenimiento de horarios mensuales de los trabajadores de la empresa **SStech**. El sistema estará compuesto por un **front-end** y un **back-end**, los cuales interactúan para gestionar la asignación y visualización de los horarios laborales.

## Hitos del Proyecto

### 1. Configuración del Proyecto 
#### 1.1. Inicialización del proyecto en el repositorio ✔️
- Crear un repositorio en GitHub para el proyecto.
- Configuración inicial de los entornos de desarrollo (Instalar dependencias básicas).
- Crear estructura de carpetas para el front-end y back-end.

#### 1.2. Configuración del servidor (Back-End) ✔️
- Configuración inicial de **Node.js** con **Express**.
- Conexión con la base de datos **MariaDB**.
- Creación de archivo `.env` para la configuración de credenciales.

#### 1.3. Configuración del Front-End 
- Inicializar el proyecto en **Angular**.
- Instalación y configuración de **Tailwind CSS** para la parte visual.
- Configuración de rutas y estructura básica de componentes.

---

### 2. Desarrollo del Back-End
#### 2.1. Gestión de la base de datos
- Crear las tablas necesarias en **MariaDB** (Tabla de usuarios, horarios, asignación de turnos).
- Crear relaciones entre las tablas (Ej. trabajador → horarios).
- Añadir datos de prueba en la base de datos.

#### 2.2. Creación de API Restful
- Implementar rutas para gestionar los horarios (CRUD: Crear, Leer, Actualizar, Eliminar).
- Ruta de autenticación de usuarios (login, registro).
- Validación y control de acceso (Autorización por roles: Admin, Usuario).

#### 2.3. Lógica de negocio
- Implementación de lógica para asignación de turnos mensuales.
- Validación de horarios (No solapamientos, descansos, etc.).
- Lógica de notificaciones para cambios en los horarios.

---

### 3. Desarrollo del Front-End
#### 3.1. Estructura de la Interfaz de Usuario (UI)
- Crear una vista de **inicio de sesión**.
- Crear una vista de **dashboard** para visualizar los horarios.
- Implementar formularios para agregar y editar horarios.
  
#### 3.2. Interactividad y Usabilidad
- Conectar el front-end con las rutas del back-end (consumo de API).
- Crear un calendario interactivo para mostrar los horarios.
- Implementación de filtros para la visualización (por trabajador, por mes, etc.).

#### 3.3. Diseño y Estética
- Crear un diseño responsivo utilizando **Tailwind CSS**.
- Personalización de la UI (colores, tipografía, botones, etc.).
- Agregar validaciones visuales en los formularios (campos obligatorios, fechas válidas).

---

### 4. Integración y Pruebas
#### 4.1. Integración Front-End y Back-End
- Asegurar que el front-end consuma correctamente las APIs del back-end.
- Pruebas de integración entre la base de datos y las funciones de la API.

#### 4.2. Pruebas de Funcionalidad
- Realizar pruebas de funcionamiento de las rutas (verificar creación y edición de horarios).
- Validación de que los usuarios puedan ver y modificar solo sus propios horarios.
  
#### 4.3. Pruebas de Usabilidad
- Pruebas de usabilidad para asegurar que la interfaz sea intuitiva.
- Asegurar que el sistema sea responsive y se vea bien en dispositivos móviles.

---

### 5. Despliegue
#### 5.1. Despliegue Back-End
- Preparación del servidor de producción para el back-end (Posiblemente en un servidor como AWS, Heroku, etc.).
- Configuración del entorno de producción en el archivo `.env`.

#### 5.2. Despliegue Front-End
- Despliegue de la aplicación front-end (en un servidor o plataforma como Netlify, Vercel, etc.).

#### 5.3. Validación de la Aplicación en Producción
- Validar el funcionamiento completo de la aplicación en el entorno de producción.
- Verificación de seguridad y performance.

---

### 6. Documentación y Mantenimiento
#### 6.1. Documentación Técnica
- Escribir documentación para las rutas de la API.
- Documentar el proceso de instalación y configuración del proyecto.

#### 6.2. Mantenimiento y Actualizaciones
- Planificación de futuras actualizaciones (funciones adicionales como reportes, integración con otras herramientas, etc.).
- Solución de errores reportados por los usuarios.

---

## Tecnologías Utilizadas
- **Back-End**: Node.js, Express, MariaDB.
- **Front-End**: Angular, Tailwind CSS.
- **Base de Datos**: MariaDB.

---

## Notas Adicionales
- El sistema estará disponible para su uso en cualquier dispositivo con acceso a internet.
- La seguridad de los datos será una prioridad, incluyendo el almacenamiento seguro de contraseñas (hashing) y control de acceso por roles.
