<?php

include "../../../includes/dbh.inc.php";
include "../../../includes/crmdbh.inc.php";

session_start();
error_reporting(0);

if(isset($_GET['client']) && isset($_GET['proform'])){

    $client = $_GET['client'];
    $proform = $_GET['proform'];

    $sql = "UPDATE `proforme` SET `status`='0' WHERE `client`='$client' AND `invoice_number`='$proform'";

    if(mysqli_query($crmConn,$sql)){
        echo '{"status":"success"}';
    }
    else{
        echo '{"status":"fail","error":"'.$crmConn->error.'"}';

    }

}