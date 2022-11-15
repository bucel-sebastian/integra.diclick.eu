<?php

include "../../../includes/dbh.inc.php";
include "../../../includes/crmdbh.inc.php";

session_start();
error_reporting(0);

// if(isset($_SESSION['username']) && ($_SESSION['role']==='admin' || $_SESSION['role'] === 'Owner')){

    $clientId=$_POST['clientId'];
    $comentarii=$_POST['edit-objective-comm'];
    $clientObj=$_POST['edit-objective-client'];
    $socialObj=$_POST['edit-objective-socialmedia'];
    $performanceObj= $_POST['edit-objective-performance'];
    $dezvOnlineObj=$_POST['edit-objective-dezvoltare-online'];
    $marketingObj = $_POST['edit-objective-marketing'];
    

    $sql = "UPDATE `obiective` SET `comentarii`='$comentarii',`client_obj`='$clientObj',`social_obj`='$socialObj',`performance_obj`='$performanceObj',`dezvoltare_online_obj`='$dezvOnlineObj',`marketing_obj`='$marketingObj' WHERE `unicId`='$clientId' AND `tip`='0'";

    $result=mysqli_query($crmConn,$sql);
    if($result){
        if(mysqli_affected_rows($crmConn)===1){
            echo '{"status":"success"}';
        }
        else{

            $sql = "INSERT INTO `obiective` (`unicId`, `tip`, `comentarii`, `client_obj`, `social_obj`, `performance_obj`, `dezvoltare_online_obj`, `marketing_obj`) VALUES ('$clientId','0','$comentarii','$clientObj','$socialObj','$performanceObj','$dezvOnlineObj','$marketingObj')";

            if(mysqli_query($crmConn,$sql)){
                echo '{"status":"success"}';
            }
            else{
                echo '{"status":"fail","error":"'.$crmConn->error.'"}';
            }

        }
    }
    else{
        echo '{"status":"fail","error":"'.$crmConn->error.'"}';
    }

// }