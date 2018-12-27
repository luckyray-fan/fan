<?php
/**
 * Created by PhpStorm.
 * User: 吉光片影aimer
 * Date: 2018/5/22
 * Time: 12:59
 */
header("Content-type:text/plain;charset=utf-8");
$site = $_POST['site'];
$name = $_POST['name'];
$lat = $_POST['lat'];
$lng = $_POST['lng'];

$conn = mysqli_connect('localhost','root','fangewudi1','w');
$select = "select uname,lat,lng from usr where (lat - 36.6737493716<0.008)and(lng - 117.14947573965<0.008)and(ids = 'drive')";
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
