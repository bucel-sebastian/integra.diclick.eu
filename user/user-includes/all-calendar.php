<?php

include "../../includes/mediaplandbh.inc.php";
include "../../includes/dbh.inc.php";

session_start();
error_reporting(0);

if(isset($_SESSION['user-data']) && $_SESSION['user-data']->tip === "client"){
    $unicId=$_SESSION['user-data']->company;
    $clientIdMp=$unicId."_mediaplan";
    $date = date("Y-m-d H:i:s");
    $sql = "SELECT * FROM `users` WHERE `unicId`='$unicId'";
    $result=mysqli_query($conn,$sql);
    if(mysqli_num_rows($result)===1){
        $row=mysqli_fetch_assoc($result);
        $client = $row['name']." - ".$row['company'];
    }

    foreach($_POST as $key => $value){
        $sql = "SELECT * FROM `$clientIdMp` WHERE `scheduleUnicId`='$key'";
        $result=mysqli_query($mpConn,$sql);
        if($result){
            if(mysqli_num_rows($result)===1){
                $sql = "UPDATE `$clientIdMp` SET `status`='4' WHERE `scheduleUnicId`='$key'";
                if(mysqli_query($mpConn,$sql)){
                    $out='{"status":"success"}';
                }
                else{
                    $out='{"status":"fail","error":"'.$mpConn->error.'"}';
                    echo $out;
                }
            }
        }
    }
    $sql = "INSERT INTO `admin_notifications`(`date`, `text`, `client`, `status`) VALUES ('$date','All media plan schedules are aproved!','$client','')";
    mysqli_query($conn,$sql);
    echo $out;
}