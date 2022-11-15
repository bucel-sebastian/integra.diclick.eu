<?php

include "../../includes/dbh.inc.php";

session_start();
error_reporting(0);

if(isset($_SESSION['user-data'])){
    $userData=$_SESSION['user-data'];

    if(isset($_GET['id'])){
        $id = $_GET['id'];
        $clientId = $userData->company;

        $sql="SELECT * FROM `reports` WHERE `client`='$clientId'";
        $result = mysqli_query($conn,$sql);
        if($result){
            if(mysqli_num_rows($result)===1){
                $row = mysqli_fetch_assoc($result);
                $reports = json_decode($row['reports']);
                for($i=0;$i<sizeof($reports);$i++){
                    $tmp = $reports[$i];
                    if($tmp->reportId === $id){
                        echo json_encode($tmp);
                    }
                }
                // echo json_encode($reports);
            }
            else{
                echo '{"status":"no reports 3"}';
            }
        }
        else{
            echo '{"status":"no reports 4"}';
        }
    }
    else{
        $clientId = $userData->company;
        $sql="SELECT * FROM `reports` WHERE `client`='$clientId'";
        $result = mysqli_query($conn,$sql);
        if(mysqli_num_rows($result)>0){
            if(mysqli_num_rows($result)===1){
                $row = mysqli_fetch_assoc($result);
                $reports = json_decode($row['reports']);
                
                echo json_encode($reports);
            }
            else{
                echo '{"status":"no reports 1"}';
            }
        }
        else{
            echo '{"status":"no reports 2"}';
        }
    }

    
}