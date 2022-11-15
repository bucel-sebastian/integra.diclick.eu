<?php

include "../../../includes/dbh.inc.php";
include "../../../includes/crmdbh.inc.php";

session_start();
error_reporting(0);


// if(isset($_SESSION['username']) && ($_SESSION['role']==='admin' || $_SESSION['role'] === 'Owner')){
    
    $clientId= $_POST['clientId'];
    $tip = $_POST['add-setting-tip'];
    $retea = $_POST['add-setting-retea'];
    if($retea === "google"){
        $subRetea = $_POST['add-setting-sub-retea'];
    }
    else{
        $subRetea="";
    }

    $owner = $_POST['add-settings-owner'];
    if($tip!="2"){
        $id = $_POST['add-settings-id'];
    }
    else{
        $id = $_POST['add-settings-id-acc'];

        $smAccNume=$_POST['add-setting-acc-name'];
        $smAccLink=$_POST['add-setting-acc-link'];
        $smAccUsername=$_POST['add-setting-acc-username'];
        $smAccPass=$_POST['add-setting-acc-password'];
    }



    
    $commentarii= $_POST['add-setting-comm'];
    
    $sql = "INSERT INTO `setari`(`unicId`, `tip`, `retea`, `cod`, `comentarii`, `ownership`, `sub_retea`) VALUES ('$clientId','$tip','$retea','$id','$commentarii','$owner','$subRetea')";
    if(mysqli_query($crmConn,$sql)){
        if($tip==="2"){
            $sql = "INSERT INTO `social_media_accounts`( `unicId`, `retea`, `nume`, `link`, `login_user`, `login_pass`, `personal_account`) VALUES ('$clientId','$retea','$smAccNume','$smAccLink','$smAccUsername','$smAccPass','0')";
            if(mysqli_query($crmConn,$sql)){
                echo '{"status":"success"}';
            }
            else{
                echo '{"status":"fail","error":"'.$crmConn->error.'"}';
            }
        }
        else{
            echo '{"status":"success"}';
        } 
    }
    else{
        echo '{"status":"fail","error":"'.$crmConn->error.'"}';
    }
// }