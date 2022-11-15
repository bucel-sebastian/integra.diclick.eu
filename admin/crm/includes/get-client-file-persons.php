<?php

include "../../../includes/dbh.inc.php";
include "../../../includes/crmdbh.inc.php";

session_start();
error_reporting(0);

    if(isset($_GET['id'])){
        $clientId=$_GET['id'];

        $sql = "SELECT * FROM `client_pers` WHERE `unicId`='$clientId'";
        $result = mysqli_query($crmConn,$sql);
        if($result){
            $index=0;
            echo "[";
            while($row=mysqli_fetch_assoc($result)){
                if($index===0){
                    echo '{"id":"'.$row['id'].'","nume":"'.$row['nume'].'","prenume":"'.$row['prenume'].'","email":"'.$row['email'].'","telefon":"'.$row['telefon'].'","esteDecident":"'.$row['este_decident'].'","functie":"'.$row['functie'].'"}';
                    $index++;
                }
                else{
                    echo ',{"id":"'.$row['id'].'","nume":"'.$row['nume'].'","prenume":"'.$row['prenume'].'","email":"'.$row['email'].'","telefon":"'.$row['telefon'].'","esteDecident":"'.$row['este_decident'].'","functie":"'.$row['functie'].'"}';
                    $index++;
                }
            }
            echo "]";
        }
    }
