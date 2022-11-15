<?php

include "../../../includes/dbh.inc.php";
include "../../../includes/crmdbh.inc.php";

session_start();
error_reporting(0);

// if(isset($_SESSION['username']) && ($_SESSION['role']==='admin' || $_SESSION['role'] === 'Owner')){


    $id=$_POST['setting-id'];
    $clientId=$_POST['setting-clientId'];
    $tip=$_POST['edit-setting-tip'];
    $retea=$_POST['edit-setting-retea'];
    
    if($retea==="google"){
        $subRetea=$_POST['edit-setting-sub-retea'];
    }
    else{
        $subRetea="";
    }
    $owner=$_POST['edit-settings-owner'];
    $cod=$_POST['edit-settings-id'];
    
    $comentarii = $_POST['edit-setting-comm'];

    $sql = "UPDATE `setari` SET `tip`='$tip',`retea`='$retea',`cod`='$cod',`comentarii`='$comentarii',`ownership`='$owner',`sub_retea`='$subRetea' WHERE `id`='$id' AND `unicId`='$clientId'";

    if(mysqli_query($crmConn,$sql)){
        echo '{"status":"success"}';
    }
    else{
        echo '{"status":"fail","error":"'.$crmConn->error.'"}';
    }

// }