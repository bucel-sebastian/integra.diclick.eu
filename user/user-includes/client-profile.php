<?php

include "../../includes/dbh.inc.php";

session_start();

error_reporting(0);

if(isset($_SESSION['username']) && isset($_SESSION['role'])){
    $unicId=$_SESSION['unicId'];
    $username= $_SESSION['username'];
    $sql="SELECT * FROM `users` WHERE `unicId`='$unicId'";
    $result = mysqli_query($conn,$sql);
    if($result){
        if(mysqli_num_rows($result)===1){
            $row=mysqli_fetch_assoc($result);
            echo '{"name":"'.$row['name'].'","username":"'.$row['username'].'","company":"'.$row['company'].'","function":"'.$row['function'].'","email":"'.$row['email'].'","phone":"'.$row['telefon'].'","unicId":"'.$row['unicId'].'","image":"'.$row['image'].'"}';
        }
    }
    
}
