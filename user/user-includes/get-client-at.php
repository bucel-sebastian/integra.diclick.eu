<?php

include "../../includes/dbh.inc.php";

session_start();
error_reporting(0);


if(isset($_SESSION['user-data']) && $_SESSION['user-data']->tip === "client"){
    $unicId=$_SESSION['user-data']->unicId;
    $clientAt= $_SESSION['clientAt'];

    $sql = "SELECT * FROM `users` WHERE `unicId`='$unicId'";
    $result = mysqli_query($conn,$sql);
    if($result){
        if(mysqli_num_rows($result)===1){
            $row=mysqli_fetch_assoc($result);
            echo '{"image":"'.$row['image'].'","name":"'.$row['name'].'","clientAt":"'.$clientAt.'"}';
        }
    }
}


?>