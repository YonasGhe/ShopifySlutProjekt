//#region resources/js/app.js
document.addEventListener("DOMContentLoaded", function() {
	const mobileMenuToggle = document.querySelector(".header__mobile-menu");
	const mobileMenu = document.querySelector(".mobile-menu");
	const mobileMenuClose = document.querySelector(".mobile-menu__close");
	if (mobileMenuToggle && mobileMenu) {
		mobileMenuToggle.addEventListener("click", function() {
			mobileMenu.classList.add("active");
			document.body.style.overflow = "hidden";
		});
		if (mobileMenuClose) mobileMenuClose.addEventListener("click", function() {
			mobileMenu.classList.remove("active");
			document.body.style.overflow = "";
		});
		document.addEventListener("click", function(e) {
			if (mobileMenu.classList.contains("active") && !mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
				mobileMenu.classList.remove("active");
				document.body.style.overflow = "";
			}
		});
	}
	const searchToggle = document.querySelector(".header__search-icon");
	const searchOverlay = document.querySelector(".header__search-overlay");
	const searchInput = document.querySelector(".header__search-input");
	if (searchToggle && searchOverlay && searchInput) {
		searchToggle.addEventListener("click", function() {
			searchOverlay.classList.add("active");
			setTimeout(() => searchInput.focus(), 100);
		});
		searchOverlay.addEventListener("click", function() {
			searchOverlay.classList.remove("active");
		});
		document.addEventListener("keydown", function(e) {
			if (e.key === "Escape" && searchOverlay.classList.contains("active")) searchOverlay.classList.remove("active");
		});
	}
	let lastScroll = 0;
	const headerElement = document.querySelector(".header");
	if (headerElement) window.addEventListener("scroll", function() {
		const currentScroll = window.pageYOffset;
		if (currentScroll > 100) {
			headerElement.classList.add("header--sticky");
			if (currentScroll > lastScroll && currentScroll > 200) headerElement.style.transform = "translateY(-100%)";
			else headerElement.style.transform = "translateY(0)";
		} else {
			headerElement.classList.remove("header--sticky");
			headerElement.style.transform = "translateY(0)";
		}
		lastScroll = currentScroll;
	});
	document.querySelectorAll("a[href^=\"#\"]").forEach((anchor) => {
		anchor.addEventListener("click", function(e) {
			const href = this.getAttribute("href");
			if (href && href !== "#") {
				const target = document.querySelector(href);
				if (target) {
					e.preventDefault();
					target.scrollIntoView({
						behavior: "smooth",
						block: "start"
					});
				}
			}
		});
	});
	const images = document.querySelectorAll("img[data-src]");
	if ("IntersectionObserver" in window) {
		const imageObserver = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const img = entry.target;
					img.src = img.dataset.src;
					img.classList.add("loaded");
					observer.unobserve(img);
				}
			});
		});
		images.forEach((img) => imageObserver.observe(img));
	}
	if (!document.querySelector(".back-to-top")) {
		const backToTop = document.createElement("button");
		backToTop.classList.add("back-to-top");
		backToTop.innerHTML = "↑";
		backToTop.setAttribute("aria-label", "Back to top");
		document.body.appendChild(backToTop);
		window.addEventListener("scroll", function() {
			if (window.pageYOffset > 300) backToTop.classList.add("visible");
			else backToTop.classList.remove("visible");
		});
		backToTop.addEventListener("click", function() {
			window.scrollTo({
				top: 0,
				behavior: "smooth"
			});
		});
	}
});
//#endregion
