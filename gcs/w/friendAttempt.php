<?php
/**
 * Created by PhpStorm.
 * User: 吉光片影aimer
 * Date: 2018/5/26
 * Time: 20:22
 */
header("Content-type:text/plain;charset=utf-8");

$lat = $_POST['lat'];
$lng = $_POST['lng'];

$conn = mysqli_connect('localhost','root','fangewudi1','w');
$select = "select uname,lat,lng from usr where (lat - '$lat'<0.008)and(lng - '$lng'<0.008)";
$delete = "delete uname from usr where uname = '$uname'";
$ret = mysqli_query($conn,$select);
$row=array();
while($array = mysqli_fetch_array($ret,MYSQLI_BOTH))
    $row[] = $array;
//$name = $row[5]['uname'];
$name = "";
$lat = "";
$lng ="";
foreach ($row as $k => $value)
    $name .= $value['uname']." ";
foreach ($row as $k => $value)
    $lat .= $value['lat'].",";
foreach ($row as $k => $value)
    $lng .= $value['lng'].",";
$name = "\"".$name."\"";
$lat = "\"".$lat."\"";
$lng = "\"".$lng."\"";
echo '{"success":true,"name":'.$name.',"lat":'.$lat.',"lng":'.$lng.'}';
