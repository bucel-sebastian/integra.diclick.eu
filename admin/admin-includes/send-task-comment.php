<?php

include "../../includes/dbh.inc.php";
include "../../includes/tasksdbh.inc.php";

session_start();
error_reporting(0);

if($_POST['text']!=""){
    $clientId=$_POST['clientId'];
    $projectId=$_POST['projectId'];
    $taskId=$_POST['taskId'];

    $text=$_POST['text'];
    $userId=$_SESSION['unicId'];
    $date=date("Y-m-d H:i:d");
    $sql="SELECT * FROM `$clientId` WHERE `projectId`='$projectId'";
    $result=mysqli_query($tasksConn,$sql);
    if($result){
        $row=mysqli_fetch_assoc($result);
        $projectName=$row['name'];
    }

    $sql = "SELECT * FROM `users` WHERE `unicId`='$userId'";
    $result = mysqli_query($conn,$sql);
    if($result){
        $row=mysqli_fetch_assoc($result);
        $name=$row['name'];

        $sql = "SELECT * FROM `$projectId` WHERE `taskId`='$taskId'";
        $result=mysqli_query($tasksConn,$sql);
        if($result){
            $row=mysqli_fetch_assoc($result);
            $comments=$row['comments'];
            $comments.=$userId.'÷'.$name.'÷'.$date.'÷'.$text.'÷\n';
            $taskName=$row['name'];
            $sql="UPDATE `$projectId` SET `status`='$status', `comments`='$comments' WHERE `taskId`='$taskId'";
            $result=mysqli_query($tasksConn,$sql);
            if($result){
                $notifId=$clientId."_notifications";
                $notifText="New comment added in task - ".$taskName." in project - ".$projectName;
                $notifDate=date("Y-m-d H:i:s");
                $sql="INSERT INTO `$notifId`(`date`, `text`, `status`) VALUES ('$notifDate','$notifText','1')";
                if(mysqli_query($conn,$sql)){
                    echo "success";
                }else{
                    echo $conn->error;
                }
                
            }
            else{
                echo "fail Query";
            }
        }
    }
}