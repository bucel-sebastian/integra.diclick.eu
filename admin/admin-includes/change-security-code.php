<?php


include "../../includes/crmdbh.inc.php";
include "../../includes/dbh.inc.php";

session_start();
error_reporting(0);

if(isset($_SESSION['unicId']) && isset($_SESSION['role']) && $_SESSION['role']==="Owner"){
    $unicId=$_SESSION['unicId'];
    $role=$_SESSION['role'];
    $oldCode=$_POST['security-code-old'];
    $sql="SELECT * FROM `invoice_check` WHERE `userId`='$unicId'";
    $result=mysqli_query($conn,$sql);
    if($result){
        if(mysqli_num_rows($result)===1){
            $row=mysqli_fetch_assoc($result);
        }

    }

    $securityCode=$row['security_code'];
    if(password_verify($oldCode,$row['code'])){
        if($_POST['security-code-re-new']===$_POST['security-code-new']){
            
            $code = $_POST['security-code-new'];
            $newCode = password_hash($code,PASSWORD_BCRYPT,["cost"=>10]);

            if($_POST['security-code-token']===$securityCode){
                $sql="UPDATE `invoice_check` SET `code`='$newCode',`security_code`='' WHERE `userId`='$unicId'";
                if(mysqli_query($conn,$sql)){
                    echo '{"status":"success"}';
                }
                else{
                    echo '{"status":"fail","error":"Codul de verificare nu este valid"}';
                }
            }
            else{
                echo '{"status":"fail","error":"Codul de verificare nu este valid"}';
            }
        }
        else{
            echo '{"status":"fail","error":"Codul nu este la fel cu cel confirmat"}';
        }
    }
    else{
        echo '{"status":"fail","error":"Codul vechi nu este corect."}';
    }
    
}