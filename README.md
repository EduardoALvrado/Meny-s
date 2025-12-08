#Configuracion del entorno – Backend & Frontend

Este proyecto está dividido en dos partes principales:

la configuracion del proyecto/
│
├── backend/ → Servidor Node/Express
└── frontend/ → Interfaz HTML/CSS/JS con Axios

yaml
Copiar código

---

## Tecnologías utilizadas

**Backend:**
- Node.js
- Express
- Mongoose
- CORS
- Nodemon (solo en desarrollo)

**Frontend:**
- HTML
- CSS
- JavaScript
- Axios

---

## Estructura del proyecto

restaurante-proyecto/
│
├── backend/
│ ├── server.js
│ ├── package.json
│ └── node_modules/
│
├── frontend/
│ ├── index.html
│ ├── main.js
│ └── node_modules/
│
└── .gitignore

yaml
Copiar código

> Nota: No subir las carpetas `node_modules` al repositorio para mantener un **Git limpio**.

---

## Integrantes

- Jesus Eduardo Alvarado de la Rosa  
- Hector Santamaria Ortiz  
- Alejandro Rogelio Torres Castillo  
- Carlos Emilio Castillo Mireles  

---

## Criterios de Evaluación

1. **Estructura Correcta:** Existencia de carpetas `frontend` y `backend` separadas.  
2. **Dependencias:**  
   - Backend: `express`, `mongoose`, `cors`  
   - Frontend: `axios`  
3. **Servidor Funcional:** El backend corre sin errores en la terminal.  
4. **Conexión Exitosa:** Evidencia (captura de pantalla) de que el frontend muestra el texto enviado por el backend.  
5. **Git Limpio:** El repositorio **no debe** contener carpetas `node_modules`.

---

## Deliverables / Evidencias

1. **Captura de pantalla 1:** Terminal mostrando el servidor corriendo en `http://localhost:5000`.  
2. **Captura de pantalla 2:** Navegador mostrando el mensaje recibido del backend.  
3. **Enlace al repositorio de GitHub actualizado:**  
[https://github.com/EduardoALvrado/Restaurante-Meny-s-Foodtruck](https://github.com/EduardoALvrado/Restaurante-Meny-s-Foodtruck)
