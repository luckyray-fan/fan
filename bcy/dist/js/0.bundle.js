(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./js/banner.js":
/*!**********************!*\
  !*** ./js/banner.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

var slick = document.getElementsByClassName('slick-track')[0];
var illust_slick = document.querySelectorAll('indexSliders a');
var dots = document.querySelectorAll('.dm-dots li');
let length = 0;
let illust_len = 0;
const path = ['index', 'illust'];
var pathName = location.pathname;

function slide() {
  if (length <= -8700) length = 0;
  if (illust_len >= 5400) illust_len = 0;
  var tem = 'translateX(' + length + 'px)';
  var num = -length / 870;
  for (var i of dots) i.setAttribute('class', '');
  dots[num].setAttribute('class', 'slick-active');
  length -= 870;
  slick.style.transform = tem;
}

if (pathName.indexOf(path[0]) >= 0) setInterval(slide, 3000);


/***/ })

}]);
//# sourceMappingURL=0.bundle.js.map