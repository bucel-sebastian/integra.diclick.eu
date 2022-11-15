<?php

date_default_timezone_set("Europe/Bucharest");

$dbServername = "localhost";
$dbUsername = "diclicke_connector";
$dbPassowrd = "chiloticugluga";
$dbName="diclicke_clients_diclick_tasks";

$tasksConn = mysqli_connect($dbServername,$dbUsername,$dbPassowrd,$dbName);
// <!-- 
// $dbServername = "localhost";
// $dbUsername = "instore1_clients_diclick_admin";
// $dbPassowrd = "chiloticugluga";
// $dbName="instore1_clients_diclick_tasks"; -->
?>