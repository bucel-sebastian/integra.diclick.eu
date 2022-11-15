<?php

include "../../includes/crmdbh.inc.php";


if(isset($_POST['lead-source'])){

    $source = $_POST['lead-source'];

    if(isset($_POST['lead-name'])){
        $name = $_POST['lead-name'];
    }
    else{
        $name = "";
    }
    
    if(isset($_POST['lead-company'])){
        $company = $_POST['lead-company'];
    }
    else{
        $company = "";
    }
    
    if(isset($_POST['lead-phone'])){
        $phone = $_POST['lead-phone'];
    }
    else{
        $phone = "";
    }
    
    if(isset($_POST['lead-mail'])){
        $mail = $_POST['lead-mail'];
    }
    else{
        $mail = "";
    }
    
    if(isset($_POST['lead-website'])){
        $website = $_POST['lead-website'];
    }
    else{
        $website = "";
    }
    
    if(isset($_POST['lead-message'])){
        $message = $_POST['lead-message'];
    }
    else{
        $message = "";
    }
    
    if(isset($_POST['lead-sales-target'])){
        $salesTarget = $_POST['lead-sales-target'];
    }
    else{
        $salesTarget = "";
    }

    if(isset($_POST['lead-objective'])){
        $objective = $_POST['lead-objective'];
    }
    else{
        $objective = "";
    }
    if(isset($_POST['lead-buget'])){
        $buget = $_POST['lead-buget'];
    }
    else{
        $buget = "";
    }

    $status = "1";

    $sql = "INSERT INTO `leads` (`source`, `name`, `company`, `phone`, `email`, `website`, `message`, `sales_target`, `objective`, `buget`, `status`) VALUES ('$source','$name','$company','$phone','$mail','$website','$message','$salesTarget','$objective','$buget','$status')";
    if(mysqli_query($crmConn,$sql)){
        echo '{"status":"success"}';
    }
    else{
        echo '{"status":"fail","error":"'.$crmConn->error.'"}';
    }
}
else{
    echo '{"status":"fail","error":"Source not set!"}';
}







