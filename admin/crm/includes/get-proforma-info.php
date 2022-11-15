<?php

include "../../../includes/dbh.inc.php";
include "../../../includes/crmdbh.inc.php";

if(isset($_GET['proforma']) && isset($_GET['client'])){

    $proforma = $_GET['proforma'];
    $client = $_GET['client'];

    $sql = "SELECT * FROM `proforme` WHERE `invoice_number`='$proforma' AND `client`='$client'";
    $result=mysqli_query($crmConn,$sql);
    if($result){
        if(mysqli_num_rows($result)===1){
            $row=mysqli_fetch_assoc($result);
        }
    }
    $emitor = $row['emitor'];

    if($emitor==="1"){
        $invoiceNumber= 2007;
    }
    else if($emitor==="2"){
        $invoiceNumber= "0001";
    }

    $sql="SELECT * FROM `invoices` WHERE `emitor`='$emitor'";
    $result = mysqli_query($crmConn,$sql);
    if($result){

        if(mysqli_num_rows($result)>0){
            while($row=mysqli_fetch_assoc($result)){
                if((int)$row['invoice_number']>=(int)$invoiceNumber){
                    $invoiceNumber=(int)$row['invoice_number']+1;

                    if($invoiceNumber<10 && $emitor==="2"){
                        $invoiceNumber="000".strval($invoiceNumber);
                    }
                    else if($invoiceNumber<100 && $emitor==="2"){
                        $invoiceNumber="00".strval($invoiceNumber);
  

                    }
                    else if($invoiceNumber<1000 && $emitor==="2"){
                        $invoiceNumber="0".strval($invoiceNumber);
     
                    }
                    
                }
            }
        }
        
    }

    $sql = "SELECT * FROM `proforme` WHERE `invoice_number`='$proforma' AND `client`='$client'";
    $result=mysqli_query($crmConn,$sql);

    $array = array();
    if($result){
        if(mysqli_num_rows($result)===1){
            $row=mysqli_fetch_assoc($result);
            array_push($array, array("newInvoiceNumber"=>$invoiceNumber,"client"=>$row['client'],"tp"=>$row['termen_plata'],"vat"=>$row['vat'],"invoiceNumber"=>$row['invoice_number'],"emitor"=>$row['emitor'],"totalTva"=>$row['total_tva'],"totalFTva"=>$row['total_f_tva'],"totalDePlata"=>$row['total_de_plata'],"moneda"=>$row['moneda'],"cursEuro"=>$row['curs_euro'],"persDelegata"=>$row['persoana_delegata']));

            array_push($array,$row['produse']);

            echo json_encode($array);
        }
    }
}