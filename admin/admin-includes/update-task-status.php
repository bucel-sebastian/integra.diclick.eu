<?php

include "../../includes/dbh.inc.php";
include "../../includes/tasksdbh.inc.php";

session_start();
error_reporting(0);

if(isset($_POST['taskId']) && isset($_POST['projectId'])){
    $taskId=$_POST['taskId'];
    $clientId=$_POST['clientId'];
    $projectId=$_POST['projectId'];
    $date = date("Y-m-d H:i:s");

    $sql="SELECT * FROM `$clientId` WHERE `projectId`='$projectId'";
    $result=mysqli_query($tasksConn,$sql);
    if($result){
        $row=mysqli_fetch_assoc($result);
        $projectName=$row['name'];
    }

    $userUnicId=$_SESSION['unicId'];
    $sql= "SELECT * FROM `users` WHERE `unicId`='$userUnicId'";
    $result=mysqli_query($conn,$sql);
    if($result){
        $row=mysqli_fetch_assoc($result);
        $name=$row['name'];
        if(isset($_POST['status'])){
            $status=$_POST['status'];
            if($status==="2"){
                if($_POST['text']!=""){
                    $text=$_POST['text'];
                    $sql="SELECT * FROM `$projectId` WHERE `taskId`='$taskId'";
                    $result=mysqli_query($tasksConn,$sql);
                    if($result){
                        $row=mysqli_fetch_assoc($result);
                        $comments=$row['comments'];
                        $comments.=$_SESSION['unicId'].'÷'.$name.'÷'.$date.'÷'.$text.'÷\n';
                        $sql="UPDATE `$projectId` SET `status`='$status', `comments`='$comments' WHERE `taskId`='$taskId'";
                        $result=mysqli_query($tasksConn,$sql);
                        if($result){
                            $taskName=$row['name'];
                            $notifId=$clientId."_notifications";
                            $notifText="Task status updated - ".$taskName." in project - ".$projectName." - Need clarifications!";
                            $notifDate=date("Y-m-d H:i:s");
                            $sql="INSERT INTO `$notifId`(`date`, `text`, `status`) VALUES('$notifDate','$notifText','1')";
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
                    else{
                        echo "erroare nu exista proiect/task";
                    }
                }
                else{
                    echo "eroare Nu ai textul";
                }
            }
            else{
                $sql="UPDATE `$projectId` SET `status`='$status' WHERE `taskId`='$taskId'";
                $result=mysqli_query($tasksConn,$sql);
                if($result){
                    $taskName=$row['name'];
                            $notifId=$clientId."_notifications";
                            $notifText="Task status updated - ".$taskName." in project - ".$projectName;
                            $notifDate=date("Y-m-d H:i:s");
                            $sql="INSERT INTO `$notifId`(`date`, `text`, `status`) VALUES('$notifDate','$notifText','1')";
                            if(mysqli_query($conn,$sql)){
                                echo "success";
                            }else{
                                echo $conn->error;
                            }
                }
                else{
                    echo "fail";
                }
            }
        }
    }
    else{
        echo $conn->error;
    }
    
}
