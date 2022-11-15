<?php

include "../../../includes/dbh.inc.php";
include "../../../includes/crmdbh.inc.php";

session_start();
error_reporting(0);


// if(isset($_SESSION['username']) && ($_SESSION['role']==='admin' || $_SESSION['role'] === 'Owner')){
    
    $clientId=$_POST['company'];
    $nume=$_POST['nume'];
    $username = $_POST['username'];
    $functie=$_POST['functie'];
    $email=$_POST['email'];
    $telefon=$_POST['telefon'];
    $pass = $_POST['password'];
    $password_enc=password_hash($pass,PASSWORD_BCRYPT,["cost"=>10]);
    $date = date("Y-m-d");
    $unicId = uniqid("user",false);



    $sql = "INSERT INTO `users`(`unicId`, `name`, `username`, `email`, `telefon`, `password`, `company`, `function`, `language`, `last_log_in`, `create_date`) VALUES ('$unicId','$nume','$username','$email','$telefon','$password_enc','$clientId','$functie','0','0000-00-00','$date')";
    if(mysqli_query($conn,$sql)){
        echo '{"status":"success"}';
    }
    else{
        echo '{"status":"fail","error":"'.$crmConn->error.'"}';
    }
// }