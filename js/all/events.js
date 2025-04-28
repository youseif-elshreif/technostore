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

export let cart = document.querySelector(".fa-cart-shopping");
export let cartList = document.querySelector(".cart-list");
export function cartOpen() {
  if (cart) {
    cart.addEventListener("click", () => {
      cartList.classList.toggle("open");
    });
  }
}

export let fav = document.querySelector(".fa-heart");
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
