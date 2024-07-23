import { data } from "autoprefixer"; // Importing 'data' from 'autoprefixer' (seems unused in this snippet)

export default () => ({
  products: [], // Array to hold the list of all products
  originalProducts: [], // Array to hold the original list of products for resetting filters
  filteredProducts: [], // Array to hold the list of products after filtering and sorting
  selectedProduct: null, // Object to hold details of the currently selected product
  modalOpen: false, // Boolean to track if the product modal is open
  selectedCategory: "", // String to hold the currently selected category for filtering
  sortOption: "default", // String to track the current sorting option for products
  loading: true, // Boolean to track the loading state of product fetching

  // Function to fetch the list of products from the API
  async getProducts() {
    this.loading = true; // Set loading to true when fetching starts
    try {
      let response = await fetch(`https://fakestoreapi.com/products`);

      if (!response.ok) {
        throw new Error(); // Throw error if response is not ok
      }

      let data = await response.json(); // Parse JSON data from the response

      this.products = data; // Assign fetched data to products
      this.originalProducts = [...this.products]; // Copy products to originalProducts
      this.applyFilters(); // Apply any filters and sorting
    } catch (error) {
      console.error("Error:", error); // Log any errors that occur during fetching
    } finally {
      this.loading = false; // Set loading to false when fetching ends
    }
  },

  // Function to fetch details of a single product by its ID
  async getProductDetails(productId) {
    try {
      let response = await fetch(
        `https://fakestoreapi.com/products/${productId}`
      );

      if (!response.ok) {
        throw new Error(); // Throw error if response is not ok
      }

      let data = await response.json(); // Parse JSON data from the response

      this.selectedProduct = data; // Assign fetched product details to selectedProduct
    } catch (error) {
      console.error("Error:", error); // Log any errors that occur during fetching
    }
  },

  // Function to fetch products by a specific category
  async getProductsByCategory(category) {
    this.loading = true; // Set loading to true when fetching starts
    try {
      let response = await fetch(
        `https://fakestoreapi.com/products/category/${category}`
      );

      if (!response.ok) {
        throw new Error(); // Throw error if response is not ok
      }

      let data = await response.json(); // Parse JSON data from the response

      this.products = data; // Assign fetched data to products
      this.originalProducts = [...this.products]; // Copy products to originalProducts
      this.applyFilters(); // Apply any filters and sorting
    } catch (error) {
      console.error("Error:", error); // Log any errors that occur during fetching
    } finally {
      this.loading = false; // Set loading to false when fetching ends
    }
  },

  // Function to filter and sort products based on selected criteria
  applyFilters() {
    let filtered = this.products; // Start with the full list of products

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
    this.filteredProducts = filtered; // Update the filtered products
  },

  // Function to update the sort option and apply sorting
  sortByPrice(option) {
    this.sortOption = option; // Set the new sort option
    this.applyFilters(); // Apply the filters and sorting
  },

  // Function to update the selected category and fetch products accordingly
  filterByCategory(category) {
    this.selectedCategory = category; // Set the new selected category
    if (category === "") {
      this.getProducts(); // Fetch all products when default is selected
    } else {
      this.getProductsByCategory(category); // Fetch products by the selected category
    }
  },

  // Function to show the product modal with details of a selected product
  async showProductModal(productId) {
    await this.getProductDetails(productId); // Fetch product details by ID
    this.modalOpen = true; // Open the product modal
  },

  // Function to close the product modal
  closeModal() {
    this.modalOpen = false; // Close the product modal
  },

  // Initialization function to set up event listeners and fetch products
  init() {
    this.getProducts(); // Fetch initial list of products
    document
      .getElementById("category-filter")
      .addEventListener("change", (event) => {
        this.filterByCategory(event.target.value); // Filter products by selected category
      });
    document
      .getElementById("price-sort")
      .addEventListener("change", (event) => {
        this.sortByPrice(event.target.value); // Sort products by selected price option
      });

    // Set default sort option
    this.sortOption = document.getElementById("price-sort").value;
  },
});
