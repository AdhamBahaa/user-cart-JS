import {
  fetchProducts,
  fetchProductDetails,
  addProduct,
  deleteProduct,
  searchByTitle,
  filterByCategory,
  sortPrice,
} from "./api.js";

function renderProducts(products) {
  const productsContainer = document.getElementById("list-products");
  productsContainer.innerHTML = "";

  products.forEach((product) => {
    const productItem = document.createElement("li");
    productItem.className = "product-item";
    productItem.innerHTML = `
            <div class="card" style="width: 18rem">
              <img
                src="images/img-placeholder.jpg"
                class="card-img-top"
                alt="..."
              />
              <div class="card-body">
                <h5 class="card-title"><b>${product.title}</b></h5>
                <p class="card-text pb-3">
                  $${product.price}
                </p>
                <a href="#" class="btn btn-primary">See more</a>
              </div>
            </div>
        `;
    productsContainer.appendChild(productItem);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const products = await fetchProducts();
  if (products) {
    renderProducts(products);
  }

  const categorySelect = document.getElementById("categorySelect");
  if (!categorySelect) {
    console.error("Element with ID 'custom-select' not found.");
    return;
  }
  categorySelect.addEventListener("change", async (event) => {
    const filteredProducts = await filterByCategory(
      products,
      event.target.value
    );
    renderProducts(filteredProducts);
  });
});
