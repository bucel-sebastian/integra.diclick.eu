<?php

include "../../../includes/dbh.inc.php";
include "../../../includes/crmdbh.inc.php";

session_start();
error_reporting(0);

// if(isset($_SESSION['username']) && ($_SESSION['role']==='admin' || $_SESSION['role'] === 'Owner')){

    $id=$_POST['person-id'];
    $clientId=$_POST['person-clientId'];
    $nume=$_POST['person-nume'];
    $prenume=$_POST['person-prenume'];
    $functie=$_POST['person-functie'];
    $email=$_POST['person-email'];
    $telefon = $_POST['person-telefon'];
    if(isset($_POST['edit-person-decident'])){
        $esteDecident=1;
    }
    else{
        $esteDecident=0;
    }
    

    $sql = "UPDATE `client_pers` SET `nume`='$nume',`prenume`='$prenume',`email`='$email',`telefon`='$telefon',`este_decident`='$esteDecident',`functie`='$functie' WHERE `id`='$id' AND `unicId`='$clientId'";
    if(mysqli_query($crmConn,$sql)){
        echo '{"status":"success"}';
    }
    else{
        echo '{"status":"fail","error":"'.$crmConn->error.'"}';
    }

// }