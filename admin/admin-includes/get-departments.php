<?php

include "../../includes/dbh.inc.php";

$sql = "SELECT * FROM `admin_departments`";
$result = mysqli_query($conn,$sql);
if($result){
    echo "[";
    if(mysqli_num_rows($result)>0){
        echo '{"numRes":"'.mysqli_num_rows($result).'"}';
        while($row=mysqli_fetch_assoc($result)){
            if($row['tip']==="1"){
                $tip = "Sales";
            }
            else if($row['tip']==="2"){
                $tip = "Client Service";
            }
            else if($row['tip']==="3"){
                $tip = "Performance";
            }
            else if($row['tip']==="0"){
                $tip = "";
            }
            echo ',{"id":"'.$row['unicId'].'","nume":"'.$row['nume'].'","tip":"'.$tip.'"}';
        }
    }
    echo "]";
}