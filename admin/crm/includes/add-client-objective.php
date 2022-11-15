<?php

include "../../../includes/dbh.inc.php";
include "../../../includes/crmdbh.inc.php";

session_start();
error_reporting(0);


// if(isset($_SESSION['username']) && ($_SESSION['role']==='admin' || $_SESSION['role'] === 'Owner')){
    
    $clientId= $_POST['clientId'];
    $clientObj=$_POST['add-objective-client'];
    $smObj = $_POST['add-objective-socialmedia'];
    $performanceObj=$_POST['add-objective-performance'];
    $marketingObj=$_POST['add-objective-marketing'];
    $dezvOnlineObj=$_POST['add-objective-dezvoltare-online'];
    $perStart=$_POST['add-objective-start-date'];
    $perEnd=date("Y-m-d",strtotime($perStart."+ 31 days"));
    
    $commentarii= $_POST['add-objective-comm'];
    
    $sql = "INSERT INTO `obiective`(`unicId`, `tip`, `perioada_start`, `perioada_sfarsit`, `comentarii`, `client_obj`, `social_obj`, `performance_obj`, `dezvoltare_online_obj`, `marketing_obj`) VALUES ('$clientId','1','$perStart','$perEnd','$commentarii','$clientObj','$smObj','$performanceObj','$dezvOnlineObj','$marketingObj')";
    if(mysqli_query($crmConn,$sql)){
        echo '{"status":"success"}';
    }
    else{
        echo '{"status":"fail","error":"'.$crmConn->error.'"}';
    }
// }