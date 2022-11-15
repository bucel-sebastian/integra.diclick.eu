<?php

include "../../../includes/crmdbh.inc.php";
include "../../../includes/dbh.inc.php";

if(isset($_GET['id'])){
    $id = $_GET['id'];
    $sql = "DELETE FROM `xml_invoices` WHERE `invoiceId`='$id'";
    if(mysqli_query($crmConn,$sql)){
        echo '{"status":"success"}';
    }
    else{
        echo '{"status":"fail","error":"'.$crmConn->error.'"}';
    }
}
else{
    echo '{"status":"fail","error":"Id problem"}';
}