// Aspetta che la pagina carichi del tutto
window.onload = function () {
  
  // Funzione per il pulsante per tornare in cuima
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

function close_window() {
  if (confirm("Chiudere la scheda?")) {
    close();
  }
}

// Carosello nelle pagine fiera
var myCarousel = document.querySelector('#myCarousel')
var carousel = new bootstrap.Carousel(myCarousel)