<?php

include '../../includes/dbh.inc.php';

$adminId = $_GET['id'];

$sql = "DELETE FROM `admin_users` WHERE `unicId`='$adminId'";
if(mysqli_query($conn,$sql)){
    echo '{"status":"success"}';
}
else{
    echo '{"status":"error","error":"'.$conn->error.'"}';
}