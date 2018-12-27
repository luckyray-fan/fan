<?php
/**
 * Created by PhpStorm.
 * User: 吉光片影aimer
 * Date: 2018/12/24
 * Time: 20:55
 */
$conn = mysqli_connect('localhost','root','',"zuoye");
//echo $_SERVER["SERVER_SOFTWARE"];
$mysql = "show tables";
$query = mysqli_query($conn,$mysql);
$query = mysqli_fetch_row($query);
print "<pre>";
print_r(in_array('usr',$query,true));
print "</pre>";