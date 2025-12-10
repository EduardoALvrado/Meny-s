// Datos del restaurante
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

// Credenciales de administrador (para demo)
const adminCredentials = {
    usuario: 'admin',
    contraseña: '12345'
};

let currentUser = null;
let selectedRole = null;

// Seleccionar rol
function selectRole(role) {
    selectedRole = role;
    document.querySelector('.role-selection').style.display = 'none';
    
    if (role === 'cliente') {
        document.getElementById('clienteLogin').style.display = 'block';
    } else {
        document.getElementById('loginForm').style.display = 'block';
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
    window.location.href = 'cliente.html';
}

// Login de administrador
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const usuario = document.getElementById('username').value;
    const contraseña = document.getElementById('password').value;

    if (usuario === adminCredentials.usuario && contraseña === adminCredentials.contraseña) {
        currentUser = {
            tipo: 'admin',
            usuario: usuario
        };
        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
        window.location.href = 'admin.html';
    } else {
        alert('Usuario o contraseña incorrectos');
        document.getElementById('password').value = '';
    }
});

// Almacenar datos del restaurante en sessionStorage al cargar la página
window.addEventListener('load', function() {
    if (!sessionStorage.getItem('restaurantData')) {
        sessionStorage.setItem('restaurantData', JSON.stringify(restaurantData));
    }
});
