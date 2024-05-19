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


    function eliminarDelCarrito(index) {
        carrito.splice(index, 1);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito();
    }
    
    function vaciarCarrito() {
        carrito.length = 0; 
        localStorage.removeItem('carrito'); 
        mostrarCarrito(); 
    }
    
    const botonVaciarCarrito = document.getElementById('vaciar-carrito');
    botonVaciarCarrito.addEventListener('click', () => {
        vaciarCarrito();
    });
    
    mostrarCarrito();
});
  
    // Función para mostrar el carrito
    mostrarCarrito();

    // Función para limpiar los campos de nombre, teléfono y dirección
    function limpiarCampos() {
        document.getElementById('nombre').value = '';
        document.getElementById('telefono').value = '';
        document.getElementById('direccion').value = '';
    }

    // Función para vaciar el carrito
    function vaciarCarrito() {
        localStorage.removeItem('carrito');
    }
});


function obtenerItemsCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    return carrito;
}
