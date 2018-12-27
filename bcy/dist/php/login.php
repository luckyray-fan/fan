<?php
/**
 * Created by PhpStorm.
 * User: 吉光片影aimer
 * Date: 2018/12/25
 * Time: 21:24
 */
header("Content-type:text/plain;charset=utf-8");
$uname = $_POST['uname']?$_POST['uname']:"";
$pass = $_POST['pass']?$_POST['pass']:"";
$conn = mysqli_connect('localhost','root','',"zuoye");
$sql_select = "SELECT uname FROM usr WHERE uname = '$uname'";
$sql_select_pass = "SELECT pass FROM usr WHERE pass = '$pass'";
$ret = mysqli_query($conn,$sql_select);
$row = mysqli_fetch_array($ret);

if($uname!= $row['uname'])
{
  echo '{"s":false,"msg":"没有该用户"}';
  mysqli_close($conn);
  exit();//header("Location:register.html?err=1");
}
$ret = mysqli_query($conn,$sql_select_pass);
$row = mysqli_fetch_array($ret);
if($pass != $row['pass'])
{
  echo '{"s":false,"msg":"密码错误"}';
  mysqli_close($conn);
  exit();
}
else
{
  $_SESSION['name'] = $uname;
  $username = "\"".$uname."\"";  //还真的有必要
  echo '{"s":true,"msg":'.$username.'}';
}
mysqli_close($conn);