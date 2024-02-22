document.addEventListener('DOMContentLoaded', () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];


    function agregarAlCarrito(nombre, precio) {
        carrito.push({ nombre, precio });
        localStorage.setItem('carrito', JSON.stringify(carrito));
        
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