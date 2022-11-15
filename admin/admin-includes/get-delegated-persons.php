<?php
include "../../includes/dbh.inc.php";

if(isset($_GET['emitor'])){
    $emitor = $_GET['emitor'];

    $sql = "SELECT * FROM `delegated_persons` WHERE `implicit_company`='$emitor' OR `implicit_company`=''";
    $array=array();

    $result = mysqli_query($conn,$sql);
    if($result){
        if(mysqli_num_rows($result)>0){
            while($row=mysqli_fetch_assoc($result)){
                array_push($array,array("unicId"=>$row['unicId'],"nume"=>$row['nume'],"prenume"=>$row['prenume'],"implicit"=>$row['implicit_company']));
            }
        }
    }

    echo json_encode($array);
}