<?php

include "../../includes/crmdbh.inc.php";
include "../../includes/dbh.inc.php";

session_start();
error_reporting(0);

if(isset($_SESSION['unicId']) && isset($_SESSION['role']) && ($_SESSION['role']==="Owner" || $_SESSION['role']==="admin")){
    $adminId = $_SESSION['unicId'];

    $oldPass = $_POST['old-password'];
    $newPass = $_POST['new-password'];
    $reNewPass = $_POST['re-new-password'];

    if($newPass === $reNewPass){
        $sql = "SELECT * FROM `users` WHERE `unicId`='$adminId'";
        $result = mysqli_query($conn,$sql);
        if($result){
            if(mysqli_num_rows($result)===1){
                $row = mysqli_fetch_assoc($result);
                if(password_verify($oldPass,$row['password'])){
                    $hashNewPass = password_hash($newPass,PASSWORD_BCRYPT,["cost"=>10]);

                    $sql = "UPDATE `users` SET `password`='$hashNewPass' WHERE `unicId`='$adminId'";
                    if(mysqli_query($conn,$sql)){
                        echo '{"status":"success"}'; 
                    }
                    else{
                        echo '{"status":"fail","error":"'.$conn->error.'"}';   
                    }
                }
                else{
                    echo '{"status":"fail","error":"Parola veche este gresita."}';
                }
            }
            else{
                echo '{"status":"fail","error":"A aparut o problema."}';
            }
        }
        else{
            echo '{"status":"fail","error":"'.$conn->error.'"}'; 
        }
    }
    else{
        echo '{"status":"fail","error":"Parola noua nu corespunde cu confirmarea."}';
    }

}