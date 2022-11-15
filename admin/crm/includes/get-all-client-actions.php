<?php

include "../../../includes/dbh.inc.php";
include "../../../includes/crmdbh.inc.php";

if(isset($_GET['id'])){
    $clientId=$_GET['id'];

    $sql = "SELECT * FROM `$clientId` ORDER BY `data` DESC, `timp` DESC";
    $result = mysqli_query($crmConn,$sql);
    if($result){
        $array = array();
        if(mysqli_num_rows($result)>0){
            
            while($row=mysqli_fetch_assoc($result)){

                array_push($array,array("id"=>$row['id'],"data"=>$row['data'],"timp"=>$row['timp'],"actiune"=>$row['actiune'],"concluzie"=>$row['concluzie'],"observatiiConcluzie"=>$row['observatii_concluzie'],"status"=>$row['status']));


                // echo ',{"id"=>$row['id'],"data"=>$row['data'],"timp"=>$row['timp'],"actiune"=>$row['actiune'],"concluzie"=>$row['concluzie'],"observatiiConcluzie"=>$row['observatii_concluzie'],"status"=>$row['status']}';
            }
            // echo ']';
            echo json_encode($array);

            
        }
        else{
            echo json_encode($array);
        }
    }

}
