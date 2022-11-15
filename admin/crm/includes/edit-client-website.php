<?php

include "../../../includes/dbh.inc.php";
include "../../../includes/crmdbh.inc.php";

session_start();
error_reporting(0);

// if(isset($_SESSION['username']) && ($_SESSION['role']==='admin' || $_SESSION['role'] === 'Owner')){


    $id=$_POST['website-id'];
    $clientId=$_POST['website-clientId'];
    $websiteName=$_POST['website-name'];
    $websiteUrl=$_POST['website-url'];
    $websiteTip=$_POST['website-tip'];
    $websiteDomeniu=$_POST['website-domeniu'];
    $webisteUrlAdmin = $_POST['website-url-admin'];
    $websiteAdminUser= $_POST['website-admin-username'];
    $websiteAdminPassword = $_POST['website-admin-password'];

    $sql = "UPDATE `websites` SET `website_nume`='$websiteName',`website_url`='$websiteUrl',`website_tip`='$websiteTip',`domeniu`='$websiteDomeniu',`website_url_admin`='$webisteUrlAdmin',`website_admin_user`='$websiteAdminUser',`website_admin_pass`='$websiteAdminPassword' WHERE `id`='$id' AND `unicId`='$clientId'";
    if(mysqli_query($crmConn,$sql)){
        echo '{"status":"success"}';
    }
    else{
        echo '{"status":"success","error":"'.$crmConn->error.'"}';
    }

// }