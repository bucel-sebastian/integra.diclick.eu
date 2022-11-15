<?php

include "../../../includes/dbh.inc.php";
include "../../../includes/crmdbh.inc.php";

session_start();
error_reporting(0);

if(isset($_SESSION['username']) && ($_SESSION['role']==='admin' || $_SESSION['role'] === 'Owner')){

    if(isset($_GET['id']) && isset($_GET['clientId'])){
        $clientId=$_GET['clientId'];
        $id=$_GET['id'];

        $sql = "SELECT * FROM `media_plan` WHERE `unicId`='$clientId' AND `id`='$id'";
        $result = mysqli_query($crmConn,$sql);
        if($result){
            if(mysqli_num_rows($result) === 1){
                $row=mysqli_fetch_assoc($result);
                $array = array();
                
                $comentariiRaw = $row['comentarii'];
                $text = str_replace(array("\r\n", "\n\r", "\r", "\n"),"<br>",$comentariiRaw);


                $frecventaJson = $row['frecventa'];
               
                array_push($array,array("id"=>$row['id'],"clientId"=>$row['unicId'],"comentarii"=>$text,"retea"=>$row['retea'],"perStart"=>$row['perioada_start'],"perSfarsit"=>$row['perioada_sfarsit']));
               

                echo json_encode($array);
            }

        }
    }
}