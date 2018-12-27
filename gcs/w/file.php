<?php
/**
 * Created by PhpStorm.
 * User: 吉光片影aimer
 * Date: 2018/5/25
 * Time: 15:40
 */
header("Content-type:text/plain;charset=utf-8");
$uname = $_POST['username'];
//print_r($_FILES);

//$file = $_POST['data'];
//if(is_uploaded_file($_FILES['myfile']['tmp_name']))
//{
//    $uploaded_file = $_FILES['myfile']['tmp_name'];
//
//}
//$uname = $_POST['uname'];
//$filename = $_FILES['myfile']['name'];
//$type = $_FILES['myfile']['type'];
//$tmp = $_FILES['myfile']['tmp_name'];
//$size = $_FILES['myfile']['size'];
move_uploaded_file($_FILES['file']['tmp_name'],'img/head/'.$uname.'.jpg');
print_r($_FILES["file"]);
echo $_FILES['file']['tmp_name'];
echo '{"success":true}';