<?php
/**
 * Created by PhpStorm.
 * User: 吉光片影aimer
 * Date: 2018/6/2
 * Time: 18:22
 */

$conn = mysqli_connect("localhost","root","fangewudi1","w");
$sele = "rename table ll to lw";
if(!$conn->query($sele))
{
    printf("Error: %s\n", mysqli_error($conn));
    exit();
}else{
    echo true;
}