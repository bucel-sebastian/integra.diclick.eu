<?php
include "../../includes/mediaplandbh.inc.php";
include "../../includes/dbh.inc.php";

session_start();
error_reporting(0);

if(isset($_SESSION['user-data']) && $_SESSION['user-data']->tip === "client"){
    
    if(isset($_GET['scheduleId'])){
        
        $clientId= $_SESSION['user-data']->company;
        $tableName = $clientId."_mediaplan";
        $scheduleId = $_GET['scheduleId'];

        $date = date("Y-m-d H:i:s");
        $sql = "SELECT * FROM `users` WHERE `unicId`='$clientId'";
        $result=mysqli_query($conn,$sql);
        if(mysqli_num_rows($result)===1){
            $row=mysqli_fetch_assoc($result);
            $client = $row['name']." - ".$row['company'];
        }
        $sql = "SELECT * FROM `$tableName` WHERE `scheduleUnicId`='$scheduleId'";
        $result = mysqli_query($mpConn,$sql);
        if(mysqli_num_rows($result)===1){
            $row=mysqli_fetch_assoc($result);
            $scheduleDate = $row['date']." - ".$row['time'];
        }
        
        $sql = "UPDATE `$tableName` SET `status`='4' WHERE `scheduleUnicId`='$scheduleId'";
        
        mysqli_query($mpConn,$sql);
        if(!mysqli_affected_rows($mpConn)){
            echo "fail";
        }
        else{
            echo "success";
            $sql = "INSERT INTO `admin_notifications`(`date`, `text`, `client`, `status`) VALUES ('$date','Media plan schedule from $scheduleDate is aproved!','$client','')";
            mysqli_query($conn,$sql);   
        }
    }
    else{
        echo "fail1";
    }
}
else{
    echo "fail2";
}
