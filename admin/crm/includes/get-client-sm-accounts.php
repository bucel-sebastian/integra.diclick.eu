<?php

include "../../../includes/dbh.inc.php";
include "../../../includes/crmdbh.inc.php";

session_start();
error_reporting(0);


    if(isset($_GET['id'])){
        $clientId=$_GET['id'];

        $sql = "SELECT * FROM `social_media_accounts` WHERE `unicId`='$clientId'";
        $result = mysqli_query($crmConn,$sql);
        if($result){
            $index=0;
            echo "[";
            while($row=mysqli_fetch_assoc($result)){
                
                $comentariiRaw = $row['comentarii'];
                $text = str_replace(array("\r\n", "\n\r", "\r", "\n"),"<br>",$comentariiRaw);
                if($index===0){
                    echo '{"id":"'.$row['id'].'","clientId":"'.$row['unicId'].'","retea":"'.$row['retea'].'","nume":"'.$row['nume'].'","link":"'.$row['link'].'","username":"'.$row['login_user'].'","password":"'.$row['login_pass'].'","personalAccount":"'.$row['personal_account'].'","comentarii":"'.$text.'"}';
                    $index++;
                }
                else{
                    echo ',{"id":"'.$row['id'].'","clientId":"'.$row['unicId'].'","retea":"'.$row['retea'].'","nume":"'.$row['nume'].'","link":"'.$row['link'].'","username":"'.$row['login_user'].'","password":"'.$row['login_pass'].'","personalAccount":"'.$row['personal_account'].'","comentarii":"'.$text.'"}';
                    $index++;
                }
            }
            echo "]";
        }
    }
