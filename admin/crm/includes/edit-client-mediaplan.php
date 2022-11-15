<?php

include "../../../includes/dbh.inc.php";
include "../../../includes/crmdbh.inc.php";

session_start();
error_reporting(0);

// if(isset($_SESSION['username']) && ($_SESSION['role']==='admin' || $_SESSION['role'] === 'Owner')){

    $clientId=$_POST['mediaplan-clientId'];
    $id=$_POST['mediaplan-id'];
    
    $retea = $_POST['edit-mediaplan-retea'];
    $tip = $_POST['edit-mediaplan-tip'];
    $perStart = $_POST['edit-mediaplan-perstart'];
    $perSfarsit = $_POST['edit-mediaplan-persfarsit'];

    $frecventaZile= array();


    if(isset($_POST['edit-week-day-0'])){
        array_push($frecventaZile,"luni");
    }
    if(isset($_POST['edit-week-day-1'])){
        array_push($frecventaZile,"marti");
        
    }
    if(isset($_POST['edit-week-day-2'])){
        array_push($frecventaZile,"miercuri");
        
    }
    if(isset($_POST['edit-week-day-3'])){
        array_push($frecventaZile,"joi");
        
    }
    if(isset($_POST['edit-week-day-4'])){
        array_push($frecventaZile,"vineri");
        
    }
    if(isset($_POST['edit-week-day-5'])){
        array_push($frecventaZile,"sambata");
        
    }
    if(isset($_POST['edit-week-day-6'])){
        array_push($frecventaZile,"duminica");
        
    }

    $frecventa=json_encode($frecventaZile);

    
    $comentarii= $_POST['edit-mediaplan-comm'];

    $sql = "UPDATE `media_plan` SET `retea`='$retea',`tip_content`='$tip',`frecventa`='$frecventa',`perioada_start`='$perStart',`perioada_sfarsit`='$perSfarsit',`comentarii`='$comentarii' WHERE `unicId`='$clientId' AND `id`='$id'";

  
        
    if(mysqli_query($crmConn,$sql)){
        echo '{"status":"success"}';
    }
    else{
        echo '{"status":"fail","error":"'.$crmConn->error.'"}';
    }


// }