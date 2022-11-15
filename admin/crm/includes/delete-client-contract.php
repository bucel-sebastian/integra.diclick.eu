<?php

include "../../../includes/dbh.inc.php";
include "../../../includes/crmdbh.inc.php";

if(isset($_GET['client']) && isset($_GET['id'])){
    $client = $_GET['client'];
    $id = $_GET['id'];

    $sql = "DELETE FROM `contracts` WHERE `client`='$client' AND `unicId`='$id'";
    if(mysqli_query($crmConn,$sql)){
        echo '{"status":"success"}';
    }
    else{
        echo '{"status":"fail","error":"'.$crmConn->error.'"}';
    }
}