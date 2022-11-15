<?php

include "../../includes/dbh.inc.php";

session_start();
error_reporting(0);

if(isset($_SESSION['unicId'])){
    $clientId=$_SESSION['unicId'];
    $clientId.="_notifications";
    $sql="SELECT * FROM `$clientId` WHERE `status`=1 ORDER BY date DESC";
$result=mysqli_query($conn,$sql);

if($result){
    while($row=mysqli_fetch_assoc($result)){
        echo "<div class='notif-container'>
            <div class='notif-left'>
                <h3>
                    ".$row['text']."
                </h3>
                <span>
                    ".$row['date']."
                </span>
            </div>
            <div class='notif-right'>
                <div class='btns-box' onclick='delNotif(".$row['id'].")'>
                    <i class='fas fa-times'></i>
                </div>
            </div>
        </div>
        ";
    }
}
}
