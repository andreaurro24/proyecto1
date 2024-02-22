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

    mostrarCarrito();
});