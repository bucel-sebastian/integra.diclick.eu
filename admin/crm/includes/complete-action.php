<?php

include "../../../includes/dbh.inc.php";
include "../../../includes/crmdbh.inc.php";

session_start();
error_reporting(0);

if(isset($_SESSION['username']) && ($_SESSION['role']==='admin' || $_SESSION['role'] === 'Owner')){

    $data= date("Y-m-d");
    $timp = date("H:i:s");

    $adminId=$_SESSION['unicId'];
    
    $actionId=$_POST['complete-action-id'];
    $actionAdmin = $_POST['complete-action-admin'];
    $actionClientId=$_POST['complete-client-id'];

    $sql = "SELECT * FROM `todo` WHERE `id`='$actionId' AND `admin`='$actionAdmin'";
    $result= mysqli_query($crmConn,$sql);
    if($result){
        if(mysqli_num_rows($result)===1){
            $row=mysqli_fetch_assoc($result);

            $clientId=$row['clientId'];

            $tmpUpDate = $row['upload_date'];
            $tmpTodoDate=$row['date_todo'];
            $tmpTodoTime=$row['time_todo'];
            $tmpAction=$row['action'];
            $tmpMail = $row['mail'];
            $tmpTel = $row['telefon'];
            $tmpStatus= $row['status'];
            $tmpObs = $row['observatii'];
        }
    }


    $rezultatActiuneId = $_POST['new-rezultat'];
    if($rezultatActiuneId==="1"){
        $rezultatActiune="A raspuns la telefon";
    }
    else if($rezultatActiuneId==="2"){
        $rezultatActiune="Nu a raspuns la telefon";
    }
    else if($rezultatActiuneId==="3"){
        $rezultatActiune="Mailul a fost trimis cu succes";
    }
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

        $sql = "INSERT INTO `todo`(`upload_date`, `date_todo`, `time_todo`, `action`, `mail`, `telefon`, `status`,`observatii`,`admin`,`clientId`) VALUES ('$data $timp','$dataViitActiune','$timpViitActiune','$tipViitActiune','$emailViitActiune','$telefonViitActiune','0','$observatiiViitActiune','$adminId','$clientId')";
        if(mysqli_query($crmConn,$sql)){
            $sql = "INSERT INTO `$clientId`(`data`, `timp`, `actiune`, `concluzie`, `observatii_concluzie`, `documente_atasate`,`autor`) VALUES ('$data','$timp','$tmpAction','$rezultatActiune','$observatiiRezultatActiune','$documenteAtasate','$adminId')";
            if(mysqli_query($crmConn,$sql)){
                $sql = "UPDATE `todo` SET `status`='1' WHERE `id`='$actionId' AND `admin`='$actionAdmin'";
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
    }
    else{
        $sql = "INSERT INTO `$clientId`(`data`, `timp`, `actiune`, `concluzie`, `observatii_concluzie`, `documente_atasate`,`autor`) VALUES ('$data','$timp','$tmpAction','$rezultatActiune','$observatiiRezultatActiune','$documenteAtasate','$adminId')";
        if(mysqli_query($crmConn,$sql)){
            $sql = "UPDATE `todo` SET `status`='1' WHERE `id`='$actionId' AND `admin`='$actionAdmin'";
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


}