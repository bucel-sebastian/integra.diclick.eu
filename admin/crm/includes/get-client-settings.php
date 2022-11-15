<?php

include "../../../includes/dbh.inc.php";
include "../../../includes/crmdbh.inc.php";

session_start();
error_reporting(0);


    if(isset($_GET['id'])){
        $clientId=$_GET['id'];

        $sql = "SELECT * FROM `setari` WHERE `unicId`='$clientId'";
        $result = mysqli_query($crmConn,$sql);
        if($result){
            $index=0;
            echo "[";
            while($row=mysqli_fetch_assoc($result)){
                
                $comentariiRaw = $row['comentarii'];
                $text = str_replace(array("\r\n", "\n\r", "\r", "\n"),"<br>",$comentariiRaw);
                if($index===0){
                    echo '{"id":"'.$row['id'].'","clientId":"'.$row['unicId'].'","comentarii":"'.$text.'","tip":"'.$row['tip'].'","retea":"'.$row['retea'].'","cod":"'.$row['cod'].'","ownership":"'.$row['ownership'].'","subRetea":"'.$row['sub_retea'].'"}';
                    $index++;
                }
                else{
                    echo ',{"id":"'.$row['id'].'","clientId":"'.$row['unicId'].'","comentarii":"'.$text.'","tip":"'.$row['tip'].'","retea":"'.$row['retea'].'","cod":"'.$row['cod'].'","ownership":"'.$row['ownership'].'","subRetea":"'.$row['sub_retea'].'"}';
                    $index++;
                }
            }
            echo "]";
        }
    }
