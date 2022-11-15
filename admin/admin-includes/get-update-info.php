<?php

include "../../includes/dbh.inc.php";
include "../../includes/updatesdbh.inc.php";

if(isset($_GET['updateId']) && isset($_GET['clientId'])){
    $updateId=$_GET['updateId'];
    $clientId=$_GET['clientId'];

    $sql="SELECT * FROM `$clientId` WHERE `id`='$updateId'";
    $result = mysqli_query($updsConn,$sql);
    while($row = mysqli_fetch_assoc($result)){
        if($row['file']!=""){
            $out=$row['description']."÷".$row['file'];
        }
        else{
            $out=$row['description'];
        }
        
    }
    echo $out;
}

?>
