<?php

include "../../includes/dbh.inc.php";
include "../../includes/tasksdbh.inc.php";

session_start();
error_reporting(0);
if(isset($_SESSION['unicId'])){
    $unicId=$_SESSION['unicId'];
    $sql = "SELECT * FROM `users` WHERE `unicId`='$unicId'";
    $result=mysqli_query($conn,$sql);
    if($result){
        while($row=mysqli_fetch_assoc($result)){
            $author=$row['name'];
        }
    }
}

$sql="SELECT * FROM `users` WHERE `unicId`='$unicId'";
    $result=mysqli_query($conn,$sql);
    if($result){
        $row=mysqli_fetch_assoc($result);
        $notifClient=$row['name']." - ".$row['company'];
    }

$projectId = $_POST['projectId'];

$sql="SELECT * FROM `$unicId` WHERE `projectId`='$projectId'";
    $result=mysqli_query($tasksConn,$sql);
    if($result){
        $row=mysqli_fetch_assoc($result);
        $projectName=$row['name'];
    }

$title = $_POST['title'];
$description = $_POST['text'];
$endDate= $_POST['enddate'];
$icon = $_POST['icon'];
$startDate = date("Y-m-d");
$taskId = uniqid("task",false);
if(isset($_FILES['file'])){

    $numOfFiles = sizeof($_FILES['file']['name']);
    $sqlDestinationPath ="files/".$projectId."/".$taskId."/";
    $fileDestinationPath = "../../user/tasks/files/".$projectId."/".$taskId."/";
    $allFilesSql="";
    $fileExist="../../user/tasks/files/".$projectId."/".$taskId;
    for($i=0;$i<$numOfFiles;$i++){
        $fileName[$i]=$_FILES['file']['name'][$i];
        $fileTmpName[$i] = $_FILES['file']['tmp_name'][$i];
        $fileSize[$i] = $_FILES['file']['size'][$i];
        $fileError[$i] = $_FILES['file']['error'][$i];
        $fileType[$i] = $_FILES['file']['type'][$i];

        $fileExt = explode(".",$fileName[$i]);
        $fileActualExt[$i] = strtolower(end($fileExt));

        
        $fileNewName[$i]=$fileName[$i];
        $sqlDestination[$i]=$sqlDestinationPath.$fileNewName[$i];

    }

    for($i=0;$i<$numOfFiles;$i++){
        $allFilesSql.=$sqlDestination[$i];
        $fileDestination[$i] = $fileDestinationPath.$fileNewName[$i];
        if($i!=$numOfFiles-1){
            $allFilesSql.="\n";
        }
    }

}
else{
    $allFilesSql="";
}


$status = 0;

$sql = "INSERT INTO `$projectId`(`taskId`, `name`, `description`, `icon`, `status`, `startDate`, `endDate`,`files`,`author`) VALUES ('$taskId','$title','$description','$icon','$status','$startDate','$endDate','$allFilesSql','$author')";
$result=mysqli_query($tasksConn,$sql);
if($result){
    if($allFilesSql!=""){
        if(!file_exists($fileExist)){
            mkdir($fileExist,0777,true);
        }
        for($i=0;$i<$numOfFiles;$i++){
            move_uploaded_file($fileTmpName[$i],$fileDestination[$i]);
        }
    }
    $notifText="New task added - ".$title." in project - ".$projectName;
    $notifDate=date("Y-m-d H:i:s");
    $sql="INSERT INTO `admin_notifications`(`date`, `text`,`client`, `status`) VALUES ('$notifDate','$notifText','$notifClient','1')";
    if(mysqli_query($conn,$sql)){
        echo "success";
    }else{
        echo $conn->error;
    }
}
else{
    echo $tasksConn->error;
    echo "fail";
}
