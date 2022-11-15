<?php


include "../../includes/dbh.inc.php";
include "../../includes/tasksdbh.inc.php";

$sql = "SELECT * FROM `project_types`";

$array = array();

$result = mysqli_query($tasksConn,$sql);
if($result){
    while($row = mysqli_fetch_assoc($result)){
        array_push($array,array("nume"=>$row['nume'],"id"=>$row['unicId'],"descriere"=>$row['descriere'],"tasks"=>$row['tasks']));
    }
}

echo json_encode($array);