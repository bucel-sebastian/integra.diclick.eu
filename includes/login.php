<?php

    include "dbh.inc.php";

    session_start();

    error_reporting(0);

    $username = $_POST['username'];
    $password = $_POST['password'];
    $sql = "SELECT * FROM `users` WHERE `username`='$username' OR `email`='$username'";
    $result = mysqli_query($conn,$sql);
    if(mysqli_num_rows($result)===1){
        $row = mysqli_fetch_assoc($result);
        if(password_verify($password,$row['password'])){
            $array = array("tip"=>"client","nume"=>$row['name'],"username"=>$row['username'],"unicId"=>$row['unicId'],"image"=>$row['image'],"language"=>$row['language'],"company"=>$row['company']);

            $_SESSION['user-data']=(object) $array;

            $id = $row['unicId'];
            $sql = "UPDATE `users` set `last_log_in`='$actualDate' WHERE `unicId`='$id'";
            mysqli_query($conn,$sql);
            
            echo '{"status":"success","tip":"client"}';
        }
        else{
            echo "Wrong pass";
        }

        
    }
    else{
        $sql = "SELECT * FROM `admin_users` WHERE `username`='$username' OR `email`='$username'";
        $result=mysqli_query($conn,$sql);
        if(mysqli_num_rows($result)===1){
            $row = mysqli_fetch_assoc($result);
            if(password_verify($password,$row['password'])){
                $array = array("tip"=>"admin","nume"=>$row['nume'],"prenume"=>$row['prenume'],"username"=>$row['username'],"permissionRoles"=>$row['permissions_roles'],"unicId"=>$row['unicId']);

                $_SESSION['user-data']=(object) $array;

                $id = $row['unicId'];
                $sql = "UPDATE `admin_users` set `last_log_in`='$actualDate' WHERE `unicId`='$id'";
                mysqli_query($conn,$sql);

                echo '{"status":"success","tip":"admin"}';
            }
        }
    }





?>