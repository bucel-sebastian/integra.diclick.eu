<?php

include "../../includes/dbh.inc.php";

session_start();
error_reporting(0);

if(isset($_SESSION['username']) && isset($_SESSION['role']) && ($_SESSION['role']==='admin' || $_SESSION['role'] === 'Owner')){

    $nume = $_POST['nume-departament'];
    $tip = $_POST['tip-departament'];
    $unicId=rand(10000,99999);

    $sql = "INSERT INTO `admin_departments`( `unicId`, `nume`, `tip`) VALUES ('$unicId','$nume','$tip')";
    
    if(mysqli_query($conn,$sql)){
        echo '{"status":"success"}';
    }
    else{
        echo '{"status":"fail","error":"'.$conn->error.'"}';
    }

}