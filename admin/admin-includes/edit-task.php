<?php

include "../../includes/dbh.inc.php";
include "../../includes/tasksdbh.inc.php";


$projectId = $_POST['projectId'];
$taskId = $_POST['taskId'];
$title = $_POST['title'];
$description = $_POST['text'];
$endDate= $_POST['enddate'];
$icon = $_POST['icon'];

$sql="UPDATE `$projectId` SET `name`='$title',`description`='$description',`icon`='$icon',`endDate`='$endDate' WHERE `taskId`='$taskId'";
$result=mysqli_query($tasksConn,$sql);
if($result){
    echo "success";
}
else{
    echo $tasksConn->error;
}
