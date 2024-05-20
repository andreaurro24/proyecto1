document.addEventListener('DOMContentLoaded', () => {
    // Función para obtener y mostrar el menú
    async function mostrarMenu(data) {
        const entradasSection = document.getElementById('entradas');
        const platosSection = document.getElementById('platos');
        const bebidasSection = document.getElementById('bebidas');
        const postresSection = document.getElementById('postres');

        await new Promise(resolve => setTimeout(resolve, 1)); 
        
        data.forEach(item => {
            const menu = `
                <div class="alimento">
                    <h3>${item.name}</h3>
                    <img src=${item.imagen} alt="Imagen ${item.name}" class="imagen" width="200">
                    <p>${item.descripcion}</p>
                    <div>
                        <p class="precio">Precio: ${item.precio}$</p>
                        <button class="agregar-carrito" data-id="${item.id}" data-nombre="${item.name}" data-precio="${item.precio}">Agregar al carrito</button>
                    </div>
                </div>
            `;

            switch (item.Tipo) {
                case 'entradas':
                    entradasSection.innerHTML += menu;
                    break;
                case 'platos':
                    platosSection.innerHTML += menu;
                    break;
                case 'bebidas':
                    bebidasSection.innerHTML += menu;
                    break;
                case 'postres':
                    postresSection.innerHTML += menu;
                    break;
                default:
                    break;
            }
        });

        // Agregar eventos para los botones de "Agregar al carrito"
        const botonesAgregarCarrito = document.querySelectorAll('.agregar-carrito');
        botonesAgregarCarrito.forEach(boton => {
            boton.addEventListener('click', agregarAlCarrito);
        });
    }

    // Función para agregar un ítem al carrito
    function agregarAlCarrito(event) {
        const id = event.target.getAttribute('data-id');
        const nombre = event.target.getAttribute('data-nombre');
        const precio = parseFloat(event.target.getAttribute('data-precio'));
        
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const itemExistente = carrito.find(item => item.id === id);

        if (itemExistente) {
            itemExistente.quantity += 1;
        } else {
            const nuevoItem = { id, nombre, precio, quantity: 1 };
            carrito.push(nuevoItem);
        }

        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito();
    }

    // Función para mostrar el carrito de compras
    function mostrarCarrito() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const listaCarrito = document.getElementById('lista-carrito');
        const totalElemento = document.getElementById('total');

        listaCarrito.innerHTML = '';

        const total = carrito.reduce((acc, item) => acc + item.precio * item.quantity, 0);

        totalElemento.textContent = `Total: $${total.toFixed(2)}`;

        carrito.forEach((item, index) => {
            const li = document.createElement('li');
            li.classList.add('carrito-item');
            li.innerHTML = `
                <span>${item.nombre}</span>
                <span>$${item.precio.toFixed(2)} x ${item.quantity}</span>
                <button class="eliminar-item" data-index="${index}">Eliminar</button>
            `;
            listaCarrito.appendChild(li);
        });

        const botonesEliminar = document.querySelectorAll('.eliminar-item');
        botonesEliminar.forEach((boton) => {
            boton.addEventListener('click', () => {
                const index = parseInt(boton.getAttribute('data-index'));
                eliminarDelCarrito(index);
            });
        });
    }

    // Función para eliminar un ítem del carrito
    function eliminarDelCarrito(index) {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito.splice(index, 1);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito();
    }

    // Función para vaciar completamente el carrito
    function vaciarCarrito() {
        localStorage.removeItem('carrito');
        mostrarCarrito();
    }

    fetch('http://127.0.0.1:8000/api/v1/product/all')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            mostrarMenu(data);
        })
        .catch(error => {
            // Manejar errores
            console.error('Error al obtener los productos:', error);
        });

    // Evento para vaciar el carrito
    const botonVaciarCarrito = document.getElementById('vaciar-carrito');
    botonVaciarCarrito.addEventListener('click', vaciarCarrito);

    // Evento de scroll para mantener el aside fijo
    window.addEventListener('scroll', () => {
        const aside = document.getElementById('sticky-aside');
        const asideRect = aside.getBoundingClientRect();
        if (window.scrollY > 20) { // Cambiar 20 por la altura deseada antes de que se fije
            aside.style.position = 'fixed';
            aside.style.top = '0';
        } else {
            aside.style.position = 'absolute';
            aside.style.top = 'auto';
        }
    });

    // Inicializar el carrito al cargar la página
    mostrarCarrito();
});
