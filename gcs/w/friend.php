<?php
/**
 * Created by PhpStorm.
 * User: 吉光片影aimer
 * Date: 2018/5/27
 * Time: 11:21
 */
header("Content-type:text/plain;charset=utf-8");
$uname = $_POST['uname'];
$AttName = $_POST['AttName'];
$conn = mysqli_connect("localhost","root","fangewudi1","w");
$select = "insert into '$uname' (friends) values ('$AttName')";
$att_select = "insert into '$AttName' (friends) values ('$uname')";
mysqli_query($conn,$select);
mysqli_query($conn,$select);
$error = "\"".mysqli_error($conn)."\"";
echo '{"success:"true,"msg:"'.$error.'}';