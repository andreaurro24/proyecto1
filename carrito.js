document.addEventListener('DOMContentLoaded', () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    function mostrarCarrito() {
        const listaCarrito = document.getElementById('lista-carrito');
        const totalElemento = document.getElementById('total');

        listaCarrito.innerHTML = '';

        const total = carrito.reduce((acc, item) => acc + item.precio, 0);

        totalElemento.textContent = `Total: $${total.toFixed(2)}`;

        carrito.forEach((item, index) => {
            const li = document.createElement('li');
            li.classList.add('carrito-item');
            li.innerHTML = `
                <span>${item.nombre}</span>
                <span>$${item.precio.toFixed(2)}</span>
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

    function agregarAlCarrito(nombre, precio) {
        carrito.push({ nombre, precio });
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito();
    }

    function eliminarDelCarrito(index) {
        carrito.splice(index, 1);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito();
    }

    const botonesAgregarCarrito = document.querySelectorAll('.agregar-carrito');
    botonesAgregarCarrito.forEach((boton) => {
        boton.addEventListener('click', () => {
            const nombre = boton.getAttribute('data-nombre');
            const precio = parseFloat(boton.getAttribute('data-precio'));
            agregarAlCarrito(nombre, precio);
        });
    });

    
    const botonVaciarCarrito = document.getElementById('vaciar-carrito');
    botonVaciarCarrito.addEventListener('click', () => {
    vaciarCarrito();
        });
    
        // Función para vaciar el carrito
    function vaciarCarrito() {
            carrito.length = 0; // Vacía el array del carrito
            localStorage.removeItem('carrito'); // Elimina el carrito del localStorage
            mostrarCarrito(); // Actualiza la visualización del carrito en la página
        }

    mostrarCarrito();
});