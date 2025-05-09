import {
  nameCheck,
  phoneCheck,
  textCheck,
  productCheck,
  addToProductsInput,
} from "./form-check.js";
import { getAdress } from "./map.js";
import { countPopUpCart } from "./../all/cart.js";

export let nameInput = document.getElementById("name");
export let nameW = document.getElementsByClassName("alert")[0];

export let phoneInput = document.getElementById("phone");
export let phonew = document.getElementsByClassName("alert")[1];

export let addressInput = document.getElementById("address");
export let addressW = document.getElementsByClassName("alert")[2];

export let form = document.getElementById("check");
export let productInput = document.getElementById("products");

let inputs = document.querySelectorAll("input.data");

document.addEventListener("DOMContentLoaded", async () => {
  setTimeout(() => {
    inputs.forEach((e) => {
      if (e.value != "") {
        e.previousElementSibling.classList.add("focused");
        e.value != "" ? e.classList.add("true") : "";
      }
    });
  }, 1);
});
inputs.forEach((e) => {
  e.addEventListener("focus", () => {
    e.previousElementSibling.classList.add("focused");
    e.classList.add("true");
  });
  e.addEventListener("blur", () => {
    if (e.value == "") {
      e.previousElementSibling.classList.remove("focused");
      e.classList.remove("true");
    }
  });
});

nameInput.addEventListener("blur", () => {
  nameCheck();
});

phoneInput.addEventListener("blur", () => {
  phoneCheck();
});

addressInput.addEventListener("blur", () => {
  textCheck(addressInput, addressW);
  getAdress();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!localStorage.cartedData || localStorage.cartedData == "") {
    productCheck();
  } else if (nameInput.dataset.status != "true") {
    nameW.classList.add("warning");
  } else if (phoneInput.dataset.status != "true") {
    phonew.classList.add("warning");
  } else if (addressInput.dataset.status != "true") {
    addressW.classList.add("warning");
  } else {
    addToProductsInput();
    const formURL =
      "https://script.google.com/macros/s/AKfycbzaX9CyEZfo8ecj13KhsjRm__4PaHA1GkFPVmPW4rndeav4CJP17LpedHAONR1CgCdJ/exec";
    fetch(formURL, { method: "POST", body: new FormData(form) })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    localStorage.cartedData = "";
    localStorage.price = 0;
    localStorage.cartCount = 0;
    document.querySelector(
      ".total-price"
    ).innerHTML = `Total Price: ${localStorage.price} L.E`;
    inputs.forEach((e) => {
      e.dataset.status = false;
      e.value = "";
    });
    document.querySelectorAll(".added.listed").forEach((e) => {
      e.remove();
    });
    countPopUpCart();
  }
});
