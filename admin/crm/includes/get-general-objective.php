<?php

include "../../../includes/dbh.inc.php";
include "../../../includes/crmdbh.inc.php";

session_start();
error_reporting(0);



    if(isset($_GET['clientId'])){
        $clientId=$_GET['clientId'];        

        $sql = "SELECT * FROM `obiective` WHERE `unicId`='$clientId' AND `tip`='0'";
        $result = mysqli_query($crmConn,$sql);
        if($result){
            if(mysqli_num_rows($result) === 1){
                $row=mysqli_fetch_assoc($result);
                $comentariiRaw = $row['comentarii'];
                $text = str_replace(array("\r\n", "\n\r", "\r", "\n"),"<br>",$comentariiRaw);
                echo '{"id":"'.$row['id'].'","tip":"'.$row['tip'].'","clientObj":"'.$row['client_obj'].'","socialObj":"'.$row['social_obj'].'","performanceObj":"'.$row['performance_obj'].'","dezvoltareOnlineObj":"'.$row['dezvoltare_online_obj'].'","marketingObj":"'.$row['marketing_obj'].'","perStart":"'.$row['perioada_start'].'","perSfarsit":"'.$row['perioada_sfarsit'].'","id":"'.$row['id'].'","comentarii":"'.$text.'"}';
            }
            else{
                echo '{"status":"no-result"}';
            }
        }else{
            echo '{"status":"no-result"}';
        }
    }
