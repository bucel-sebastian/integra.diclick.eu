<?php

include "../../../includes/dbh.inc.php";
include "../../../includes/crmdbh.inc.php";

session_start();
error_reporting(0);

$array = array();
if(isset($_GET['id'])){
    $clientId = $_GET['id'];
    $sql = "SELECT * FROM `invoices` WHERE `client`='$clientId' ORDER BY `data_factura` DESC, `invoice_number` DESC";
    $result = mysqli_query($crmConn,$sql);
    if($result){
        if(mysqli_num_rows($result)>0){
            while($row=mysqli_fetch_assoc($result)){
                if($row['emitor']==="1"){
                    $emitor="S.C D+I Activation Agency SRL";
                }
                else{
                    $emitor="SC Social Marketing Platform SRL";
                }
                $client = getClientName($row['client']);
                $createdBy = getAdminName($row['created_by']);

                array_push($array,array("dataEmitere"=>$row['data_factura'],"emitor"=>$emitor,"client"=>$client,"nrFactura"=>$row['invoice_number'],"clientId"=>$row['client'],"prefixNumber"=>$row['prefix_serie_factura'],"valTotala"=>$row['total_de_plata'],"createdBy"=>$createdBy,"file"=>$row['file'],"status"=>$row['status'],"produse"=>$row['produse']));

                // echo ',{"dataEmitere":"'.$row['data_factura'].'","emitor":"'.$emitor.'","client":"'.$client.'","nrFactura":"'.$row['invoice_number'].'","clientId":"'.$row['client'].'","prefixNumber":"'.$row['prefix_serie_factura'].'","valTotala":"'.$row['total_de_plata'].'","createdBy":"'.$createdBy.'"}';
            }
        }
    }
}
else{
    $sql = "SELECT * FROM `invoices` ORDER BY `data_factura` DESC, `invoice_number` DESC";
    $result = mysqli_query($crmConn,$sql);

    if($result){
        if(mysqli_num_rows($result)>0){
            while($row=mysqli_fetch_assoc($result)){
                if($row['emitor']==="1"){
                    $emitor="S.C D+I Activation Agency SRL";
                }
                else{
                    $emitor="SC Social Marketing Platform SRL";

                }

                $client = getClientName($row['client']);
                $createdBy = getAdminName($row['created_by']);

                array_push($array,array("dataEmitere"=>$row['data_factura'],"emitor"=>$emitor,"client"=>$client,"nrFactura"=>$row['invoice_number'],"clientId"=>$row['client'],"prefixNumber"=>$row['prefix_serie_factura'],"valTotala"=>$row['total_de_plata'],"createdBy"=>$createdBy,"status"=>$row['status'],"file"=>$row['file'],"produse"=>$row['produse']));


                // echo ',{"dataEmitere":"'.$row['data_factura'].'","emitor":"'.$emitor.'","client":"'.$client.'","nrFactura":"'.$row['invoice_number'].'","clientId":"'.$row['client'].'","prefixNumber":"'.$row['prefix_serie_factura'].'","valTotala":"'.$row['total_de_plata'].'","createdBy":"'.$createdBy.'"}';
            }
        }
        else{
        }
    }
}
echo json_encode($array);



function getClientName($id){
    include "../../../includes/crmdbh.inc.php";
    $sql = "SELECT * FROM `fisa_client` WHERE `unicId`='$id'";
    $result = mysqli_query($crmConn,$sql);
    if($result){
        if(mysqli_num_rows($result)===1){
            $row=mysqli_fetch_assoc($result);
            return $row['firma'];
        }
    }
}

function getAdminName($id){
    include "../../../includes/dbh.inc.php";
    $sql = "SELECT * FROM `admin_users` WHERE `unicId`='$id'";
    $result = mysqli_query($conn,$sql);
    if($result){
        if(mysqli_num_rows($result)===1){
            $row=mysqli_fetch_assoc($result);
            return $row['nume']." ".$row['prenume'];
        }
    }
}