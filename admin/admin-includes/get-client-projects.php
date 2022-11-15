<?php

include "../../includes/dbh.inc.php";
include "../../includes/tasksdbh.inc.php";

if(isset($_GET['clientId'])){
    $clientId=$_GET['clientId'];

    $sql = "SELECT * FROM `$clientId`";
    $result = mysqli_query($tasksConn, $sql);
    if($result){
        while($row=mysqli_fetch_assoc($result)){
            echo $row['name']."÷".$row['projectId']."\n";
        }    
    }
}

?>