<?php

include "../../../includes/dbh.inc.php";
include "../../../includes/crmdbh.inc.php";

session_start();
error_reporting(0);


// if(isset($_SESSION['username']) && ($_SESSION['role']==='admin' || $_SESSION['role'] === 'Owner')){
    
    $clientId=$_POST['person-clientId'];
    $nume=$_POST['person-nume'];
    $prenume=$_POST['person-prenume'];
    $functie=$_POST['person-functie'];
    $email=$_POST['person-email'];
    $telefon = $_POST['person-telefon'];


    $sql = "INSERT INTO `client_pers`(`unicId`, `nume`, `prenume`, `email`, `telefon`, `este_decident`, `functie`) VALUES ('$clientId','$nume','$prenume','$email','$telefon','0','$functie')";
    if(mysqli_query($crmConn,$sql)){
        echo '{"status":"success"}';
    }
    else{
        echo '{"status":"fail","error":"'.$crmConn->error.'"}';
    }
// }