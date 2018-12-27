<?php
/**
 * Created by PhpStorm.
 * User: 吉光片影aimer
 * Date: 2018/5/28
 * Time: 12:49
 */
header("Content-type:text/plain;charset=utf-8");
$text = $_POST['text'];
$uname = $_POST['uname'];
$chat_uname = $_POST['chat_uname'];
$conn = mysqli_connect("localhost","root","fangewudi1","w");
$insert = "insert into $uname (uname,chat_uname,chat_id,text) values ('$uname','$chat_uname',1,'$text') ";
$chat_insert = "insert into $chat_uname (uname,chat_uname,chat_id,text) values ('$chat_uname','$uname',2,'$text')";

$error = mysqli_query($conn,$insert);
$err = mysqli_query($conn,$chat_insert);
if(!$err || !$error)
{
    printf("Error: %s\n", mysqli_error($conn));
    exit();
}
echo '{"success":true}';
