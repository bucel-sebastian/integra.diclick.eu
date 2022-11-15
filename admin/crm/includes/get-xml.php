<?php

include "../../../includes/crmdbh.inc.php";
include "../../../includes/dbh.inc.php";

$list = array();
$sql = "SELECT * FROM `xml_invoices`";
$result = mysqli_query($crmConn,$sql);
if($result){
    while($row=mysqli_fetch_assoc($result)){
        array_push($list,array("data"=>$row['date'],"file"=>$row['file'],"xmlData"=>$row['xml_data'],"invoiceId"=>$row['invoiceId']));
    }
}

echo json_encode($list);