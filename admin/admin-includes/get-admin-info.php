<?php

include "../../includes/dbh.inc.php";

session_start();
error_reporting(0);

$userdata = $_SESSION['user-data'];
if(isset($userdata->unicId) && isset($userdata->tip) && $userdata->tip === "admin"){


    if(isset($_GET['get-role'])){
        $id=$_GET['id'];
        $sql = "SELECT * FROM `admin_users` WHERE `unicId`='$id'";
        $result = mysqli_query($conn,$sql);
        if($result){
            if(mysqli_num_rows($result)===1){
                $row=mysqli_fetch_assoc($result);
                echo '{"id":"'.$id.'","role":"'.$row['permissions_roles'].'"}';
            }
        }
    }
    else{
        $unicId=$userdata->unicId;

        $sql = "SELECT * FROM `admin_users` WHERE `unicId`='$unicId'";
        $result = mysqli_query($conn,$sql);
        if($result){
            if(mysqli_num_rows($result)===1){
                $row=mysqli_fetch_assoc($result);
                echo '{"name":"'.$row['name'].'","function":"'.$row['function'].'","phone":"'.$row['telefon'].'","email":"'.$row['email'].'"}';
            }
        }
    }
    
    

}