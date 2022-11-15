<?php

include "../../../includes/dbh.inc.php";
include "../../../includes/crmdbh.inc.php";

if(isset($_GET['client'])){

    if(isset($_GET['id'])){
        $client = $_GET['client'];
        $id = $_GET['id'];

        $array = array();

        $sql = "SELECT * FROM `contracts` WHERE `client`='$client' AND `unicId`='$id'";
        $result = mysqli_query($crmConn,$sql);
        if($result){
            if(mysqli_num_rows($result)===1){
                $row = mysqli_fetch_assoc($result);

                array_push($array,array("contractFile"=>$row['file'],"unicId"=>$row['unicId'],"client"=>$row['client'],"perStart"=>$row['perioada_start'],"perSfarsit"=>$row['perioada_sfarsit'],"observatii"=>$row['observatii'],"tip"=>$row['tip']));

                echo json_encode($array);
            }
            else{
                echo json_encode($array);
            }
        }
        else{
            echo json_encode($array);
        }
    }
    else{
        // $proforma = $_GET['proforma'];
        $client = $_GET['client'];

        $array = array();

        $sql = "SELECT * FROM `contracts` WHERE `client`='$client'";
        $result = mysqli_query($crmConn,$sql);
        if($result){
            if(mysqli_num_rows($result)===1){
                $row = mysqli_fetch_assoc($result);

                array_push($array,array("contractFile"=>$row['file'],"unicId"=>$row['unicId'],"client"=>$row['client'],"perStart"=>$row['perioada_start'],"observatii"=>$row['observatii'],"status"=>$row['status'],"statusUpdateDate"=>$row['status_update_date']));

                echo json_encode($array);
            }
            else{
                echo json_encode($array);
            }
        }
        else{
            echo json_encode($array);
        }
    }
}