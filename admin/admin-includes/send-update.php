<?php

include "../../includes/dbh.inc.php";
include "../../includes/updatesdbh.inc.php";


if(isset($_FILES['files'])){

    $date = date("Y-m-d");
    $description = $_POST['description'];
    $unicId=$_POST['unicId'];
    $tableName = $unicId."_updates";

    $numOfFiles = sizeof($_FILES['files']['name']);
    $fileDestinationPath = "../../user/updates/files/".$unicId."/";
   
    $sqlDestinationPath = "files/".$unicId."/";
    $allFilesSql="";

    for($i=0;$i<$numOfFiles;$i++){
        $fileName[$i]=$_FILES['files']['name'][$i];
        $fileTmpName[$i] = $_FILES['files']['tmp_name'][$i];
        $fileSize[$i] = $_FILES['files']['size'][$i];
        $fileError[$i] = $_FILES['files']['error'][$i];
        $fileType[$i] = $_FILES['files']['type'][$i];

        $fileExt = explode(".",$fileName[$i]);
        $fileActualExt[$i] = strtolower(end($fileExt));

        $fileNewName[$i]=$_FILES['files']['name'][$i];
        $sqlDestination[$i]=$sqlDestinationPath.$fileNewName[$i];

    }

    for($i=0;$i<$numOfFiles;$i++){
        $allFilesSql.=$sqlDestination[$i];
        $fileDestination[$i] = $fileDestinationPath.$fileNewName[$i];
        if($i!=$numOfFiles-1){
            $allFilesSql.="\n";
        }
    }

    $fileExist = '../../user/updates/files/'.$unicId.'/';
    $sql = "INSERT INTO `$tableName`( `date`, `description`, `file`) VALUES ('$date','$description','$allFilesSql')";
    mysqli_query($updsConn,$sql);
    if(!mysqli_affected_rows($updsConn)){
        echo "fail";
    }
    else{
        if(!file_exists($fileExist)){
            mkdir('../../user/updates/files/'.$unicId,0777,true);
        }
        for($i=0;$i<$numOfFiles;$i++){
            move_uploaded_file($fileTmpName[$i],$fileDestination[$i]);
        }
        $notifId=$unicId."_notifications";
        $notifText="New updates added!";
        $notifDate=date("Y-m-d H:i:s");
        $sql="INSERT INTO `$notifId`(`date`, `text`, `status`) VALUE('$notifDate','$notifText','1')";
        if(mysqli_query($conn,$sql)){
            echo "success";
        }else{
            echo $conn->error;
        }
    }
}
else{
    $date = date("Y-m-d");
    $description = $_POST['description'];
    $unicId=$_POST['unicId'];
    $tableName = $unicId."_updates";



    $sql = "INSERT INTO `$tableName`( `date`, `description`) VALUES ('$date','$description')";
    mysqli_query($updsConn,$sql);
    if(!mysqli_affected_rows($updsConn)){
        echo "fail";
    }
    else{
        $notifId=$unicId."_notifications";
        $notifText="New updates added!";
        $notifDate=date("Y-m-d H:i:s");
        $sql="INSERT INTO `$notifId`(`date`, `text`, `status`) VALUE('$notifDate','$notifText','1')";
        if(mysqli_query($conn,$sql)){
            echo "success";
        }else{
            echo $conn->error;
        }
    }
}

?>