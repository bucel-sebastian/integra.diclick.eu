<?php

include "../../../includes/dbh.inc.php";
include "../../../includes/crmdbh.inc.php";

session_start();
error_reporting(0);

// if(isset($_SESSION['username']) && ($_SESSION['role']==='admin' || $_SESSION['role'] === 'Owner')){

    $id=$_POST['edit-id'];
    $clientId=$_POST['edit-clientId'];
    $email=$_POST['edit-email'];
    if(isset($_POST['edit-billing-email'])){
        $billingEmail=1;
    }
    else{
        $billingEmail=0;
    }
    // $esteDecident= $_POST['website-admin-username'];
    

    $sql = "UPDATE `email_adresses` SET `adresa_email`='$email',`billing_email`='$billingEmail' WHERE `id`='$id' AND `unicId`='$clientId'";
    if(mysqli_query($crmConn,$sql)){
        echo '{"status":"success"}';
    }
    else{
        echo '{"status":"success","error":"'.$crmConn->error.'"}';
    }

// }