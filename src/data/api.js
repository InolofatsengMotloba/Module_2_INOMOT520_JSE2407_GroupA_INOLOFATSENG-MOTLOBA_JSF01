import { data } from "autoprefixer";

export default () => ({
  products: [],
  selectedProduct: null,
  modalOpen: false, 

  async getProducts() {
    try {
      let response = await fetch(`https://fakestoreapi.com/products`);

      if (!response.ok) {
        throw new Error();
      }

      let data = await response.json();

      this.products = data;
    } catch (error) {
      console.error("Error:", error);
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

  async showProductModal(productId) {
    await this.getProductDetails(productId); // Fetch product details by ID
    this.modalOpen = true;
  },

  closeModal() {
    this.modalOpen = false;
  },
});

