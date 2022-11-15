<?php

include "../../../includes/dbh.inc.php";
include "../../../includes/crmdbh.inc.php";

if(isset($_GET['client'])){
    $client = $_GET['client'];

    $array = array();

    $sql = "SELECT * FROM `contracts` WHERE `client`='$client'";
    $result = mysqli_query($crmConn,$sql);
    if($result){
        while($row=mysqli_fetch_assoc($result)){
            array_push($array,array("contractFile"=>$row['file'],"unicId"=>$row['unicId'],"client"=>$row['client'],"perStart"=>$row['perioada_start'],"observatii"=>$row['observatii'],"status"=>$row['status'],"statusUpdateDate"=>$row['status_update_date']));  
        }
    }

    echo json_encode($array);

}