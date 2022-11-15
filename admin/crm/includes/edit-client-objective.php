<?php

include "../../../includes/dbh.inc.php";
include "../../../includes/crmdbh.inc.php";

session_start();
error_reporting(0);

// if(isset($_SESSION['username']) && ($_SESSION['role']==='admin' || $_SESSION['role'] === 'Owner')){

    $clientId=$_POST['objective-clientId'];
    $id=$_POST['objective-id'];
    $comentarii=$_POST['edit-objective-comm-per'];
    $clientObj=$_POST['edit-objective-client-per'];
    $socialObj=$_POST['edit-objective-socialmedia-per'];
    $performanceObj= $_POST['edit-objective-performance-per'];
    $dezvOnlineObj=$_POST['edit-objective-dezvoltare-online-per'];
    $marketingObj = $_POST['edit-objective-marketing-per'];
    $perStart= $_POST['edit-objective-start-date'];
    $perEnd= $_POST['edit-objective-end-date'];
    

    $sql = "UPDATE `obiective` SET `perioada_start`='$perStart',`perioada_sfarsit`='$perEnd',`comentarii`='$comentarii',`client_obj`='$clientObj',`social_obj`='$socialObj',`performance_obj`='$performanceObj',`dezvoltare_online_obj`='$dezvOnlineObj',`marketing_obj`='$marketingObj' WHERE `unicId`='$clientId' AND `id`='$id'";

  
        
    if(mysqli_query($crmConn,$sql)){
        echo '{"status":"success"}';
    }
    else{
        echo '{"status":"fail","error":"'.$crmConn->error.'"}';
    }


// }