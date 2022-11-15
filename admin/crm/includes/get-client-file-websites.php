<?php

include "../../../includes/dbh.inc.php";
include "../../../includes/crmdbh.inc.php";

session_start();
error_reporting(0);


    if(isset($_GET['id'])){
        $clientId=$_GET['id'];

        $sql = "SELECT * FROM `websites` WHERE `unicId`='$clientId'";
        $result = mysqli_query($crmConn,$sql);
        if($result){
            $index=0;
            echo "[";
            while($row=mysqli_fetch_assoc($result)){
                if($index===0){
                    echo '{"id":"'.$row['id'].'","websiteNume":"'.$row['website_nume'].'","websiteUrl":"'.$row['website_url'].'","websiteTip":"'.$row['website_tip'].'","domeniu":"'.$row['domeniu'].'","websiteAdminUrl":"'.$row['website_url_admin'].'","websiteAdminUser":"'.$row['website_url_user'].'","websiteAdminPass":"'.$row['website_url_pass'].'"}';
                    $index++;
                }
                else{
                    echo ',{"id":"'.$row['id'].'","websiteNume":"'.$row['website_nume'].'","websiteUrl":"'.$row['website_url'].'","websiteTip":"'.$row['website_tip'].'","domeniu":"'.$row['domeniu'].'","websiteAdminUrl":"'.$row['website_url_admin'].'","websiteAdminUser":"'.$row['website_url_user'].'","websiteAdminPass":"'.$row['website_url_pass'].'"}';
                    $index++;
                }
            }
            echo "]";
        }
    }
