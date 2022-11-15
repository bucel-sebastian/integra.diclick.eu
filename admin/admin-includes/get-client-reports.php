<?php

include "../../includes/dbh.inc.php";
include "../../includes/updatesdbh.inc.php";
include "../../includes/crmdbh.inc.php";


if(isset($_GET['client'])){
    $client = $_GET['client'];

    $sql = "SELECT * FROM `reports` WHERE `client`='$client'";
    $result = mysqli_query($conn,$sql);

    $array=array();

    if($result){
        while($row = mysqli_fetch_assoc($result)){
            array_push($array,array("client"=>$client,"reports"=>$row['reports']));
        }
    }
    echo json_encode($array);
}

