<?php

include "../../../includes/dbh.inc.php";
include "../../../includes/crmdbh.inc.php";


if(isset($_GET['emitor'])){
    $today=date("Y-m-d");
    $todayShort=date("y-m-d");
    $emitor = $_GET['emitor'];
    $sql = "SELECT * FROM `proforme` WHERE `data_factura`='$today' AND `emitor`='$emitor'";
    $result=mysqli_query($crmConn,$sql);
    $invoiceNumber=1;
    if($result){
        if(mysqli_num_rows($result)>0){
            while($row=mysqli_fetch_assoc($result)){
                $invoiceNumber++;
            }
        }
    }
    
    echo '{"invoiceNumber":"'.$invoiceNumber.'","invoiceDate":"'.$todayShort.'"}';
}
