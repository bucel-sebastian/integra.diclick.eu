<?php

include "../../includes/dbh.inc.php";
include "../../includes/tasksdbh.inc.php";

$icon1='<i class="fas fa-project-diagram"></i>';
$icon2='<i class="fas fa-paint-brush"></i>';
$icon3='<i class="fas fa-code"></i>';
$icon4='<i class="fas fa-trophy"></i>';
$icon5='<i class="fas fa-chart-pie"></i>';
$icon6='<i class="fas fa-users"></i>';
$icon7='<i class="fas fa-share-alt"></i>';
$icon8='<i class="fas fa-dollar-sign"></i>';


$clientId = $_POST['clientId'];
$title = $_POST['title'];
$description = $_POST['text'];
$endDate= $_POST['enddate'];
$projectType=$_POST['type'];

$startDate = date("Y-m-d");
$projectId = uniqid("project",false);

$status = 0;

$sql = "INSERT INTO `$clientId`(`projectId`, `projectStatus`, `startDate`, `endDate`, `name`, `description`, `projectType`) VALUES ('$projectId', '$status', '$startDate', '$endDate', '$title', '$description', '$projectType')";
$result=mysqli_query($tasksConn,$sql);
if($result){
    $sql2 = "CREATE TABLE `$projectId`(
        id int(11) not null AUTO_INCREMENT PRIMARY KEY,
        taskId varchar(255) not null,
        name varchar(255) not null,
        description text not null,
        icon varchar(255) not null,
        files text not null,
        status int(11) not null,
        comments text not null,
        startDate date not null,
        endDate date not null,
        author varchar(255) not null
    )engine=INNODB default charset=utf8mb4";

    $result2=mysqli_query($tasksConn,$sql2);
    
    if($result2){
        if($projectType==="0"){
            $notifId=$clientId."_notifications";
                $notifText="New project added  - ".$title;
                $notifDate=date("Y-m-d H:i:s");
                $sql="INSERT INTO `$notifId`(`date`, `text`, `status`) VALUES ('$notifDate','$notifText','1')";
                if(mysqli_query($conn,$sql)){
                    echo "success";
                }else{
                    echo $conn->error;
                }
        }
        else if($projectType==="1"){
            $sql = "INSERT INTO `$projectId`(`taskId`, `name`, `description`, `icon`, `files`, `status`, `comments`, `startDate`, `endDate`, `author`) VALUES ('task001','Obiective','Brand awarness, sale push, social media egagement','$icon1','','0','','$startDate','0000-00-00','Owner'),
            ('task002','Perioada','','$icon1','','0','','$startDate','0000-00-00','Owner'),
            ('task003','Concept si mecanica','','$icon1','','0','','$startDate','0000-00-00','Owner'),
            ('task004','Premii','','$icon4','','0','','$startDate','0000-00-00','Owner'),
            ('task005','Regulament','','$icon1','','0','','$startDate','0000-00-00','Owner'),
            ('task006','Key visual','','$icon2','','0','','$startDate','0000-00-00','Owner'),
            ('task007','POSM','','$icon1','','0','','$startDate','0000-00-00','Owner'),
            ('task008','Assets for social media','','$icon2','','0','','$startDate','0000-00-00','Owner'),
            ('task009','Landing page','','$icon3','','0','','$startDate','0000-00-00','Owner')";
            $result=mysqli_query($tasksConn,$sql);
            if($result){
                $notifId=$clientId."_notifications";
                $notifText="New project added  - ".$title;
                $notifDate=date("Y-m-d H:i:s");
                $sql="INSERT INTO `$notifId`(`date`, `text`, `status`) VALUES ('$notifDate','$notifText','1')";
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
        else if($projectType==="2"){
            $sql = "INSERT INTO `$projectId`(`taskId`, `name`, `description`, `icon`, `files`, `status`, `comments`, `startDate`, `endDate`, `author`) VALUES ('task001','Website layout','','$icon2','','0','','$startDate','0000-00-00','Owner'),
            ('task002','Functionalitati website','','$icon3','','0','','$startDate','0000-00-00','Owner'),
            ('task003','Server needs','','$icon3','','0','','$startDate','0000-00-00','Owner')";
            $result=mysqli_query($tasksConn,$sql);
            if($result){
                $notifId=$clientId."_notifications";
                $notifText="New project added  - ".$title;
                $notifDate=date("Y-m-d H:i:s");
                $sql="INSERT INTO `$notifId`(`date`, `text`, `status`) VALUES ('$notifDate','$notifText','1')";
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
        else if($projectType==="3"){
            $sql = "INSERT INTO `$projectId`(`taskId`, `name`, `description`, `icon`, `files`, `status`, `comments`, `startDate`, `endDate`, `author`) VALUES ('task001','Tip material dorit','Static, dinamic, video, etc','$icon2','','0','','$startDate','0000-00-00','Owner'),
            ('task002','Materiale necesare dezvoltarii','Logo, guide line, vectors, etc','$icon1','','0','','$startDate','0000-00-00','Owner')";
            $result=mysqli_query($tasksConn,$sql);
            if($result){
                $notifId=$clientId."_notifications";
                $notifText="New project added  - ".$title;
                $notifDate=date("Y-m-d H:i:s");
                $sql="INSERT INTO `$notifId`(`date`, `text`, `status`) VALUES ('$notifDate','$notifText','1')";
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
        else if($projectType==="4"){
            $sql = "INSERT INTO `$projectId`(`taskId`, `name`, `description`, `icon`, `files`, `status`, `comments`, `startDate`, `endDate`, `author`) VALUES ('task001','Obiective','Brand awarness, sale push, product launch','$icon1','','0','','$startDate','0000-00-00','Owner'),
            ('task002','Concept si mecanica','','$icon1','','0','','$startDate','0000-00-00','Owner'),
            ('task003','Logistics','Locatie si perioada','$icon1','','0','','$startDate','0000-00-00','Owner'),
            ('task004','Key visual','','$icon2','','0','','$startDate','0000-00-00','Owner'),
            ('task005','POSM','','$icon2','','0','','$startDate','0000-00-00','Owner'),
            ('task006','Materiale necesare activarii','','$icon1','','0','','$startDate','0000-00-00','Owner'),
            ('task007','Resurse umane necesare','','$icon6','','0','','$startDate','0000-00-00','Owner')";
            $result=mysqli_query($tasksConn,$sql);
            if($result){
                $notifId=$clientId."_notifications";
                $notifText="New project added  - ".$title;
                $notifDate=date("Y-m-d H:i:s");
                $sql="INSERT INTO `$notifId`(`date`, `text`, `status`) VALUES ('$notifDate','$notifText','1')";
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
        else if($projectType==="5"){
            $sql = "INSERT INTO `$projectId`(`taskId`, `name`, `description`, `icon`, `files`, `status`, `comments`, `startDate`, `endDate`, `author`) VALUES ('task001','Obiective','Brand awarness, sale push, product launch','$icon1','','0','','$startDate','0000-00-00','Owner'),
            ('task002','Retele de social media','','$icon7','','0','','$startDate','0000-00-00','Owner'),
            ('task003','Buget','','$icon8','','0','','$startDate','0000-00-00','Owner'),
            ('task004','Media plan','','$icon7','','0','','$startDate','0000-00-00','Owner')";
            $result=mysqli_query($tasksConn,$sql);
            if($result){
                $notifId=$clientId."_notifications";
                $notifText="New project added  - ".$title;
                $notifDate=date("Y-m-d H:i:s");
                $sql="INSERT INTO `$notifId`(`date`, `text`, `status`) VALUES ('$notifDate','$notifText','1')";
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
        else if($projectType==="6"){
            $sql = "INSERT INTO `$projectId`(`taskId`, `name`, `description`, `icon`, `files`, `status`, `comments`, `startDate`, `endDate`, `author`) VALUES ('task001','Obiective','Brand awarness, sale push, product launch','$icon1','','0','','$startDate','0000-00-00','Owner'),
            ('task002','Concept si mecanica','','$icon1','','0','','$startDate','0000-00-00','Owner'),
            ('task003','Retele de social media','','$icon7','','0','','$startDate','0000-00-00','Owner'),
            ('task004','Buget','','$icon8','','0','','$startDate','0000-00-00','Owner'),
            ('task005','Media plan','','$icon7','','0','','$startDate','0000-00-00','Owner')";
            $result=mysqli_query($tasksConn,$sql);
            if($result){
                $notifId=$clientId."_notifications";
                $notifText="New project added  - ".$title;
                $notifDate=date("Y-m-d H:i:s");
                $sql="INSERT INTO `$notifId`(`date`, `text`, `status`) VALUES ('$notifDate','$notifText','1')";
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
        else if($projectType==="7"){
            $sql = "INSERT INTO `$projectId`(`taskId`, `name`, `description`, `icon`, `files`, `status`, `comments`, `startDate`, `endDate`, `author`) VALUES ('task001','Scope','','$icon1','','0','','$startDate','0000-00-00','Owner'),
            ('task002','Layout','','$icon2','','0','','$startDate','0000-00-00','Owner'),
            ('task003','Functionalitati platforma','','$icon3','','0','','$startDate','0000-00-00','Owner'),
            ('task004','Server needs','','$icon3','','0','','$startDate','0000-00-00','Owner')";
            $result=mysqli_query($tasksConn,$sql);
            if($result){
                $notifId=$clientId."_notifications";
                $notifText="New project added  - ".$title;
                $notifDate=date("Y-m-d H:i:s");
                $sql="INSERT INTO `$notifId`(`date`, `text`, `status`) VALUES ('$notifDate','$notifText','1')";
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
    else{
        echo $tasksConn -> error;
        echo "fail2";
    }
}
else{
    echo "fail";
}
