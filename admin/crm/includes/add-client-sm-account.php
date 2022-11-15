<?php

include "../../../includes/dbh.inc.php";
include "../../../includes/crmdbh.inc.php";

session_start();
error_reporting(0);


// if(isset($_SESSION['username']) && ($_SESSION['role']==='admin' || $_SESSION['role'] === 'Owner')){
    
    $clientId= $_POST['clientId'];
    $retea= $_POST['add-sm-account-retea'];
    $nume= $_POST['add-sm-account-nume'];
    $link= $_POST['add-sm-account-link'];
    $loginUser= $_POST['add-sm-account-username'];
    $loginPass= $_POST['add-sm-account-password'];
    $commentarii= $_POST['add-sm-account-comm'];
    if(isset($_POST['add-sm-account-personal'])){
        $personalAccount=1;
    }
    else{
        $personalAccount=0;
    }
    $sql = "INSERT INTO `social_media_accounts`(`unicId`, `retea`, `nume`, `link`, `login_user`, `login_pass`, `personal_account`, `comentarii`) VALUES ('$clientId','$retea','$nume','$link','$loginUser','$loginPass','$personalAccount','$commentarii')";
    if(mysqli_query($crmConn,$sql)){
        echo '{"status":"success"}';
    }
    else{
        echo '{"status":"fail","error":"'.$crmConn->error.'"}';
    }
// }