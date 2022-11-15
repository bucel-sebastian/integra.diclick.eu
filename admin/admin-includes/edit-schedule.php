<?php

include "../../includes/mediaplandbh.inc.php";
include "../../includes/dbh.inc.php";

if($_FILES['edit-file']['name']!=""){
    if(isset($_FILES["edit-file"])){
        
        $clientId= $_POST['edit-clientId'];
        $tableName = $clientId."_mediaplan";
        $scheduleId= $_POST['edit-scheduleId'];
        $scheduleDate= $_POST['edit-date'];
        $scheduleTime = $_POST['edit-time'];
        $title = $_POST['edit-title'];
        $text = $_POST['edit-text'];
        $platform = "";
        for($i=0;$i<sizeof($_POST['edit-platform']);$i++){
            $platform.=$_POST['edit-platform'][$i];
            $platform.="\n";
        }
        $status = 3;
    
        $sqlDestinationPath ="files/".$clientId."/";
        $fileDestinationPath = "../../user/media-plan/files/".$clientId."/";
    
        $fileName = $_FILES['edit-file']['name'];
        $fileTmpName = $_FILES['edit-file']['tmp_name'];
        $fileSize = $_FILES['edit-file']['size'];
        $fileError = $_FILES['edit-file']['error'];
        $fileType = $_FILES['edit-file']['type'];
    
        $fileExt = explode(".",$fileName);
        $fileActualExt = strtolower(end($fileExt));
    
        $fileNewName = "schedule_".$scheduleId."_".$scheduleDate.".".$fileActualExt;
        
        $sqlDestination = $sqlDestinationPath.$fileNewName;
        $sqlDel="SELECT * FROM `$tableName` WHERE `scheduleUnicId`='$scheduleId'";
        $result=mysqli_query($mpConn,$sqlDel);
        while($row=mysqli_fetch_assoc($result)){
            $existingFile = $row['file'];
        }
        $existingFilePath="../../user/media-plan/files/".$existingFile;
    
        $fileDestination = $fileDestinationPath.$fileNewName;
        $fileExist="../../user/media-plan/files/".$clientId;
    
        $sql = "UPDATE `$tableName` SET `file`='$sqlDestination',`title`='$title',`text`='$text',`platforms`='$platform',`date`='$scheduleDate',`status`='$status',`time`='$scheduleTime' WHERE `scheduleUnicId`='$scheduleId'";
    
        // fail1, schedule6274cef4375d8 error: 0 client6270cc757ee33_mediaplan UPDATE `client6270cc757ee33_mediaplan` SET `file`='files/client6270cc757ee33/schedule_schedule6274cef4375d8_2022-05-06.png',`title`='Test 2 ',`text`='Test',`platforms`='facebook ',`date`='2022-05-06',`status`='3',`time`='12:32:00' WHERE `scheduleUnicId`='schedule6274cef4375d8'



        mysqli_query($mpConn,$sql);
        // if(!mysqli_affected_rows($mpConn)){
        //     echo "fail1, ".$scheduleId." error: ".$mpConn->error.mysqli_affected_rows($mpConn)." ".$tableName." ".$sql;
        // }
        // else{
            
            if(!file_exists($fileExist)){
                mkdir($fileExist,0777,true);
            }
            if(file_exists($existingFilePath)){
                unlink($existingFilePath);
            }
            move_uploaded_file($fileTmpName,$fileDestination);
            echo "success";
        // }
        
    }

}
else{
    $clientId= $_POST['edit-clientId'];
    $tableName = $clientId."_mediaplan";
    $scheduleId= $_POST['edit-scheduleId'];
    $scheduleDate= $_POST['edit-date'];
    $scheduleTime = $_POST['edit-time'];
    $title = $_POST['edit-title'];
    $text = $_POST['edit-text'];
    $platform = "";
    for($i=0;$i<sizeof($_POST['edit-platform']);$i++){
        $platform.=$_POST['edit-platform'][$i];
        $platform.="\n";
    }
    $status = 3;
    $sql = "UPDATE `$tableName` SET `title`='$title',`text`='$text',`platforms`='$platform',`date`='$scheduleDate',`status`='$status',`comments`='',`time`='$scheduleTime' WHERE `scheduleUnicId`='$scheduleId'";
    mysqli_query($mpConn,$sql);
    if(!mysqli_affected_rows($mpConn)){
        echo "fail2";
    }
    else{
        echo "success";
    }
}






?>