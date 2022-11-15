<?php

include "../../includes/dbh.inc.php";


session_start();
error_reporting(0);


    $unicId=$_SESSION['user-data']->unicId;

    $array = array();

    $sql = "SELECT * FROM `invoice_series` WHERE `userId`='$unicId' OR `userId`=''";
    $result = mysqli_query($conn,$sql);
    if($result){
        while($row = mysqli_fetch_assoc($result)){
            
            if($row['userId'] === $unicId){
                array_push($array,array("id"=>$row['id'],"userId"=>$row['userId'],"serie"=>$row['serie'],"startNumber"=>$row['start_number'],"company"=>$row['company'],"selected"=>true));
            }
            else{
                array_push($array,array("id"=>$row['id'],"userId"=>$row['userId'],"serie"=>$row['serie'],"startNumber"=>$row['start_number'],"company"=>$row['company'],"selected"=>false));
            }
        }
    }

    echo json_encode($array);





