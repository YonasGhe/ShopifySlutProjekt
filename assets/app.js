document.addEventListener("DOMContentLoaded", function() {
  const header = document.querySelector(".header");
  const accountIcon = document.createElement("div");
  accountIcon.classList.add("header__icon", "header__icon--profile", "link", "focus-inset");
  accountIcon.innerHTML = `
    <img src="https://cdn.shopify.com/s/files/1/0694/3732/5533/files/user.png?v=1712920812" alt="">
    `;
  header.insertBefore(accountIcon, header.firstChild);
  accountIcon.addEventListener("click", function() {
    console.log("Clicked on account icon");
  });
});
