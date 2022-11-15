<?php

include "../../includes/mediaplandbh.inc.php";
include "../../includes/dbh.inc.php";

if(isset($_FILES['file'])){
    
    $clientId = $_POST['clientId'];
    $tableName = $clientId."_mediaplan";

    $scheduleId=uniqid("schedule",false);
    $scheduleDate= $_POST['date'];
    $scheduleTime = $_POST['time'];
    $title = $_POST['title'];
    $text = $_POST['text'];
    $platform = "";
    for($i=0;$i<sizeof($_POST['platform']);$i++){
        $platform.=$_POST['platform'][$i];
        $platform.="\n";
    }
    
    $status = 1;

    $sqlDestinationPath ="files/".$clientId."/";
    $fileDestinationPath = "../../user/media-plan/files/".$clientId."/";

    $fileName = $_FILES['file']['name'];
    $fileTmpName = $_FILES['file']['tmp_name'];
    $fileSize = $_FILES['file']['size'];
    $fileError = $_FILES['file']['error'];
    $fileType = $_FILES['file']['type'];

    $fileExt = explode(".",$fileName);
    $fileActualExt = strtolower(end($fileExt));
    

    $fileNewName = "schedule_".$scheduleId."_".$scheduleDate.".".$fileActualExt;
    
    $sqlDestination = $sqlDestinationPath.$fileNewName;
    
    $fileDestination = $fileDestinationPath.$fileNewName;
    $fileExist="../../user/media-plan/files/".$clientId;

   

    $sql = "INSERT INTO `$tableName`( `scheduleUnicId`, `file`, `title`, `text`, `platforms`, `date`, `status`, `time`) VALUES ('$scheduleId','$sqlDestination','$title','$text','$platform','$scheduleDate','$status','$scheduleTime')";

    mysqli_query($mpConn,$sql);
    if(!mysqli_affected_rows($mpConn)){
        echo "fail";
    }
    else{
        if(!file_exists($fileExist)){
            mkdir($fileExist,0777,true);
        }
        move_uploaded_file($fileTmpName,$fileDestination);
        $notifId=$clientId."_notifications";
        $notifText="New schedule in your media plan on date - ".$scheduleDate;
        $notifDate=date("Y-m-d H:i:s");
        // $sql="INSERT INTO `$notifId`(`date`, `text`,`status`) VALUES('$notifDate','$notifText','1')";
        // if(mysqli_query($conn,$sql)){
            echo "success";
        // }else{
        //     echo $conn->error;
        // }
    }
}
else{
    echo "fail photo";
}
