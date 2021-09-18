// Wait for page to load
window.onload = function () {
  //Get the top button:
  var scrollToTopBtn = document.getElementById("scrollToTopBtn");
  scrollToTopBtn.addEventListener("click", scrollToTop);
};

// Get the root of document
var rootElement = document.documentElement;

// Scroll to the top
function scrollToTop() {
  rootElement.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

var myCarousel = document.querySelector('#myCarousel')
var carousel = new bootstrap.Carousel(myCarousel)