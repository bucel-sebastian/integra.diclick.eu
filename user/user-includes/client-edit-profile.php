<?php

include "../../includes/dbh.inc.php";

session_start();

error_reporting(0);

if(isset($_SESSION['username']) && isset($_SESSION['unicId'])){
    $unicId = $_SESSION['unicId'];
    $username = $_SESSION['username'];

    if($_POST['client-password']!="" && $_POST['client-password-re']!="" && $_POST["client-password"]===$_POST['client-password-re']){
        $newPassword = $_POST['client-password'];
        $password_enc = password_hash($newPassword,PASSWORD_BCRYPT,["cost"=>10]);
        $sql = "UPDATE `users` SET `password`='$password_enc' WHERE `unicId`='$unicId' AND `username` = '$username'";
        $result = mysqli_query($conn,$sql);
        if(!$result){
            echo'{"status":"fail","error":"'.$conn->error.'"}';
        }
    }

    if(isset($_FILES['client-img']['name'])){

        $acceptedFiles=array('png','jpg','jpeg','PNG','JPG','JPEG');

        $updateImg=1;
        $imageName=$_FILES['client-img']['name'];
        $imageTmpName=$_FILES['client-img']['tmp_name'];
        $imageSize=$_FILES['client-img']['size'];
        $imageError=$_FILES['client-img']['error'];
        $imageType=$_FILES['client-img']['type'];

        $imageExt = explode(".",$imageName);
            
        $imageActualExt = strtolower(end($imageExt));
            
        if(in_array($imageActualExt,$acceptedFiles)){
            $imageNewName=$unicId."_image.".$imageActualExt;
            $image=$imageNewName;
        }
    }
    else{
        $updateImg=0;
    }

    $clientFunct = $_POST['client-funct'];
    $clientName = $_POST['client-name'];
    $clientEmail = $_POST['client-email'];
    $clientPhone = $_POST['client-phone'];

    if($updateImg===1){
        $sql = "UPDATE `users` SET `name`='$clientName',`function`='$clientFunct' ,`email`='$clientEmail',`telefon`='$clientPhone',`image`='$image' Where `unicId`='$unicId'";
    }
    else{
        $sql = "UPDATE `users` SET `name`='$clientName',`function`='$clientFunct' ,`email`='$clientEmail',`telefon`='$clientPhone' Where `unicId`='$unicId'";
    }
    
    $result = mysqli_query($conn,$sql);
    if($result){
        move_uploaded_file($imageTmpName,"../profile/img/".$imageNewName);
        echo '{"status":"success"}';
    }
    else{
        echo'{"status":"fail","error":"'.$conn->error.'"}';
    }
                
}



?>
