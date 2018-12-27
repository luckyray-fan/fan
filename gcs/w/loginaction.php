<?php
/**
 * Created by PhpStorm.
 * User: 吉光片影aimer
 * Date: 2018/5/20
 * Time: 22:50
 */$username = isset($_POST['username'])?$_POST['username']:"";
$password = isset($_POST['password'])?$_POST['password']:"";


$conn = mysqli_connect('localhost','root','fangewudi1',"w");


//        $conn = mysqli_connect('localhost','root','');

$sql_select = "SELECT uname FROM usr WHERE uname = '$username'";
$sql_select_pass = "SELECT pass FROM usr WHERE pass = '$password'";
$ret = mysqli_query($conn,$sql_select);
$row = mysqli_fetch_array($ret);

if($username != $row['uname'])
{
    echo '{"success":false,"msg":"没有该用户"}';
    mysqli_close($conn);
    exit();//header("Location:register.html?err=1");
}
$ret = mysqli_query($conn,$sql_select_pass);
$row = mysqli_fetch_array($ret);
if($password != $row['pass'])
{
    echo '{"success":false,"msg":"密码错误"}';
    mysqli_close($conn);
    exit();
}
else
{
    $_SESSION['name'] = $username;
    $username = "\"".$username."\"";  //还真的有必要
    echo '{"success":true,"msg":'.$username.'}';
}
mysqli_close($conn);
