// Variables globales
let currentAdminUser = null;
let restaurantData = null;
let adminCart = [];
let currentCreateFilter = 'Todos';
let allOrders = [];

// Inicializar la página
document.addEventListener('DOMContentLoaded', function() {
    // Verificar que el usuario sea administrador
    const userStr = sessionStorage.getItem('currentUser');
    if (!userStr) {
        window.location.href = '../../index.html';
        return;
    }

    currentAdminUser = JSON.parse(userStr);
    if (currentAdminUser.tipo !== 'admin') {
        window.location.href = '../../index.html';
        return;
    }

    // Obtener datos del restaurante
    const dataStr = sessionStorage.getItem('restaurantData');
    restaurantData = dataStr ? JSON.parse(dataStr) : { menu: [], pedidos: [] };

    // Obtener pedidos guardados
    const ordersStr = sessionStorage.getItem('allOrders');
    allOrders = ordersStr ? JSON.parse(ordersStr) : [];

    // Cargar contenido inicial
    loadPedidos();
    loadMenuTable();
    loadCreateMenu();
});

// Mostrar sección del admin
function showAdminSection(sectionId) {
    // Ocultar todas las secciones
    document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.remove('active');
    });

    // Ocultar todos los items de navegación como activos
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });

    // Mostrar la sección seleccionada
    document.getElementById(sectionId).classList.add('active');

    // Activar el item de navegación correspondiente
    event.target.closest('.nav-item').classList.add('active');

    // Recargar datos si es necesario
    if (sectionId === 'pedidosSection') {
        loadPedidos();
    } else if (sectionId === 'menuSection') {
        loadMenuTable();
    } else if (sectionId === 'crearPedidoSection') {
        loadCreateMenu();
    }
}

// ============ SECCIÓN DE PEDIDOS ============

function loadPedidos() {
    const container = document.getElementById('pedidosContainer');
    
    // Obtener pedidos nuevamente por si se han agregado
    const ordersStr = sessionStorage.getItem('allOrders');
    allOrders = ordersStr ? JSON.parse(ordersStr) : [];

    if (allOrders.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 40px; color: var(--gray-medium);">No hay pedidos</p>';
        return;
    }

    container.innerHTML = '';

    allOrders.forEach((pedido, index) => {
        const pedidoCard = document.createElement('div');
        pedidoCard.className = 'pedido-card';
        
        const itemsHTML = pedido.items.map(item => 
            `<div class="pedido-item">
                <span>${item.nombre} x${item.cantidad}</span>
                <span>$${(item.precio * item.cantidad).toFixed(2)}</span>
            </div>`
        ).join('');

        let entregaHTML = '';
        if (pedido.tipoEntrega === 'domicilio') {
            entregaHTML = `
                <div class="pedido-delivery">
                    <div class="pedido-delivery-type">Entrega a Domicilio</div>
                    <div class="pedido-direccion">${pedido.dirección.calle}, ${pedido.dirección.ciudad}</div>
                </div>
            `;
        } else if (pedido.tipoEntrega === 'pasa-por-el') {
            entregaHTML = `
                <div class="pedido-delivery">
                    <div class="pedido-delivery-type">Pasa por el Local</div>
                </div>
            `;
        } else if (pedido.tipoEntrega === 'uber') {
            entregaHTML = `
                <div class="pedido-delivery">
                    <div class="pedido-delivery-type">Uber Eats</div>
                </div>
            `;
        } else if (pedido.tipoEntrega === 'didi') {
            entregaHTML = `
                <div class="pedido-delivery">
                    <div class="pedido-delivery-type">Didi Food</div>
                </div>
            `;
        }

        const estadoClass = `estado-${pedido.estado.toLowerCase().replace(' ', '-')}`;

        pedidoCard.innerHTML = `
            <div class="pedido-header">
                <div class="pedido-info">
                    <div class="pedido-numero">Pedido #${pedido.id}</div>
                    <div class="pedido-cliente">${pedido.cliente} | ${pedido.telefono}</div>
                </div>
                <span class="pedido-estado ${estadoClass}">${pedido.estado}</span>
            </div>

            <div class="pedido-body">
                <div class="pedido-items">
                    ${itemsHTML}
                </div>

                ${entregaHTML}

                <div class="pedido-total">Total: $${pedido.total.toFixed(2)}</div>
                <div style="font-size: 0.85em; color: var(--gray-medium);">${pedido.fecha}</div>
            </div>

            <div class="pedido-footer">
                ${pedido.estado === 'Pendiente' ? `
                    <button class="pedido-btn btn-preparar" onclick="updatePedidoStatus(${index}, 'En Preparación')">
                        Preparar
                    </button>
                ` : ''}
                ${pedido.estado === 'En Preparación' ? `
                    <button class="pedido-btn btn-listo" onclick="updatePedidoStatus(${index}, 'Listo')">
                        Marcar Listo
                    </button>
                ` : ''}
                <button class="pedido-btn btn-eliminar" onclick="deletePedido(${index})">
                    Eliminar
                </button>
            </div>
        `;

        container.appendChild(pedidoCard);
    });
}

function filterPedidos() {
    const filter = document.getElementById('filterDelivery').value;
    const container = document.getElementById('pedidosContainer');
    
    if (!filter) {
        loadPedidos();
        return;
    }

    container.innerHTML = '';
    const filtered = allOrders.filter(pedido => pedido.tipoEntrega === filter);

    if (filtered.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 40px; color: var(--gray-medium);">No hay pedidos de este tipo</p>';
        return;
    }

    filtered.forEach((pedido, index) => {
        const originalIndex = allOrders.indexOf(pedido);
        const pedidoCard = document.createElement('div');
        pedidoCard.className = 'pedido-card';
        
        const itemsHTML = pedido.items.map(item => 
            `<div class="pedido-item">
                <span>${item.nombre} x${item.cantidad}</span>
                <span>$${(item.precio * item.cantidad).toFixed(2)}</span>
            </div>`
        ).join('');

        let entregaHTML = '';
        if (pedido.tipoEntrega === 'domicilio') {
            entregaHTML = `
                <div class="pedido-delivery">
                    <div class="pedido-delivery-type">Entrega a Domicilio</div>
                    <div class="pedido-direccion">${pedido.dirección.calle}, ${pedido.dirección.ciudad}</div>
                </div>
            `;
        } else if (pedido.tipoEntrega === 'pasa-por-el') {
            entregaHTML = `
                <div class="pedido-delivery">
                    <div class="pedido-delivery-type">Pasa por el Local</div>
                </div>
            `;
        } else if (pedido.tipoEntrega === 'uber') {
            entregaHTML = `
                <div class="pedido-delivery">
                    <div class="pedido-delivery-type">Uber Eats</div>
                </div>
            `;
        } else if (pedido.tipoEntrega === 'didi') {
            entregaHTML = `
                <div class="pedido-delivery">
                    <div class="pedido-delivery-type">Didi Food</div>
                </div>
            `;
        }

        const estadoClass = `estado-${pedido.estado.toLowerCase().replace(' ', '-')}`;

        pedidoCard.innerHTML = `
            <div class="pedido-header">
                <div class="pedido-info">
                    <div class="pedido-numero">Pedido #${pedido.id}</div>
                    <div class="pedido-cliente">${pedido.cliente} | ${pedido.telefono}</div>
                </div>
                <span class="pedido-estado ${estadoClass}">${pedido.estado}</span>
            </div>

            <div class="pedido-body">
                <div class="pedido-items">
                    ${itemsHTML}
                </div>

                ${entregaHTML}

                <div class="pedido-total">Total: $${pedido.total.toFixed(2)}</div>
                <div style="font-size: 0.85em; color: var(--gray-medium);">${pedido.fecha}</div>
            </div>

            <div class="pedido-footer">
                ${pedido.estado === 'Pendiente' ? `
                    <button class="pedido-btn btn-preparar" onclick="updatePedidoStatus(${originalIndex}, 'En Preparación')">
                        Preparar
                    </button>
                ` : ''}
                ${pedido.estado === 'En Preparación' ? `
                    <button class="pedido-btn btn-listo" onclick="updatePedidoStatus(${originalIndex}, 'Listo')">
                        Marcar Listo
                    </button>
                ` : ''}
                <button class="pedido-btn btn-eliminar" onclick="deletePedido(${originalIndex})">
                    Eliminar
                </button>
            </div>
        `;

        container.appendChild(pedidoCard);
    });
}

function updatePedidoStatus(index, newStatus) {
    allOrders[index].estado = newStatus;
    sessionStorage.setItem('allOrders', JSON.stringify(allOrders));
    loadPedidos();
}

function deletePedido(index) {
    if (confirm('¿Estás seguro de que deseas eliminar este pedido?')) {
        allOrders.splice(index, 1);
        sessionStorage.setItem('allOrders', JSON.stringify(allOrders));
        loadPedidos();
    }
}

// ============ SECCIÓN DE MENÚ ============

function loadMenuTable() {
    const tbody = document.getElementById('menuTableBody');
    tbody.innerHTML = '';

    restaurantData.menu.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.nombre}</td>
            <td>${item.categoria}</td>
            <td>$${item.precio.toFixed(2)}</td>
            <td>
                <div class="menu-table-actions">
                    <button class="btn-edit" onclick="editProduct(${item.id})">Editar</button>
                    <button class="btn-delete" onclick="deleteProduct(${item.id})">Eliminar</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function showAddProductForm() {
    document.getElementById('addProductForm').style.display = 'block';
}

function hideAddProductForm() {
    document.getElementById('addProductForm').style.display = 'none';
    document.getElementById('addProductForm').reset();
}

function addProduct(event) {
    event.preventDefault();

    const name = document.getElementById('newProductName').value;
    const price = parseFloat(document.getElementById('newProductPrice').value);
    const category = document.getElementById('newProductCategory').value;

    const newId = Math.max(...restaurantData.menu.map(item => item.id), 0) + 1;

    restaurantData.menu.push({
        id: newId,
        nombre: name,
        precio: price,
        categoria: category
    });

    sessionStorage.setItem('restaurantData', JSON.stringify(restaurantData));
    hideAddProductForm();
    loadMenuTable();
    loadCreateMenu();
    alert('Producto agregado exitosamente');
}

function editProduct(id) {
    const product = restaurantData.menu.find(item => item.id === id);
    if (product) {
        const newPrice = prompt(`Editar precio de ${product.nombre}:`, product.precio);
        if (newPrice !== null && !isNaN(newPrice)) {
            product.precio = parseFloat(newPrice);
            sessionStorage.setItem('restaurantData', JSON.stringify(restaurantData));
            loadMenuTable();
            loadCreateMenu();
            alert('Producto actualizado');
        }
    }
}

function deleteProduct(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
        restaurantData.menu = restaurantData.menu.filter(item => item.id !== id);
        sessionStorage.setItem('restaurantData', JSON.stringify(restaurantData));
        loadMenuTable();
        loadCreateMenu();
    }
}

// ============ SECCIÓN DE CREAR PEDIDO ============

function loadCreateMenu() {
    renderCreateMenu();
}

function renderCreateMenu() {
    const menuGrid = document.getElementById('createMenuGrid');
    menuGrid.innerHTML = '';

    const itemsToShow = currentCreateFilter === 'Todos'
        ? restaurantData.menu
        : restaurantData.menu.filter(item => item.categoria === currentCreateFilter);

    itemsToShow.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item-create';
        menuItem.innerHTML = `
            <div class="menu-item-create-icon">[IMG]</div>
            <div class="menu-item-create-name">${item.nombre}</div>
            <div class="menu-item-create-price">$${item.precio.toFixed(2)}</div>
            <button class="add-to-cart-btn" style="width: 100%; margin-top: 8px; padding: 8px;" onclick="addToCreateCart(${item.id}, '${item.nombre}', ${item.precio})">
                Agregar
            </button>
        `;
        menuGrid.appendChild(menuItem);
    });
}

function filterCreateMenu(categoria) {
    currentCreateFilter = categoria;

    document.querySelectorAll('.menu-filter .filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    event.target.classList.add('active');

    renderCreateMenu();
}

function addToCreateCart(id, nombre, precio) {
    const existingItem = adminCart.find(item => item.id === id);

    if (existingItem) {
        existingItem.cantidad++;
    } else {
        adminCart.push({
            id: id,
            nombre: nombre,
            precio: precio,
            cantidad: 1
        });
    }

    updateCreateCartDisplay();
}

function updateCreateCartDisplay() {
    const cartContainer = document.getElementById('createCartItems');

    if (adminCart.length === 0) {
        cartContainer.innerHTML = '<p style="text-align: center; color: var(--gray-medium);">No hay productos seleccionados</p>';
        updateCreateTotals();
        return;
    }

    cartContainer.innerHTML = '';

    adminCart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'create-cart-item';
        cartItem.innerHTML = `
            <div class="create-cart-item-info">
                <div class="create-cart-item-name">${item.nombre}</div>
                <div class="create-cart-item-price">$${item.precio.toFixed(2)} c/u</div>
            </div>
            <div class="create-cart-item-qty">
                <button class="qty-btn" onclick="decreaseCreateQty(${index})">−</button>
                <input type="number" class="qty-input" value="${item.cantidad}" readonly>
                <button class="qty-btn" onclick="increaseCreateQty(${index})">+</button>
            </div>
            <span>$${(item.precio * item.cantidad).toFixed(2)}</span>
            <button class="remove-create-item" onclick="removeFromCreateCart(${index})">Eliminar</button>
        `;
        cartContainer.appendChild(cartItem);
    });

    updateCreateTotals();
}

function increaseCreateQty(index) {
    adminCart[index].cantidad++;
    updateCreateCartDisplay();
}

function decreaseCreateQty(index) {
    if (adminCart[index].cantidad > 1) {
        adminCart[index].cantidad--;
        updateCreateCartDisplay();
    }
}

function removeFromCreateCart(index) {
    adminCart.splice(index, 1);
    updateCreateCartDisplay();
}

function updateCreateTotals() {
    const subtotal = adminCart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    document.getElementById('createSubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('createTax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('createTotal').textContent = `$${total.toFixed(2)}`;
}

function updateCreateDeliveryType() {
    const deliveryType = document.querySelector('input[name="createDeliveryType"]:checked').value;
    const addressSection = document.getElementById('createAddressSection');

    if (deliveryType === 'domicilio') {
        addressSection.style.display = 'block';
    } else {
        addressSection.style.display = 'none';
    }
}

function createAndSavePedido() {
    if (adminCart.length === 0) {
        alert('Agrega productos al pedido');
        return;
    }

    const clientName = document.getElementById('createClientName').value.trim();
    const clientPhone = document.getElementById('createClientPhone').value.trim();
    const deliveryType = document.querySelector('input[name="createDeliveryType"]:checked').value;

    if (!clientName || !clientPhone) {
        alert('Completa los datos del cliente');
        return;
    }

    let deliveryAddress = null;
    if (deliveryType === 'domicilio') {
        const address = document.getElementById('createAddress').value.trim();
        const city = document.getElementById('createCity').value.trim();

        if (!address || !city) {
            alert('Completa la dirección de entrega');
            return;
        }

        deliveryAddress = {
            calle: address,
            ciudad: city,
            codigoPostal: ''
        };
    }

    const subtotal = adminCart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    const pedido = {
        id: Date.now(),
        cliente: clientName,
        telefono: clientPhone,
        email: '',
        items: adminCart,
        subtotal: subtotal,
        impuestos: tax,
        total: total,
        tipoEntrega: deliveryType,
        dirección: deliveryAddress,
        estado: 'Pendiente',
        fecha: new Date().toLocaleString()
    };

    // Guardar pedido
    let allOrders = [];
    const ordersStr = sessionStorage.getItem('allOrders');
    if (ordersStr) {
        allOrders = JSON.parse(ordersStr);
    }
    allOrders.push(pedido);
    sessionStorage.setItem('allOrders', JSON.stringify(allOrders));

    // Limpiar formulario
    adminCart = [];
    document.getElementById('createClientName').value = '';
    document.getElementById('createClientPhone').value = '';
    document.getElementById('createAddress').value = '';
    document.getElementById('createCity').value = '';
    document.querySelector('input[name="createDeliveryType"]').checked = true;
    updateCreateDeliveryType();
    updateCreateCartDisplay();

    alert(`Pedido #${pedido.id} creado exitosamente`);
    loadPedidos();
}

// Logout
function logoutAdmin() {
    sessionStorage.removeItem('currentUser');
    window.location.href = '../../index.html';
}
