
// Función para obtener y mostrar el menú
function mostrarMenu(data) {
  const entradasSection = document.getElementById('entradas');
  const platosSection = document.getElementById('platos');
  const bebidasSection = document.getElementById('bebidas');
  const postresSection = document.getElementById('postres');

  data.forEach(item => {
    const menu = `
      <div class="alimento">
        <h3>${item.Nombre}</h3>
        <img src="${item.Imagen}" alt="Imagen ${item.Nombre}" class="imagen" width="200">
        <p>${item.descripcion}</p>
        <div>
          <p class="precio">Precio: ${item.precio}$</p>
          <button class="agregar-carrito" data-nombre="${item.Nombre}" data-precio="${item.precio}">Agregar al carrito</button>
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
  const nombre = event.target.getAttribute('data-nombre');
  const precio = parseFloat(event.target.getAttribute('data-precio'));

  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const nuevoItem = { nombre, precio };

  carrito.push(nuevoItem);
  localStorage.setItem('carrito', JSON.stringify(carrito));

  mostrarCarrito();
}

// Función para mostrar el carrito de compras
function mostrarCarrito() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
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

// Evento al cargar el contenido de la página
document.addEventListener('DOMContentLoaded', () => {
  fetch('https://script.googleusercontent.com/macros/echo?user_content_key=sPoYhZ2_fu91CHCLOxbtxJ3VAibH1lzfxFJdJIu2NeF_i1z8jBw-vWP7SkR7Bhwah1n1mhxw_L__QCE8TaVaIYP3LTZ3CV-dm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnLSOfp1PbPJ9yXN1htccS--BDu1NXaXUwIDo2OZk6NO7NXxpN4uP2eD9mC5TZI2Js_VivHFVcOqZGh4sIWU56Up_ZSiLPg-_QA&lib=MgV0Ind5lHrgV5aQeM3aiRVMOtaQ-MCV5')
    .then(response => response.json())
    .then(jsonData => {
      const data = jsonData.data; // Accede a la propiedad "data" del JSON
      mostrarMenu(data);
    })
    .catch(error => console.error('Error al obtener los datos de la API:', error));

  mostrarCarrito(); // Mostrar el carrito al cargar la página

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
});
