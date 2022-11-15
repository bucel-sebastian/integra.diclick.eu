<?php

include "../../../includes/dbh.inc.php";
include "../../../includes/crmdbh.inc.php";

if(isset($_GET['serie']) && isset($_GET['company'])){
    $serie = $_GET['serie'];
    $company = $_GET['company'];    
    
    
    $sql = "SELECT * FROM `invoice_series` WHERE `serie`='$serie' AND `company`='$company'";

    $result = mysqli_query($conn,$sql);
    if($result){
        if(mysqli_num_rows($result)===1){
            $row = mysqli_fetch_assoc($result);
            $startNumber = $row['start_number'];
        }
    }


    $sql = "SELECT * FROM `invoices` WHERE `prefix_serie_factura`='$serie' AND `emitor`='$company' ORDER BY `invoice_number` DESC LIMIT 0,1";
    $result = mysqli_query($crmConn,$sql);
    if($result){
        if(mysqli_num_rows($result)===1){
            $row = mysqli_fetch_assoc($result);
            $latestNumber = $row['invoice_number'];
            
            // echo json_encode(array("newInvoiceNumber"=>$latestNumber));
            if($latestNumber!=""){
                $latestNumberSplit =str_split($latestNumber);
                $latestNumberWZero = "";
                $howManyZeros = 0;

                $numberStarted=false;
                
                    for($i=0;$i<sizeof($latestNumberSplit);$i++){
                        if($numberStarted){
                            $latestNumberWZero.=$latestNumberSplit[$i];
                        }
                        else{
                            if($latestNumberSplit[$i]!="0"){
                                $latestNumberWZero.=$latestNumberSplit[$i];
                                $numberStarted=true;
                            }
                            else{
                                $howManyZeros++;
                            }
                        }
                        
                    }

                $integerLatestNumber = (int) $latestNumberWZero;
        
                $integerNumber = ++$integerLatestNumber;

                $newNumber = strval($integerNumber);

                $count1 = 0;
                $count1Number = $latestNumberWZero;
                $count2 = 0;
                $count2Number = $integerNumber;

                while($count1Number!=0){
                    $count1Number= (int) ($count1Number/10);
                    $count1++;
                }
                while($count2Number!=0){
                    $count2Number= (int) ($count2Number/10);
                    $count2++;
                }
                if($count1<$count2){
                    $howManyZeros--;
                }
            
                $newInvoiceNumber="";
                for($i=0;$i<$howManyZeros;$i++){
                    $newInvoiceNumber.="0";
                }
                $newInvoiceNumber.=$integerNumber;
            }
            else{
                $newInvoiceNumber=$startNumber;
            }
            
            echo json_encode(array("newInvoiceNumber"=>$newInvoiceNumber));
        
        }
        else{
            echo json_encode(array("newInvoiceNumber"=>$startNumber));
        }
    }
    else{
        echo json_encode(array("newInvoiceNumber"=>$startNumber));
    }


}

