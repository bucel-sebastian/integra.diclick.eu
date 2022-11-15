<?php

include "../../includes/dbh.inc.php";
include "../../includes/tasksdbh.inc.php";

if(isset($_GET['clientId'])){
    $clientid=$_GET['clientId'];
    $clientIdTask=$clientid."_tasks";
    $sql = "SELECT * FROM `$clientIdTask`";
    $out="";

    $result = mysqli_query($tasksConn,$sql);
    while($row = mysqli_fetch_assoc($result)){
       $out.= $row['startDate']."÷".$row['endDate']."÷".$row['title']."÷".$row['taskUnicId']."÷".$row['taskStatus']."\n";
    }
    echo $out;
}
else{
    echo "client id error";
}

?>