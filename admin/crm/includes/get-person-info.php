<?php

include "../../../includes/dbh.inc.php";
include "../../../includes/crmdbh.inc.php";

session_start();
error_reporting(0);

if(isset($_SESSION['username']) && ($_SESSION['role']==='admin' || $_SESSION['role'] === 'Owner')){

    if(isset($_GET['id']) && isset($_GET['clientId'])){
        $clientId=$_GET['clientId'];
        $id=$_GET['id'];

        $sql = "SELECT * FROM `client_pers` WHERE `unicId`='$clientId' AND `id`='$id'";
        $result = mysqli_query($crmConn,$sql);
        if($result){
            if(mysqli_num_rows($result) === 1){
                $row=mysqli_fetch_assoc($result);
                echo '{"id":"'.$row['id'].'","nume":"'.$row['nume'].'","prenume":"'.$row['prenume'].'","email":"'.$row['email'].'","telefon":"'.$row['telefon'].'","esteDecident":"'.$row['este_decident'].'","functie":"'.$row['functie'].'"}';
            }
        }
    }
}