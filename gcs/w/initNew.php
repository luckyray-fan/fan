<?php
/**
 * Created by PhpStorm.
 * User: 吉光片影aimer
 * Date: 2018/5/23
 * Time: 12:58
 */
$name = $_POST['name'];
$conn = mysqli_connect("localhost","root","fangewudi1","w");
$mysqli_select = "select chat_uname from $name";
$ret = mysqli_query($conn,$mysqli_select);
$row = array();
    while($array = mysqli_fetch_array($ret))
        $row[] = $array;
    foreach ($row as $k => $value)
        $result .= $value['chat_uname'].",";
    $result = "\"".$result."\"";
    echo '{"success":true,"chat_uname":'.$result.'}';