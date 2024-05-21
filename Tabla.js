document.addEventListener('DOMContentLoaded', () => {
    // Función para mostrar todos los pedidos
    function mostrarpedidos(){
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
            window.location.reload();
        })
        .catch(error => {
            console.error('Error al aprobar el pedido:', error);
            alert(`Ocurrió un error al aprobar el pedido: ${error.message}`);
        });
    }

    // Función para mostrar pedidos aprobados
    function mostrarpedidosaprobados() {
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
    function mostrarpedidospendientes() {
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


    const button_all = document.getElementById('button_all');
    const button_aprobadas = document.getElementById('button_aprobadas');
    const button_pendientes = document.getElementById('button_pendientes');

    button_all.addEventListener('click', () => mostrarpedidos());
    button_aprobadas.addEventListener('click', () => mostrarpedidosaprobados());
    button_pendientes.addEventListener('click', () => mostrarpedidospendientes());
});
