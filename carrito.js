document.addEventListener('DOMContentLoaded', () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    function mostrarCarrito() {
        const listaCarrito = document.getElementById('lista-carrito');
        const totalElemento = document.getElementById('total');
        

        listaCarrito.innerHTML = '';

        // Calcular el total sumando los precios multiplicados por la cantidad
        const total = carrito.reduce((acc, item) => acc + item.precio * (item.quantity || 1), 0);

        totalElemento.textContent = `Total: $${total.toFixed(2)}`;

        carrito.forEach((item, index) => {
            const li = document.createElement('li');
            li.classList.add('carrito-item');
            li.innerHTML = `
                
                <span>${item.nombre}</span>
                <span>$${item.precio.toFixed(2)} x ${item.quantity || 1}</span>
                <button class="eliminar-item" data-index="${index}">Eliminar</button>
            `;
            listaCarrito.appendChild(li);
        });

        const botonesEliminar = document.querySelectorAll('.eliminar-item');
        botonesEliminar.forEach((boton) => {
            boton.addEventListener('click', () => {
                const index = parseInt(boton.getAttribute('data-index'));
                eliminarDelCarrito(index);
                console.log(carrito);
            });
        });
    }

    function eliminarDelCarrito(index) {
        carrito.splice(index, 1);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito();
        console.log(carrito);
       
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

    document.getElementById('procesar-pago').addEventListener('click', function() {
        const nombre = document.getElementById('nombre').value;
        const telefono = document.getElementById('telefono').value;
        const direccion = document.getElementById('direccion').value;
        const productos = JSON.parse(localStorage.getItem('carrito')) || [];
        const total = document.getElementById('total').innerText.replace('Total: $', ''); // Obtener el valor del total eliminando 'Total: $'

        // Construir el objeto de datos para la solicitud
        const requestData = {
            user_id: 1, // Supongamos que el ID del usuario es 1. Ajustar según tu lógica.
            total: parseFloat(total),
            address: direccion,
            products: productos.map(producto => ({
                product_id: producto.id,
                quantity: producto.quantity
            }))
        };

        // Enviar la solicitud POST al servidor
        fetch('http://127.0.0.1:8000/api/v1/order/enviar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.error || 'Error al procesar la solicitud');
                });
            }
            return response.json();
        })
        .then(data => {
            alert('Orden creada exitosamente');
            limpiarCampos(); // Llama a la función para limpiar los campos después de procesar el pago
            vaciarCarrito(); // Llama a la función para vaciar el carrito después de procesar el pago
        })
        .catch(error => {
            console.error('Error al procesar el pago:', error);
            alert(`Ocurrió un error al procesar el pago: ${error.message}`);
        });
    });

    // Función para limpiar los campos de nombre, teléfono y dirección
    function limpiarCampos() {
        document.getElementById('nombre').value = '';
        document.getElementById('telefono').value = '';
        document.getElementById('direccion').value = '';
    }
});
