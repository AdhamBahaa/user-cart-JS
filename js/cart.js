import { deleteProduct } from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cart-items");

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cart.forEach((product) => {
    // const productItem = document.getElementById("cart-items");
    // productItem.classList.add("cart-item", "flex", "mb-6");
    const productItem = document.createElement("div");
    productItem.classList.add("cart-item","flex","border-2", "mb-6", "w-full");

    productItem.innerHTML = `
        <div>
          <img
              src="images/img-placeholder.jpg"
              alt="product-img"
              class="border-2 w-3/5"
          />
        </div>
        <div class="py-2 leading-8">
            <h2 class="text-2xl py-2"><b>${product.title}</b></h2>
            <p class="py-2">${product.price}</p>
            <p class="pt-2 text-black">
            ${product.description}
            </p>
        </div>
        <div class="pl-6 py-14 flex flex-column">
            <label for="quantity">Quantity</label>
            <input type="number" id="quantity" class="mb-4 w-8" value="1" name="quantity" min="1" max="100">
            <button type="button" class="btn btn-danger delete-product mr-5" data-id="${product.id}">Delete</button>
        </div>
    `;

    cartContainer.appendChild(productItem);
  });

  document.querySelectorAll(".delete-product").forEach((button) => {
    button.addEventListener("click", async (event) => {
      const productId = event.target.getAttribute("data-id");
      console.log(productId);

      // Call the deleteProduct function to remove the product from the server
      const deletedProduct = await deleteProduct(productId);
      if (deletedProduct) {
        // Remove the product from localStorage
        let updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
        updatedCart = updatedCart.filter((product) => product.id !== productId);
        localStorage.setItem("cart", JSON.stringify(updatedCart));

        // Reload the cart page to reflect changes
        // window.location.reload();
        event.target.closest(".cart-item").remove();
      }
    });
  });
});
