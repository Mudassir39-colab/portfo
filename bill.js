document.addEventListener('DOMContentLoaded', () => {
    // Get the order details from session storage
    const orderDetailsString = sessionStorage.getItem('orderDetails');
    
    if (orderDetailsString) {
        const orderDetails = JSON.parse(orderDetailsString);

        // Set event type
        document.getElementById('event-type').textContent = orderDetails.event;

        // Set bill date
        document.getElementById('bill-date').textContent = new Date().toLocaleDateString('en-IN');

        // Get the table body to insert items
        const tableBody = document.getElementById('bill-items');

        // Loop through items and add them to the table
        orderDetails.items.forEach(item => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${item.name}</td>
                <td style="text-align: right;">${item.qty}</td>
                <td style="text-align: right;">₹${item.price.toFixed(2)}</td>
                <td style="text-align: right;">₹${item.total.toFixed(2)}</td>
            `;
            
            tableBody.appendChild(row);
        });

        // Set the grand total
        document.getElementById('grand-total').textContent = `₹${orderDetails.totalCost.toFixed(2)}`;

        // Clear the session storage so the bill is fresh next time
        sessionStorage.removeItem('orderDetails');

    } else {
        // If no data, redirect back to the order page
        document.querySelector('.bill-container').innerHTML = '<h1>No order details found.</h1><p>Redirecting to order page...</p>';
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 3000);
    }
});