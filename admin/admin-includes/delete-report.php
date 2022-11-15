<?php

include "../../includes/dbh.inc.php";

if(isset($_GET['client']) && isset($_GET['report'])){
    $client = $_GET['client'];
    $report = $_GET['report'];

    $sql = "SELECT * FROM `reports` WHERE `client`='$client'";
    $result = mysqli_query($conn,$sql);
    
    if($result){
        if(mysqli_num_rows($result)===1){
            $row = mysqli_fetch_assoc($result);

            $reports = json_decode($row['reports']);
            
            // echo var_dump($reports);

            for($i=0;$i<sizeof($reports);$i++){
                $tmp=$reports[$i];
                // echo $tmp->reportId;
                // echo var_dump($tmp);
                if($tmp->reportId === $report){
                    // array_pop($reports);
                    array_splice($reports,$i,1);
                }
            }
            // echo var_dump($reports);
            $reportsJSON = json_encode($reports);

            $sql = "UPDATE `reports` SET `reports`='$reportsJSON' WHERE `client`='$client'";
            if(mysqli_query($conn,$sql)){
                echo '{"status":"success"}';
            }
            else{
                echo '{"status":"fail","error":"'.$conn->error.'"}';
            }
        }
    }
}