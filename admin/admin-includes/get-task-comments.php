<?php
include "../../includes/dbh.inc.php";
include "../../includes/tasksdbh.inc.php";

if(isset($_GET['projectId']) && isset($_GET['taskId'])){
    $projectId=$_GET['projectId'];
    $taskId=$_GET['taskId'];

    $sql="SELECT * FROM `$projectId` WHERE `taskId`='$taskId'";
    $result=mysqli_query($tasksConn,$sql);
    if($result){
        $row=mysqli_fetch_assoc($result);
        echo $row['comments'];
    }
    else{
        echo $tasksConn->error;
    }
}

?>
