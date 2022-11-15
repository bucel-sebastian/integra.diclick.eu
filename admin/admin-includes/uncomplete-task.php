<?php

include "../../includes/dbh.inc.php";
include "../../includes/tasksdbh.inc.php";


if(isset($_GET['taskId']) && isset($_GET['projectId'])){
    $taskId=$_GET['taskId'];
    $projectId= $_GET['projectId'];

    $sql = "UPDATE `$projectId` SET `status`='1' WHERE `taskId`='$taskId'";
    $result=mysqli_query($tasksConn,$sql);
    if($result){
        echo "Success";
    }
    else{
        echo "";
    }
}



?>