<?php
/**
 * Created by PhpStorm.
 * User: 吉光片影aimer
 * Date: 2018/5/26
 * Time: 15:49
 */
$uname = $_POST['uname'];
$new_uname = $_POST['new_uname'];
$back = $_POST['back'];
$sex = $_POST['sex'];

$conn = mysqli_connect('localhost','root','fangewudi1','w');
$select = "update usr set uname = '$new_uname',back = '$back',sex = '$sex' where uname = '$uname'";
$change = "rename table $uname to $new_uname";
mysqli_query($conn,$select);
if(!$conn->query($sele))
{
    printf("Error: %s\n", mysqli_error($conn));
    exit();
}
$error = "\"".mysqli_error($conn)."\"";
echo '{"success:"true,"msg:'.$error.'}';