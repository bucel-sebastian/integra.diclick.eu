<?php

include "../../includes/dbh.inc.php";
include "../../includes/updatesdbh.inc.php";
include "../../includes/crmdbh.inc.php";


$sql = "SELECT * FROM `fisa_client` WHERE `status`='1'";
$result = mysqli_query($crmConn,$sql);
$array = array();
if($result){
    while($row=mysqli_fetch_assoc($result)){
        array_push($array,array("clientId"=>$row['unicId'],"name"=>$row['nume_client']));
    }
}
echo json_encode($array);