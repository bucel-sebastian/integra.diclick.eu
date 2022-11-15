<?php

include "../../../includes/dbh.inc.php";
include "../../../includes/crmdbh.inc.php";

session_start();
error_reporting(0);


// if(isset($_SESSION['username']) && ($_SESSION['role']==='admin' || $_SESSION['role'] === 'Owner')){
    
    $clientId= $_POST['client'];

    $retea = $_POST['add-mediaplan-retea'];
    $tip = $_POST['add-mediaplan-tip'];
    $perStart = $_POST['add-mediaplan-startmonth'];

    $perStart = date($perStart."-01");

    $perSfarsit = date("Y-m-d",strtotime($perStart."+ 12 months"));

    // echo var_dump($_POST['retea-id']);

    $retele = array();
    foreach ($_POST['retea-id'] as $key => $value) {
        // echo var_dump(json_decode($_POST['week-days-'.$value]));

        $weekDays = json_decode($_POST['week-days-'.$value]);

        array_push($retele,array("id"=>$value,"retea"=>$_POST['add-mediaplan-retea-'.$value],"tipContent"=>$_POST['add-mediaplan-tip-'.$value],"frecventa"=>$weekDays));
    }

    // echo var_dump($retele);
    $frecventaZile= array();

    $reteleJson = json_encode($retele);

    
    
    $commentarii= $_POST['add-mediaplan-comm'];
    
    $sql = "INSERT INTO `media_plan`(`unicId`, `retea`, `perioada_start`, `perioada_sfarsit`, `comentarii`) VALUES ('$clientId','$reteleJson','$perStart','$perSfarsit','$commentarii')";
    if(mysqli_query($crmConn,$sql)){
        echo '{"status":"success"}';
    }
    else{
        echo '{"status":"fail","error":"'.$crmConn->error.'"}';
    }
// }
