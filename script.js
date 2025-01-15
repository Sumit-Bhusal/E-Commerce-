const bar = document.getElementById("bar");
const close = document.getElementById("close");
const nav = document.getElementById("navbar");

if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}

if (close) {
  close.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}

// Trivia Logic
document.addEventListener("DOMContentLoaded", function () {
  // Add event listeners for all the trivia question buttons
  document
    .querySelector('button[data-question="1"]')
    .addEventListener("click", checkAnswer1);
  document
    .querySelector('button[data-question="2"]')
    .addEventListener("click", checkAnswer2);
  document
    .querySelector('button[data-question="3"]')
    .addEventListener("click", checkAnswer3);
  document
    .querySelector('button[data-question="4"]')
    .addEventListener("click", checkAnswer4);
});

function checkAnswer1() {
  const answer = document.getElementById("answer1").value.trim().toLowerCase();
  const correctAnswer = "2007, multi-touch screen";
  const resultElement = document.getElementById("result1");

  if (answer.includes(correctAnswer)) {
    resultElement.textContent = "Correct! Well done!";
    resultElement.style.color = "green";
  } else {
    resultElement.textContent = "Sorry, that’s not correct. Try again!";
    resultElement.style.color = "red";
  }
}

function checkAnswer2() {
  const answer = document.getElementById("answer2").value.trim().toLowerCase();
  const correctAnswer = "apple watch series 4, ECG monitor";
  const resultElement = document.getElementById("result2");

  if (answer.includes(correctAnswer)) {
    resultElement.textContent = "Correct! Well done!";
    resultElement.style.color = "green";
  } else {
    resultElement.textContent = "Sorry, that’s not correct. Try again!";
    resultElement.style.color = "red";
  }
}

function checkAnswer3() {
  const answer = document.getElementById("answer3").value.trim().toLowerCase();
  const correctAnswer = "1994, ibm simon personal communicator";
  const resultElement = document.getElementById("result3");

  if (answer.includes(correctAnswer)) {
    resultElement.textContent = "Correct! Well done!";
    resultElement.style.color = "green";
  } else {
    resultElement.textContent = "Sorry, that’s not correct. Try again!";
    resultElement.style.color = "red";
  }
}

function checkAnswer4() {
  const answer = document.getElementById("answer4").value.trim().toLowerCase();
  const correctAnswer = "htc, htc dream";
  const resultElement = document.getElementById("result4");

  if (answer.includes(correctAnswer)) {
    resultElement.textContent = "Correct! Well done!";
    resultElement.style.color = "green";
  } else {
    resultElement.textContent = "Sorry, that’s not correct. Try again!";
    resultElement.style.color = "red";
  }
}

// Cart Logic
document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".product-container")) {
    // For index.html: Add products to cart when "Add to Cart" is clicked
    document.querySelectorAll(".add-to-cart").forEach((button) => {
      button.addEventListener("click", (event) => {
        const productBox = event.target.closest(".product-box");
        const name = productBox.dataset.name;
        const price = parseFloat(productBox.dataset.price);
        const image = productBox.querySelector("img").src;

        const product = { name, price, image, quantity: 1 };

        // Retrieve current cart from localStorage, or initialize an empty array
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Check if the product is already in the cart
        const existingProduct = cart.find((item) => item.name === product.name);
        if (existingProduct) {
          existingProduct.quantity += 1; // Increase quantity if product exists
        } else {
          cart.push(product); // Add new product to cart
        }

        // Save the updated cart to localStorage
        localStorage.setItem("cart", JSON.stringify(cart));

        alert(`${name} added to the cart!`);
      });
    });
  }

  if (document.getElementById("cart-items")) {
    // For cart.html: Display products in the cart
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalElement = document.getElementById("cart-total");

    // Retrieve cart data from localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // If the cart is empty, display a message
    if (cart.length === 0) {
      cartItemsContainer.innerHTML =
        "<tr><td colspan='6' class='text-center p-4'>Your cart is empty.</td></tr>";
    } else {
      // Populate cart table with products
      cartItemsContainer.innerHTML = cart
        .map(
          (item, index) => `
          <tr data-index="${index}">
            <td class="p-2 border">
              <img src="${item.image}" alt="${item.name}" width="50" />
            </td>
            <td class="p-2 border">${item.name}</td>
            <td class="p-2 border">$${item.price.toFixed(2)}</td>
            <td class="p-2 border">
              <input type="number" class="quantity" value="${
                item.quantity
              }" min="1" data-index="${index}" />
            </td>
            <td class="p-2 border">$${(item.price * item.quantity).toFixed(
              2
            )}</td>
            <td class="p-2 border">
              <button class="remove-item" data-index="${index}">Remove</button>
            </td>
          </tr>
        `
        )
        .join("");

      // Calculate and display the total price
      const total = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      cartTotalElement.textContent = total.toFixed(2);
    }

    // Remove item from cart
    cartItemsContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("remove-item")) {
        const itemIndex = e.target.dataset.index;
        cart.splice(itemIndex, 1); // Remove item from cart array
        localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
        location.reload(); // Reload the page to update cart
      }
    });

    // Update item quantity
    cartItemsContainer.addEventListener("change", (e) => {
      if (e.target.classList.contains("quantity")) {
        const itemIndex = e.target.dataset.index;
        const newQuantity = parseInt(e.target.value);
        if (newQuantity > 0) {
          cart[itemIndex].quantity = newQuantity;
          localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
          location.reload(); // Reload the page to update cart
        }
      }
    });

    // Proceed to checkout
    document.getElementById("checkout-btn").addEventListener("click", () => {
      alert("Proceeding to checkout!");
      // Implement payment logic here
    });
  }
});
