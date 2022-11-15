<?php

include "../../../includes/dbh.inc.php";
include "../../../includes/crmdbh.inc.php";

if(isset($_GET['client'])){
    $client = $_GET['client'];

    $array = array();

    $sql = "SELECT * FROM `anexe` WHERE `client`='$client' ORDER BY `perioada_sfarsit` DESC";
    $result = mysqli_query($crmConn,$sql);
    if($result){
        if(mysqli_num_rows($result)>0){
            while($row = mysqli_fetch_assoc($result)){
                array_push($array,array("contractFile"=>$row['file'],"unicId"=>$row['unicId'],"client"=>$row['client'],"perStart"=>$row['perioada_start'],"perSfarsit"=>$row['perioada_sfarsit'],"observatii"=>$row['observatii']));
            }
        }
    }

    echo json_encode($array);
}