import { backImage } from "./all/events.js";

function scrollEvent() {
  let computedStyle = window.getComputedStyle(backImage);
  let leftValue = computedStyle.getPropertyValue("left");
  let bottomValue = computedStyle.getPropertyValue("bottom");
  window.onscroll = () => {
    let value = scrollY;
    backImage.style.left = parseInt(leftValue) - value * 0.6 + "px";
    backImage.style.bottom = parseInt(bottomValue) - value * 0.4 + "px";
  };
}

function preloadMainBack() {
  if (backImage.complete) {
    backImage.classList.add("loaded");
  } else {
    backImage.onload = () => {
      backImage.classList.add("loaded");
    };
  }
}
scrollEvent();
preloadMainBack();
