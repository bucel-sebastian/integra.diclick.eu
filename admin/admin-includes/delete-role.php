<?php

include "../../includes/dbh.inc.php";

session_start();
error_reporting(0);


if(isset($_SESSION['username']) && isset($_SESSION['role']) && ($_SESSION['role']==='admin' || $_SESSION['role'] === 'Owner')){

    if(isset($_GET['id'])){
        $roleId=$_GET['id'];

        $sql = "DELETE FROM `admin_roles` WHERE `roleId`='$roleId'";
        if(mysqli_query($conn,$sql)){
            echo '{"status":"success"}';
        }
        else{
            echo '{"status":"fail","error":"'.$conn->error.'"}';

        }   
    }
    

}