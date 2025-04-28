export { nameCheck, phoneCheck, textCheck, productCheck, addToProductsInput };
import {
  nameInput,
  phoneInput,
  nameW,
  phonew,
  productInput,
} from "./check-out-form-events.js";

function nameCheck() {
  let customer = nameInput.value;
  if (customer.split(" ").length >= 2) {
    nameW.classList.remove("warning");
    nameInput.dataset.status = true;
  } else {
    nameInput.dataset.status = false;
    nameW.classList.add("warning");
  }
}

function phoneCheck() {
  let phone = phoneInput.value;
  let regex = /01[0-2||5]\d{8}/;
  if (phone.length == 11 && regex.test(phone)) {
    phonew.classList.remove("warning");
    phoneInput.dataset.status = true;
  } else {
    phoneInput.dataset.status = false;
    phonew.classList.add("warning");
  }
}

function textCheck(e, a) {
  let data = e.value;
  let regex = /^\s*$/;
  if (regex.test(data)) {
    e.dataset.status = false;
    if (a) {
      a.classList.add("warning");
    }
  } else {
    e.dataset.status = true;
    if (a) {
      a.classList.remove("warning");
    }
  }
}

function productCheck() {
  textCheck(productInput);
  if (
    document.getElementById("products").dataset.status == "false" &&
    !document.querySelector(".products-popup")
  ) {
    let popup = document.createElement("div");
    popup.className = "products-popup";
    popup.innerHTML = `<span>You Must to choose products</span>`;
    popup.addEventListener("click", (e) => {
      e.target.closest(".products-popup").remove();
    });
    document.body.appendChild(popup);
    setTimeout(() => {
      popup.remove();
    }, 5000);
  }
}

let priceInput = document.getElementById("price");

function addToProductsInput() {
  let arr = [];
  JSON.parse(localStorage.cartedData).forEach((e) => {
    let pro = `(${e.proName} | ${e.proCount})`;
    arr.push(pro);
  });
  productInput.value = arr.join("-");
  priceInput.value = localStorage.price;
  productInput.dataset.status = true;
  priceInput.dataset.status = true;
}
