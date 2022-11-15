<?php

include "../../../includes/dbh.inc.php";
include "../../../includes/crmdbh.inc.php";

session_start();
error_reporting(0);

// if(isset($_SESSION['username']) && ($_SESSION['role']==='admin' || $_SESSION['role'] === 'Owner')){


    $id=$_POST['sm-account-id'];
    $clientId=$_POST['sm-account-clientId'];
    $retea=$_POST['edit-sm-account-retea'];
    $nume=$_POST['edit-sm-account-nume'];
    $link=$_POST['edit-sm-account-link'];
    if(isset($_POST['edit-sm-account-personal'])){
        $personalAccount=1;
    }
    else{
        $personalAccount=0;
    }
    $username = $_POST['edit-sm-account-username'];
    $password= $_POST['edit-sm-account-password'];
    $comentarii = $_POST['edit-sm-account-comm'];

    $sql = "UPDATE `social_media_accounts` SET `retea`='$retea',`nume`='$nume',`link`='$link',`login_user`='$username',`login_pass`='$password',`personal_account`='$personalAccount',`comentarii`='$comentarii' WHERE `id`='$id' AND `unicId`='$clientId'";

    if(mysqli_query($crmConn,$sql)){
        echo '{"status":"success"}';
    }
    else{
        echo '{"status":"fail","error":"'.$crmConn->error.'"}';
    }

// }