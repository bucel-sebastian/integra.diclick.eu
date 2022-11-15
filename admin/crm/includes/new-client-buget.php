<?php

include "../../../includes/dbh.inc.php";
include "../../../includes/crmdbh.inc.php";

session_start();
error_reporting(0);

// if(isset($_SESSION['username']) && ($_SESSION['role']==='admin' || $_SESSION['role'] === 'Owner')){

    $clientId = $_POST['clientId'];
    $tip = $_POST['add-buget-tip'];
    $perStart = $_POST['add-buget-perstart'];
    $perSfarsit = date("Y-m-d",strtotime($perStart."+ 31 days"));
    $bugetTotal = $_POST['add-buget-total'];
    $bugetPeZi = $_POST['buget-pe-zi'];
    $comentarii =$_POST['add-buget-comm'];
    
    $retele = array();
    
    for($i=0;$i<sizeof($_POST['add-buget-retea']);$i++){
        array_push($retele,array("id"=>$i,"retea"=>$_POST['add-buget-retea'][$i],"buget"=>$_POST['add-buget-pe-zi'][$i]));
    }

    $reteleJSON = json_encode($retele);

    $sql = "INSERT INTO `buget`( `unicId`, `tip`, `retele`, `buget_total`, `buget_pe_zi`, `perioada_start`, `perioada_sfarsit`, `comentarii`) VALUES ('$clientId','$tip','$reteleJSON','$bugetTotal','$bugetPeZi','$perStart','$perSfarsit','$comentarii')";
    if(mysqli_query($crmConn,$sql)){
        echo '{"status":"success"}'; 
    }
    else{
        echo '{"status":"fail","error":"'.$crmConn->error.'"}';
    }
// }   