document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("user-icon").addEventListener("click", function () {
    var loginModal = new bootstrap.Modal(document.getElementById("loginModal"));
    loginModal.show();
  });

  // Switch to Signup Modal
  document.getElementById("show-signup").addEventListener("click", function () {
    var loginModal = bootstrap.Modal.getInstance(
      document.getElementById("loginModal")
    );
    loginModal.hide();
    var signupModal = new bootstrap.Modal(
      document.getElementById("signupModal")
    );
    signupModal.show();
  });

  // Switch to Login Modal
  document.getElementById("show-login").addEventListener("click", function () {
    var signupModal = bootstrap.Modal.getInstance(
      document.getElementById("signupModal")
    );
    signupModal.hide();
    var loginModal = new bootstrap.Modal(document.getElementById("loginModal"));
    loginModal.show();
  });

  // Handle Login Form Submission
  document
    .getElementById("login-form")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent default form submission
      var notification = document.getElementById("notification");
      notification.innerText = "Login successful!";
      notification.style.backgroundColor = "#B88E2F"; // Set background color
      notification.style.color = "white"; // Set text color
      notification.style.display = "block"; // Show notification

      var loginModal = bootstrap.Modal.getInstance(
        document.getElementById("loginModal")
      );
      if (loginModal) {
        loginModal.hide(); // Hide modal after login
      }
      this.reset(); // Reset form

      // Hide notification after 3 seconds
      setTimeout(function () {
        notification.style.display = "none"; // Hide notification
      }, 3000);
    });

  // Handle Signup Form Submission
  document
    .getElementById("signup-form")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent default form submission
      var notification = document.getElementById("notification");
      notification.innerText = "Sign Up successful!";
      notification.style.backgroundColor = "#B88E2F"; // Set background color
      notification.style.color = "white"; // Set text color
      notification.style.display = "block"; // Show notification

      var signupModal = bootstrap.Modal.getInstance(
        document.getElementById("signupModal")
      );
      signupModal.hide(); // Hide modal after signup

      // Optionally, reset form
      this.reset();

      // Hide notification after 3 seconds
      setTimeout(function () {
        notification.style.display = "none"; // Hide notification
      }, 3000);
    });

  // Sample data to demonstrate search functionality
  const sampleData = [
    "Stylish cafe chair",
    "Lolito",
    "Respira",
    "Potty",
    "Muggo",
    "Pingky",
    "Grifo",
    "Leviosa",
    "Luxury big sofa",
    "Elegant wall art",
    "Minimalist bookshelf",
    "Cozy comfort",
    "Dining table set",
    "Ergonomic office chair",
    "Contemporary coffee table",
    "Outdoor patio furniture",
    "Vintage storage cabinet",
    "Bed Room",
    "Living",
  ];

  // Show search bar on clicking the search icon
  document.getElementById("search-icon").addEventListener("click", function () {
    const searchContainer = document.getElementById("search-container");
    searchContainer.classList.toggle("d-none");
    document.getElementById("search-input").focus(); // Focus on input when opened
  });

  // Handle search functionality
  document
    .getElementById("search-input")
    .addEventListener("input", function () {
      const query = this.value.toLowerCase();
      const resultsContainer = document.getElementById("search-results");
      resultsContainer.innerHTML = ""; // Clear previous results

      // Clear previous highlights
      removeHighlights();

      if (query) {
        const filteredResults = sampleData.filter((item) =>
          item.toLowerCase().includes(query)
        );

        // Display search results
        if (filteredResults.length > 0) {
          resultsContainer.classList.remove("d-none");
          filteredResults.forEach((result) => {
            const resultItem = document.createElement("div");
            resultItem.classList.add("search-result-item");
            resultItem.textContent = result;
            resultsContainer.appendChild(resultItem);
          });
        } else {
          resultsContainer.classList.add("d-none"); // Hide if no results
        }

        // Highlight matches in content
        highlightMatches(query);
      } else {
        resultsContainer.classList.add("d-none"); // Hide if input is empty
      }
    });

  function highlightMatches(query) {
    const contentElement = document.getElementById("content");
    const regex = new RegExp(`(${query})`, "gi"); // Case-insensitive regex
    const originalText = contentElement.innerHTML;

    // Highlight matches in content
    contentElement.innerHTML = originalText.replace(
      regex,
      '<span class="highlight">$1</span>'
    );
  }

  function removeHighlights() {
    const contentElement = document.getElementById("content");
    contentElement.innerHTML = contentElement.innerHTML.replace(
      /<span class="highlight">(.*?)<\/span>/g,
      "$1"
    );
  }

  /* Shopping cart functionality */
  const cartSidebar = document.getElementById("cartSidebar");
  const closeCart = document.getElementById("closeCart");
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  let cart = [];

  const cartIcon = document.getElementById("shopping-cart-icon");

  // Functional cart sidebar
  cartIcon.addEventListener("click", () => {
    openCart();
  });

  // Adding event listeners for the "Add to Cart" buttons
  document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const productCard = this.closest(".product-card");
      const productName = productCard.querySelector("h4").innerText;
      const productPrice = productCard.querySelector("strong").innerText;
      const productImage = productCard.querySelector(".product-image").src;

      addToCart(productName, productPrice, productImage);
      openCart();
    });
  });

  // Close cart event listener
  closeCart.addEventListener("click", closeCartSidebar);

  // Clear Cart event listener
  document.querySelector(".clear-cart").addEventListener("click", function () {
    // Clear the cart items array
    cart = [];
    // Update the UI
    updateCartUI();
  });

  // Add to Cart function
  function addToCart(name, price, image) {
    const productPrice = parseFloat(price.replace("Rp ", "").replace(".", ""));

    const existingItemIndex = cart.findIndex((item) => item.name === name);
    if (existingItemIndex >= 0) {
      // Increment the quantity if item already in the cart
      cart[existingItemIndex].quantity += 1;
    } else {
      const cartItem = {
        name: name,
        price: productPrice,
        image: image,
        quantity: 1,
      };
      cart.push(cartItem);
    }

    updateCartUI();
  }
  function setupMobileAddToCart() {
    // Select all mobile "Add to Cart" buttons
    document.querySelectorAll(".add-to-cart-mobile").forEach((button) => {
      button.addEventListener("click", function () {
        // Get the product card containing this button
        const productCard = this.closest(".product-card");

        // Retrieve data attributes from the button
        const productName = button.getAttribute("data-product-name");
        const productPrice = button.getAttribute("data-product-price");
        const productImage = button.getAttribute("data-product-image");

        // Call the addToCart function
        addToCart(productName, productPrice, productImage);
        openCart(); // Optionally open the cart
      });
    });
  }

  // Call the setup function to initialize event listeners for mobile buttons
  setupMobileAddToCart();

  // Function to update the cart UI
  function updateCartUI() {
    cartItems.innerHTML = "";
    let total = 0;

    // Select the empty cart message element
    const emptyCartMessage = document.createElement("div");
    emptyCartMessage.classList.add("empty-cart");

    // Create the empty cart image and message
    emptyCartMessage.innerHTML = `
      <img src="./images/cartimg.jpg" alt="Empty Cart" style="max-width: 200px;"/>
      <p>Your cart is empty. Looks like you haven't made your choice yet!</p>
    `;

    if (cart.length === 0) {
      // Show empty cart message
      cartItems.appendChild(emptyCartMessage);
    } else {
      // Hide empty cart message
      emptyCartMessage.remove(); // Remove empty message if cart is not empty

      cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.classList.add("cart-item");

        li.innerHTML = `
          <div class="cart-item-details">
              <img src="${item.image}" alt="${
          item.name
        }" class="cart-item-image">
              <div class="cart-item-info">
                  <span class="cart-item-name">${item.name}</span>
                  <span class="cart-item-price">Rp ${item.price.toLocaleString()}</span>
                  <div class="quantity-controls">
                      <button class="decrement" data-index="${index}">-</button>
                      <span class="cart-item-quantity">${item.quantity}</span>
                      <button class="increment" data-index="${index}">+</button>
                  </div>
              </div>
          </div>
          <button class="remove-item" data-index="${index}"><i class="ph ph-trash"></i></button>
        `;

        cartItems.appendChild(li);
        total += item.price * item.quantity;
      });
    }

    cartTotal.innerText = `Rp ${total.toLocaleString()}`;

    // Add event listeners for increment and decrement buttons
    document.querySelectorAll(".increment").forEach((button) => {
      button.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        incrementQuantity(index);
      });
    });

    document.querySelectorAll(".decrement").forEach((button) => {
      button.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        decrementQuantity(index);
      });
    });

    // Add event listeners for remove buttons
    document.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        removeItem(index);
      });
    });
  }

  // Function to increment item quantity
  function incrementQuantity(index) {
    cart[index].quantity += 1;
    updateCartUI();
  }

  // Function to decrement item quantity
  function decrementQuantity(index) {
    if (cart[index].quantity > 1) {
      cart[index].quantity -= 1;
    } else {
      // Optionally, remove the item if the quantity reaches zero
      removeItem(index);
    }
    updateCartUI();
  }

  // Function to remove an item from the cart
  function removeItem(index) {
    cart.splice(index, 1);
    updateCartUI();
  }

  // Function to open the cart sidebar
  function openCart() {
    cartSidebar.classList.add("open");
  }

  // Function to close the cart sidebar
  function closeCartSidebar() {
    cartSidebar.classList.remove("open");
  }

  const wishlist = [];
  const wishlistSidebar = document.getElementById("wishlistSidebar");
  const wishlistItems = document.getElementById("wishlistItems");
  const emptyWishlistMessage = document.getElementById("emptyWishlistMessage");
  const wishlistIcon = document.getElementById("wishlistIcon");
  const closeWishlist = document.getElementById("closeWishlist");

  // Function to add items to the wishlist
  function addToWishlist(productName, price, iconHtml) {
    const product = { name: productName, price: price, icon: iconHtml };
    const existingProduct = wishlist.find((item) => item.name === productName);

    if (existingProduct) {
      showAlert(`${productName} is already in your wishlist!`);
    } else {
      wishlist.push(product);
      showAlert(`${productName} has been added to your wishlist!`);
    }

    updateWishlistDisplay();
  }

  function removeFromWishlist(productName) {
    // Check if the wishlist exists and contains items
    if (!wishlist || wishlist.length === 0) {
      console.warn("Wishlist is empty or undefined.");
      showAlert("Your wishlist is empty.");
      return; // Stop further execution if wishlist is empty
    }

    // Find the product in the wishlist by its name
    const productIndex = wishlist.findIndex(
      (item) => item.name === productName
    );

    if (productIndex !== -1) {
      // Remove the product from the wishlist
      const removedProduct = wishlist.splice(productIndex, 1)[0]; // Splice returns the removed item
      showAlert(`${removedProduct.name} has been removed from your wishlist!`);
    } else {
      console.warn(`Product "${productName}" was not found in the wishlist.`);
      showAlert(`Cannot remove: ${productName} is not in your wishlist!`);
    }

    // Update the wishlist display after removing the product
    updateWishlistDisplay();
  }

  // Function to show the alert
  function showAlert(message) {
    const customAlert = document.getElementById("customAlert");
    const alertMessage = document.getElementById("alertMessage");

    alertMessage.innerText = message; // Set the alert message
    customAlert.style.display = "flex"; // Show the alert

    // Automatically hide the alert after 2 seconds
    setTimeout(closeAlert, 2000);
  }

  function closeAlert() {
    const customAlert = document.getElementById("customAlert");
    customAlert.style.display = "none"; // Hide the alert
  }

  // Function to update the wishlist display
  function updateWishlistDisplay() {
    wishlistItems.innerHTML = ""; // Clear existing items

    if (wishlist.length === 0) {
      emptyWishlistMessage.style.display = "block"; // Show empty message
    } else {
      emptyWishlistMessage.style.display = "none"; // Hide empty message
      wishlist.forEach((item) => {
        wishlistItems.innerHTML += `
                <li class="wishlist-item" style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        ${item.icon} ${item.name} - ${item.price}
                    </div>
                    <span class="remove" onclick="removeFromWishlist('${item.name}')" style="margin-left: 10px;">
                        <i class="ph ph-x" style="color: red;"></i> <!-- Remove icon -->
                    </span>
                </li>
            `;
      });
    }
  }

  // Clear Wishlist event listener
  document
    .querySelector(".clear-wishlist")
    .addEventListener("click", function () {
      wishlist.length = 0; // Empties the array
      updateWishlistDisplay(); // Call the function to update the display
    });

  // Attach click event listeners to your heart icons
  document.querySelectorAll(".icon-item2").forEach((item) => {
    item.addEventListener("click", () => {
      const productName = item.getAttribute("data-product-name");
      const productPrice = item.getAttribute("data-product-price");
      const productIcon = item.getAttribute("data-product-icon");
      addToWishlist(productName, productPrice, productIcon);
    });
  });

  // Function to open the wishlist sidebar
  wishlistIcon.addEventListener("click", function () {
    wishlistSidebar.style.display = "block"; // Show the wishlist sidebar
    updateWishlistDisplay(); // Update UI when opening
  });

  // Close wishlist sidebar
  closeWishlist.addEventListener("click", function () {
    wishlistSidebar.style.display = "none"; // Hide the wishlist
  });
  // Payment Gateway
  document.getElementById("checkoutButton").onclick = function (e) {
    // Redirect to the Razorpay payment page
    window.location.href = "https://rzp.io/l/RyQQuFXqu";
    e.preventDefault();
  };
});
