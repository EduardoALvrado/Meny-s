// Variables globales
const restaurantData = {
    menu: [
        { id: 1, nombre: 'Hamburguesa Clásica', precio: 8.99, categoria: 'Hamburguesas' },
        { id: 2, nombre: 'Hamburguesa Doble', precio: 12.99, categoria: 'Hamburguesas' },
        { id: 3, nombre: 'Hamburguesa Premium', precio: 15.99, categoria: 'Hamburguesas' },
        { id: 4, nombre: 'Pollo Frito', precio: 9.99, categoria: 'Pollo' },
        { id: 5, nombre: 'Alitas de Pollo', precio: 10.99, categoria: 'Pollo' },
        { id: 6, nombre: 'Nuggets', precio: 7.99, categoria: 'Pollo' },
        { id: 7, nombre: 'Papas Fritas Pequeño', precio: 3.99, categoria: 'Complementos' },
        { id: 8, nombre: 'Papas Fritas Grande', precio: 5.99, categoria: 'Complementos' },
        { id: 9, nombre: 'Ensalada Cesar', precio: 7.99, categoria: 'Ensaladas' },
        { id: 10, nombre: 'Refresco Pequeño', precio: 2.99, categoria: 'Bebidas' },
        { id: 11, nombre: 'Refresco Grande', precio: 4.99, categoria: 'Bebidas' }
    ],
    pedidos: []
};

let currentUser = null;
let selectedRole = null;

// Seleccionar rol
function selectRole(role) {
    selectedRole = role;
    
    if (role === 'cliente') {
        document.querySelector('.role-selection').style.display = 'none';
        document.getElementById('clienteLogin').style.display = 'block';
    } else if (role === 'admin') {
        document.querySelector('.role-selection').style.display = 'none';
        document.getElementById('loginForm').style.display = 'block';
    } else if (role === 'baseball') {
        // Ir directo a baseball sin login
        sessionStorage.setItem('restaurantData', JSON.stringify(restaurantData));
        window.location.href = 'pages/baseball/index.html';
    }
}

// Volver a la selección de rol
function backToRoleSelection() {
    selectedRole = null;
    document.querySelector('.role-selection').style.display = 'grid';
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('clienteLogin').style.display = 'none';
    document.getElementById('loginForm').reset();
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}

// Login de cliente
function loginCliente() {
    const nombre = document.getElementById('clientName').value.trim();
    const telefono = document.getElementById('clientPhone').value.trim();
    const email = document.getElementById('clientEmail').value.trim();

    if (!nombre || !telefono || !email) {
        alert('Por favor completa todos los campos');
        return;
    }

    currentUser = {
        tipo: 'cliente',
        nombre: nombre,
        telefono: telefono,
        email: email
    };

    sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
    sessionStorage.setItem('restaurantData', JSON.stringify(restaurantData));
    window.location.href = 'pages/cliente/index.html';
}

// Login de administrador (cualquier usuario/contraseña funciona)
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const usuario = document.getElementById('username').value.trim();
    const contraseña = document.getElementById('password').value.trim();

    if (!usuario || !contraseña) {
        alert('Por favor completa todos los campos');
        return;
    }

    currentUser = {
        tipo: 'admin',
        usuario: usuario
    };
    sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
    sessionStorage.setItem('restaurantData', JSON.stringify(restaurantData));
    window.location.href = 'pages/admin/index.html';
});

// Almacenar datos del restaurante en sessionStorage al cargar la página
window.addEventListener('load', function() {
    if (!sessionStorage.getItem('restaurantData')) {
        sessionStorage.setItem('restaurantData', JSON.stringify(restaurantData));
    }
});
