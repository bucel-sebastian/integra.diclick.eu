<?php

include "../../../includes/dbh.inc.php";
include "../../../includes/crmdbh.inc.php";

session_start();
error_reporting(0);


    if(isset($_GET['id'])){
        $clientId=$_GET['id'];

        $sql = "SELECT * FROM `email_adresses` WHERE `unicId`='$clientId'";
        $result = mysqli_query($crmConn,$sql);
        if($result){

            $index=0;
            echo "[";
            while($row=mysqli_fetch_assoc($result)){
                if($index===0){
                    echo '{"id":"'.$row['id'].'","email":"'.$row['adresa_email'].'","billingEmail":"'.$row['billing_email'].'"}';
                    $index++;
                }
                else{
                    echo ',{"id":"'.$row['id'].'","email":"'.$row['adresa_email'].'","billingEmail":"'.$row['billing_email'].'"}';
                    $index++;
                }
            }
            echo "]";
        }
    }
