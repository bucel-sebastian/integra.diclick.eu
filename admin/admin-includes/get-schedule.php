<?php

include "../../includes/mediaplandbh.inc.php";
include "../../includes/dbh.inc.php";

if(isset($_GET['clientId'])){
    $clientid=$_GET['clientId'];
    $clientIdMp=$clientid."_mediaplan";

    if(isset($_GET['platform'])){
        $platform=$_GET['platform'];
        $sql = "SELECT * FROM `$clientIdMp` WHERE `platforms` LIKE '%$platform%'";

        $result = mysqli_query($mpConn,$sql);
        echo '[';
        $arrayOfresult = array(array("numOfResults"=>mysqli_num_rows($result)));
        while($row = mysqli_fetch_assoc($result)){
            $allPlatforms="";
            $platforms = $row['platforms'];
            // echo $platforms;
            
            for($i=0;$i<strlen($platforms);$i++){
                if($platforms[$i]==="\n"){
                    $allPlatforms.=",";
                }
                else{
                    $allPlatforms.=$platforms[$i];
                }
            }
            $text = str_replace(array("\r\n", "\n\r", "\r", "\n"),"<br>",$row['text']);

            array_push($arrayOfresult,array("date"=>$row['date'],"scheduleUnicId"=>$row['scheduleUnicId'],"file"=>$row['file'],"title"=>$row['title'],"text"=>$text,"status"=>$row['status'],"platforms"=>$allPlatforms));
            // echo json_encode(array("date"=>$row['date'],"scheduleUnicId"=>$row['scheduleUnicId'],"file"=>$row['file'],"title"=>$row['title'],"text"=>$text,"status"=>$row['status'],"platforms"=>$allPlatforms));
        }
        echo json_encode($arrayOfresult);
        echo "]";
    }
    else{
        $sql = "SELECT * FROM `$clientIdMp`";

        $result = mysqli_query($mpConn,$sql);
        echo '[';
        $arrayOfresult = array(array("numOfResults"=>mysqli_num_rows($result)));
        while($row = mysqli_fetch_assoc($result)){
            $allPlatforms="";
            $platforms = $row['platforms'];
            // echo $platforms;
            
            for($i=0;$i<strlen($platforms);$i++){
                if($platforms[$i]==="\n"){
                    $allPlatforms.=",";
                }
                else{
                    $allPlatforms.=$platforms[$i];
                }
            }
            
            $text = str_replace(array("\r\n", "\n\r", "\r", "\n"),"<br>",$row['text']);
            array_push($arrayOfresult,array("date"=>$row['date'],"scheduleUnicId"=>$row['scheduleUnicId'],"file"=>$row['file'],"title"=>$row['title'],"text"=>$text,"status"=>$row['status'],"platforms"=>$allPlatforms));
            // echo json_encode(array("date"=>$row['date'],"scheduleUnicId"=>$row['scheduleUnicId'],"file"=>$row['file'],"title"=>$row['title'],"text"=>$text,"status"=>$row['status'],"platforms"=>$allPlatforms));
            // echo ',{"date":"'.$row['date'].'","scheduleUnicId":"'.$row['scheduleUnicId'].'","file":"'.$row['file'].'","title":"'.$row['title'].'","text":"'.$text.'","status":"'.$row['status'].'","platforms":"'.$allPlatforms.'"}';

        }
        echo json_encode($arrayOfresult);

        echo "]";
    }
    
}
else{
    echo "client id error";
}


?>