<?php
/**
 * Created by PhpStorm.
 * User: 吉光片影aimer
 * Date: 2018/5/27
 * Time: 15:32
 */
$old = $_POST['old_uname'];
$new = $_POST['new_uname'];
rename("image/head/".$old.".jpg","image/head/".$new.".jpg");
echo '{"success:"true}';
//if (!$data) {
//    printf("Error: %s\n", mysqli_error($dbc));
//    exit();
//}