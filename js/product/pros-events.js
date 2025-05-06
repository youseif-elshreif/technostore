import { delFromCart } from "../all/cart.js";

let unCarted = document.querySelector(".un-carted");

unCarted.addEventListener("click", (e) => {
  delFromCart(e.target.closest(".added").id);
});
