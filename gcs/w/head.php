<?php
/**
 * Created by PhpStorm.
 * User: 吉光片影aimer
 * Date: 2018/5/24
 * Time: 17:10
 */
    header("Content-type:text/plain;charset=utf-8");
    $uname = $_POST['uname'];
    $conn = mysqli_connect("localhost","root","fangewudi1","w");
    $select_head = "select head,back from usr where uname = '$uname'";
    $ret = mysqli_query($conn,$select_head);
    if (!$ret) {
    printf("Error: %s\n", mysqli_error($conn));
    exit();
    }
    $row = array();
    while($array = mysqli_fetch_array($ret,MYSQLI_BOTH))
        $row[] = $array;
    foreach($row as $k => $value)
    {
        $url = $value['head'];
        $back = $value['back'];
    }
    $url = "\"".$url."\"";
    $back = "\"".$back."\"";
    echo '{"success":true,"url":'.$url.',"back":'.$back.'}';