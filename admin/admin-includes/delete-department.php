<?php

include "../../includes/dbh.inc.php";

session_start();
error_reporting(0);


if(isset($_SESSION['username']) && isset($_SESSION['role']) && ($_SESSION['role']==='admin' || $_SESSION['role'] === 'Owner')){

    if(isset($_GET['id'])){
        $id=$_GET['id'];

        $sql = "SELECT * FROM `admin_roles` WHERE `departament`='$id'";
        $result=mysqli_query($conn,$sql);
        if($result){
            if(mysqli_num_rows($result)>0){
                echo '{"status":"fail","error":"Departamentul nu poate fi sters deoarece exista roluri atribuite acestuia."}';
            }
            else{
                $sql="DELETE FROM `admin_departments` WHERE `unicId`='$id'";
                if(mysqli_query($conn,$sql)){
                    echo '{"status":"success"}';
                }   
                else{
                    echo '{"status":"fail","error":"'.$conn->error.'"}';
                }
            }
        }
    }


}