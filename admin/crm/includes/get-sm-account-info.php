<?php

include "../../../includes/dbh.inc.php";
include "../../../includes/crmdbh.inc.php";

session_start();
error_reporting(0);

if(isset($_SESSION['username']) && ($_SESSION['role']==='admin' || $_SESSION['role'] === 'Owner')){

    if(isset($_GET['id']) && isset($_GET['clientId'])){
        $clientId=$_GET['clientId'];
        $id=$_GET['id'];

        

        $sql = "SELECT * FROM `social_media_accounts` WHERE `unicId`='$clientId' AND `id`='$id'";
        $result = mysqli_query($crmConn,$sql);
        if($result){
            if(mysqli_num_rows($result) === 1){
                $row=mysqli_fetch_assoc($result);
                $comentariiRaw = $row['comentarii'];
                $text = str_replace(array("\r\n", "\n\r", "\r", "\n"),"<br>",$comentariiRaw);
                echo '{"id":"'.$row['id'].'","nume":"'.$row['nume'].'","retea":"'.$row['retea'].'","link":"'.$row['link'].'","loginUser":"'.$row['login_user'].'","loginPass":"'.$row['login_pass'].'","personalAccount":"'.$row['personal_account'].'","comentarii":"'.$text.'"}';
            }
        }
    }
}