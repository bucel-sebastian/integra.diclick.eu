<?php
include "../../includes/dbh.inc.php";
include "../../includes/tasksdbh.inc.php";

$clientId = $_POST['clientId'];
$projectId=$_POST['projectId'];
$title = $_POST['title'];
$description = $_POST['text'];
$endDate= $_POST['enddate'];
$status = $_POST['status'];

$sql= "UPDATE `$clientId` SET `projectStatus`='$status',`endDate`='$endDate',`name`='$title',`description`='$description' WHERE `projectId`='$projectId'";
$result= mysqli_query($tasksConn,$sql);
if($result){
    echo "success";
}
else{
    echo $tasksConn->error;
}