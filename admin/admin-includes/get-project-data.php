<?php

include "../../includes/dbh.inc.php";
include "../../includes/tasksdbh.inc.php";

if(isset($_GET['clientId']) && isset($_GET['projectId'])){
    $clientId = $_GET['clientId'];
    $projectId= $_GET['projectId'];

    $sql = "SELECT * FROM `$clientId` WHERE `projectId`='$projectId'";
    $result=mysqli_query($tasksConn,$sql);
    while($row=mysqli_fetch_assoc($result)){
        echo $row['name']."÷".$row['projectStatus']."÷".$row['description']."÷".$row['endDate'];
    }
}