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
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('procesar-pago').addEventListener('click', function() {
        const nombre = document.getElementById('nombre').value;
        const telefono = document.getElementById('telefono').value;
        const direccion = document.getElementById('direccion').value;
        const total = document.getElementById('total').innerText.replace('Total: $', ''); // Obtener el valor del total eliminando 'Total: $'
        
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('telefono', telefono);
        formData.append('direccion', direccion);
        formData.append('total', total);
     

        fetch('https://script.google.com/macros/s/AKfycbzEOpkkHAwB2NwsgpMq1pEIMj2qJaHWoWxXuYCdA7ww6zV6L6rCrrxDq-UScI5tyW8/exec', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ocurrió un error al procesar el pago.');
            }
            return response.text();
        })
        .then(data => {
            alert(data);
        })
        .catch(error => {
            console.error('Error al procesar el pago:', error);
            alert('Ocurrió un error al procesar el pago. Por favor, inténtalo nuevamente.');
        });
    });
});


function obtenerItemsCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    return carrito;
}
