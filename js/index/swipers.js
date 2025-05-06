import {
  cartCheck,
  addToCartOnClick,
  delFromCart,
  pronums,
} from "../all/cart.js";
import { getDataFromJson, getCategories } from "../all/data.js";
import { prosClick } from "../all/events.js";

let productsSliders = document.querySelector(".pro-sliders");

document.addEventListener("DOMContentLoaded", async () => {
  const data = await getDataFromJson("js/all/products.json");
  const globalCategories = getCategories(data);
  mainSwipers(data, globalCategories);
  adsSwiper();
  pronums();
});

function adsSwiper() {
  const swiper = new Swiper(".ads-swiper", {
    slidesPerView: 1,
    loop: true,
    speed: 750,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    effect: "fade",
    fadeEffect: { crossFade: true },
    on: {
      init: function () {
        document.querySelector(".ads-swiper").style.opacity = 1;
      },
    },
  });
}

function mainSwiper() {
  let productsSwiper = new Swiper(".pro-swiper", {
    slidesPerView: 5,
    spaceBetween: 10,
    loop: true,
    speed: 600,
    centeredSlides: true,
    navigation: {
      nextEl: ".pro-swiper .swiper-button-next",
      prevEl: ".pro-swiper .swiper-button-prev",
    },
    breakpoints: {
      1200: { slidesPerView: 5 },
      992: { slidesPerView: 4 },
      767: { slidesPerView: 3 },
      0: { slidesPerView: 1 },
    },
    on: {
      init: function () {
        document.querySelectorAll(".pro-swiper").forEach((element) => {
          element.style.opacity = 1;
        });
      },
    },
  });
}

function mainSwipers(data, globalCategories) {
  globalCategories.forEach((e) => {
    const container = document.createElement("div");
    container.className = "container";
    container.id = e;

    const backDiv = document.createElement("div");

    const title = document.createElement("h3");
    title.textContent = e;

    const proSwiper = document.createElement("div");
    proSwiper.className = `pro-swiper ${e}`;

    const swiperWapper = document.createElement("div");
    swiperWapper.className = `swiper-wrapper`;

    const prevBtn = document.createElement("div");
    prevBtn.className = `swiper-button-prev`;

    const nextBtn = document.createElement("div");
    nextBtn.className = `swiper-button-next`;

    const moreDiv = document.createElement("div");
    moreDiv.className = `more`;

    const moreLink = document.createElement("a");
    moreLink.href = "#";

    const moreSpan = document.createElement("span");
    moreSpan.textContent = "See More";

    const moreIcon = document.createElement("i");
    moreIcon.className = "fa-solid fa-angles-right";

    moreLink.append(moreSpan, moreIcon);
    moreDiv.append(moreLink);
    proSwiper.append(swiperWapper, prevBtn, nextBtn, moreDiv);
    container.append(backDiv, title, proSwiper);
    productsSliders.appendChild(container);

    const products = data.filter((product) => product.category === e);

    products.forEach((product) => {
      const slide = document.createElement("div");
      slide.className = "swiper-slide pros added carted-card";
      slide.id = product.id;
      slide.dataset.id = product.id;
      prosClick(slide);
      const img = document.createElement("img");
      img.src = product.img;
      img.loading = "lazy";
      img.alt = "";

      const textDiv = document.createElement("div");
      textDiv.className = "text";

      const h4 = document.createElement("h4");
      h4.textContent = product.title;

      const innerDiv = document.createElement("div");

      const priceDiv = document.createElement("div");
      priceDiv.className = "price";

      const currentPrice = document.createElement("span");
      currentPrice.className = "pricc";
      currentPrice.textContent = `${product.price} L.E`;

      const btnsDiv = document.createElement("div");
      btnsDiv.className = "btns";

      const addToCartDiv = document.createElement("div");
      addToCartDiv.className = "add-to-cart";

      const cartInnerDiv = document.createElement("div");

      const counterDiv = document.createElement("div");
      counterDiv.className = "counter";

      const unCarted = document.createElement("div");
      unCarted.className = "un-carted";

      const slash = document.createElement("i");
      slash.className = "fa-solid fa-slash";

      const minusSpan = document.createElement("span");
      minusSpan.className = "minus";
      minusSpan.textContent = "-";

      const numSpan = document.createElement("span");
      numSpan.className = "num";
      numSpan.textContent = "1";

      const plusSpan = document.createElement("span");
      plusSpan.className = "plus";
      plusSpan.textContent = "+";

      const cartIcon = document.createElement("i");
      cartIcon.className = "fa-solid fa-cart-shopping";

      const cartIcon2 = document.createElement("i");
      cartIcon2.className = "fa-solid fa-cart-shopping";

      const cartText = document.createElement("span");
      cartText.textContent = "Add to cart";

      const addToFavDiv = document.createElement("div");
      addToFavDiv.className = "add-to-fav";

      const heartIcon = document.createElement("i");
      heartIcon.className = "fa-solid fa-heart";

      unCarted.append(slash, cartIcon2);
      counterDiv.append(unCarted, minusSpan, numSpan, plusSpan);

      unCarted.addEventListener("click", () => {
        delFromCart(product.id);
      });

      cartInnerDiv.append(counterDiv, cartIcon, cartText);
      addToCartDiv.appendChild(cartInnerDiv);
      addToFavDiv.appendChild(heartIcon);
      btnsDiv.append(addToCartDiv, addToFavDiv);
      priceDiv.appendChild(currentPrice);

      if (product.old_price) {
        const oldPrice = document.createElement("span");
        const del = document.createElement("del");
        del.textContent = `${product.old_price} L.E`;
        oldPrice.appendChild(del);
        priceDiv.appendChild(oldPrice);
      }

      innerDiv.append(priceDiv, btnsDiv);
      textDiv.append(h4, innerDiv);
      slide.append(img, textDiv);
      swiperWapper.appendChild(slide);
    });
  });
  mainSwiper();
  cartCheck();
  addToCartOnClick(data);
}
