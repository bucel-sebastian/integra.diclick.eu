<?php

include "../../../includes/dbh.inc.php";
include "../../../includes/crmdbh.inc.php";

session_start();
error_reporting(0);


    if(isset($_GET['id']) && isset($_GET['clientId'])){
        $clientId=$_GET['clientId'];
        $id=$_GET['id'];

        $sql = "SELECT * FROM `email_adresses` WHERE `unicId`='$clientId' AND `id`='$id'";
        $result = mysqli_query($crmConn,$sql);
        if($result){
            if(mysqli_num_rows($result) === 1){
                $row=mysqli_fetch_assoc($result);
                echo '{"id":"'.$row['id'].'","email":"'.$row['adresa_email'].'","billingEmail":"'.$row['billing_email'].'"}';
            }
        }
    }
