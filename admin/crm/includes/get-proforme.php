<?php

include "../../../includes/dbh.inc.php";
include "../../../includes/crmdbh.inc.php";

session_start();
error_reporting(0);



    if(isset($_GET['id'])){
        $clientId = $_GET['id'];

        $sql = "SELECT * FROM `proforme` WHERE `client`='$clientId' ORDER BY `data_factura` DESC, `invoice_number` DESC";
        $result = mysqli_query($crmConn,$sql);
        
        $array=array();
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
                    $createdBy = getClientName($row['created_by']);

                    array_push($array,array("dataEmitere"=>$row['data_factura'],"emitor"=>$emitor,"client"=>$client,"nrFactura"=>$row['invoice_number'],"clientId"=>$row['client'],"valTotala"=>$row['total_de_plata'],"invoiceCreated"=>$row['invoice_created'],"createdBy"=>$createdBy,"status"=>$row['status'],"produse"=>$row['produse']));
                }
                
            }
    
        }
        echo json_encode($array);

    }

    else{
        $sql = "SELECT * FROM `proforme` ORDER BY `data_factura` DESC, `invoice_number` DESC";
        $result = mysqli_query($crmConn,$sql);
        $array = array();
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
                    $createdBy = getClientName($row['created_by']);
                    array_push($array,array("dataEmitere"=>$row['data_factura'],"emitor"=>$emitor,"client"=>$client,"nrFactura"=>$row['invoice_number'],"clientId"=>$row['client'],"valTotala"=>$row['total_de_plata'],"invoiceCreated"=>$row['invoice_created'],"createdBy"=>$createdBy,"status"=>$row['status'],"produse"=>$row['produse']));
                }
                
            }
            
        }

        echo json_encode($array);
    }



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