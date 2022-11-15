<?php

include "dbh.inc.php";

$sql = "SELECT * FROM `events`";

$outputJson = array();

$result = mysqli_query($conn,$sql);
if($result){
    while($row=mysqli_fetch_assoc($result)){
        array_push($outputJson, array("type"=>$row['type'],"client"=>$row['client'],"reciver"=>$row['reciver']));
    }
}

echo json_encode($outputJson);