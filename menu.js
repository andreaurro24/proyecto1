document.addEventListener('DOMContentLoaded', () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    function mostrarCarrito() {
        const listaCarrito = document.getElementById('lista-carrito');
        const totalElemento = document.getElementById('total');

        listaCarrito.innerHTML = '';

        const total = carrito.reduce((acc, item) => acc + item.precio, 0);

        totalElemento.textContent = `Total: $${total.toFixed(2)}`;

        carrito.forEach((item) => {
            const li = document.createElement('li');
            li.classList.add('carrito-item');
            li.innerHTML = `<span>${item.nombre}</span><span>$${item.precio.toFixed(2)}</span>`;
            listaCarrito.appendChild(li);
        });
    }

    function agregarAlCarrito(nombre, precio) {
        carrito.push({ nombre, precio });
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

    mostrarCarrito();
});