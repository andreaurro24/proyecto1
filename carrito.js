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
        const productos = JSON.parse(localStorage.getItem('carrito')) || [];
        const total = document.getElementById('total').innerText.replace('Total: $', ''); // Obtener el valor del total eliminando 'Total: $'
        
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('telefono', telefono);
        formData.append('direccion', direccion);
        formData.append('productos', JSON.stringify(productos));
        formData.append('total', total);

        fetch('https://script.google.com/macros/s/AKfycbzvmetY8I93rbyeoE5qt9eDxJdmCPnVn7G4Gze7IltqyD9rHh7WhwrB9o9p3aO_xmKa/exec', {
            method: 'POST', // cambiar link 
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
            limpiarCampos(); // Llama a la función para limpiar los campos después de procesar el pago
            vaciarCarrito(); // Llama a la función para vaciar el carrito después de procesar el pago
        })
        .catch(error => {
            console.error('Error al procesar el pago:', error);
            alert('Ocurrió un error al procesar el pago. Por favor, inténtalo nuevamente.');
        });
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
