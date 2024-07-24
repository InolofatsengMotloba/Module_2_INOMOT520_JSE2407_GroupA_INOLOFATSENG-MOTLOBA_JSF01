import "./style.css"; // Import the main CSS file for styling
import Alpine from "alpinejs"; // Import the Alpine.js library
import alpine from "./data/Alpine"; // Import the module which handles API requests & functions for app

window.Alpine = Alpine; // Make Alpine available globally on the window object

// Listen for the Alpine.js initialization event
document.addEventListener("alpine:init", () => {
  // Register the 'products' component with Alpine.js, using the data from the module
  Alpine.data("products", alpine);
});

// Start Alpine.js
Alpine.start();
