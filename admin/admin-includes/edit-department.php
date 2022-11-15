<?php

include "../../includes/dbh.inc.php";

session_start();
error_reporting(0);


if(isset($_SESSION['username']) && isset($_SESSION['role']) && ($_SESSION['role']==='admin' || $_SESSION['role'] === 'Owner')){

    $nume = $_POST['edit-nume-departament'];
    $id=$_POST['edit-id-department'];
    $tip=$_POST['edit-tip-departament'];

    $sql = "UPDATE `admin_departments` SET `nume`='$nume', `tip`='$tip' WHERE `unicId`='$id'";
    if(mysqli_query($conn,$sql)){
        echo '{"status":"success"}';
    }
    else{
        echo '{"status":"fail","error":"'.$conn->error.'"}';

    }

}