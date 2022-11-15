<?php

include "../../../includes/dbh.inc.php";
include "../../../includes/crmdbh.inc.php";

session_start();
error_reporting(0);


    if(isset($_GET['id'])){
        $clientId=$_GET['id'];

        $sql = "SELECT * FROM `fisa_client` WHERE `unicId`='$clientId'";
        $result = mysqli_query($crmConn,$sql);
        if($result){
            if(mysqli_num_rows($result)===1){
                $row=mysqli_fetch_assoc($result);
                
                $sql = "SELECT * FROM `users` WHERE `unicId`='$clientId'";
                $result2=mysqli_query($conn,$sql);
                if($result2){
                    if(mysqli_num_rows($result2)===1){
                        $row2=mysqli_fetch_assoc($result2);
                    }
                }

                $clientService = fetchAdmin($row2['client_service_admin']);
                $salesAdmin = fetchAdmin($row2['sales_admin']);
                $performanceAdmin= fetchAdmin($row2['performance_admin']);
                $status= $row['status'];
                $categorie=$row['categorie'];

                echo '{"numeClient":"'.$row['nume_client'].'","firma":"'.$row['firma'].'","codFiscal":"'.$row['cod_fiscal'].'","nrRegCom":"'.$row['nr_reg_comert'].'","adresaFact":"'.$row['tara_facturare'].', '.$row['judet_facturare'].', '.$row['oras_facturare'].', '.$row['adresa_facturare'].'","nrTel":"'.$row['nr_tel'].'","logo":"'.$row['logo'].'","unicId":"'.$row['unicId'].'","clientService":"'.$clientService.'","clientServiceId":"'.$row2['client_service_admin'].'","salesAdmin":"'.$salesAdmin.'","salesAdminId":"'.$row2['sales_admin'].'","performanceAdmin":"'.$performanceAdmin.'","performanceAdminId":"'.$row2['performance_admin'].'","telefon":"'.$row['nr_tel'].'","sursa":"'.$row['sursa'].'","status":"'.$status.'","categorie":"'.$categorie.'","adresaFacturare":"'.$row['adresa_facturare'].'","orasFact":"'.$row['oras_facturare'].'","judetFact":"'.$row['judet_facturare'].'","taraFact":"'.$row['tara_facturare'].'","urlSursa":"'.$row['url_sursa'].'","contBancar":"'.$row['cont_bancar'].'"}';
            }
        }

    }



function fetchAdmin($adminId){
    $sql = "SELECT * FROM `admin_users` WHERE `unicId`='$adminId'";
    include "../../../includes/dbh.inc.php";
    $result = mysqli_query($conn,$sql);
    if($result){

        if(mysqli_num_rows($result)>0){
            $row= mysqli_fetch_assoc($result);

            return $row['name'];
        }else{
            return "none";
        }
    }
    else{
        echo $conn->error;
        return $conn->error;
    }
}

function setStatus($statusId){
    if($statusId==="2"){
        return "Prospect";
    }
    else if($statusId==="3"){
        return "Cold Lead";
    }
    else if($statusId==="4"){
        return "Hot Lead";
    }
    else if($statusId==="1"){
        return "Client";
    }
    else if($statusId==="0"){
        return "Closed";
    }
}

