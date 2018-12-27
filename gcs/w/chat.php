<?php
/**
 * Created by PhpStorm.
 * User: 吉光片影aimer
 * Date: 2018/6/2
 * Time: 19:50
 */
$chat_uname = $_POST['chat_uname'];
$uname = $_POST['uname'];
$date = $_POST['date'];

$conn = mysqli_connect("localhost","root","fangewudi1","w");
$mysqli_select = "select text,chat_id from $uname where (chat_uname = '$chat_uname')";

$ret = mysqli_query($conn,$mysqli_select);
    while($array = mysqli_fetch_array($ret,MYSQLI_BOTH))
        $sayTo .= $array['text'].",".$array['chat_id'].",";
if(!$ret)
{
    printf("Error: %s\n", mysqli_error($conn));
    exit();
}

$sayTo = "\"".$sayTo."\"";

echo '{"success":true,"msg":'.$sayTo.'}';