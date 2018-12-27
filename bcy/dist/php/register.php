<?php
/**
 * Created by PhpStorm.
 * User: 吉光片影aimer
 * Date: 2018/12/25
 * Time: 21:24
 */
header("Content-type:text/plain;charset=utf-8");
$uname = $_POST['uname'] ? $_POST['uname'] : "";
$pass = $_POST['pass'] ? $_POST['pass'] : "";
$conn = mysqli_connect('localhost', 'root', '', "zuoye");
//如果没有建立的话就
$mysql = "show tables";
$query = mysqli_query($conn, $mysql);
$query = mysqli_fetch_row($query);
$sql_create = "CREATE TABLE MyGuests (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    uname VARCHAR(30) NOT NULL,
    pass VARCHAR(30) NOT NULL,
    email VARCHAR(50),
    reg_date TIMESTAMP
)";
if(!in_array('usr', $query, true))
  mysqli_query($conn,$sql_create);

$sql_select = "SELECT uname FROM usr WHERE uname = '$uname'";
$ret = mysqli_query($conn, $sql_select);
$row = mysqli_fetch_array($ret);

if ($uname == $row['uname']) {
  echo '{"s":false,"msg":"该用户已存在"}';
  mysqli_close($conn);
  exit();//header("Location:register.html?err=1");
}
$sql_insert = "insert into usr (uname,pass) values ('$uname','$pass')";
$ret = mysqli_query($conn, $sql_insert);
if($ret)
  echo '{"s":true,"msg":"注册成功"}';
mysqli_close($conn);