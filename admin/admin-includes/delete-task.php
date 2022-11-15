<?php

include "../../includes/dbh.inc.php";
include "../../includes/tasksdbh.inc.php";

if(isset($_GET['taskId']) && isset($_GET['projectId'])){
    $taskId= $_GET['taskId'];
    $projectId= $_GET['projectId'];

    $sql = "DELETE FROM `$projectId` WHERE `taskId` = '$taskId'";
    $result = mysqli_query($tasksConn,$sql);
    if($result){
        echo "success";
    }
    else{
        echo $tasksConn ->error;
    }
}