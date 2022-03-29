import "./style/style.scss";

document.addEventListener("DOMContentLoaded", () => {
  let isHeaderActive = false;
  const hamburgerButton = document.querySelector(".hamburger-button");
  const header = document.querySelector(".header");
  hamburgerButton.addEventListener("click", () => {
    isHeaderActive = !isHeaderActive;
    if (isHeaderActive) {
      header.classList.add("is-active");
      hamburgerButton.classList.add("is-active");
    } else {
      header.classList.remove("is-active");
      hamburgerButton.classList.remove("is-active");
    }
  });
});
