// JavaScript Document
var emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; //邮箱正则

var cardReg = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/;

var telephoneReg = /^(((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))+\d{8})$/;//手机格式

var qqReg = /^[1-9][0-9]{4,10}$/;
// 邮箱是否已经存在
var emailFlag = true;

var cardFlag = true;

var first = true;

var timestamp = null;

// 验证码
var checkcodeFlag = false;

//手机验证码
var msgCodeFlag = true;

//手机号是否已经存在
var phoneIsExisted = true;

//下拉选项
$(function () {
    //  1判断用户名是否为空
    $("#username_show").blur(function () {
        checkUsername();
    });
    //  2判断专业是否为空
    $("#major_show").blur(function () {
        checkMajor();
    });
    //  2判断班级是否为空
    $("#clazz_show").blur(function () {
        checkClazz();
    });
    $("#enrol_show").blur(function () {
        // checkEnrol();
        $('#enrol_msg').css('display', 'none');
    });
    //身份证号
    $("#card_show").blur(function () {
        var card = $(this).val();
        if (checkCard()) {
            var arr = markBirth(card);
            var sex = arr[0];
            $('#gender').val(sex);
            $('#day_show').val(arr[1] + '-' + arr[2] + '-' +arr[3]);
            $.ajax({
                url: "/valid/idCard/" + trim($("#card_show").val()),
                data: {},
                dataType: 'json',
                type: 'POST',
                success: function (data) {
                    if (data === 1) {
                        //邮箱已经注册过
                        $("#card_msg").css("display", "block").text("* 该身份证已注册");
                    } else {
                        //邮箱尚未注册
                        $("#card_msg").text("");
                        cardFlag = false;
                    }
                }
            });

        }
    });
     //微信号
    /* $("#wechat_show").blur(function(){
    	  checkWechat();
     });*/
    //qq号
    $("#qq_show").blur(function () {
        checkQq();
    });
    //地址
    $("#address_show").blur(function () {
        checkAddress();
    });
    //密码
    $("#password_show").blur(function () {
        //$("#password_msg").css("display","block").text("* 密码只能是6-20位的字母数字和下划");
        checkPassword();
    });
    //密码
    $("#repassword_show").blur(function () {
        //$("#password_msg").css("display","block").text("* 密码只能是6-20位的字母数字和下划");
        checkRepassword();
    });
    //邮箱
    $("#email_show").blur(function () {
        //共有两个任务   1判断邮箱的格式并加以提示  2 格式正确的话，判断邮箱是否已经存在  3 邮箱不存在的话，进行短信验证
        if (checkEmail()) {
            //邮箱格式正确
            //判断邮箱是否已经注册过
            $('.displaynone1').each(function () {
                $(this).removeClass('displaynone1');
            });
            var emailAddress = (trim($("#email_show").val()));
            $.ajax({
                url: "/valid/email",
                data: {address: emailAddress},
                dataType: 'json',
                type: 'POST',
                success: function (data) {
                    if (data === 1) {
                        //邮箱已经注册过
                        $("#email_msg").css("display", "block").text("* 该邮箱已注册");
                    } else {
                        //邮箱尚未注册
                        $("#email_msg").text("");
                        emailFlag = false;
                        //$("#sendMsg1").css("display", "block");
                    }
                }
            });
        }
    });

    //手机号输入完毕后，鼠标移除事件
    $("#telephone_show").blur(function () {
        //共有两个任务   1判断手机号的格式并加以提示  2 格式正确的话，判断手机号是否已经存在  3 手机号不存在的话，进行短信验证
        if (checkTelephone()) {
            //手机号格式正确
            //判断手机号是否已经注册过
            $.ajax({
                url: "/valid/mobile/" + trim($("#telephone_show").val()),
                data: {},
                dataType: 'json',
                type: 'POST',
                success: function (data) {
                    if (data === 1) {
                        //手机号已经注册过
                        $("#telephone_msg").css("display", "block").text("* 该手机号已注册");
                    } else {
                        //手机号尚未注册
                        $("#telephone_msg").text("");
                        phoneIsExisted = false;
                       // $("#sendMsg1").css("display", "inline-block");
                    }
                }
            });
        }
    });

    var k_ = true, countdown_ = 60;

    function settime(obj) {
        if (countdown_ === 0) {
            k_ = true;
            obj.val("获取验证码");
            countdown_ = 60;
            return;
        } else {
            obj.val("重新发送(" + countdown_ + ")");
            countdown_--;
        }
        setTimeout(function () {
            settime(obj)
        }, 1000)
    }

    //TODO 获取短信验证码
    $("#getCode_btn").click(function () {
       if(!checkTelephone()){
           return;
       }
       if(phoneIsExisted){
           $("#telephone_msg").css("display", "block").text("* 该手机号已注册");
           return;
       }
        if (k_) {
            k_ = false;
            settime($(this));
            $.ajax({
                url: '/service/message/auth/send',
                data: {"mobile": trim($("#telephone_show").val())},
                dataType: 'json',
                type: 'POST'
            });
        }
    });

    //TODO 验证手机验证码
    $("#msgCode").blur(function () {
       $("#message_msg").css("display", "block").text("*");
        var code = $("#msgCode").val();
        if (code == null || code === '') {
            return;
        }
        $.ajax({
            url: '/valid/mobile/auth',
            type: 'POST',
            data: {"mobile": trim($("#telephone_show").val())},
            success: function (data) {
                if (data == null || data === '') {
                    $("#message_msg").css("display", "block").text("* 请先获取验证码");
                } else {
                    /*console.log(data);*/
                    if (data === $('#msgCode').val()) {
                        msgCodeFlag = true;
                        // $("#message_msg").css("display", "block").text("* 验证码正确");
                        //手机验证码填写正确后手机号码不能修改
                        $("#telephone_show").attr("readonly", "readonly");
                        $("#message_msg").css("display", "block").text("");
                        $("#getCode_btn").click(function () {
                            $("#tishi2_msg").text("请勿重复点击");
                            popbox("#tishi2");
                        });
                    } else {
                        $("#message_msg").css("display", "block").text("* 验证码错误");
                    }
                }
            }
        });
    });

    // 注册事件事件
    $("#submit_btn").click(function () {

        // 防止重复注册
        $(this).css("display", "none");
        $("#submiting_btn").css("display", "inline-block");
        // 初始化错误信息
        // initErrorMsg();
        var arr = [true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true];
        //验证usrename
        if (!checkUsername()){
            arr[0] = false;
        }else{
            arr[0] = true;
        }if (!checkCard()){
            arr[1] = false;
        }else{
            arr[1] = true;
        }if (!checkEnrol()){
            arr[2] = false;
        }else{
            arr[2] = true;
        }if (!checkMajor()){
            arr[3] = false;
        }else{
            arr[3] = true;
        }if (!checkClazz()){
            arr[4] = false;
        }else{
            arr[4] = true;
        }if (!checkTelephone()){
            arr[5] = false;
        }else{
            arr[5] = true;
        }if (!checkEmail()){
            arr[6] = false;
        }else{
            arr[6] = true;
        }if (!checkPassword()){
            arr[7] = false;
        }else{
            arr[7] = true;
        }if (!checkRepassword()){
            arr[8] = false;
        }else{
            arr[8] = true;
        }if (!checkQq()){
            arr[9] = false;
        }else{
            arr[9] = true;
        }if (!checkAddress()){
            arr[10] = false;
        }else{
            arr[10] = true;
        }
        if(phoneIsExisted){
            $("#submit_btn").css("display","inline-block");
            $("#submiting_btn").css("display","none");
            arr[11] = false;
        }else{ arr[11] = true;}
        if(emailFlag){
            $("#submit_btn").css("display","inline-block");
            $("#submiting_btn").css("display","none");
            arr[12] = false;
        }else{arr[12] = true;}
        if (!checkCcode()){
            arr[13] = false;
        }else{
            arr[13] = true;
        }
        if(msgCodeFlag){
         $("#submit_btn").css("display","inline-block");
         $("#submiting_btn").css("display","none");
         // arr[14] = false;
        }else{ arr[14] = true;}
        var boxcheck = $('.checkbox').find('input[type=checkbox]').is(':checked');
        if(!boxcheck){
            arr[15] = false;
            var setTitle = '提示';
            var setContents = '请阅读并同意用户协议';
            var setButton = '["确定"]';
            $(this).openWindow(setTitle,setContents,setButton);
        }else{ arr[15] = true;}
        console.log(arr);
        if(judjeflase(arr)){
              var flag = $("form").submit();
        }
    });
});

//判断有没false
function judjeflase(arr){
   for(var i=0;i<arr.length;i++){
       if(arr[i] === false){
          return false;
       }
   }
   return true;
}

// 校验用户名
function checkUsername() {
    var username = $("#username_show").val();
    if (username == null || username === "" || username === undefined) {
        $("#username_msg").css("display", "block").text("* 真实姓名不能为空");
        return false;
    } else {
        $("#username_msg").css("display", "none");
    }
    return true;
}

// 校验密码
function checkPassword() {
    // 密码值
    var password = $("#password_show").val();
    // 确认密码值
    var repassword = $("#repassword_show").val();
    if (password == null || password == "" || password == undefined) {
        $("#submit_btn").css("display", "inline-block");
        $("#submiting_btn").css("display", "none");
        $("#password_msg").css("display", "block").text("* 密码不能为空");
        return false;
    }
    var regex = /^\w{6,20}$/;
    if (!regex.test(password)) {
        $("#submit_btn").css("display", "inline-block");
        $("#submiting_btn").css("display", "none");
        $("#password_msg").css("display", "block").text("* 密码只能是6-20位的字母数字和下划线");
        return false;
    }
    if (regex.test(password)) {
        $("#password_msg").css("display", "block").text("");
    }
    if (repassword != null && repassword != "" && repassword != undefined && (password == repassword)) {
        $("#rePassword_msg").css("display", "none");
    }
    return true;
}

// 确认密码
function checkRepassword() {
    // 密码值
    var password = $("#password_show").val();
    // 确认密码值
    var repassword = $("#repassword_show").val();
    if (repassword == null) {
        $("#submit_btn").css("display", "inline-block");
        $("#submiting_btn").css("display", "none");
        $("#rePassword_msg").css("display", "block");
        return false;
    } else {
        $("#rePassword_msg").css("display", "none");
    }
    if (repassword !== password) {
        $("#submit_btn").css("display", "inline-block");
        $("#submiting_btn").css("display", "none");
        $("#rePassword_msg").css("display", "block").text("* 您两次输入的密码不一致");
        return false;
    } else {
        $("#rePassword_msg").css("display", "none");
    }
    return true;
}

// 校验电话
function checkTelephone() {
    var telephone = $("#telephone_show").val();
    if (telephone == null || telephone === "" || telephone === undefined) {
        $("#submit_btn").css("display", "inline-block");
        $("#submiting_btn").css("display", "none");
        $("#telephone_msg").css("display", "block").text("* 电话号码不能为空");
        return false;
    } else {
        $("#telephone_msg").css("display", "none");
    }
    if (!telephoneReg.test(telephone)) {
        $("#submit_btn").css("display", "inline-block");
        $("#submiting_btn").css("display", "none");
        $("#telephone_msg").css("display", "block").text("您输入的电话号码格式不正确");
        return false;
    } else {
        $("#telephone_msg").css("display", "none");
    }
    return true;
}

//提取性别，出生年，出生月，出生日
function markBirth(card) {
    var arr = [];
    //获取性别
    if (parseInt(card.substr(16, 1)) % 2 === 1) {
        arr.push('男');
    } else {
        arr.push('女');
    }
    arr.push(card.substring(6, 10));
    arr.push(card.substring(10, 12));
    arr.push(card.substring(12, 14));
    return arr;
}

//校验邮箱
function checkEmail() {
    var email = $("#email_show").val();
    if (email == null || email === "" || email === undefined) {
        $("#submit_btn").css("display", "inline-block");
        $("#submiting_btn").css("display", "none");
        $("#email_msg").css("display", "block").text("* 邮箱不能为空");
        return false;
    } else {
        $("#email_msg").css("display", "none");
    }
    if (!emailReg.test(email)) {
        $("#submit_btn").css("display", "inline-block");
        $("#submiting_btn").css("display", "none");
        $("#email_msg").css("display", "block").text("您输入的邮箱格式不正确");
        return false;
    } else {
        $("#email_msg").css("display", "none");
    }
    return true;
}

// 校验身份证
function checkCard() {
    var card = $("#card_show").val();
    if (card == null || card === "" || card === undefined) {
        $("#submit_btn").css("display", "inline-block");
        $("#submiting_btn").css("display", "none");
        $("#card_msg").css("display", "block").text("* 身份证号不能为空");
        return false;
    } else {
        $("#card_msg").css("display", "none");
    }
    if (!cardReg.test(card)) {
        $("#submit_btn").css("display", "inline-block");
        $("#submiting_btn").css("display", "none");
        $("#card_msg").css("display", "block").text("* 您输入的身份证号不正确");
        return false;
    } else {
        $("#card_msg").css("display", "none");
    }
    return true;
}

//校验专业
function checkMajor() {
    var major = $("#major_show").val();
    if (major == null || major === "" || major === undefined) {
        $("#major_msg").css("display", "block").text("* 专业不能为空");
        return false;
    } else {
        $("#major_msg").css("display", "none");
    }
    return true;
}

//校验班级
function checkClazz() {
    var clazz = $("#clazz_show").val();
    if (clazz == null || clazz === "" || clazz === undefined) {
        $("#clazz_msg").css("display", "block").text("* 班级不能为空");
        return false;
    } else {
        $("#clazz_msg").css("display", "none");
    }
    return true;
}

//校验微信
function checkWechat() {
    var wechat = $("#wechat_show").val();
    if (wechat == null || wechat === "" || wechat === undefined) {
        $("#wechat_msg").css("display", "block").text("* 微信号不能为空");
        return false;
    } else {
        $("#wechat_msg").css("display", "none");
    }
    return true;
}

//校验地址
function checkAddress() {
    var address = $("#address_show").val();
    if (address == null || address === "" || address === undefined) {
        $("#address_msg").css("display", "block").text("* 地址不能为空");
        return false;
    } else {
        $("#address_msg").css("display", "none");
    }
    return true;
}

//校验入学年份
function checkEnrol() {
    var enrol = $("#enrol_show");
    var enrolDate = enrol.val();
    if (enrolDate == null || enrolDate === "" || enrolDate === undefined) {
        $("#enrol_msg").css("display", "block").text("* 入学年份不能为空");
        return false;
    } else {
        $("#enrol_msg").css("display", "none");
    }
    return true;
}

//校验验证码
function checkCcode() {
    var enrol = $("#ccode_show").val();
    if (enrol == null || enrol === "" || enrol === undefined) {
        $("#ccode_error_msg").css("display", "block").text("* 验证码不能为空");
        return false;
    } else {
        $("#ccode_error_msg").css("display", "none");
    }
    return true;
}

//验证qq
function checkQq() {
    var qq = $("#qq_show").val();
    if (qq == null || qq === "" || qq === undefined) {
        $("#submit_btn").css("display", "inline-block");
        $("#submiting_btn").css("display", "none");
        $("#qq_msg").css("display", "block").text("* qq号不能为空");
        return false;
    } else {
        $("#qq_msg").css("display", "none");
    }
    if (!qqReg.test(qq)) {
        $("#submit_btn").css("display", "inline-block");
        $("#submiting_btn").css("display", "none");
        $("#qq_msg").css("display", "block").text("* 您输入的qq号不正确");
        return false;
    } else {
        $("#qq_msg").css("display", "none");
    }
    return true;
}