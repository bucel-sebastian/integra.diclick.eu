<?php


include "../../includes/dbh.inc.php";
include "../../includes/mediaplandbh.inc.php";

session_start();
error_reporting(0);

if(isset($_SESSION['unicId']) && ($_SESSION['role'] === "admin" || $_SESSION['role'] === "Owner")){
    if(isset($_POST['scheduleId']) && isset($_POST['scheduleClient'])){
        $scheduleId = $_POST['scheduleId'];
        $scheduleClient = $_POST['scheduleClient'];
        $message = $_POST['message'];
        $date = date("Y-m-d H:i:s");
        $commentId = uniqid("com",false);
        $message=str_replace(array("\r\n", "\n\r", "\r", "\n"),"<br>",$message);
        $authorId = $_SESSION['unicId'];
        $authorName = getUserName($authorId);
        $dbTable = $scheduleClient."_mediaplan";
    
        $sql = "SELECT * FROM `$dbTable` WHERE `scheduleUnicId`='$scheduleId'";
        $result = mysqli_query($mpConn,$sql);
        if($result){
            if(mysqli_num_rows($result)>0){
                $row=mysqli_fetch_assoc($result);
                $commentsJSON = json_decode($row['comments']);
    
    
                // echo var_dump($commentsJSON);
                if($commentsJSON!=NULL){
                    array_push($commentsJSON,array("id"=>$commentId,"from"=>"admin","author"=>$authorId,"date"=>$date,"comment"=>$message));
                    
                }
                else{
                    $commentsJSON = array(array("id"=>$commentId,"from"=>"admin","author"=>$authorId,"date"=>$date,"comment"=>$message));
                }
                // echo var_dump($commentsJSON);
    
                $comments = json_encode($commentsJSON,JSON_UNESCAPED_UNICODE);
    
                $sql = "UPDATE `$dbTable` SET `comments`= '$comments', `status`='3' WHERE `scheduleUnicId`='$scheduleId'";
                if(mysqli_query($mpConn,$sql)){
                    echo '{"status":"success","id":"'.$commentId.'","name":"'.$authorName.'","message":"'.$message.'"}';
                }
                else{
                    echo '{"status":"fail","error":"'.$mpConn->error.'"}';
                }
            }
        }
    }
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