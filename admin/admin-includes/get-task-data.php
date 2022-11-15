<?php


include "../../includes/dbh.inc.php";
include "../../includes/tasksdbh.inc.php";

if(isset($_GET['taskId']) && isset($_GET['projectId'])){
    $taskId = $_GET['taskId'];
    $projectId= $_GET['projectId'];

    $sql = "SELECT * FROM `$projectId` WHERE `taskId`='$taskId'";
    $result=mysqli_query($tasksConn,$sql);
    while($row=mysqli_fetch_assoc($result)){
        echo $row['name']."÷".$row['icon']."÷".$row['description']."÷".$row['endDate'];
    }
}