<?php
include "../../../includes/dbh.inc.php";
include "../../../includes/crmdbh.inc.php";

session_start();
error_reporting(0);


    if(isset($_GET['id'])){
        $clientId=$_GET['id'];
        
        $sql = "SELECT * FROM `users` WHERE `company`='$clientId'";
        $result = mysqli_query($conn,$sql);

        $array = array();
        if($result){
            while($row=mysqli_fetch_assoc($result)){
                array_push($array,array("nume"=>$row['name'],"username"=>$row['username'],"email"=>$row['email'],"lastLogin"=>$row['last_log_in']));
            }
        }
        echo json_encode($array);
    }