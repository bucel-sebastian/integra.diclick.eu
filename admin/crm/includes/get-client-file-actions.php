<?php

include "../../../includes/dbh.inc.php";
include "../../../includes/crmdbh.inc.php";

session_start();
error_reporting(0);

if(isset($_GET['id'])){
    $clientId=$_GET['id'];

    $sql = "SELECT * FROM `$clientId` ORDER BY `data` DESC, `timp` DESC LIMIT 0,10";
    $result = mysqli_query($crmConn,$sql);
    if($result){
        if(mysqli_num_rows($result)>0){
            echo '[{"numRes":"'.mysqli_num_rows($result).'"}';
            while($row=mysqli_fetch_assoc($result)){
                echo ',{"id":"'.$row['id'].'","data":"'.$row['data'].'","timp":"'.$row['timp'].'","actiune":"'.$row['actiune'].'","concluzie":"'.$row['concluzie'].'","observatiiConcluzie":"'.$row['observatii_concluzie'].'","status":"'.$row['status'].'"}';
            }
            echo ']';
        }
        else{
            echo '[]';
        }
    }
}
