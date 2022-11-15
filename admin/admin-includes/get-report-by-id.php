<?php

include "../../includes/dbh.inc.php";
include "../../includes/updatesdbh.inc.php";
include "../../includes/crmdbh.inc.php";

if(isset($_GET['client']) && isset($_GET['report'])){

    $clientId = $_GET['client'];
    $reportId = $_GET['report'];

    $sql = "SELECT * FROM `reports` WHERE `client`='$clientId'";
    $result = mysqli_query($conn,$sql);
    if($result){
        if(mysqli_num_rows($result)===1){
            $row = mysqli_fetch_assoc($result);
            $reports = json_decode($row['reports']);


            for($i=0;$i<sizeof($reports);$i++){
                $tmp = $reports[$i];
                if($tmp->reportId===$reportId){
                    echo json_encode($tmp);
                }
            }
        }
    }
}