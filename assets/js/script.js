'use strict';



/**
 * PRELOAD
 * 
 * loading will be end after document is loaded
 */

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  if (preloader) preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * NAVBAR
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

if (navbar && overlay && navTogglers.length) {
  addEventOnElements(navTogglers, "click", toggleNavbar);
}



/**
 * HEADER & BACK TOP BTN
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
}

window.addEventListener("scroll", function () {
  if (!header || !backTopBtn) return;

  if (window.scrollY >= 50) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}, { passive: true });



/**
 * HERO SLIDER
 */

const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  if (!heroSliderItems.length || !lastActiveSliderItem) return;
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  updateSliderPos();
}

if (heroSliderNextBtn) heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }

  updateSliderPos();
}

if (heroSliderPrevBtn) heroSliderPrevBtn.addEventListener("click", slidePrev);

/**
 * auto slide
 */

let autoSlideInterval;

const autoSlide = function () {
  if (!heroSliderItems.length) return;
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 7000);
}

const sliderButtons = [heroSliderNextBtn, heroSliderPrevBtn].filter(Boolean);
if (sliderButtons.length) {
  addEventOnElements(sliderButtons, "mouseover", function () {
    clearInterval(autoSlideInterval);
  });

  addEventOnElements(sliderButtons, "mouseout", autoSlide);
}

window.addEventListener("load", autoSlide);

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    clearInterval(autoSlideInterval);
  } else {
    autoSlide();
  }
});


/**
 * PARALLAX EFFECT
 */

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

if (parallaxItems.length) {
  let rafId;

  window.addEventListener("mousemove", function (event) {
    if (rafId) return;

    rafId = window.requestAnimationFrame(() => {
      const baseX = ((event.clientX / window.innerWidth) * 10 - 5) * -1;
      const baseY = ((event.clientY / window.innerHeight) * 10 - 5) * -1;

      for (let i = 0, len = parallaxItems.length; i < len; i++) {
        const speed = Number(parallaxItems[i].dataset.parallaxSpeed) || 1;
        const x = baseX * speed;
        const y = baseY * speed;
        parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
      }

      rafId = null;
    });
  }, { passive: true });
}

document.addEventListener('DOMContentLoaded', () => {
  const dropdowns = document.querySelectorAll('.dropdown');

  dropdowns.forEach((drop) => {
    const btn = drop.querySelector('.dropbtn');
    if (!btn) return;

    btn.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();

      drop.classList.toggle('open');
      dropdowns.forEach((other) => {
        if (other !== drop) other.classList.remove('open');
      });
    });
  });

  window.addEventListener('click', () => {
    dropdowns.forEach((drop) => drop.classList.remove('open'));
  }, { passive: true });
});

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('page-search');

  if (!searchInput) return;

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const contentItems = document.querySelectorAll('.searchable'); // Add class "searchable" to elements you want to search

    contentItems.forEach(item => {
      const text = item.textContent.toLowerCase();
      if (text.includes(query)) {
        item.style.display = ''; // show item
      } else {
        item.style.display = 'none'; // hide item
      }
    });
  });
});







