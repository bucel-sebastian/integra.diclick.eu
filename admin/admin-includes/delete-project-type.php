<?php

include "../../includes/dbh.inc.php";
include "../../includes/tasksdbh.inc.php";

if(isset($_GET['id'])){
    $id = $_GET['id'];

    $sql = "DELETE FROM `project_types` WHERE `unicId`='$id'";
    if(mysqli_query($tasksConn,$sql)){
        echo '{"status":"success"}';
    }
    else{
        echo '{"status":"fail","error":"'.$tasksConn->error.'"}';
    }
}