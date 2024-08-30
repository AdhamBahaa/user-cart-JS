import { fetchProductDetails, addProduct } from "./api.js";

document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  if (productId) {
    try {
      const product = await fetchProductDetails(productId);
      console.log(product);

      const productDetails = document.getElementById("product-details");
      productDetails.innerHTML = `
        <div>
            <img
            src="images/img-placeholder.jpg"
            alt="product-img"
            class="border-2 w-3/5"
            />
        </div>
        <div class="py-2 leading-8">
            <h2 id="product-title" class="text-2xl py-2"><b>${product.title}</b></h2>
            <p id="product-price" class="py-2">$${product.price}</p>
            <p id="product-description" class="pt-2 text-black">
            ${product.description}
            </p>
        </div>
        <div class="pl-6 py-14">
            <button id="add-to-cart" type="button" class="btn btn-success mb-2" data-id="${product.id}">Add to Cart</button>
            <a href="index.html" class="btn btn-primary mt-2">Back to Products</a>
        </div>
      `;

      const addToCartButton = document.getElementById("add-to-cart");
      addToCartButton.addEventListener("click", () => {
        // Get product details
        const productToAdd = {
          id: productId,
          title: document.getElementById("product-title").textContent,
          price: document.getElementById("product-price").textContent,
          description: document.getElementById("product-description")
            .textContent,
          image: "images/img-placeholder.jpg", // Add your image URL here
        };

        // Add the product to local storage (cart)
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(productToAdd);
        localStorage.setItem("cart", JSON.stringify(cart));

        // Redirect to the cart page
        window.location.href = "cart.html";
      });
    } catch (error) {
      console.error("Error fetching product details:", error);
      document.getElementById("product-details").innerHTML =
        "<p>Error loading product details.</p>";
    }
  } else {
    document.getElementById("product-details").innerHTML =
      "<p>No product ID provided.</p>";
  }
});

//   const addToCartButton = document.getElementById("add-to-cart");
//   addToCartButton.addEventListener("click", async () => {
//     const addedProduct = await addProduct({
//       id: product.id,
//       title: product.title,
//       price: product.price,
//       description: product.description,
//       quantity: 1, // You can adjust this based on user input or default value
//     });

//     if (addedProduct) {
//       alert(`${addedProduct.title} has been added to your cart.`);
//     }
//   });
