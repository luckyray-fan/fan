var name1 = document.getElementById("person-name");
var warn = document.getElementsByClassName("form-warning");
console.log(name1)
name1.onblur = checkName;
function checkName() {
    var name = name1.innerText;
    if(!name)
        warn[0].innerHTML = "未正确填写名字"
    else
    {
        warn[0].innerHTML = "√";
        warn[0].style.color = "green"
    }
}