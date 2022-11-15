<?php

include "../../includes/mediaplandbh.inc.php";
include "../../includes/dbh.inc.php";


if(isset($_GET['clientId'])){
    $clientid=$_GET['clientId'];
    $clientIdMp=$clientid."_mediaplan";
    $scheduleId=$_GET['scheduleId'];
    $sql = "DELETE FROM `$clientIdMp` WHERE `scheduleUnicId`='$scheduleId'";
    mysqli_query($mpConn,$sql);
    if(!mysqli_affected_rows($mpConn)){
        echo "fail";
    }
    else{
        echo "success";
    }
}
else{
    echo "client id error";
}


?>