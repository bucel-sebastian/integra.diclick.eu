<?php

date_default_timezone_set("Europe/Bucharest");

$dbServername = "localhost";
$dbUsername = "root";
$dbPassowrd = "";
$dbName="clients_diclick_tasks";

$tasksConn = mysqli_connect($dbServername,$dbUsername,$dbPassowrd,$dbName);

?>

<!-- 
$dbServername = "localhost";
$dbUsername = "instore1_clients_diclick_admin";
$dbPassowrd = "chiloticugluga";
$dbName="instore1_clients_diclick_tasks"; -->