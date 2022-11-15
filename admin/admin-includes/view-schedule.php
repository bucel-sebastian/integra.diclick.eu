<?php

include "../../includes/mediaplandbh.inc.php";
include "../../includes/dbh.inc.php";

if(isset($_GET['scheduleId'])){
    $scheduleId=$_GET['scheduleId'];
    $clientId=$_GET['clientId'];
    $clientIdMp=$clientId."_mediaplan";
    $sql = "SELECT * FROM `$clientIdMp` WHERE `scheduleUnicId`='$scheduleId'";   

    $result = mysqli_query($mpConn,$sql);
    while($row = mysqli_fetch_assoc($result)){
        echo"[";
        $allPlatforms="";
        $platforms = $row['platforms'];
        
        $chat = json_decode($row['comments']);
        
        for($i=0;$i<strlen($platforms);$i++){
            if($platforms[$i]==="\n"){
                $allPlatforms.=",";
            }
            else{
                $allPlatforms.=$platforms[$i];
            }
        }
        $text = str_replace(array("\r\n", "\n\r", "\r", "\n"),"<br>",$row['text']);
        echo '{"title":"'.$row['title'].'","text":"'.$text.'","file":"'.$row['file'].'","date":"'.$row['date'].'","time":"'.$row['time'].'","status":"'.$row['status'].'","platforms":"'.$allPlatforms.'"}';

        // echo var_dump($chat);
        if($chat!=""){
            if(sizeof($chat)>0){
                for($i=0;$i<sizeof($chat);$i++){
                    echo ',{"id":"'.$chat[$i]->id.'","date":"'.$chat[$i]->date.'","from":"'.$chat[$i]->from.'","author":"'.getUserName($chat[$i]->author).'","message":"'.$chat[$i]->comment.'"}';
                }
            }
    
        }
        

        echo"]";
    }
    
}
else{
    echo "client id error";
}

function getUserName($unicId){
    include "../../includes/dbh.inc.php";
    $sql = "SELECT * FROM `users` WHERE `unicId`='$unicId'";
    $result = mysqli_query($conn,$sql);
    if($result){
        if(mysqli_num_rows($result)===1){
            $row = mysqli_fetch_assoc($result);

            return $row['name'];
        }
    }
}

?>