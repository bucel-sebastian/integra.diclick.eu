<?php

include "../../includes/dbh.inc.php";
include "../../includes/mediaplandbh.inc.php";
include "../../includes/crmdbh.inc.php";

session_start();

$sql = "SELECT * FROM `companies` WHERE `status`='1' ORDER BY `nume` ASC";
$result = mysqli_query($conn,$sql);

$array = array();
if($result){
    while($row=mysqli_fetch_assoc($result)){
        $unicId = $row['unicId'];
        array_push($array,array("unicId"=>$unicId,"name"=>$row['nume'],"company"=>$row['firma']));
    }
}

echo json_encode($array, JSON_UNESCAPED_UNICODE);


