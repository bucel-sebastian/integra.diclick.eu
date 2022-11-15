<?php

include "../../includes/dbh.inc.php";

session_start();
error_reporting(0);



    if(isset($_GET['id'])){
        
        $id = $_GET['id'];

        $sql = "SELECT * FROM `admin_roles` WHERE `roleId`='$id'";
        $result= mysqli_query($conn,$sql);
        if($result){
            if(mysqli_num_rows($result)===1){
                $row=mysqli_fetch_assoc($result);
                $permissions = str_replace('"','\'',$row['permissions']);
                echo '{"id":"'.$row['roleId'].'","departament":"'.$row['departament'].'","nume":"'.$row['role'].'","users":"'.$row['users'].'","superuser":"'.$row['superuser'].'","permissions":"'.$permissions.'"}';
            }
        }
    }
    else{

        if($_SESSION['permissions_roles']==="role-owner"){
            $sql = "SELECT * FROM `admin_roles`";
            $result= mysqli_query($conn,$sql);
            if($result){
                if(mysqli_num_rows($result)>0){
                    echo '[{"numRes":"'.mysqli_num_rows($result).'"}';
                    while($row=mysqli_fetch_assoc($result)){
                        $departament = fetchDepartament($row['departament']);
                        $permissions = str_replace('"','\'',$row['permissions']);
                        echo ',{"id":"'.$row['roleId'].'","departament":"'.$departament.'","nume":"'.$row['role'].'","users":"'.$row['users'].'","superuser":"'.$row['superuser'].'","permissions":"'.$permissions.'"}';
                    }
                    echo "]";
                    
                }
            }
        }
        else{
            $sql = "SELECT * FROM `admin_roles` WHERE `roleId`!='role-owner'";
            $result= mysqli_query($conn,$sql);
            if($result){
                if(mysqli_num_rows($result)>0){
                    echo '[{"numRes":"'.mysqli_num_rows($result).'"}';
                    while($row=mysqli_fetch_assoc($result)){
                        $departament = fetchDepartament($row['departament']);
                        $permissions = str_replace('"','\'',$row['permissions']);
                        echo ',{"id":"'.$row['roleId'].'","departament":"'.$departament.'","nume":"'.$row['role'].'","users":"'.$row['users'].'","superuser":"'.$row['superuser'].'","permissions":"'.$permissions.'"}';
                    }
                    echo "]";
                    
                }
            } 
        }
    }



function fetchDepartament($id){
    include "../../includes/dbh.inc.php";
 
    $sql = "SELECT * FROM `admin_departments` WHERE `unicId`='$id'";
    $result=mysqli_query($conn,$sql);
    if($result){
        if(mysqli_num_rows($result)===1){
            $row=mysqli_fetch_assoc($result);
            return $row['nume'];
        }
        else{
            return ;
        }
    }   
    else{
        return ;
    }
}