<?php

include "../includes/dbh.inc.php";

$array = array();

foreach($_POST as $key => $value){
    array_push($array, array($key => $value));
}

$arrayJson = json_encode($array);
$date = date("Y-m-d");
$sql = "INSERT INTO `test_promoapp`(`array`, `date`) VALUES ('$arrayJson','$date')";

$result = mysqli_query($conn, $sql);
if($result){
    echo "success";
}
else{
    echo $conn->error;
}
