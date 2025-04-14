let list = document.querySelector(".list");
let bars = document.querySelectorAll(".list span");
let dragedList = document.querySelector(".nav ul");
let backImage = document.getElementById("main-back");
let darkBtn = document.querySelector(".dark");
let cart = document.querySelector(".fa-cart-shopping");
let fav = document.querySelector(".fa-heart");
let computedStyle = window.getComputedStyle(backImage);
let leftValue = computedStyle.getPropertyValue("left");
let bottomValue = computedStyle.getPropertyValue("bottom");
let globalCategories = [];
let productsSliders = document.querySelector(".pro-sliders");
let cartPro = document.querySelector(".cart-list .cart-products");
let cartList = document.querySelector(".cart-list");
let favList = document.querySelector(".fav-list");
let data;
let countarr = [];
let favArr = [];

document.addEventListener("DOMContentLoaded", async () => {
  if (localStorage.mode == "true") {
    document.body.classList.add("dark-mode");
    darkBtn.classList.add("moon");
    backImage.setAttribute("src", "img/main-background-black.png");
  }

  data = await getDataFromJson("js/products.json");
  await getCategories();
  mainSwipers();
  addCategoriesToDraged(globalCategories);

  if (localStorage.cartedData) {
    [JSON.parse(localStorage.cartedData)].flat().forEach((e) => {
      addToCart(e.productId);
    });
  }

  if (localStorage.favedData) {
    [JSON.parse(localStorage.favedData)].flat().forEach((e) => {
      addToFav(e);
    });
  }

  pronums();
  countPrice();
  countPopUpCart();
  addToFavOnClick();
});

window.onscroll = () => {
  let value = scrollY;
  backImage.style.left = parseInt(leftValue) - value * 0.6 + "px";
  backImage.style.bottom = parseInt(bottomValue) - value * 0.4 + "px";
};

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

  if (
    !cartList.contains(e.target) &&
    e.target !== cart &&
    e.target !== darkBtn
  ) {
    cartList.classList.remove("open");
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

list.addEventListener("click", () => {
  bars.forEach((e) => {
    e.classList.toggle("full");
  });
  dragedList.classList.toggle("draged");
});

darkBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    backImage.setAttribute("src", "img/main-background-black.png");
    localStorage.mode = true;
  } else {
    backImage.setAttribute("src", "img/main-background.png");
    localStorage.mode = false;
  }

  darkBtn.classList.toggle("moon");
});

cart.addEventListener("click", () => {
  cartList.classList.toggle("open");
});

fav.addEventListener("click", () => {
  favList.classList.toggle("open");
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

async function getDataFromJson(link) {
  try {
    let response = await fetch(link);
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    let data = await response.json();
    return data;
  } catch {
    throw new Error("Cant Fetch Data");
  }
}

async function getCategories() {
  let categories = data.map((e) => e["category"]);
  globalCategories = [...new Set(categories)];
}

function mainSwipers() {
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
    proSwiper.append(swiperWapper, prevBtn, nextBtn, moreLink);
    container.append(backDiv, title, proSwiper);
    productsSliders.appendChild(container);

    const products = data.filter((product) => product.category === e);

    products.forEach((product) => {
      const slide = document.createElement("div");
      slide.className = "swiper-slide added";
      slide.id = product.id;

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

      const cartText = document.createElement("span");
      cartText.textContent = "Add to cart";

      const addToFavDiv = document.createElement("div");
      addToFavDiv.className = "add-to-fav";

      const heartIcon = document.createElement("i");
      heartIcon.className = "fa-solid fa-heart";

      counterDiv.append(minusSpan, numSpan, plusSpan);
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
  addToCartOnClick();
}

// cart

function cartCheck() {
  let addToCartBtn = document.querySelectorAll(".add-to-cart");
  addToCartBtn.forEach((e) => {
    if (localStorage.getItem("cartedData")) {
      [...JSON.parse(localStorage.getItem("cartedData"))].forEach((a) => {
        if (e.closest(".swiper-slide").id == a.productId) {
          e.classList.add("carted");
        }
      });
    }
  });
}

function addToCartOnClick() {
  let addToCartBtn = document.querySelectorAll(".add-to-cart");
  addToCartBtn.forEach((e) => {
    e.addEventListener("click", (e) => {
      let cartDiv = e.target.closest(".add-to-cart");
      let proCard = cartDiv.closest(".swiper-slide");
      if (!cartDiv.classList.contains("carted")) {
        addToCart(proCard.id);
        addProductCountToLocaol(proCard.id, proCard);
        cartDiv.classList.add("carted");
      }
      countPrice();
      countPopUpCart();
    });
  });
}

function addToCart(ref) {
  const cartItem = document.createElement("div");
  cartItem.className = "added listed";
  cartItem.dataset.id = data[ref].id;

  const img = document.createElement("img");
  img.src = data[ref].img;
  img.loading = "lazy";
  img.alt = "";

  const textDiv = document.createElement("div");
  textDiv.className = "text";

  const title = document.createElement("h3");
  title.textContent = data[ref].title;

  const counterDiv = document.createElement("div");
  counterDiv.className = "counter";

  const minusSpan = document.createElement("span");
  minusSpan.className = "minus";
  minusSpan.textContent = "-";

  const numSpan = document.createElement("span");
  numSpan.className = "num";
  numSpan.textContent = "1";

  const plusSpan = document.createElement("span");
  plusSpan.className = "plus";
  plusSpan.textContent = "+";

  counterDiv.append(minusSpan, numSpan, plusSpan);
  textDiv.append(title, counterDiv);
  cartItem.append(img, textDiv);

  cartPro.appendChild(cartItem);
}

function countPrice() {
  let card = document.querySelectorAll(".swiper-slide.added");
  let total = 0;
  card.forEach((e) => {
    let price = parseInt(e.querySelector(".pricc").innerHTML);
    if (e.querySelector(".carted .num")) {
      let num = e.querySelector(".carted .num").innerHTML;
      let proTotal = num * price;
      total += proTotal;
    }
  });
  localStorage.price = total;
  document.querySelector(
    ".total-price"
  ).innerHTML = `Total Price: ${localStorage.price} L.E`;
}

function addProductCountToLocaol(e, card) {
  countarr = localStorage.cartedData ? JSON.parse(localStorage.cartedData) : [];

  let productIndex = countarr.findIndex((item) => item.productId === e);

  if (productIndex !== -1) {
    countarr[productIndex].proCount = card.querySelector(".num").innerHTML;
  } else {
    countarr.push({
      productId: e,
      proCount: card.querySelector(".num").innerHTML,
    });
  }

  localStorage.cartedData = JSON.stringify(countarr);
}

function pronums() {
  let cards = Array.from(document.querySelectorAll(".added"));
  if (localStorage.cartedData) {
    JSON.parse(localStorage.cartedData).forEach((e) => {
      let productIndex = cards.findIndex(
        (card) => card.dataset.id === e.productId || card.id === e.productId
      );

      if (productIndex !== -1) {
        cards.forEach((a) => {
          a.dataset.id === e.productId || a.id === e.productId
            ? (a.querySelector(".num").innerHTML = e.proCount)
            : "";
        });
      }
    });
  }
}

function handleCounter(target, type) {
  let card = target.closest(".added");
  let dataId = card?.dataset.id || target.closest(".swiper-slide")?.id;
  let swiperCard = document.getElementById(`${dataId}`)?.querySelector(".num");
  let cartCard = document
    .querySelector(`[data-id="${dataId}"]`)
    ?.querySelector(".num");

  if (type === "plus") {
    ++cartCard.innerHTML;
    ++swiperCard.innerHTML;
  } else if (type === "minus") {
    if (swiperCard?.innerHTML > 1 && cartCard?.innerHTML > 1) {
      --cartCard.innerHTML;
      --swiperCard.innerHTML;
    }
  }
  addProductCountToLocaol(dataId, card);
  countPopUpCart();
  countPrice();
}

function countPopUpCart() {
  let change = document.querySelector(`.cart .count`);
  let total = cartList.querySelector(".total-count");
  let num = localStorage.cartedData
    ? JSON.parse(localStorage.cartedData).reduce((sum, item) => {
        return sum + Number(item.proCount);
      }, 0)
    : 0;

  change.textContent = num <= 99 ? num : "99+";
  total.textContent = `Total Products: ${num}`;

  localStorage.cartCount = num;
}
// fav
function addToFavOnClick() {
  let addToFavBtn = document.querySelectorAll(".add-to-fav");
  addToFavBtn.forEach((e) => {
    e.addEventListener("click", (e) => {
      let favDiv = e.target.closest(".add-to-fav");
      let proCard = favDiv.closest(".swiper-slide");
      if (!favDiv.classList.contains("faved")) {
        addToFav(proCard.id);
        addfavToLocal(proCard.id);
        favDiv.classList.add("faved");
      } else {
        delFromFav(proCard.id);
        favDiv.classList.remove("faved");
      }
    });
    favDelBtns = document.querySelectorAll(".del-from-fav");
  });
  favCheck();
}

function addToFav(ref) {
  const favItem = document.createElement("div");
  favItem.className = "fav listed";
  favItem.dataset.id = data[ref].id;

  const img = document.createElement("img");
  img.src = data[ref].img;
  img.loading = "lazy";
  img.alt = "";

  const textDiv = document.createElement("div");
  textDiv.className = "text";

  const title = document.createElement("h3");
  title.textContent = data[ref].title;

  const del = document.createElement("span");
  del.className = "del-from-fav";
  del.textContent = "Delet";

  textDiv.append(title, del);
  favItem.append(img, textDiv);

  favList.appendChild(favItem);
  favCoun();
  let favDelBtns = document.querySelectorAll(".del-from-fav");
  favDelBtns.forEach((e) => {
    e.addEventListener("click", () => {
      delFromFav(e.closest(".listed").dataset.id);
    });
  });
}

function addfavToLocal(e) {
  favArr = localStorage.favedData ? JSON.parse(localStorage.favedData) : [];

  favArr.push(e);

  localStorage.favedData = JSON.stringify([...new Set(favArr)]);
}

function favCheck() {
  let addToFavBtn = document.querySelectorAll(".add-to-fav");
  addToFavBtn.forEach((e) => {
    if (localStorage.favedData) {
      [...JSON.parse(localStorage.favedData)].forEach((a) => {
        if (e.closest(".swiper-slide").id == a) {
          e.classList.add("faved");
        }
      });
    }
  });
}

function delFromFav(e) {
  let faved = Array.from(document.querySelectorAll(".fav.listed"));
  let favedcard = Array.from(document.querySelectorAll(".swiper-slide.added"));

  let index = faved.findIndex((a) => a.dataset.id == e);
  let index2 = favedcard.findIndex((a) => a.id == e);

  if (index != -1) {
    faved[index].remove();
  }
  favedcard[index2].querySelector(".faved").classList.remove("faved");

  console.log();

  let arr = JSON.parse(localStorage.favedData);
  arr.splice(index, 1);

  localStorage.favedData = JSON.stringify(arr);
  favCoun();
}

function favCoun() {
  document.querySelectorAll(".fav.listed").length <= 99
    ? (document.querySelector(".fav .count").innerHTML =
        document.querySelectorAll(".fav.listed").length)
    : (document.querySelector(".fav .count").innerHTML = "99+");
}

// // swipers

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
});
function mainSwiper() {
  let productsSwiper = new Swiper(".pro-swiper", {
    slidesPerView: 5,
    spaceBetween: 10,
    loop: true,
    speed: 600,
    centeredSlides: true,

    autoplay: {
      delay: 30000,
      disableOnInteraction: false,
    },

    navigation: {
      nextEl: ".pro-swiper .swiper-button-next",
      prevEl: ".pro-swiper .swiper-button-prev",
    },

    breakpoints: {
      1200: {
        slidesPerView: 5,
      },
      992: {
        slidesPerView: 4,
      },
      767: {
        slidesPerView: 3,
      },
      0: {
        slidesPerView: 1,
      },
    },
  });
}
