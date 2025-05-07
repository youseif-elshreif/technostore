import { noProducts } from "./no-products.js";
import { prosClick } from "./events.js";

let favList = document.querySelector(".fav-list");
let favArr = [];

function addToFavOnClick(data) {
  let addToFavBtn = document.querySelectorAll(".add-to-fav");
  addToFavBtn.forEach((e) => {
    e.addEventListener("click", (e) => {
      let favDiv = e.target.closest(".add-to-fav");
      let proCard = favDiv.closest(".added");
      if (!favDiv.classList.contains("faved")) {
        addToFav(proCard.id, data);
        addfavToLocal(proCard.id);
        favDiv.classList.add("faved");
      } else {
        delFromFav(proCard.id);
        favDiv.classList.remove("faved");
      }
    });
  });
  favCheck();
}

function addToFav(ref, data) {
  const favItem = document.createElement("div");
  favItem.className = "fav listed added";
  favItem.dataset.id = data[ref].id;
  prosClick(favItem);
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

  del.addEventListener("click", () => {
    delFromFav(del.closest(".listed").dataset.id);
  });
  noProducts();
}

function addfavToLocal(e) {
  favArr = localStorage.favedData ? JSON.parse(localStorage.favedData) : [];

  favArr.push(e);

  localStorage.favedData = JSON.stringify([...new Set(favArr)]);
}

export function favCheck() {
  let addToFavBtn = document.querySelectorAll(".add-to-fav");
  addToFavBtn.forEach((e) => {
    if (localStorage.favedData) {
      [...JSON.parse(localStorage.favedData)].forEach((a) => {
        if (e.closest(".added").id == a) {
          e.classList.add("faved");
        }
      });
    }
  });
  noProducts();
}

function delFromFav(e) {
  let favedCard = Array.from(document.querySelectorAll(`[data-id="${e}"]`));

  let index = favedCard.findIndex((a) => a.dataset.id == e);

  if (index != -1) {
    favedCard.forEach((a) => {
      a.querySelector(".faved")?.classList.remove("faved");
      if (a.closest(".fav-list.darged-list")) {
        a.remove();
      }
    });
  }

  let arr = JSON.parse(localStorage.favedData);
  arr.splice(index, 1);

  localStorage.favedData = JSON.stringify(arr);
  favCoun();
  noProducts();
}

function favCoun() {
  document.querySelectorAll(".fav.listed").length <= 99
    ? (document.querySelector(".fav .count").innerHTML =
        document.querySelectorAll(".fav.listed").length)
    : (document.querySelector(".fav .count").innerHTML = "99+");
}

export { addToFavOnClick, addToFav };
