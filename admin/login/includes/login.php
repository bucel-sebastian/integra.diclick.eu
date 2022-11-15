<?php

    include "../../../includes/dbh.inc.php";

    
    session_start();

    error_reporting(0);

    $username = $_POST['username'];
    $password = $_POST['password'];

    $actualDate = date("Y-m-d H:i:s");

    $sql = "SELECT * FROM `admin_users` WHERE `username`='$username' OR `email`='$username'";
    $result = mysqli_query($conn,$sql);
    if(mysqli_num_rows($result)){
        $row = mysqli_fetch_assoc($result);
        if(password_verify($password,$row['password'])){
            
            $array = array("tip"=>"admin","nume"=>$row['nume'],"prenume"=>$row['prenume'],"username"=>$row['username'],"permissionRoles"=>$row['permissions_roles'],"unicId"=>$row['unicId']);

            $_SESSION['user-data']=(object) $array;

            $id = $row['unicId'];
            $sql = "UPDATE `admin_users` set `last_log_in`='$actualDate' WHERE `unicId`='$id'";
            mysqli_query($conn,$sql);

            echo '{"status":"success"}';

            
        }    
        else{
            echo '{"status":"fail","error":"wrong password"}';
        }
    }
    else{
        echo '{"status":"fail","error":"'.$conn->error.'"}';
    }

?>