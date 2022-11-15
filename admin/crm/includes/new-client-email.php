<?php

include "../../../includes/dbh.inc.php";
include "../../../includes/crmdbh.inc.php";

session_start();
error_reporting(0);


// if(isset($_SESSION['username']) && ($_SESSION['role']==='admin' || $_SESSION['role'] === 'Owner')){
    $email = $_POST['new-email'];
    if(isset($_POST['new-billing-email'])){
        $billingEmail=1;
    }
    else{
        $billingEmail=0;
    }
    $clientId= $_POST['clientId'];
    $sql = "INSERT INTO `email_adresses`( `unicId`, `adresa_email`,`billing_email`) VALUES ('$clientId','$email','$billingEmail')";
    if(mysqli_query($crmConn,$sql)){
        echo '{"status":"success"}';
    }
    else{
        echo '{"status":"fail","error":"'.$crmConn->error.'"}';
    }
// }