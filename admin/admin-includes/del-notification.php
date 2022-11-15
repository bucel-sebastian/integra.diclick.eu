<?php

include "../../includes/dbh.inc.php";


if(isset($_GET['id'])){
    $id=$_GET['id'];
    
    $sql="DELETE FROM `admin_notifications` WHERE `id`='$id'";
    $result=mysqli_query($conn,$sql);
    if($result){
        echo "success";
    }
    else{
        echo "fail";
    }
}