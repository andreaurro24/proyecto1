document.addEventListener('DOMContentLoaded', () => {
    // Función para mostrar todos los pedidos
    function mostrarPedidos() {
        const ordersEndpoint = 'http://127.0.0.1:8000/api/v1/order/all';
        fetch(ordersEndpoint)
            .then(response => response.json())
            .then(data => {
                const ordersTableBody = document.getElementById('orders-table-body');
                ordersTableBody.innerHTML = ''; // Limpiar la tabla antes de llenarla

                data.forEach(order => {
                    const row = document.createElement('tr');

                    const orderIdCell = document.createElement('td');
                    orderIdCell.textContent = order.id;
                    row.appendChild(orderIdCell);

                    const nameCell = document.createElement('td');
                    nameCell.textContent = order.nombre;
                    row.appendChild(nameCell);

                    const cedulaCell = document.createElement('td');
                    cedulaCell.textContent = order.cedula;
                    row.appendChild(cedulaCell);

                    const phoneCell = document.createElement('td');
                    phoneCell.textContent = order.telefono;
                    row.appendChild(phoneCell);

                    const totalCell = document.createElement('td');
                    totalCell.textContent = `$${order.total.toFixed(2)}`;
                    row.appendChild(totalCell);

                    const statusCell = document.createElement('td');
                    statusCell.textContent = order.status;
                    row.appendChild(statusCell);

                    const addressCell = document.createElement('td');
                    addressCell.textContent = order.address;
                    row.appendChild(addressCell);

                    const actionsCell = document.createElement('td');
                    const approveButton = document.createElement('button');
                    approveButton.textContent = 'Aprobar';
                    approveButton.addEventListener('click', () => {
                        aprobarPedido(order.id);
                    });
                    actionsCell.appendChild(approveButton);
                    row.appendChild(actionsCell);

                    ordersTableBody.appendChild(row);
                });
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
            });
    }

    // Función para aprobar un pedido
    function aprobarPedido(idPedido) {
        fetch(`http://127.0.0.1:8000/api/v1/order/${idPedido}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.error || 'Error al aprobar el pedido');
                });
            }
            return response.json();
        })
        .then(data => {
            alert('Pedido aprobado exitosamente');
            mostrarPedidos(); // Actualizar la lista sin recargar la página
        })
        .catch(error => {
            console.error('Error al aprobar el pedido:', error);
            alert(`Ocurrió un error al aprobar el pedido: ${error.message}`);
        });
    }

    // Función para mostrar pedidos aprobados
    function mostrarPedidosAprobados() {
        const ordersEndpoint = 'http://127.0.0.1:8000/api/v1/order/aprobados';
        fetch(ordersEndpoint)
            .then(response => response.json())
            .then(data => {
                const ordersTableBody = document.getElementById('orders-table-body');
                ordersTableBody.innerHTML = ''; // Limpiar la tabla antes de llenarla

                data.forEach(order => {
                    const row = document.createElement('tr');

                    const orderIdCell = document.createElement('td');
                    orderIdCell.textContent = order.id;
                    row.appendChild(orderIdCell);

                    const nameCell = document.createElement('td');
                    nameCell.textContent = order.nombre;
                    row.appendChild(nameCell);

                    const cedulaCell = document.createElement('td');
                    cedulaCell.textContent = order.cedula;
                    row.appendChild(cedulaCell);

                    const phoneCell = document.createElement('td');
                    phoneCell.textContent = order.telefono;
                    row.appendChild(phoneCell);

                    const totalCell = document.createElement('td');
                    totalCell.textContent = `$${order.total.toFixed(2)}`;
                    row.appendChild(totalCell);

                    const statusCell = document.createElement('td');
                    statusCell.textContent = order.status;
                    row.appendChild(statusCell);

                    const addressCell = document.createElement('td');
                    addressCell.textContent = order.address;
                    row.appendChild(addressCell);

                    ordersTableBody.appendChild(row);
                });
            })
            .catch(error => {
                console.error('Error al obtener los pedidos aprobados:', error);
            });
    }

    // Función para mostrar pedidos pendientes
    function mostrarPedidosPendientes() {
        const ordersEndpoint = 'http://127.0.0.1:8000/api/v1/order/pendientes';
        fetch(ordersEndpoint)
            .then(response => response.json())
            .then(data => {
                const ordersTableBody = document.getElementById('orders-table-body');
                ordersTableBody.innerHTML = ''; // Limpiar la tabla antes de llenarla

                data.forEach(order => {
                    const row = document.createElement('tr');

                    const orderIdCell = document.createElement('td');
                    orderIdCell.textContent = order.id;
                    row.appendChild(orderIdCell);

                    const nameCell = document.createElement('td');
                    nameCell.textContent = order.nombre;
                    row.appendChild(nameCell);

                    const cedulaCell = document.createElement('td');
                    cedulaCell.textContent = order.cedula;
                    row.appendChild(cedulaCell);

                    const phoneCell = document.createElement('td');
                    phoneCell.textContent = order.telefono;
                    row.appendChild(phoneCell);

                    const totalCell = document.createElement('td');
                    totalCell.textContent = `$${order.total.toFixed(2)}`;
                    row.appendChild(totalCell);

                    const statusCell = document.createElement('td');
                    statusCell.textContent = order.status;
                    row.appendChild(statusCell);

                    const addressCell = document.createElement('td');
                    addressCell.textContent = order.address;
                    row.appendChild(addressCell);

                    ordersTableBody.appendChild(row);
                });
            })
            .catch(error => {
                console.error('Error al obtener los pedidos pendientes:', error);
            });
    }

    // Función para buscar pedido por cedula
    function buscarPedidoPorCedula() {
        const searchInput = document.getElementById('search');
        const searchValue = searchInput.value;
        const ordersEndpoint = 'http://127.0.0.1:8000/api/v1/order/cedula';
        fetch(ordersEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cedula: searchValue })
        })
        .then(response => response.json())
        .then(data => {
            const ordersTableBody = document.getElementById('orders-table-body');
            ordersTableBody.innerHTML = ''; // Limpiar la tabla antes de llenarla

            data.forEach(order => {
                const row = document.createElement('tr');

                const orderIdCell = document.createElement('td');
                orderIdCell.textContent = order.id;
                row.appendChild(orderIdCell);

                const nameCell = document.createElement('td');
                nameCell.textContent = order.nombre;
                row.appendChild(nameCell);

                const cedulaCell = document.createElement('td');
                cedulaCell.textContent = order.cedula;
                row.appendChild(cedulaCell);

                const phoneCell = document.createElement('td');
                phoneCell.textContent = order.telefono;
                row.appendChild(phoneCell);

                const totalCell = document.createElement('td');
                totalCell.textContent = `$${order.total.toFixed(2)}`;
                row.appendChild(totalCell);

                const statusCell = document.createElement('td');
                statusCell.textContent = order.status;
                row.appendChild(statusCell);

                const addressCell = document.createElement('td');
                addressCell.textContent = order.address;
                row.appendChild(addressCell);

                ordersTableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error al obtener el pedido por cédula:', error);
        });
    }

    const button_all = document.getElementById('button_all');
    const button_aprobadas = document.getElementById('button_aprobadas');
    const button_pendientes = document.getElementById('button_pendientes');
    const searchButton = document.getElementById('button_search');

    button_all.addEventListener('click', mostrarPedidos);
    button_aprobadas.addEventListener('click', mostrarPedidosAprobados);
    button_pendientes.addEventListener('click', mostrarPedidosPendientes);
    searchButton.addEventListener('click', buscarPedidoPorCedula);
});

