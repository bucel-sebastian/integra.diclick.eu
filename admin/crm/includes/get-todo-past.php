<?php

include "../../../includes/dbh.inc.php";
include "../../../includes/crmdbh.inc.php";

session_start();
error_reporting(0);

if(isset($_SESSION['username']) && ($_SESSION['role']==='admin' || $_SESSION['role'] === 'Owner')){

    $today = date("Y-m-d");
    if($_SESSION['role']==='admin'){
        echo '[{"role":"admin","adminId":"'.$_SESSION['unicId'].'"}';
        $adminId=$_SESSION['unicId'];
        $sql = "SELECT * FROM `todo` WHERE `date_todo`<'$today' AND `status`='0' AND `admin`='$adminId'"; 
        $result=mysqli_query($crmConn,$sql);
        if($result){
            if(mysqli_num_rows($result)>0){
                while($row=mysqli_fetch_assoc($result)){
                    $client = fetchClient($row['clientId']);
                    if($row['telefon']!=""){
                        $telMail=$row['telefon'];
                    }
                    else{
                        $telMail=$row['mail'];
                    }
                    echo ',{"actiune":"'.$row['action'].'","observatii":"'.$row['observatii'].'","telMail":"'.$telMail.'","data":"'.$row['date_todo'].'","ora":"'.$row['time_todo'].'","status":"'.$row['status'].'","admin":"'.$admin.'","adminId":"'.$row['admin'].'","id":"'.$row['id'].'","clientId":"'.$client.'","client":"'.$row['clientId'].'"}';
                }
            }
        }
        echo "]";
        
    }
    else{
        echo '[{"role":"owner","adminId":"'.$_SESSION['unicId'].'"}';
        $sql = "SELECT * FROM `todo` WHERE `date_todo`<'$today' AND `status`='0'";
        $result=mysqli_query($crmConn,$sql);
        if($result){
            if(mysqli_num_rows($result)>0){
                while($row=mysqli_fetch_assoc($result)){
                    $admin = fetchAdmin($row['admin']);
                    $client = fetchClient($row['clientId']);
                    if($row['telefon']!=""){
                        $telMail=$row['telefon'];
                    }
                    else{
                        $telMail=$row['mail'];
                    }
                    echo ',{"actiune":"'.$row['action'].'","observatii":"'.$row['observatii'].'","telMail":"'.$telMail.'","data":"'.$row['date_todo'].'","ora":"'.$row['time_todo'].'","status":"'.$row['status'].'","admin":"'.$admin.'","adminId":"'.$row['admin'].'","id":"'.$row['id'].'","clientId":"'.$client.'","client":"'.$row['clientId'].'"}';
                }
            }
        }
        echo "]";
    }

}

function fetchAdmin($adminId){
    $sql ="SELECT * FROM `users` WHERE `unicId`='$adminId'";
    include "../../../includes/dbh.inc.php";
    $result=mysqli_query($conn,$sql);
    if($result){
        if(mysqli_num_rows($result)===1){
            $row=mysqli_fetch_assoc($result);

            return $row['name'];
        }
    }
}

function fetchClient($clientId){

    include "../../../includes/crmdbh.inc.php";

    $sql = "SELECT * FROM `fisa_client` WHERE `unicId`='$clientId'";

    $result=mysqli_query($crmConn,$sql);

    if($result){
        if(mysqli_num_rows($result)===1){
            $row=mysqli_fetch_assoc($result);
            
            return $row['nume_client'];
        }
        else{
            return "none";
        }
    }
    else{
        return "none";
    }
}
