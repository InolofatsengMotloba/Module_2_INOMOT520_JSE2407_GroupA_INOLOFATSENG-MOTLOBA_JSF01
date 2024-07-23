import "./style.css";
import Alpine from "alpinejs";
import api from "./data/Alpine";

window.Alpine = Alpine;

document.addEventListener("alpine:init", () => {
  Alpine.data("products", api)
});

Alpine.start();
