<?php

    include "dbh.inc.php";

    session_start();

    error_reporting(0);

    $username = $_POST['username'];
    $password = $_POST['password'];
    $sql = "SELECT * FROM users WHERE `username`='$username' OR `email`='$username'";
    $result = mysqli_query($conn,$sql);
    if(mysqli_num_rows($result)){
        $row = mysqli_fetch_assoc($result);
        if(password_verify($password,$row['password'])){
            $_SESSION['username']=$row['username'];
            $_SESSION['role']=$row["role"];
            $_SESSION['unicId']=$row["unicId"];
            $_SESSION['clientAt']=$row['clientAt'];
            if($_SESSION['role']==="admin"){
                echo "administrator";
            }
            else if($_SESSION['role']==="Owner"){
                echo "administrator";
            }
            else{
                echo "Client";
            }
        }
        else{
            echo "Wrong pass";
        }

        
    }
    else{
        echo "Error";
    }





?>