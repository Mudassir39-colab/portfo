document.addEventListener('DOMContentLoaded', () => {
    // Get all the buttons and display elements
    const reviewBtn = document.getElementById('review-btn');
    const confirmBtn = document.getElementById('confirm-btn');
    const orderSummaryDiv = document.getElementById('order-summary');
    
    // --- 1. Function to calculate and display the summary ---
    reviewBtn.addEventListener('click', () => {
        let totalCost = 0;
        let summaryItemsHTML = '';
        
        const eventType = document.getElementById('event-type').value;
        const plateCards = document.querySelectorAll('.plate-card');

        plateCards.forEach(card => {
            const price = parseFloat(card.getAttribute('data-price'));
            const quantity = parseInt(card.querySelector('.plate-quantity').value);
            
            if (quantity > 0) {
                const plateName = card.querySelector('h3').innerText;
                const itemTotal = price * quantity;
                totalCost += itemTotal;
                
                // Build the HTML for summary items
                summaryItemsHTML += `
                    <p>
                        ${plateName}: 
                        ${quantity} x ₹${price.toFixed(2)} = ₹${itemTotal.toFixed(2)}
                    </p>
                `;
            }
        });

        // Display the results in the summary box
        if (totalCost > 0) {
            document.getElementById('summary-event').textContent = `Order for: ${eventType}`;
            document.getElementById('summary-items').innerHTML = summaryItemsHTML;
            document.getElementById('total-cost').textContent = `Total: ₹${totalCost.toFixed(2)}`;
            
            // Show the summary box
            orderSummaryDiv.style.display = 'block';
        } else {
            alert('Please enter a quantity for at least one plate.');
            orderSummaryDiv.style.display = 'none'; // Hide if cart is empty
        }
    });

    // --- 2. Function to confirm the order and go to the bill page ---
    confirmBtn.addEventListener('click', () => {
        const eventType = document.getElementById('event-type').value;
        const plateCards = document.querySelectorAll('.plate-card');
        
        let orderDetails = {
            event: eventType,
            items: [],
            totalCost: 0
        };

        plateCards.forEach(card => {
            const price = parseFloat(card.getAttribute('data-price'));
            const quantity = parseInt(card.querySelector('.plate-quantity').value);
            
            if (quantity > 0) {
                const plateName = card.querySelector('h3').innerText;
                const itemTotal = price * quantity;
                
                orderDetails.items.push({
                    name: plateName,
                    price: price,
                    qty: quantity,
                    total: itemTotal
                });
                
                orderDetails.totalCost += itemTotal;
            }
        });

        // Check if the order is valid before proceeding
        if (orderDetails.items.length > 0) {
            // Save the final order details to session storage
            sessionStorage.setItem('orderDetails', JSON.stringify(orderDetails));
            
            // Redirect to the bill page
            window.location.href = 'bill.html';
        } else {
            // This should rarely happen, but it's good practice
            alert('Your order is empty.');
        }
    });
});
