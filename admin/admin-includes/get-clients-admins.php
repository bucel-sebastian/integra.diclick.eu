<?php

include "../../includes/dbh.inc.php";

$sql = "SELECT * FROM `admin_departments` WHERE `tip`='1'";
$result = mysqli_query($conn,$sql);
$salseDep = array();
if($result){
    if(mysqli_num_rows($result)>0){
        while($row=mysqli_fetch_assoc($result)){
            array_push($salseDep,$row['unicId']);
        }
    }
}
$sql = "SELECT * FROM `admin_departments` WHERE `tip`='2'";
$result = mysqli_query($conn,$sql);
$clientsDep = array();
if($result){
    if(mysqli_num_rows($result)>0){
        while($row=mysqli_fetch_assoc($result)){
            array_push($clientsDep,$row['unicId']);
        }
    }
}
$sql = "SELECT * FROM `admin_departments` WHERE `tip`='3'";
$result = mysqli_query($conn,$sql);
$performanceDep = array();
if($result){
    if(mysqli_num_rows($result)>0){
        while($row=mysqli_fetch_assoc($result)){
            array_push($performanceDep,$row['unicId']);
        }
    }
}

$salesRoles=array();
for($i=0;$i<sizeof($salseDep);$i++){
    $sql = "SELECT * FROM `admin_roles` WHERE `departament`='$salseDep[$i]'";
    $result=mysqli_query($conn,$sql);
    if($result){
        if(mysqli_num_rows($result)>0){
            while($row=mysqli_fetch_assoc($result)){
                array_push($salesRoles,$row['roleId']);
            }
        }
    }
}

$clientsRoles=array();
for($i=0;$i<sizeof($clientsDep);$i++){
    $sql = "SELECT * FROM `admin_roles` WHERE `departament`='$clientsDep[$i]'";
    $result=mysqli_query($conn,$sql);
    if($result){
        if(mysqli_num_rows($result)>0){
            while($row=mysqli_fetch_assoc($result)){
                array_push($clientsRoles,$row['roleId']);
            }
        }
    }
}

$performanceRoles=array();
for($i=0;$i<sizeof($performanceDep);$i++){
    $sql = "SELECT * FROM `admin_roles` WHERE `departament`='$performanceDep[$i]'";
    $result=mysqli_query($conn,$sql);
    if($result){
        if(mysqli_num_rows($result)>0){
            while($row=mysqli_fetch_assoc($result)){
                array_push($performanceRoles,$row['roleId']);
            }
        }
    }
}

$salesAdminsId= array();
$salesAdmins=array();
for($i=0;$i<sizeof($salesRoles);$i++){
    $sql = "SELECT * FROM `admin_users` WHERE `permissions_roles` LIKE '$salesRoles[$i]'";
    $result=mysqli_query($conn,$sql);
    if($result){
        if(mysqli_num_rows($result)>0){
            while($row=mysqli_fetch_assoc($result)){
               array_push($salesAdminsId,$row['unicId']);
               array_push($salesAdmins,$row['name']);
            }
        }
    }

}

$clientAdminsId= array();
$clientAdmins=array();
for($i=0;$i<sizeof($clientsRoles);$i++){
    $sql = "SELECT * FROM `admin_users` WHERE `permissions_roles` LIKE '$clientsRoles[$i]'";
    $result=mysqli_query($conn,$sql);
    if($result){
        if(mysqli_num_rows($result)>0){
            while($row=mysqli_fetch_assoc($result)){
               array_push($clientAdminsId,$row['unicId']);
               array_push($clientAdmins,$row['name']);
            }
        }
    }

}
$performanceAdminsId= array();
$performanceAdmins=array();
for($i=0;$i<sizeof($performanceRoles);$i++){
    $sql = "SELECT * FROM `admin_users` WHERE `permissions_roles` LIKE '$performanceRoles[$i]'";
    $result=mysqli_query($conn,$sql);
    if($result){
        if(mysqli_num_rows($result)>0){
            while($row=mysqli_fetch_assoc($result)){
               array_push($performanceAdminsId,$row['unicId']);
               array_push($performanceAdmins,$row['name']);
            }
        }
    }

}

$array = array(json_encode($salesAdminsId),json_encode($salesAdmins),json_encode($clientAdminsId),json_encode($clientAdmins),json_encode($performanceAdminsId),json_encode($performanceAdmins));

// echo var_dump($array);

echo json_encode($array);

// echo '['.json_encode($salesAdminsId).','.json_encode($salesAdmins).','.json_encode($clientAdminsId).','.json_encode($clientAdmins).','.json_encode($performanceAdminsId).','.json_encode($performanceAdmins).']';