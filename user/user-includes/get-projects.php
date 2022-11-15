<?php

include "../../includes/dbh.inc.php";
include "../../includes/tasksdbh.inc.php";

session_start();

error_reporting(0);

if(isset($_SESSION['unicId'])){
    $clientId=$_SESSION['unicId'];

    $sql = "SELECT * FROM `$clientId`";
    $result = mysqli_query($tasksConn, $sql);
    
    if($result){
        while($row=mysqli_fetch_assoc($result)){
            echo $row['name']."÷".$row['projectId']."\n";
        }    
    }
}

?>