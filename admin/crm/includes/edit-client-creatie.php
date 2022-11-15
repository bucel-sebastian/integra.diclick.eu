<?php

include "../../../includes/dbh.inc.php";
include "../../../includes/crmdbh.inc.php";

session_start();
error_reporting(0);

// if(isset($_SESSION['username']) && ($_SESSION['role']==='admin' || $_SESSION['role'] === 'Owner')){

    $id = $_POST['creatie-id'];
    $clientId = $_POST['creatie-clientId'];
    $perStart = $_POST['edit-creatie-perStart'];
    $perSfarsit = $_POST['edit-creatie-perSfarsit'];
    $pachet = $_POST['edit-creatie-pachet'];
    $comentarii = $_POST['edit-creatie-comm'];

    $produse = array();


    for($i=0;$i<sizeof($_POST['edit-creatie-produs']);$i++){
        array_push($produse,array("id"=>$i,"denumire"=>$_POST['edit-creatie-produs'][$i],"cantitate"=>$_POST['edit-creatie-cantitate'][$i]));
    }


    $produseJSON = json_encode($produse);

    $sql = "UPDATE `creatie` SET `produse`='$produseJSON',`pachet`='$pachet',`perioada_start`='$perStart',`perioada_sfarsit`='$perSfarsit',`comentarii`='$comentarii' WHERE `id`='$id' AND `unicId`='$clientId'";
    if(mysqli_query($crmConn,$sql)){
        echo '{"status":"success"}';
    }
    else{
        echo '{"status":"fail","error":"'.$crmConn->error.'"}';
    }


// }