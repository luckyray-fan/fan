<?php
/**
 * Created by PhpStorm.
 * User: 吉光片影aimer
 * Date: 2018/5/24
 * Time: 21:39
 */
    header("Content-type:text/plain;charset=utf-8");
    $uname = $_POST['uname'];
    $conn = mysqli_connect("localhost","root","fangewudi1","w");
    $select_head = "select back from usr where uname = '$uname'";
    $ret = mysqli_query($conn,$select_head);