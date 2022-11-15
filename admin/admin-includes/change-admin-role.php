<?php

include "../../includes/dbh.inc.php";

$id = $_POST['acc-id'];
$role = $_POST['acc-role'];
$sql = "UPDATE `users` SET `permissions_roles`='$role' WHERE `unicId`='$id'";
if(mysqli_query($conn,$sql)){
    echo '{"status":"success"}';
}
else{
    echo '{"status":"fail","error":"'.$conn->error.'"}';

}
