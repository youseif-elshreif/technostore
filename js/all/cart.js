import { noProducts } from "./no-products.js";
import { prosClick } from "./events.js";

let cartPro = document.querySelector(".cart-products");
let countarr = [];

function cartCheck() {
  let addToCartBtn = document.querySelectorAll(".add-to-cart");
  addToCartBtn.forEach((e) => {
    if (localStorage.getItem("cartedData")) {
      [...JSON.parse(localStorage.getItem("cartedData"))].forEach((a) => {
        if (e.closest(".added").id == a.productId) {
          e.classList.add("carted");
        }
      });
    }
  });
  noProducts();
}

function addToCartOnClick(data) {
  let addToCartBtn = document.querySelectorAll(".add-to-cart");
  addToCartBtn.forEach((e) => {
    e.addEventListener("click", (e) => {
      if (!e.target.classList.contains("fa-slash")) {
        let cartDiv = e.target.closest(".add-to-cart");
        let proCard = cartDiv.closest(".added");
        if (!cartDiv.classList.contains("carted")) {
          addToCart(proCard.id, data);
          addProductCountToLocaol(proCard.id, proCard);
          cartDiv.classList.add("carted");
        }
        countPrice();
        countPopUpCart();
      }
    });
  });
}

function addToCart(ref, data) {
  const cartItem = document.createElement("div");
  cartItem.className = "added listed carted-card";
  cartItem.dataset.id = data[ref].id;
  prosClick(cartItem);
  const img = document.createElement("img");
  img.src = data[ref].img;
  img.loading = "lazy";
  img.alt = "";

  const textDiv = document.createElement("div");
  textDiv.className = "text";

  const cross = document.createElement("i");
  cross.className = "fa-solid fa-xmark";

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
  textDiv.append(cross, title, counterDiv);
  cartItem.append(img, textDiv);

  cartPro.appendChild(cartItem);
  cross.addEventListener("click", () => {
    delFromCart(cross.closest(".listed").dataset.id);
  });

  noProducts();
}

function countPrice() {
  let prices = JSON.parse(localStorage.cartedData);
  let total = 0;

  prices.forEach((e) => {
    let count = e.proCount;
    let price = e.proPrice;
    let proTotal = count * price;
    total += proTotal;
  });
  localStorage.price = total;
  document.querySelector(
    ".total-price"
  ).innerHTML = `Total Price: ${localStorage.price} L.E`;
}

function addProductCountToLocaol(e, card) {
  countarr = localStorage.cartedData ? JSON.parse(localStorage.cartedData) : [];

  let productIndex = countarr.findIndex((item) => item.productId == e);

  if (productIndex !== -1) {
    countarr[productIndex].proCount = card.querySelector(".num").innerHTML;
  } else {
    countarr.push({
      productId: e,
      proName: card.querySelector(".text h4").innerHTML,
      proCount: card.querySelector(".num").innerHTML,
      proPrice: parseInt(card.querySelector(".pricc").innerHTML),
    });
  }

  localStorage.cartedData = JSON.stringify(countarr);
}

function pronums() {
  let cards = Array.from(document.querySelectorAll(".carted-card"));
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
  let dataId = card?.dataset.id || target.closest(".added")?.id;
  let swiperCard = document.getElementById(`${dataId}`)?.querySelector(".num");
  let cartCard = document
    .querySelector(`[data-id="${dataId}"]`)
    ?.querySelector(".num");

  if (type === "plus") {
    ++cartCard.innerHTML;
    if (swiperCard) {
      ++swiperCard.innerHTML;
    }
  } else if (type === "minus") {
    if (swiperCard?.innerHTML > 1 || cartCard?.innerHTML > 1) {
      --cartCard.innerHTML;
      if (swiperCard) {
        --swiperCard.innerHTML;
      }
    } else {
      delFromCart(dataId);
    }
  }
  if (swiperCard?.innerHTML > 1 || cartCard?.innerHTML > 1) {
    addProductCountToLocaol(dataId, card);
  }
  countPopUpCart();
  countPrice();
  noProducts();
}

function countPopUpCart() {
  let change = document.querySelector(`.cart .count`);
  let total = document.querySelector(".total-count");
  let num = localStorage.cartedData
    ? JSON.parse(localStorage.cartedData).reduce((sum, item) => {
        return sum + Number(item.proCount);
      }, 0)
    : 0;

  if (change) {
    change.textContent = num <= 99 ? num : "99+";
  }
  total.textContent = `Total Products: ${num}`;

  localStorage.cartCount = num;
}

function delFromCart(e) {
  let cartedCard = Array.from(document.querySelectorAll(".carted-card"));

  let index2 = cartedCard.findIndex((a) => a.id == e);

  if (index2 != -1) {
    cartedCard[index2].querySelector(".add-to-cart").classList.remove("carted");
    cartedCard[index2].querySelector(".num").innerHTML = 1;
  }

  let arr = JSON.parse(localStorage.cartedData || "[]");
  let arrIndex = arr.findIndex((a) => a.productId == e);

  if (arrIndex !== -1) {
    arr.splice(arrIndex, 1);
    localStorage.cartedData = JSON.stringify(arr);
  }
  countPopUpCart();
  noProducts();
}

export {
  cartCheck,
  addToCartOnClick,
  addToCart,
  countPrice,
  pronums,
  handleCounter,
  countPopUpCart,
  delFromCart,
};
