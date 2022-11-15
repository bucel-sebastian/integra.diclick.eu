<?php

include "../../../includes/crmdbh.inc.php";

if(isset($_GET['client']) && isset($_GET['proforma'])){

    $client = $_GET['client'];
    $proforma = $_GET['proforma'];

    $sql = "DELETE FROM `proforme` WHERE `client`='$client' AND `invoice_number`='$proforma'";
    if(mysqli_query($crmConn,$sql)){
        if(unlink('../../../clients-resources/'.$client.'/proforms/'.$proforma.'.pdf')){
            echo '{"status":"success"}';
        }
        else{
            echo '{"status":"fail","error":"Eroare stergere fisier."}';
        }
    }
    else{
        echo '{"status":"fail","error":"'.$crmConn->error.'"}';

    }
}