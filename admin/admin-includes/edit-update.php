<?php

include "../../includes/dbh.inc.php";
include "../../includes/updatesdbh.inc.php";

if(isset($_FILES['files'])){

    $description = $_POST['description'];
    $unicId=$_POST['clientId'];
    $unicId=str_replace("_updates","",$unicId);

    
    $updId=$_POST['updateId'];
    $tableName = $unicId."_updates";

    $sql = "SELECT * FROM `$tableName` WHERE `id`='$updId'";
    $result=mysqli_query($updsConn,$sql);
    if($result){
        $row=mysqli_fetch_assoc($result);
        $actualFiles=$row['file'];
    }


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

    $updtFiles=$actualFiles."\n".$allFilesSql;

    $fileExist = '../../user/updates/files/'.$unicId.'/';
   
    $sql = "UPDATE `$tableName` SET `description`='$description',`file`='$updtFiles' WHERE `id` = '$updId'";
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
        echo "success";
        
    }
}
else{
    $description = $_POST['description'];
    $unicId=$_POST['clientId'];
    $unicId=str_replace("_updates","",$unicId);

    $updId=$_POST['updateId'];
    $tableName = $unicId."_updates";

    $sql = "UPDATE `$tableName` SET `description`='$description' WHERE `id`='$updId'";
    $result=mysqli_query($updsConn,$sql);
    if(!$result){
        echo "fail1";
    }
    else{
        echo "success";
        
    }
}
