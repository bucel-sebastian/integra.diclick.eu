<?php


include "../../includes/dbh.inc.php";
include "../../includes/tasksdbh.inc.php";

$nume = $_POST['nume'];
$descriere = $_POST['descriere'];
$unicId = uniqid("ptype",false);
$tasks = array();





$tasksJSON = json_encode($tasks);

$sql = "INSERT INTO `project_types`(`unicId`, `nume`, `descriere`, `tasks`) VALUES ('$unicId','$nume','$descriere','$tasksJSON')";
if(mysqli_query($tasksConn,$sql)){
    echo '{"status":"success"}';
}
else{
    echo '{"status":"fail","error":"'.$tasksConn->error.'"}';
}