document.addEventListener('DOMContentLoaded', function() {
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    const checkoutOrderDetails = document.getElementById('checkout-order-details');
    const totalOrderCost = document.getElementById('total-order-cost');
    const checkoutForm = document.getElementById('checkout-form');
    const promoInput = document.getElementById('promo');
    const promoError = document.getElementById('promo-error');

    // Calculate total cost
    let totalCost = cartData.reduce((total, item) => 
        total + (parseFloat(item['Total Price'].replace('$', '')) * (item.quantity || 1)), 0);

    // Render cart items
    if (cartData.length > 0) {
        cartData.forEach(item => {
            const itemElement = document.createElement('div');
            const itemTotal = parseFloat(item['Total Price'].replace('$', '')) * (item.quantity || 1);
            itemElement.textContent = `${item['PC Model']} - $${itemTotal.toFixed(2)}`;
            checkoutOrderDetails.appendChild(itemElement);
        });

        // Initial total cost display
        totalOrderCost.textContent = `Total Cost: $${totalCost.toFixed(2)}`;
    }

    // Promo code handling
    promoInput.addEventListener('input', function() {
        const validPromoCode = 'SAVE10';
        const promoCode = this.value.trim().toUpperCase();

        // Clear previous error
        promoError.textContent = '';
        
        if (promoCode === validPromoCode) {
            // Apply 10% discount
            const discountedTotal = totalCost * 0.9;
            totalOrderCost.textContent = `Total Cost: $${discountedTotal.toFixed(2)} 
                (10% OFF: Saved $${(totalCost - discountedTotal).toFixed(2)})`;
            promoError.textContent = 'Promo code applied!';
            promoError.style.color = 'green';
        } else if (promoCode) {
            // Reset to original total if invalid code
            totalOrderCost.textContent = `Total Cost: $${totalCost.toFixed(2)}`;
            promoError.textContent = 'Invalid promo code';
            promoError.style.color = 'red';
        }
    });

    // Validation functions
    function validateName(name) {
        return name.length >= 2 && /^[a-zA-Z\s]+$/.test(name);
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validatePhone(phone) {
        // Remove non-digit characters
        const digitsOnly = phone.replace(/\D/g, '');
        
        // Check if the number of digits is  8
        return digitsOnly.length === 8;
    }

    // Form validation
    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const promoInput = document.getElementById('promo');

        const nameError = document.getElementById('name-error');
        const emailError = document.getElementById('email-error');
        const phoneError = document.getElementById('phone-error');
        const promoError = document.getElementById('promo-error');

        // Reset previous error states
        [nameInput, emailInput, phoneInput, promoInput].forEach(input => {
            input.style.borderColor = '';
        });
        [nameError, emailError, phoneError, promoError].forEach(error => {
            error.textContent = '';
        });

        // Validate Name
        if (!validateName(nameInput.value)) {
            nameInput.style.borderColor = 'red';
            nameError.textContent = 'Please enter a valid name';
            isValid = false;
        }

        // Validate Email
        if (!validateEmail(emailInput.value)) {
            emailInput.style.borderColor = 'red';
            emailError.textContent = 'Please enter a valid email';
            isValid = false;
        }

        // Validate Phone
        if (!validatePhone(phoneInput.value)) {
            phoneInput.style.borderColor = 'red';
            phoneError.textContent = 'Please enter a valid phone number';
            isValid = false;
        }

        // Optional Promo Code Validation
        const validPromoCode = 'SAVE10';
        if (promoInput.value && promoInput.value !== validPromoCode) {
            promoInput.style.borderColor = 'red';
            promoError.textContent = 'Invalid promo code';
            isValid = false;
        }

        if (isValid) {
            alert('Payment processing not implemented. Thank you for your order!');
            localStorage.removeItem('cart'); // Clear cart after successful checkout
            window.location.href = 'index.html';
        }
    });
});