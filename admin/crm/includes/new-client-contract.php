<?php

include "../../../includes/dbh.inc.php";
include "../../../includes/crmdbh.inc.php";

$perStart=$_POST['perioada-start'];
// $perSfarsit=$_POST['perioada-sfarsit'];
$observatii=$_POST['observatii'];
$client = $_POST['client'];
$contractId = uniqid("contract-",false);
$tip = $_POST['new-contract-tip'];

$fileName = $_FILES['fisier']['name'];
$fileTmpName = $_FILES['fisier']['tmp_name'];
$fileSize = $_FILES['fisier']['size'];
$fileError = $_FILES['fisier']['error'];
$fileType = $_FILES['fisier']['type'];


$fileExt = explode(".",$fileName);
$fileActualExt = strtolower(end($fileExt));

$filePath = "../../../clients-resources/".$client."/contracts/";

if($fileActualExt==="pdf"){
    $perStartFormat = date("Ymd",strtotime($perStart));
    $perSfarsitFormat = date("Ymd",strtotime($perSfarsit));
    $fileNewName = $contractId."_".$client."_".$perStartFormat."_".$perSfarsitFormat.".".$fileActualExt;

    $file = $fileNewName;

    $fileDestination = $filePath.$file;

    $sql = "INSERT INTO `contracts`( `unicId`, `file`, `client`, `perioada_start`, `observatii`, `status`) VALUES ('$contractId','$file','$client','$perStart','$observatii','$tip')";

    if(mysqli_query($crmConn,$sql)){

        try{
            if(move_uploaded_file($fileTmpName,$fileDestination)){
                echo json_encode(array("status"=>"success"));
            }
            else{
                echo json_encode(array("status"=>"fail","error"=>"Eroare la incarcarea fisierului"));
            }
        }
        catch (Exception $e){
            echo json_encode(array("status"=>"fail","error"=>"Eroare la incarcarea fisierului<br>".$e));
        }
       

        
        
        
    }
    else{
        echo json_encode(array("status"=>"fail","error"=>$crmConn->error));
    }
}
else{
    echo json_encode(array("status"=>"fail","error"=>"Fisierul nu este PDF"));
}