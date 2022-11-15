<?php

include "../../includes/dbh.inc.php";
include "../../includes/updatesdbh.inc.php";
include "../../includes/crmdbh.inc.php";

$client = $_POST['client'];
$numeRaport = $_POST['nume-raport'];
$linkRaport = $_POST['link-raport'];

$id = uniqid("report",false);

$sql="SELECT * FROM `reports` WHERE `client`='$client'";
$result = mysqli_query($conn,$sql);
if($result){
    if(mysqli_num_rows($result)===1){
        $row=mysqli_fetch_assoc($result);
        $reports = json_decode($row['reports']);

        for($i=0;$i<sizeof($reports);$i++){
            $tmp = $reports[$i];
            if($tmp->reportId===$id){
                $id = uniqid("report",false);
            }
        }
        array_push($reports,array("reportId"=>$id,"name"=>$numeRaport,"link"=>$linkRaport));
        $reportsJSON=json_encode($reports);
        $sql = "UPDATE `reports` SET `reports`='$reportsJSON' WHERE `client`='$client'";
        if(mysqli_query($conn,$sql)){
            echo '{"status":"success"}';
        }
        else{
            echo '{"status":"fail","error":"'.$conn->error.'"}';
        }
    }
    else{
        $reports = array();
        array_push($reports,array("reportId"=>$id,"name"=>$numeRaport,"link"=>$linkRaport));
        $reportsJSON=json_encode($reports);
        $sql = "INSERT INTO `reports`(`client`, `reports`) VALUES ('$client','$reportsJSON')";
        if(mysqli_query($conn,$sql)){
            echo '{"status":"success"}';
        }
        else{
            echo '{"status":"fail","error":"'.$conn->error.'"}';
        }
        
    }
}