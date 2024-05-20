
function mostrarpedidos(){
    const ordersEndpoint = 'http://127.0.0.1:8000/api/v1/order/all'; 
fetch(ordersEndpoint)
    .then(response => response.json())
    .then(data => {
        const ordersTableBody = document.getElementById('orders-table-body');

        data.forEach(order => {
            const row = document.createElement('tr');

            const orderIdCell = document.createElement('td');
            orderIdCell.textContent = order.id;
            row.appendChild(orderIdCell);

            const userIdCell = document.createElement('td');
            userIdCell.textContent = order.user_id;
            row.appendChild(userIdCell);

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
mostrarpedidos();



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
    function mostarpedidosaprobados() { 
        fetch('http://127.0.0.1:8000/api/v1/order/aprobados')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            mostrarpedidosaprobados(data);
        })
        .catch(error => {
            // Manejar errores
            console.error('Error al obtener los pedidos aprobados:', error);
        });
    }
    