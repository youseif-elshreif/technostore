export function noProducts() {
  const containers = document.querySelectorAll(".fav-list, .cart-products");

  containers.forEach((container) => {
    const hasListed = [...container.children].some((child) =>
      child.classList.contains("listed")
    );

    const oldMessage = container.querySelector(".no-products-text");

    if (!hasListed && !container.querySelector(".no-products-text")) {
      const message = document.createElement("div");
      message.className = "no-products-text";
      message.innerHTML = `<span>There are no products</span>`;
      container.appendChild(message);
    } else if (hasListed && oldMessage) {
      oldMessage.remove();
    }
  });
}
