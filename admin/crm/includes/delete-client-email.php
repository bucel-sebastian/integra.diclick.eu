<?php

include "../../../includes/dbh.inc.php";
include "../../../includes/crmdbh.inc.php";

session_start();
error_reporting(0);


// if(isset($_SESSION['username']) && ($_SESSION['role']==='admin' || $_SESSION['role'] === 'Owner')){
    if(isset($_GET['id']) && isset($_GET['clientId'])){
        $id= $_GET['id'];
        $clientId= $_GET['clientId'];

        $sql = "DELETE FROM `email_adresses` WHERE `id`='$id' AND `unicId`='$clientId'";        
        if(mysqli_query($crmConn,$sql)){
            echo '{"status":"success"}';
        }
        else{
            echo '{"status":"fail","error":"'.$crmConn->error.'"}';
        }
    }
    else{
        echo '{"status":"fail","error":"id/clientId not set","id":"'.$_GET['id'].'","idC":"'.$_GET['clientId'].'"}'; 
    }

// }