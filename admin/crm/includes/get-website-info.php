<?php

include "../../../includes/dbh.inc.php";
include "../../../includes/crmdbh.inc.php";

session_start();
error_reporting(0);

if(isset($_SESSION['username']) && ($_SESSION['role']==='admin' || $_SESSION['role'] === 'Owner')){

    if(isset($_GET['id']) && isset($_GET['clientId'])){
        $clientId=$_GET['clientId'];
        $id=$_GET['id'];

        $sql = "SELECT * FROM `websites` WHERE `unicId`='$clientId' AND `id`='$id'";
        $result = mysqli_query($crmConn,$sql);
        if($result){
            if(mysqli_num_rows($result) === 1){
                $row=mysqli_fetch_assoc($result);
                echo '{"id":"'.$row['id'].'","websiteNume":"'.$row['website_nume'].'","websiteUrl":"'.$row['website_url'].'","websiteTip":"'.$row['website_tip'].'","domeniu":"'.$row['domeniu'].'","websiteUrlAdmin":"'.$row['website_url)admin'].'","websiteAdminUser":"'.$row['website_admin_user'].'","websiteAdminPass":"'.$row['website_admin_pass'].'"}';
            }
        }
    }
}