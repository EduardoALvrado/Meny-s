// Variables globales
let cart = [];
let restaurantData = null;
let currentFilter = 'Todos';
let currentUser = null;

// Inicializar la página
document.addEventListener('DOMContentLoaded', function() {
    // Obtener usuario actual
    const userStr = sessionStorage.getItem('currentUser');
    if (!userStr) {
        window.location.href = 'index.html';
        return;
    }

    currentUser = JSON.parse(userStr);
    document.getElementById('userName').textContent = `Hola, ${currentUser.nombre}`;

    // Obtener datos del restaurante
    const dataStr = sessionStorage.getItem('restaurantData');
    restaurantData = dataStr ? JSON.parse(dataStr) : { menu: [], pedidos: [] };

    // Cargar carrito del sessionStorage si existe
    const savedCart = sessionStorage.getItem('clientCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartBadge();
    }

    // Cargar menú
    renderMenu();
});

// Mostrar sección
function showSection(sectionId) {
    // Ocultar todas las secciones
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // Ocultar todos los botones de navegación como activos
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Mostrar la sección seleccionada
    document.getElementById(sectionId).classList.add('active');

    // Activar el botón de navegación correspondiente
    if (sectionId === 'menuSection') {
        document.querySelectorAll('.nav-btn')[0].classList.add('active');
    } else if (sectionId === 'cartSection') {
        document.querySelectorAll('.nav-btn')[1].classList.add('active');
        updateCartDisplay();
    }
}

// Ir a menú
function goToMenu() {
    document.getElementById('menuSection').classList.add('active');
    document.getElementById('cartSection').classList.remove('active');
    document.getElementById('confirmSection').classList.remove('active');
    document.querySelectorAll('.nav-btn')[0].classList.add('active');
    document.querySelectorAll('.nav-btn')[1].classList.remove('active');
}

// Renderizar menú
function renderMenu() {
    const menuGrid = document.getElementById('menuGrid');
    menuGrid.innerHTML = '';

    const itemsToShow = currentFilter === 'Todos' 
        ? restaurantData.menu 
        : restaurantData.menu.filter(item => item.categoria === currentFilter);

    itemsToShow.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.innerHTML = `
            <div class="menu-item-image">
                🍴
            </div>
            <div class="menu-item-content">
                <div class="menu-item-name">${item.nombre}</div>
                <div class="menu-item-category">${item.categoria}</div>
                <div class="menu-item-price">$${item.precio.toFixed(2)}</div>
                <button class="add-to-cart-btn" onclick="addToCart(${item.id}, '${item.nombre}', ${item.precio})">
                    Agregar al Carrito
                </button>
            </div>
        `;
        menuGrid.appendChild(menuItem);
    });
}

// Filtrar menú
function filterMenu(categoria) {
    currentFilter = categoria;

    // Actualizar botones activos
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.includes(categoria)) {
            btn.classList.add('active');
        }
    });

    renderMenu();
}

// Agregar al carrito
function addToCart(id, nombre, precio) {
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.cantidad++;
    } else {
        cart.push({
            id: id,
            nombre: nombre,
            precio: precio,
            cantidad: 1
        });
    }

    // Guardar carrito en sessionStorage
    sessionStorage.setItem('clientCart', JSON.stringify(cart));
    updateCartBadge();
    
    // Mostrar mensaje
    alert(`${nombre} agregado al carrito`);
}

// Actualizar carrito
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <p>Tu carrito está vacío</p>
            </div>
        `;
        updateTotals();
        return;
    }

    cartItemsContainer.innerHTML = '';

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.nombre}</div>
                <div class="cart-item-price">$${item.precio.toFixed(2)} c/u</div>
            </div>
            <div class="cart-item-controls">
                <div class="quantity-control">
                    <button onclick="decreaseQuantity(${item.id})">−</button>
                    <input type="number" value="${item.cantidad}" readonly>
                    <button onclick="increaseQuantity(${item.id})">+</button>
                </div>
                <span class="cart-item-price">$${(item.precio * item.cantidad).toFixed(2)}</span>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Eliminar</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    updateTotals();
}

// Aumentar cantidad
function increaseQuantity(id) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.cantidad++;
        sessionStorage.setItem('clientCart', JSON.stringify(cart));
        updateCartDisplay();
        updateCartBadge();
    }
}

// Disminuir cantidad
function decreaseQuantity(id) {
    const item = cart.find(item => item.id === id);
    if (item && item.cantidad > 1) {
        item.cantidad--;
        sessionStorage.setItem('clientCart', JSON.stringify(cart));
        updateCartDisplay();
        updateCartBadge();
    }
}

// Eliminar del carrito
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    sessionStorage.setItem('clientCart', JSON.stringify(cart));
    updateCartDisplay();
    updateCartBadge();
}

// Actualizar totales
function updateTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    const tax = subtotal * 0.1; // 10% impuesto
    const total = subtotal + tax;

    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

// Actualizar badge del carrito
function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    if (cart.length > 0) {
        badge.style.display = 'flex';
        badge.textContent = cart.length;
    } else {
        badge.style.display = 'none';
    }
}

// Actualizar entrega
function updateDelivery() {
    const deliveryType = document.querySelector('input[name="delivery"]:checked').value;
    const addressSection = document.getElementById('addressSection');

    if (deliveryType === 'domicilio') {
        addressSection.style.display = 'flex';
    } else {
        addressSection.style.display = 'none';
    }
}

// Proceder al pago/confirmación
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }

    const deliveryType = document.querySelector('input[name="delivery"]:checked').value;

    let deliveryInfo = '';
    if (deliveryType === 'domicilio') {
        const address = document.getElementById('address').value.trim();
        const city = document.getElementById('city').value.trim();
        const zipCode = document.getElementById('zipCode').value.trim();

        if (!address || !city || !zipCode) {
            alert('Por favor completa todos los campos de dirección');
            return;
        }

        deliveryInfo = `<br>Dirección: ${address}<br>Ciudad: ${city}<br>Código Postal: ${zipCode}`;
    }

    // Crear objeto del pedido
    const pedido = {
        id: Date.now(),
        cliente: currentUser.nombre,
        telefono: currentUser.telefono,
        email: currentUser.email,
        items: cart,
        subtotal: cart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0),
        impuestos: cart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0) * 0.1,
        total: cart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0) + (cart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0) * 0.1),
        tipoEntrega: deliveryType,
        dirección: deliveryType === 'domicilio' ? {
            calle: document.getElementById('address').value,
            ciudad: document.getElementById('city').value,
            codigoPostal: document.getElementById('zipCode').value
        } : null,
        estado: 'Pendiente',
        fecha: new Date().toLocaleString()
    };

    // Guardar pedido en sessionStorage
    let allPedidos = [];
    const pedidosStr = sessionStorage.getItem('allOrders');
    if (pedidosStr) {
        allPedidos = JSON.parse(pedidosStr);
    }
    allPedidos.push(pedido);
    sessionStorage.setItem('allOrders', JSON.stringify(allPedidos));

    // Mostrar confirmación
    showConfirmation(pedido);
}

// Mostrar confirmación
function showConfirmation(pedido) {
    const confirmationDetails = document.getElementById('confirmationDetails');
    const itemsHTML = pedido.items.map(item => 
        `<div class="confirmation-detail-item">
            <span>${item.nombre} x${item.cantidad}</span>
            <span>$${(item.precio * item.cantidad).toFixed(2)}</span>
        </div>`
    ).join('');

    confirmationDetails.innerHTML = `
        <div class="confirmation-detail-item">
            <strong>Número de Pedido:</strong>
            <strong>#${pedido.id}</strong>
        </div>
        <div class="confirmation-detail-item">
            <strong>Cliente:</strong>
            <strong>${pedido.cliente}</strong>
        </div>
        <div class="confirmation-detail-item">
            <strong>Teléfono:</strong>
            <strong>${pedido.telefono}</strong>
        </div>
        <div class="confirmation-detail-item">
            <strong>Tipo de Entrega:</strong>
            <strong>${pedido.tipoEntrega === 'pasa-por-el' ? 'Pasa por el Local' : 'A Domicilio'}</strong>
        </div>
        ${pedido.tipoEntrega === 'domicilio' ? `
            <div class="confirmation-detail-item">
                <strong>Dirección:</strong>
                <strong>${pedido.dirección.calle}, ${pedido.dirección.ciudad}</strong>
            </div>
        ` : ''}
        <div class="confirmation-detail-item">
            <strong>Productos:</strong>
        </div>
        ${itemsHTML}
        <div class="confirmation-detail-item" style="border-top: 2px solid #ddd; margin-top: 10px; padding-top: 10px;">
            <strong>Subtotal:</strong>
            <strong>$${pedido.subtotal.toFixed(2)}</strong>
        </div>
        <div class="confirmation-detail-item">
            <strong>Impuestos:</strong>
            <strong>$${pedido.impuestos.toFixed(2)}</strong>
        </div>
        <div class="confirmation-detail-item" style="color: #667eea;">
            <strong>Total:</strong>
            <strong>$${pedido.total.toFixed(2)}</strong>
        </div>
    `;

    // Limpiar carrito
    cart = [];
    sessionStorage.removeItem('clientCart');
    updateCartBadge();

    // Mostrar sección de confirmación
    document.getElementById('menuSection').classList.remove('active');
    document.getElementById('cartSection').classList.remove('active');
    document.getElementById('confirmSection').classList.add('active');
}

// Logout
function logout() {
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('clientCart');
    window.location.href = 'index.html';
}
