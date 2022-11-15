<?php

include "../../includes/dbh.inc.php";

session_start();
error_reporting(0);

if(isset($_GET['id'])){
    $id=$_GET['id'];
    $clientId=$_SESSION['unicId'];

    $clientNotif=$clientId."_notifications";
    $sql="DELETE FROM `$clientNotif` WHERE `id`='$id'";
    $result=mysqli_query($conn,$sql);
    if($result){
        echo "success";
    }
    else{
        echo "fail";
    }
}