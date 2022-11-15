<?php

include "../../../includes/dbh.inc.php";

$token = $_POST['cod-verificare'];
$password = $_POST['parola'];
$repassword = $_POST['re-parola'];

if($password===$repassword){
    $sql = "SELECT * FROM `reset_password_tokens` WHERE `token`='$token'";
    $result = mysqli_query($conn,$sql);
    if($result){
        if(mysqli_num_rows($result)===1){
            $row = mysqli_fetch_assoc($result);
            $unicId = $row['unicId'];

            $passwordHash=password_hash($password,PASSWORD_BCRYPT,["cost"=>10]);

            $sql = "UPDATE `admin_users` SET `password`='$passwordHash' WHERE `unicId`='$unicId'";
            if(mysqli_query($conn,$sql)){

                $sql = "DELETE FROM `reset_password_tokens` WHERE `unicId`='$unicId'";
                if(mysqli_query($conn,$sql)){
                    echo '{"status":"success"}';
                }
                else{
                    echo '{"status":"fail","error":"'.$conn->error.'"}';
                }
            }
            else{
                echo '{"status":"fail","error":"'.$conn->error.'"}';
            }
        }
        else{
            echo '{"status":"fail","error":"Cod de verificare invalid"}';
        }
    }
    else{
        echo '{"status":"fail","error":"'.$conn->error.'"}';
    }
}
else{
    echo '{"status":"fail","error":"Parolele nu corespund"}';
}