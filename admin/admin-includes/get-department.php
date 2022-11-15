<?php

include "../../includes/dbh.inc.php";


if(isset($_GET['id'])){
    $id = $_GET['id'];
    $sql = "SELECT * FROM `admin_departments` WHERE `unicId`='$id'";
    $result=mysqli_query($conn,$sql);
    if($result){
        if(mysqli_num_rows($result)===1){
            $row = mysqli_fetch_assoc($result);

            echo '{"nume":"'.$row['nume'].'","id":"'.$row['unicId'].'","tip":"'.$row['tip'].'"}';
        }
    }
}