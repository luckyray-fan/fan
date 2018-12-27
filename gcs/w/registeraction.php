<?php

header("Content-type:text/plain;charset=utf-8");
/**
 * Created by PhpStorm.
 * User: 吉光片影aimer
 * Date: 2018/4/29
 * Time: 23:07
 */

    $username = isset($_POST['username'])?$_POST['username']:"";
    $password = isset($_POST['password'])?$_POST['password']:"";
    $re_password = isset($_POST['re_password'])?$_POST['re_password']:"";


$conn = mysqli_connect('localhost','root','fangewudi1',"w");


//        $conn = mysqli_connect('localhost','root','');

        $sql_select = "SELECT uname FROM usr WHERE uname = '$username'";
        $ret = mysqli_query($conn,$sql_select);
        $row = mysqli_fetch_array($ret);

        if($username == $row['name'])
        {
            echo '{"success":false,"msg":"重名请更改名字"}';
            //header("Location:register.html?err=1");
        }else
        {
            $sql_select = "INSERT INTO usr(uname,pass) VALUES('$username','$password')";
            mysqli_query($conn,$sql_select);
            $set_sql = "create table $username (uname char(15),chat_uname char(15),text text,tt int(15),chat_id int(11),friends varchar(255))";
            if($conn->query($set_sql))
                echo '{"success":true}';
            else{
                echo '{"success":false,"msg":"'.mysqli_error($conn).'"}';
            }
           // header("Location:register.html?err=3");
        }
        mysqli_close($conn);

