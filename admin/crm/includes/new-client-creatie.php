<?php

include "../../../includes/dbh.inc.php";
include "../../../includes/crmdbh.inc.php";

session_start();
error_reporting(0);

// if(isset($_SESSION['username']) && ($_SESSION['role']==='admin' || $_SESSION['role'] === 'Owner')){


    $clientId = $_POST['clientId'];
    $perStart = $_POST['add-creatie-perStart'];
    $perSfarsit = date("Y-m-d",strtotime($perStart."+ 31 days"));
    $pachet = $_POST['add-craetie-pachet'];
    $comentarii = $_POST['add-creatie-comm'];

    $produse = array();


    for($i=0;$i<sizeof($_POST['add-creatie-produs']);$i++){
        array_push($produse,array("id"=>$i,"denumire"=>$_POST['add-creatie-produs'][$i],"cantitate"=>$_POST['add-creatie-cantitate'][$i]));
    }


    $produseJSON = json_encode($produse);

    $sql = "INSERT INTO `creatie`(`unicId`, `produse`, `pachet`, `perioada_start`, `perioada_sfarsit`, `comentarii`) VALUES ('$clientId','$produseJSON','$pachet','$perStart','$perSfarsit','$comentarii')";
    if(mysqli_query($crmConn,$sql)){
        echo '{"status":"success"}';
    }
    else{
        echo '{"status":"fail","error":"'.$crmConn->error.'"}';
    }

// }