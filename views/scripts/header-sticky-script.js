/** Regarding the stickness of the header navivgation bar */
// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// Get the navigationBar
var navigationBar = document.getElementById("navigationBar");

// Get the offset position of the navbar
var sticky = navigationBar.offsetTop;

// Add the sticky class to the navigationBar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset > sticky) {
    navigationBar.classList.add("sticky");
  } else {
    navigationBar.classList.remove("sticky");
  }
} 
/** end of reg: stick nav bar */