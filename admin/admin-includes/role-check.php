<?php

include "../../includes/dbh.inc.php";

session_start();
error_reporting(0);

if(isset($_SESSION['user-data'])){

    $userData=$_SESSION['user-data'];

    $roleId=$userData->permissionRoles;

    $sql="SELECT * FROM `admin_roles` WHERE `roleId`='$roleId'";
    $result= mysqli_query($conn,$sql);
    if($result){
        if(mysqli_num_rows($result)===1){
            $row=mysqli_fetch_assoc($result);
            $permissions = $row['permissions'] ;           
            echo $permissions;
        }
    }

}