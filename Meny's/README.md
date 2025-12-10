# 🍔 MENY'S - Sistema de Gestión de Restaurante

Una aplicación web completa para gestionar un restaurante de comida rápida con funcionalidades para clientes y administradores.

## 📋 Características

### Para Clientes 👤
- **Visualización del Menú**: Navega por categorías de productos (Hamburguesas, Pollo, Complementos, Ensaladas, Bebidas)
- **Carrito de Compras**: Agrega, modifica cantidades y elimina productos
- **Opciones de Entrega**:
  - Pasa por el local
  - A domicilio (con dirección)
- **Confirmación de Pedido**: Resumen completo antes de confirmar
- **Historial de Pedidos**: Los pedidos se envían automáticamente al administrador

### Para Administrador ⚙️
- **Gestión de Pedidos**:
  - Ver todos los pedidos recibidos
  - Filtrar por tipo de entrega (Pasa por el local, A domicilio, Uber, Didi)
  - Actualizar estado de los pedidos (Pendiente → En Preparación → Listo)
  - Eliminar pedidos
  
- **Gestión del Menú**:
  - Agregar nuevos productos
  - Editar precios
  - Eliminar productos
  - Ver lista completa de productos
  
- **Crear Pedidos Manualmente**:
  - Generar pedidos directamente desde el panel
  - Especificar tipo de entrega (Pasa por el local, Uber Eats, Didi Food)
  - Agregar dirección para entregas a domicilio
  - Calcular automáticamente totales con impuestos

## 🚀 Cómo Usar

### Instalación
1. Descarga todos los archivos en una carpeta
2. Abre `index.html` en un navegador web moderno

### Acceso
**Cliente:**
- No requiere login previo
- Ingresa nombre, teléfono y email

**Administrador:**
- Usuario: `admin`
- Contraseña: `12345`

## 📁 Estructura de Archivos

```
Meny's/
├── index.html              # Página de login
├── styles.css              # Estilos del login
├── script.js               # Lógica del login
├── cliente.html            # Página del cliente
├── cliente-styles.css      # Estilos del cliente
├── cliente-script.js       # Lógica del cliente
├── admin.html              # Panel de administración
├── admin-styles.css        # Estilos del admin
├── admin-script.js         # Lógica del admin
└── README.md               # Esta documentación
```

## 💾 Almacenamiento

La aplicación utiliza `sessionStorage` del navegador para almacenar:
- Datos del usuario actual
- Menú del restaurante
- Carrito de compras
- Pedidos realizados

**Nota**: Los datos se pierden al cerrar el navegador. Para persistencia real, integra una base de datos backend.

## 🎨 Características Visuales

- **Diseño Responsivo**: Funciona en dispositivos móviles, tablets y desktops
- **Interfaz Moderna**: Gradientes, animaciones suaves y sombras
- **Temas Coloreados**:
  - Clientes: Púrpura (#667eea)
  - Administrador: Rojo (#ff6b6b)

## 📊 Tipos de Entrega

1. **Pasa por el local**: El cliente recoge el pedido en el restaurante
2. **A domicilio**: Entrega en la dirección especificada
3. **Uber Eats**: Entrega mediante la plataforma Uber
4. **Didi Food**: Entrega mediante la plataforma Didi

## 💰 Cálculo de Precios

- Se aplica un impuesto del **10%** sobre el subtotal
- Total = Subtotal + Impuestos

## 🔄 Flujo de Pedidos

### Cliente:
1. Login → Seleccionar productos → Carrito → Elegir tipo entrega → Confirmar → Pedido enviado

### Administrador:
1. Ver pedidos recibidos → Preparar → Marcar listo → Entregar
2. O crear pedidos manualmente desde el panel

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura
- **CSS3**: Estilos y responsive design
- **JavaScript**: Lógica y interactividad
- **SessionStorage API**: Almacenamiento de datos

## 📱 Compatibilidad

- Chrome, Firefox, Safari, Edge (versiones modernas)
- Responsive en móviles (320px+)

## 🔐 Seguridad

**Nota Importante**: Este es un prototipo. Para producción:
- Implementa autenticación real en backend
- Usa contraseñas hasheadas
- Valida datos en servidor
- Implementa HTTPS
- Usa base de datos persistente

## 📝 Menú Inicial

### Hamburguesas
- Hamburguesa Clásica - $8.99
- Hamburguesa Doble - $12.99
- Hamburguesa Premium - $15.99

### Pollo
- Pollo Frito - $9.99
- Alitas de Pollo - $10.99
- Nuggets - $7.99

### Complementos
- Papas Fritas Pequeño - $3.99
- Papas Fritas Grande - $5.99

### Ensaladas
- Ensalada Cesar - $7.99

### Bebidas
- Refresco Pequeño - $2.99
- Refresco Grande - $4.99

## 🎯 Funciones Principales

### Cliente
- `loginCliente()` - Login del cliente
- `addToCart()` - Agregar producto al carrito
- `proceedToCheckout()` - Confirmar pedido
- `showSection()` - Cambiar secciones

### Admin
- `loadPedidos()` - Cargar pedidos
- `updatePedidoStatus()` - Cambiar estado del pedido
- `addProduct()` - Agregar producto
- `createAndSavePedido()` - Crear pedido manual

## 🚀 Mejoras Futuras

- [ ] Integración con base de datos
- [ ] Sistema de usuarios con contraseñas
- [ ] Historial de pedidos por cliente
- [ ] Reportes y estadísticas
- [ ] Integración con APIs de Uber Eats y Didi
- [ ] Sistema de pagos
- [ ] Notificaciones en tiempo real
- [ ] Panel de inventario

---

**Desarrollado para**: Restaurante MENY'S
**Versión**: 1.0
**Última actualización**: 2025
