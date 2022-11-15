<?php

include "../../../includes/dbh.inc.php";
include "../../../includes/crmdbh.inc.php";

session_start();
error_reporting(0);




    $clientId= $_POST['clientId'];
    $adminId=$_SESSION['user-data']->unicId;
    $data = date("Y-m-d");
    $timp = date("H:i:s");
    $numeActiune = $_POST['new-actiune'];
    $rezultatActiune = $_POST['new-rezultat'];
    $observatiiRezultatActiune = $_POST['new-observatie'];
    $documenteAtasate="";
    $actiuneViitoare = $_POST['future-action'];
    if($actiuneViitoare==="1"){
        $tipViitActiune = $_POST['future-action-tip'];
        $dataViitActiune = $_POST['future-action-date'];
        $timpViitActiune = $_POST['future-action-time'];
        $observatiiViitActiune = $_POST['future-action-observatii'];
        $telefonViitActiune = $_POST['future-action-telefon'];
        $emailViitActiune = $_POST['future-action-email'];

        $sql = "INSERT INTO `todo`(`upload_date`, `date_todo`, `time_todo`, `action`, `mail`, `telefon`, `status`,`observatii`,`admin`, `clientId`) VALUES ('$data $timp','$dataViitActiune','$timpViitActiune','$tipViitActiune','$emailViitActiune','$telefonViitActiune','0','$observatiiViitActiune','$adminId','$clientId')";
        if(mysqli_query($crmConn,$sql)){
            $sql = "INSERT INTO `$clientId`(`data`, `timp`, `actiune`, `concluzie`, `observatii_concluzie`, `documente_atasate`,`autor`) VALUES ('$data','$timp','$numeActiune','$rezultatActiune','$observatiiRezultatActiune','$documenteAtasate','$adminId')";
            if(mysqli_query($crmConn,$sql)){
                echo '{"status":"success"}';
            }
            else{
                echo '{"status":"fail","error":"'.$crmConn->error.'"}';
            }
        }
        else{
            echo '{"status":"fail","error":"'.$crmConn->error.'"}';
        }
    }
    else{
        $sql = "INSERT INTO `$clientId`(`data`, `timp`, `actiune`, `concluzie`, `observatii_concluzie`, `documente_atasate`,`autor`) VALUES ('$data','$timp','$numeActiune','$rezultatActiune','$observatiiRezultatActiune','$documenteAtasate','$adminId')";
        if(mysqli_query($crmConn,$sql)){
            echo '{"status":"success"}';
        }
        else{
            echo '{"status":"fail","error":"'.$crmConn->error.'"}';
        }
    }
