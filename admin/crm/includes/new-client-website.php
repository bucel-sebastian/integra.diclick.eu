<?php

include "../../../includes/dbh.inc.php";
include "../../../includes/crmdbh.inc.php";

session_start();
error_reporting(0);


// if(isset($_SESSION['username']) && ($_SESSION['role']==='admin' || $_SESSION['role'] === 'Owner')){
    
    $clientId=$_POST['website-clientId'];
    $websiteName=$_POST['website-name'];
    $websiteUrl=$_POST['website-url'];
    $websiteTip=$_POST['website-tip'];
    $websiteDomeniu=$_POST['website-domeniu'];
    $webisteUrlAdmin = $_POST['website-url-admin'];
    $websiteAdminUser= $_POST['website-admin-username'];
    $websiteAdminPassword = $_POST['website-admin-password'];


    $sql = "INSERT INTO `websites`(`unicId`, `website_nume`, `website_url`, `website_tip`, `domeniu`, `website_url_admin`, `website_admin_user`, `website_admin_pass`) VALUES ('$clientId','$websiteName','$websiteUrl','$websiteTip','$websiteDomeniu','$webisteUrlAdmin','$websiteAdminUser','$websiteAdminPassword')";
    if(mysqli_query($crmConn,$sql)){
        echo '{"status":"success"}';
    }
    else{
        echo '{"status":"fail","error":"'.$crmConn->error.'"}';
    }
// }