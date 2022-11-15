<?php

include "../../../includes/dbh.inc.php";
include "../../../includes/crmdbh.inc.php";

session_start();
error_reporting(0);

// if(isset($_SESSION['username']) && ($_SESSION['role']==='admin' || $_SESSION['role'] === 'Owner')){

    $clientId = $_POST['clientId'];
    $id = $_POST['edit-buget-id'];
    $tip = $_POST['edit-buget-tip'];
    $perStart = $_POST['edit-buget-perstart'];
    $perSfarsit = $_POST['edit-buget-persfarsit'];
    $bugetTotal = $_POST['edit-buget-total'];
    $bugetPeZi = $_POST['buget-pe-zi'];
    $comentarii =$_POST['edit-buget-comm'];
    
    $retele = array();
    
    for($i=0;$i<sizeof($_POST['edit-buget-retea']);$i++){
        array_push($retele,array("id"=>$i,"retea"=>$_POST['edit-buget-retea'][$i],"buget"=>$_POST['edit-buget-pe-zi'][$i]));
    }

    $reteleJSON = json_encode($retele);

    $sql = " UPDATE `buget` SET `tip`='$tip',`retele`='$reteleJSON',`buget_total`='$bugetTotal',`buget_pe_zi`='$bugetPeZi',`perioada_start`='$perStart',`perioada_sfarsit`='$perSfarsit',`comentarii`='$comentarii' WHERE `id`='$id'";

    if(mysqli_query($crmConn,$sql)){
        echo '{"status":"success"}';
    }
    else{
        echo '{"status":"fail","error":"'.$crmConn->error.'"}';
    }
// }  