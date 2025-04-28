import { getDataFromJson, getCategories } from "./all/data.js";
import {
  addToCart,
  handleCounter,
  countPopUpCart,
  pronums,
  countPrice,
} from "./all/cart.js";
import { addToFavOnClick, addToFav } from "./all/fav.js";
import {
  darkBtn,
  backImage,
  darkMode,
  cart,
  cartList,
  cartOpen,
  fav,
  favList,
  favOpen,
  list,
  dragedList,
  bars,
  navList,
} from "./all/events.js";

let globalCategories = [];
let data;

document.addEventListener("DOMContentLoaded", async () => {
  if (localStorage.getItem("mode") === "true") {
    if (darkBtn) darkBtn.classList.add("moon");
    if (backImage)
      backImage.setAttribute("src", "img/main-background-black.png");
  }

  data = await getDataFromJson("js/all/products.json");
  globalCategories = getCategories(data);
  addCategoriesToDraged(globalCategories);

  if (localStorage.cartedData) {
    [JSON.parse(localStorage.cartedData)].flat().forEach((e) => {
      addToCart(e.productId, data);
    });
    countPrice();
  }

  if (localStorage.favedData) {
    [JSON.parse(localStorage.favedData)].flat().forEach((e) => {
      addToFav(e, data);
    });
  }

  countPopUpCart();
  addToFavOnClick(data);
  cartOpen();
  favOpen();
  // darkMode();
  navList();
  pronums();
});

document.addEventListener("click", (e) => {
  if (!list.contains(e.target)) {
    bars.forEach((e) => {
      if (e.classList.contains("full")) {
        e.classList.remove("full");
      }
    });
    dragedList.classList.add("draged");
  }

  if (e.target.classList.contains("plus")) {
    handleCounter(e.target, "plus");
  } else if (e.target.classList.contains("minus")) {
    handleCounter(e.target, "minus");
  }

  if (cartList) {
    if (
      !cartList.contains(e.target) &&
      e.target !== cart &&
      e.target !== darkBtn
    ) {
      cartList.classList.remove("open");
    }
  }

  if (
    !favList.contains(e.target) &&
    !e.target.classList.contains("del-from-fav") &&
    e.target !== fav &&
    e.target !== darkBtn
  ) {
    favList.classList.remove("open");
  }
});

// functions

function addCategoriesToDraged(categories) {
  const categoriesContainer = dragedList.querySelector(".categories");

  categories.forEach((e) => {
    const li = document.createElement("li");
    const a = document.createElement("a");

    a.href = `#${e}`;
    a.textContent = e;

    li.appendChild(a);
    categoriesContainer.appendChild(li);
  });
}
