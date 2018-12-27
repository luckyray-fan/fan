<?php
/**
 * Created by PhpStorm.
 * User: 吉光片影aimer
 * Date: 2018/5/20
 * Time: 14:21
 */
header("Content-type:text/plain;charset=utf-8");

$lat = $_POST['lat'];
$lng = $_POST['lng'];
$username = $_POST['name'];
$conn = mysqli_connect('localhost','root','fangewudi1','w');
$sql_select = "update usr set lat='$lat',lng='$lng' where uname = '$username'";
mysqli_query($conn,$sql_select);
echo '{"suc":true,'.mysqli_error($conn).'}';
mysqli_close($conn);

