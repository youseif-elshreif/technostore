export let darkBtn = document.querySelector(".dark");
export let backImage = document.getElementById("main-back");
export function darkMode() {
  darkBtn.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark-mode");
    if (document.documentElement.classList.contains("dark-mode")) {
      if (backImage) {
        backImage.setAttribute("src", "img/main-background-black.png");
      }
      localStorage.mode = true;
    } else {
      if (backImage) {
        backImage.setAttribute("src", "img/main-background.png");
      }
      localStorage.mode = false;
    }

    darkBtn.classList.toggle("moon");
  });
}

export let cart = document.querySelector(".nav .fa-cart-shopping");
export let cartList = document.querySelector(".cart-list");
export function cartOpen() {
  if (cart) {
    cart.addEventListener("click", () => {
      cartList.classList.toggle("open");
    });
  }
}

export let search = document.querySelector(".nav .fa-magnifying-glass");
export let searchList = document.querySelector(".search-list");
export function searchOpen() {
  if (search) {
    search.addEventListener("click", () => {
      searchList.classList.toggle("open");
    });
  }
}

export let fav = document.querySelector(".nav  .fa-heart");
export let favList = document.querySelector(".fav-list");
export function favOpen() {
  fav.addEventListener("click", () => {
    favList.classList.toggle("open");
  });
}

export let list = document.querySelector(".list");
export let bars = document.querySelectorAll(".list span");
export let dragedList = document.querySelector(".nav ul");

export function navList() {
  list.addEventListener("click", () => {
    bars.forEach((e) => {
      e.classList.toggle("full");
    });
    dragedList.classList.toggle("draged");
  });
}

export function prosClick(e) {
  e.addEventListener("click", (e) => {
    if (
      e.target.closest(".btns") ||
      e.target.closest(".counter") ||
      e.target.closest(".fa-xmark") ||
      e.target.closest(".del-from-fav")
    ) {
      return;
    }
    let proCard = e.currentTarget.closest(".added");
    let proId = proCard.dataset.id;
    localStorage.setItem("proId", proId);
    window.open(`product.html`, "_self");
  });
}
