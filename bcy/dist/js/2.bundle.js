(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./js/login.js":
/*!*********************!*\
  !*** ./js/login.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

var phone = document.getElementsByClassName('js-account')[0];
var email = document.getElementsByClassName('js-mobile')[0];
var change = document.getElementsByClassName("js-change-login")[0];

function toggle() {
  if (phone.classList.contains("hide")) {
    phone.setAttribute("class", "js-account");
    email.setAttribute("class", "js-mobile hide");
  } else {
    email.setAttribute("class", "js-mobile");
    phone.setAttribute("class", "js-account hide");
  }
}

function login() {
  var uname = document.getElementById('email');
  var pass = document.getElementById('password');
  var sendText;
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "php/login.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  sendText = "uname=" + uname.value + "&pass=" + pass.value;
  xhr.send(sendText);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var con = JSON.parse(xhr.responseText);
      var name = con.msg;
      if (con.s)
      {
        layer.msg('欢迎登陆 '+ uname.value);
        document.cookie = "uname="+uname.value;
        setTimeout("location.href = \"./index.html\";",2000);
      }
    }
  }
}

/***/ })

}]);
//# sourceMappingURL=2.bundle.js.map