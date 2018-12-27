<?php
/**
 * Created by PhpStorm.
 * User: 吉光片影aimer
 * Date: 2018/5/23
 * Time: 0:14
 */
    $chat_uname = $_POST['chat_uname'];
    $uname = $_POST['uname'];
    $date = $_POST['date'];

    $conn = mysqli_connect("localhost","root","fangewudi1","w");
    $mysqli_select = "select text,chat_id,tt from '$uname' where (chat_uname = '$chat_uname')";

    $ret = mysqli_query($conn,$mysqli_select);
    while($array = mysqli_fetch_array($ret,MYSQLI_BOTH))
    {
        if($date-$array['tt']>86400)
        {
            $sayTo .= $array['text'].",".$array['chat_id'].",";
            $shijian .= $array['tt'].",";
        }
    }
    $sayTo = "\"".$sayTo."\"";

    echo '{"success":true,"msg":'.$sayTo.',"time1":"'.$shijian.'"}';