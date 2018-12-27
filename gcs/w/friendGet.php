<?php
/**
 * Created by PhpStorm.
 * User: 吉光片影aimer
 * Date: 2018/5/27
 * Time: 13:06
 */
header("Content-type:text/plain;charset=utf-8");
$uname = $_POST['uname'];
$conn = mysqli_connect("localhost","root","fangewudi1","w");
$select = "select friends from $uname";
$ret = mysqli_query($conn,$select);
if (!$ret) {
    printf("Error: %s\n", mysqli_error($conn));
    exit();
}
$row = array();
while($array = mysqli_fetch_array($ret,MYSQLI_BOTH))
    $row[] = $array;
$friend_uname = "";
foreach ($row as $k => $value)
    $friend_uname .= $value['friends'].",";
$friend_uname = "\"".$friend_uname."\"";
echo '{"success":true,"friend_uname":'.$friend_uname.'}';