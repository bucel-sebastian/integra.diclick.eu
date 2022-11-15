<?php

include "../../includes/dbh.inc.php";
include "../../includes/tasksdbh.inc.php";

session_start();
error_reporting(0);

if($_POST['text']!=""){
    $projectId=$_POST['projectId'];
    $taskId=$_POST['taskId'];

    $text=$_POST['text'];
    $userId=$_SESSION['unicId'];
    $date=date("Y-m-d H:i:d");

    $sql="SELECT * FROM `users` WHERE `unicId`='$userId'";
    $result=mysqli_query($conn,$sql);
    if($result){
        $row=mysqli_fetch_assoc($result);
        $notifClient=$row['name']." - ".$row['company'];
    }

    $sql="SELECT * FROM `$userId` WHERE `projectId`='$projectId'";
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

            $sql="UPDATE `$projectId` SET `status`='$status', `comments`='$comments' WHERE `taskId`='$taskId'";
            $result=mysqli_query($tasksConn,$sql);
            if($result){
                
                $notifText="New comment added in task - ".$taskName." in project - ".$projectName;
                $notifDate=date("Y-m-d H:i:s");
                $sql="INSERT INTO `admin_notifications`(`date`, `text`, `client`, `status`) VALUES ('$notifDate','$notifText','$notifClient','1')";
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

