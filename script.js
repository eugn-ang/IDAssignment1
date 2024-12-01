document.addEventListener('DOMContentLoaded', function() {
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

    
    
    
    
    let currentSlide = 0; // Start with the first slide
    const slides = document.querySelectorAll('.slide');

    // Function to change slides
    function changeSlide(direction) {
        // Hide the current slide
        slides[currentSlide].classList.remove('active');

        // Update slide index
        currentSlide = (currentSlide + direction + slides.length) % slides.length;

        // Show the new slide
        slides[currentSlide].classList.add('active');
    }

    // Attach event listeners to buttons
    document.querySelector('.prev').addEventListener('click', () => changeSlide(-1));
    document.querySelector('.next').addEventListener('click', () => changeSlide(1));



    
});




document.addEventListener('DOMContentLoaded', function () {
    const basePrice = parseFloat(document.getElementById('base-price-container').getAttribute('data-base-price'));
    const totalPriceElement = document.getElementById('total-price');
    const optionContainers = document.querySelectorAll('.option-container');
    const addToCartButton = document.querySelector('.add-to-cart-btn');

    // Function to calculate the total price
    function calculateTotalPrice() {
        let totalPrice = basePrice;

        optionContainers.forEach(container => {
            const selectedOption = container.querySelector('.option-item.selected');
            if (selectedOption) {
                const priceTag = selectedOption.querySelector('.price-tag');
                const priceText = priceTag.textContent;

                if (priceText.includes('+')) {
                    const additionalPrice = parseFloat(priceText.replace(/[^\d.]/g, ''));
                    totalPrice += additionalPrice;
                }
            }
        });

        totalPriceElement.textContent = totalPrice.toFixed(2);
    }

    // Function to check if all options are selected
    function allOptionsSelected() {
        return Array.from(optionContainers).every(container => 
            container.querySelector('.option-item.selected')
        );
    }

    // Update "Add to Cart" button state
    function updateAddToCartButton() {
        if (allOptionsSelected()) {
            addToCartButton.disabled = false;
        } else {
            addToCartButton.disabled = true;
        }
    }

    // Initialize default selections and calculate the total price
    function initializeDefaults() {
        optionContainers.forEach(container => {
            const firstOption = container.querySelector('.option-item');
            if (firstOption) {
                firstOption.classList.add('selected');
            }
        });

        calculateTotalPrice();
        updateAddToCartButton();
    }

    // Add event listeners to option items
    optionContainers.forEach(container => {
        const optionItems = container.querySelectorAll('.option-item');

        optionItems.forEach(item => {
            item.addEventListener('click', function () {
                container.querySelectorAll('.option-item').forEach(opt => 
                    opt.classList.remove('selected')
                );

                this.classList.add('selected');
                calculateTotalPrice();
                updateAddToCartButton();
            });
        });
    });

    // Handle "Add to Cart" button click
    addToCartButton.addEventListener('click', function () {
    const selectedItems = {};

    // Dynamically fetch the current HTML file name
    const currentFileName = window.location.pathname.split('/').pop(); // Get the file name from the URL
    let pcModelName = "Unknown"; // Default name

    // Assign the PC model name based on the file name
    if (currentFileName === "CustomiseRapid.html") {
        pcModelName = "Rapid";
    } else if (currentFileName === "CustomiseZeal.html") {
        pcModelName = "Zeal";
    } else if (currentFileName === "CustomiseUltracore.html") {
        pcModelName = "Ultracore";
    } else if (currentFileName === "CustomiseVision.html") {
        pcModelName = "Vision";
    } else if (currentFileName === "CustomiseFocus.html") {
        pcModelName = "Focus";
    } else if (currentFileName === "CustomiseHyperfocus.html") {
        pcModelName = "Hyperfocus";
    }
    // Add more conditions here for other customization pages as needed

    selectedItems["PC Model"] = pcModelName;

    optionContainers.forEach(container => {
        const selectedOption = container.querySelector('.option-item.selected');
        if (selectedOption) {
            const optionLabel = selectedOption.querySelector('label').textContent;
            selectedItems[container.querySelector('h3').textContent] = optionLabel;
        }
    });
    
    selectedItems["Total Price"] = `$${totalPriceElement.textContent}`;
    
    // Get existing cart data from localStorage or initialize an empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Add the new item to the cart
    cart.push(selectedItems);
    
    // Save updated cart data to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Redirect to cart.html
    window.location.href = 'cart.html';
});

    // Initialize the page
    initializeDefaults();
});