require('../css/main.css');
import('./footer');
import('./banner');

var pop = document.getElementsByClassName('dm-popover')[0];

function usrName() {
  var usr = document.getElementsByClassName('usr-name')[0];
  var obj = {};
  if ($.cookie('uname')) {
    var tem = document.cookie;
    tem = tem.split(";");
    tem.forEach(function(item, index) {
      var name = item.split("=");
      obj[name[0]] = name[1];
    });
    usr.textContent = obj["uname"];
  }
}
usrName();
