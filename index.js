async function fetchProducts() {
  try {
    const response = await fetch("https://dummyjson.com/products");
    const { products } = await response.json();
    console.log(products);
    return products;
  } catch (error) {
    console.log("Error can't get the products: ", error);
  }
}
// fetchProducts();

async function fetchProductDetails(id) {
  try {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    const { description } = await response.json();
    console.log(description);
  } catch (error) {
    console.log("Error getting the product: ", error);
  }
}
// fetchProductDetails(1);

async function addProduct(product) {
  try {
    const response = await fetch("https://dummyjson.com/products/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    const data = await response.json();
    console.log("Product added:", data);
  } catch (error) {
    console.log("Error adding product: ", error);
  }
}
const newProduct = {
  title: "New Product",
  description: "This is a new product",
  price: 29.99,
  category: "electronics",
};
// addProduct(newProduct);

async function deleteProduct(id) {
  try {
    const response = await fetch(`https://dummyjson.com/products/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log("Product deleted:", data);
  } catch (error) {
    console.log("Error deleting product: ", error);
  }
}
// deleteProduct(1);

async function searchByTitle(productName) {
  try {
    const response = await fetch(
      `https://dummyjson.com/products/search?q=${productName}`
    );
    const { products } = await response.json();
    console.log(products);
  } catch (error) {
    console.log("Error product name search: ", error);
  }
}
// searchByTitle("tv");

async function filterByCategory(categoryName = "") {
  try {
    const products = await fetchProducts();
    const filteredProducts = categoryName
      ? products.filter((product) => product.category === categoryName)
      : products;
    console.log(filteredProducts);
  } catch (error) {
    console.log("Filter error: ", error);
  }
}
// filterByCategory("groceries");

// order is either "asc" or "desc"
async function sortPrice(order = "asc") {
  try {
    const response = await fetch(
      `https://dummyjson.com/products?sortBy=price&order=${order}`
    );
    const { products } = await response.json();
    console.log(products);
  } catch (error) {
    console.log("Error on sorting price: ", error);
  }
}
// sortPrice();
