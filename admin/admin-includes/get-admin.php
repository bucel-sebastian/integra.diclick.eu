<?php

include '../../includes/dbh.inc.php';

$sql = "SELECT * FROM `admin_users`";
$result = mysqli_query($conn,$sql);
$array=array();
while($row=mysqli_fetch_assoc($result)){
    $unicId = $row['unicId'];
    $name = $row['nume']." ".$row['prenume'] ;
    $role = $row['permissions_roles'];
    $sql = "SELECT * FROM `admin_roles` WHERE `roleId`='$role'";
    $result2=mysqli_query($conn,$sql);
    if($result2){
        if(mysqli_num_rows($result2)===1){
            $row2=mysqli_fetch_assoc($result2);
            $roleName=$row2['role'];
        }
        else{
            $roleName="";
        }
    }
    else{
        $roleName="";
    }
    array_push($array, array("id"=>$unicId,"nume"=>$name,"role"=>$roleName));
}

echo json_encode($array);

?>