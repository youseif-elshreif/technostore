import { cartCheck, addToCartOnClick, pronums, delFromCart } from "./cart.js";
import { favCheck, addToFavOnClick } from "./fav.js";
import { prosClick } from "./events.js";

const searchProducts = document.querySelector(".search-products");
const searchInput = document.querySelector(".search-list input");

export function searchFilter(data) {
  searchInput.addEventListener("input", () => {
    let search = searchInput.value;
    if (search.length > 0) {
      searchProducts.innerHTML = "";
      data.forEach((e) => {
        if (e.name.toLowerCase().includes(search.toLowerCase())) {
          createProductCard(e);
        }
      });
      cartCheck();
      addToCartOnClick(data);
      pronums();
      addToFavOnClick(data);
    } else {
      searchProducts.innerHTML = "";
    }
  });
  searchProducts.addEventListener("click", (e) => {
    e.target.classList.contains("fa-cart-shopping") ? cartCheck() : null;
    e.target.classList.contains("fa-heart") ? favCheck() : null;
    e.target.classList.contains("add-to-fav") ? favCheck() : null;
  });
}

function createProductCard(e) {
  const card = document.createElement("div");
  card.classList.add("added", "carted-card");
  card.id = e.id;
  card.setAttribute("data-id", e.id);
  prosClick(card);

  const img = document.createElement("img");
  img.src = e.img;
  img.alt = "";

  const textDiv = document.createElement("div");
  textDiv.classList.add("text");

  const h4 = document.createElement("h4");
  h4.textContent = e.name;

  const priceContainer = document.createElement("div");
  priceContainer.classList.add("price");

  const spanPrice = document.createElement("span");
  spanPrice.classList.add("pricc");
  spanPrice.textContent = `${e.price}L.E`;

  const spanDel = document.createElement("span");
  spanDel.classList.add("del");
  const del = document.createElement("del");
  del.textContent = e.old_price ? `${e.old_price}L.E` : "";
  spanDel.appendChild(del);

  priceContainer.appendChild(spanPrice);
  priceContainer.appendChild(spanDel);

  const btnsDiv = document.createElement("div");
  btnsDiv.classList.add("btns");

  const addToCart = document.createElement("div");
  addToCart.classList.add("add-to-cart");

  const cartInner = document.createElement("div");

  const counter = document.createElement("div");
  counter.classList.add("counter");

  const unCarted = document.createElement("div");
  unCarted.classList.add("un-carted");

  unCarted.addEventListener("click", () => {
    delFromCart(e.id);
  });

  const slashIcon = document.createElement("i");
  slashIcon.classList.add("fa-solid", "fa-slash");

  const cartIcon = document.createElement("i");
  cartIcon.classList.add("fa-solid", "fa-cart-shopping");

  unCarted.appendChild(slashIcon);
  unCarted.appendChild(cartIcon);

  const minus = document.createElement("span");
  minus.classList.add("minus");
  minus.textContent = "-";

  const num = document.createElement("span");
  num.classList.add("num");
  num.textContent = "1";

  const plus = document.createElement("span");
  plus.classList.add("plus");
  plus.textContent = "+";

  counter.appendChild(unCarted);
  counter.appendChild(minus);
  counter.appendChild(num);
  counter.appendChild(plus);

  const cartIcon2 = document.createElement("i");
  cartIcon2.classList.add("fa-solid", "fa-cart-shopping");

  const cartText = document.createElement("span");
  cartText.textContent = "Add to cart";

  cartInner.appendChild(counter);
  cartInner.appendChild(cartIcon2);
  cartInner.appendChild(cartText);

  addToCart.appendChild(cartInner);

  const addToFav = document.createElement("div");
  addToFav.classList.add("add-to-fav");

  const favIcon = document.createElement("i");
  favIcon.classList.add("fa-solid", "fa-heart");

  addToFav.appendChild(favIcon);

  btnsDiv.appendChild(addToCart);
  btnsDiv.appendChild(addToFav);

  const innerDiv = document.createElement("div");
  innerDiv.appendChild(priceContainer);
  innerDiv.appendChild(btnsDiv);

  textDiv.appendChild(h4);
  textDiv.appendChild(innerDiv);

  card.appendChild(img);
  card.appendChild(textDiv);

  document.querySelector(".search-products").appendChild(card);
}
