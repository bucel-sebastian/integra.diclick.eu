<?php


include "../../includes/dbh.inc.php";
include "../../includes/updatesdbh.inc.php";
include "../../includes/crmdbh.inc.php";

$clientId= $_POST['client'];
$reportId= $_POST['id-report'];

$numeRaport = $_POST['nume-raport'];
$linkRaport = $_POST['link-raport'];

$sql = "SELECT * FROM `reports` WHERE `client`='$clientId'";
$result = mysqli_query($conn,$sql);
if($result){
    if(mysqli_num_rows($result)===1){
        $row = mysqli_fetch_assoc($result);

        $reports = json_decode($row['reports']);

        for($i=0;$i<sizeof($reports);$i++){
            $tmp = $reports[$i];
            if($tmp->reportId===$reportId){
                $reports[$i]->name=$numeRaport;
                $reports[$i]->link=$linkRaport;
            }
        }

        $reportsJSON = json_encode($reports);

        $sql = "UPDATE `reports` SET `reports`='$reportsJSON' WHERE `client`='$clientId'";

        if(mysqli_query($conn,$sql)){
            echo '{"status":"success"}';
        }
        else{
            echo '{"status":"fail","error":"'.$conn->error.'"}';
        }
    }
}