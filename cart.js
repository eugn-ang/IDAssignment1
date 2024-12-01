document.addEventListener('DOMContentLoaded', function () {

    // Select the dropdown button and navigation links
    const dropdownButton = document.querySelector('.dropdown-button');
    const navLinks = document.querySelector('#nav-links');
    const navContainer = document.querySelector('nav');

    // Ensure both elements exist
    if (dropdownButton && navLinks) {
        // Add click event listener to the dropdown button
        dropdownButton.addEventListener('click', function() {
            // Toggle the 'active' class on the navigation links and nav container
            navLinks.classList.toggle('active');
            navContainer.classList.toggle('mobile-menu-open');
            
            // Optional: Toggle a class on the button for visual feedback
            dropdownButton.classList.toggle('active');
        });
    } else {
        console.error('Dropdown button or navigation links not found');
    }




    const cartContainer = document.getElementById('cart-container');
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    
    function renderCart() {
        cartContainer.innerHTML = '';
    
        if (cartData.length === 0) {
            cartContainer.textContent = "Your cart is empty.";
            return;
        }
    
        let totalCost = 0;
    
        const cartItemsContainer = document.createElement('div');
        cartItemsContainer.classList.add('cart-items');
    
        cartData.forEach((item, index) => {
            const itemContainer = document.createElement('div');
            itemContainer.classList.add('cart-item');
    
            const pcModel = item["PC Model"] || "Unknown PC";
    
            const unitPrice = parseFloat(item['Total Price'].replace('$', ''));
            
            // Add quantity to the item if not already present
            item.quantity = item.quantity || 1;
    
            const quantityContainer = document.createElement('div');
            quantityContainer.classList.add('quantity-control');
    
            const decreaseBtn = document.createElement('button');
            decreaseBtn.textContent = '-';
            decreaseBtn.classList.add('quantity-btn');
    
            const quantityDisplay = document.createElement('span');
            quantityDisplay.textContent = item.quantity;
            quantityDisplay.classList.add('quantity');
    
            const increaseBtn = document.createElement('button');
            increaseBtn.textContent = '+';
            increaseBtn.classList.add('quantity-btn');
    
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.classList.add('remove-btn');
    
            const detailsList = document.createElement('div');
            detailsList.classList.add('item-details');
    
            const modelDetail = document.createElement('h3');
            if (pcModel === "Rapid" || pcModel === "Zeal" || pcModel === "Ultracore")
            {
                modelDetail.textContent = `${pcModel} Gaming PC`;
            }
            else
            {
                modelDetail.textContent = `${pcModel} Workstation`;
            }
            

            
            detailsList.appendChild(modelDetail);
    
            // Add back item descriptions
            Object.keys(item).forEach(key => {
                // Skip these specific keys
                if (['PC Model', 'Total Price', 'quantity'].includes(key)) return;
                
                const detail = document.createElement('p');
                detail.textContent = `${key}: ${item[key]}`;
                detailsList.appendChild(detail);
            });
    
            const priceDisplay = document.createElement('p');
            const itemTotal = unitPrice * item.quantity;
            priceDisplay.textContent = `Price: $${itemTotal.toFixed(2)}`;
            priceDisplay.classList.add('item-price');
    
            decreaseBtn.addEventListener('click', () => {
                if (item.quantity > 1) {
                    item.quantity--;
                    quantityDisplay.textContent = item.quantity;
                    priceDisplay.textContent = `Price: $${(unitPrice * item.quantity).toFixed(2)}`;
                    updateTotalCost();
                    localStorage.setItem('cart', JSON.stringify(cartData));
                }
            });
    
            increaseBtn.addEventListener('click', () => {
                item.quantity++;
                quantityDisplay.textContent = item.quantity;
                priceDisplay.textContent = `Price: $${(unitPrice * item.quantity).toFixed(2)}`;
                updateTotalCost();
                localStorage.setItem('cart', JSON.stringify(cartData));
            });
    
            removeBtn.addEventListener('click', () => {
                cartData.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cartData));
                renderCart();
            });
    
            quantityContainer.appendChild(decreaseBtn);
            quantityContainer.appendChild(quantityDisplay);
            quantityContainer.appendChild(increaseBtn);
    
            itemContainer.appendChild(detailsList);
            itemContainer.appendChild(priceDisplay);
            itemContainer.appendChild(quantityContainer);
            itemContainer.appendChild(removeBtn);
    
            cartItemsContainer.appendChild(itemContainer);
    
            totalCost += itemTotal;
        });
    
        function updateTotalCost() {
            const newTotal = cartData.reduce((total, item) => 
                total + (parseFloat(item['Total Price'].replace('$', '')) * (item.quantity || 1)), 0);
            document.getElementById('total-cost-value').textContent = newTotal.toFixed(2);
        }
    
        const totalCostContainer = document.createElement('div');
        totalCostContainer.classList.add('total-cost');
        totalCostContainer.innerHTML = `Total Cost: $<span id="total-cost-value">${totalCost.toFixed(2)}</span>`;
    
        const checkoutBtn = document.createElement('button');
        checkoutBtn.textContent = 'Proceed to Checkout';
        checkoutBtn.classList.add('checkout-btn');
        checkoutBtn.addEventListener('click', () => {
            window.location.href = 'checkout.html';
        });
    
        cartContainer.appendChild(cartItemsContainer);
        cartContainer.appendChild(totalCostContainer);
        cartContainer.appendChild(checkoutBtn);
    }

    // Initial render
    renderCart();
});