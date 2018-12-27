(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./js/footer.js":
/*!**********************!*\
  !*** ./js/footer.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

var install;
var footer = document.getElementsByClassName('footer-login-register')[0];
window.addEventListener('scroll', function(e) {
  clearTimeout(install);
  install = setTimeout(function(install) {
    getHeight();
  }, 40);
});
function getHeight() {
  console.log(install);
  var height = document.documentElement.scrollTop;
  if (height > 900) {
    footer.setAttribute('class', 'footer-login-register fade in');
  } else {
    footer.setAttribute('class', 'footer-login-register fade');
  }
}


/***/ })

}]);
//# sourceMappingURL=1.bundle.js.map