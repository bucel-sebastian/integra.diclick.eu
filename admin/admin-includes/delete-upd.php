<?php
include "../../includes/dbh.inc.php";
include "../../includes/updatesdbh.inc.php";

session_start();

error_reporting(0);

if(isset($_GET['id']) && isset($_GET['clientId'])){
    $id=$_GET['id'];
    $clientId=$_GET['clientId'];

    $sql = "SELECT * FROM `$clientId` WHERE `id`='$id'";
    $result=mysqli_query($updsConn,$sql);
    if($result){
        $j=0;
        $row=mysqli_fetch_assoc($result);
        $allFiles=$row['file'];
        $file=NULL;
        for($i=0;$i<strlen($allFiles);$i++){
            if($allFiles[$i]==="\n"){
                $j++;
                $file[$j]="";
            }
            else{
                $file[$j].=$allFiles[$i];
            }
        }
        for($i=0;$i<=$j;$i++){
            unlink("../../user/updates/".$file[$i]);
        }
    }
    $sql="DELETE FROM `$clientId` WHERE `id`='$id'";
    $result=mysqli_query($updsConn,$sql);
    if($result){
        echo "success";
    }
    else{
        echo $updsConn->error;
    }
}