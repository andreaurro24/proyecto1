fetch('https://script.googleusercontent.com/macros/echo?user_content_key=sPoYhZ2_fu91CHCLOxbtxJ3VAibH1lzfxFJdJIu2NeF_i1z8jBw-vWP7SkR7Bhwah1n1mhxw_L__QCE8TaVaIYP3LTZ3CV-dm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnLSOfp1PbPJ9yXN1htccS--BDu1NXaXUwIDo2OZk6NO7NXxpN4uP2eD9mC5TZI2Js_VivHFVcOqZGh4sIWU56Up_ZSiLPg-_QA&lib=MgV0Ind5lHrgV5aQeM3aiRVMOtaQ-MCV5')
  .then(response => response.json())
  .then(jsonData => {
    const data = jsonData.data; // Accede a la propiedad "data" del JSON
    const entradasSection = document.getElementById('entradas');
    const platosSection = document.getElementById('platos');
    const bebidasSection = document.getElementById('bebidas');
    const postresSection = document.getElementById('postres');

    data.forEach(item => {
      const menu = `
        <div class="alimento">
          <h3>${item.Nombre}</h3>
          <img src=${item.Imagen} alt="Imagen ${item.Nombre}" width="200">
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
  })
  .catch(error => console.error('Error al obtener los datos de la API:', error));
