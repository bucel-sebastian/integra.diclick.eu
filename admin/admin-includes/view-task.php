<?php

include "../../includes/dbh.inc.php";
include "../../includes/tasksdbh.inc.php";

if(isset($_GET['taskId']) && isset($_GET['clientId'])){
    $clientId=$_GET['clientId'];
    $clientIdTask=$clientId."_tasks";
    $taskId=$_GET['taskId'];

    $sql = "SELECT * FROM `$clientIdTask` WHERE `taskUnicId` = '$taskId'";
    $out='';
    $result = mysqli_query($tasksConn,$sql);
    while($row = mysqli_fetch_assoc($result)){
        $out.= $row['taskStatus']."÷".$row['startDate']."÷".$row["endDate"]."÷".$row['title']."÷".$row['text']."÷".$row['files']."÷".$row['comments'];
    }
    echo $out;
}
else{
    echo "task id error";
}



?>