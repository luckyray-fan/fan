<?php
/**
 * Created by PhpStorm.
 * User: 吉光片影aimer
 * Date: 2018/5/21
 * Time: 16:31
 */
    session_start();
    echo "sid:".SID."<br>";
    echo "session_id:".session_id()."<br>";
    echo "<br>".$_SESSION['name'];
    echo "cookie".$_COOKIE['PHPSESSID'];
    session_destroy();