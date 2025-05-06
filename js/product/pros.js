import { addToCartOnClick, cartCheck } from "../all/cart.js";
import { getDataFromJson } from "../all/data.js";

document.addEventListener("DOMContentLoaded", async () => {
  const data = await getDataFromJson("js/all/products.json");
  addToCartOnClick(data);
  addPro(data);
  cartCheck();
});

const imgContainer = document.querySelector(".img");
const img = imgContainer.querySelector("img");
const zoomBox = imgContainer.querySelector(".zoom-box");

img.addEventListener("mousemove", function (e) {
  zoomBox.style.display = "block";

  //   const rect = img.getBoundingClientRect();
  //   const x = e.clientX - rect.left;
  //   const y = e.clientY - rect.top;

  //   const percentX = (x / img.offsetWidth) * 100;
  //   const percentY = (y / img.offsetHeight) * 100;

  //   zoomBox.style.backgroundImage = `url(${img.src})`;
  //   zoomBox.style.backgroundPosition = `${percentX}% ${percentY}%`;
});

img.addEventListener("mouseleave", function () {
  zoomBox.style.display = "none";
});

function addPro(data) {
  let container = document.querySelector(".container.added");
  container.id = localStorage.getItem("proId");

  let pro = document.querySelector(".pros");
  pro.id = container.id;

  let img = document.querySelector("img");
  img.src = data[container.id].img;
  img.alt = data[container.id].title;
  img.loading = "lazy";

  let title = document.querySelector(".text h4");
  title.textContent = data[container.id].title;

  let desc = document.querySelector(".text p");
  desc.textContent = data[container.id].description;

  let rateContainer = document.querySelector(".rate");
  let rating = data[container.id].rate;
  let fullStars = Math.floor(rating);
  let halfStars = rating % 1 >= 0.5 ? 1 : 0;
  let emptyStars = 5 - fullStars - halfStars;

  for (let i = 0; i < fullStars; i++) {
    let star = document.createElement("i");
    star.className = "fa-solid fa-star";
    rateContainer.appendChild(star);
  }

  if (halfStars) {
    let star = document.createElement("i");
    star.className = "fa-solid fa-star-half-stroke";
    rateContainer.appendChild(star);
  }

  for (let i = 0; i < emptyStars; i++) {
    let star = document.createElement("i");
    star.className = "fa-regular fa-star";
    rateContainer.appendChild(star);
  }

  let price = document.querySelector(".pricc");
  price.textContent = data[container.id].price + "LE";

  if (data[container.id].old_price) {
    let oldPrice = document.querySelector("del");
    oldPrice.textContent = data[container.id].old_price + "LE";
  }
}
