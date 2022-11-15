<?php

include "../../includes/crmdbh.inc.php";
include "../../includes/dbh.inc.php";

session_start();
error_reporting(0);

$userdata = $_SESSION['user-data'];
if(isset($userdata->unicId) && isset($userdata->tip) && $userdata->tip === "admin"){
    $adminId = $userdata->unicId;
    $nume = $_POST['admin-name'];
    $prenume = $_POST['admin-prename'];
    $function = $_POST['admin-function'];
    $phone = $_POST['admin-phone'];
    $email = $_POST['admin-mail'];

    $sql = "UPDATE `admin_users` SET `nume`='$nume',`prenume`='$prenume',`email`='$email',`telefon`='$phone',`functie`='$function' WHERE `unicId`='$adminId'";
    if(mysqli_query($conn,$sql)){
        echo '{"status":"success"}';
    }
    else{
        echo '{"status":"fail","error":"'.$conn->error.'"}';
    }
}