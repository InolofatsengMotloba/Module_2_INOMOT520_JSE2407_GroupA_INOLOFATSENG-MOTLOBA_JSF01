import { data } from "autoprefixer";

export default () => ({
  products: [],
  originalProducts: [],
  filteredProducts: [],
  selectedProduct: null,
  modalOpen: false,
  selectedCategory: "",
  sortOption: "default",
  loading: true, // Add this line to track loading state

  async getProducts() {
    this.loading = true; // Set loading to true when fetching starts
    try {
      let response = await fetch(`https://fakestoreapi.com/products`);

      if (!response.ok) {
        throw new Error();
      }

      let data = await response.json();

      this.products = data;
      this.originalProducts = [...this.products];
      this.applyFilters();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      this.loading = false; // Set loading to false when fetching ends
    }
  },

  async getProductDetails(productId) {
    try {
      let response = await fetch(
        `https://fakestoreapi.com/products/${productId}`
      );

      if (!response.ok) {
        throw new Error();
      }

      let data = await response.json();

      this.selectedProduct = data;
    } catch (error) {
      console.error("Error:", error);
    }
  },

  async getProductsByCategory(category) {
    this.loading = true; // Set loading to true when fetching starts
    try {
      let response = await fetch(
        `https://fakestoreapi.com/products/category/${category}`
      );

      if (!response.ok) {
        throw new Error();
      }

      let data = await response.json();

      this.products = data;
      this.originalProducts = [...this.products];
      this.applyFilters();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      this.loading = false; // Set loading to false when fetching ends
    }
  },

  applyFilters() {
    let filtered = this.products;

    // Filter by category
    if (this.selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === this.selectedCategory
      );
    }

    // Sort by price
    if (this.sortOption === "low-to-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (this.sortOption === "high-to-low") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (this.sortOption === "default") {
      // If default, use original products
      filtered = [...this.originalProducts];
    }
    this.filteredProducts = filtered;
  },

  sortByPrice(option) {
    this.sortOption = option;
    this.applyFilters();
  },

  filterByCategory(category) {
    this.selectedCategory = category;
    if (category === "") {
      this.getProducts(); // Fetch all products when default is selected
    } else {
      this.getProductsByCategory(category);
    }
  },

  async showProductModal(productId) {
    await this.getProductDetails(productId); // Fetch product details by ID
    this.modalOpen = true;
  },

  closeModal() {
    this.modalOpen = false;
  },

  init() {
    this.getProducts();
    document
      .getElementById("category-filter")
      .addEventListener("change", (event) => {
        this.filterByCategory(event.target.value);
      });
    document
      .getElementById("price-sort")
      .addEventListener("change", (event) => {
        this.sortByPrice(event.target.value);
      });

    // Set default sort option
    this.sortOption = document.getElementById("price-sort").value;
  },
});
