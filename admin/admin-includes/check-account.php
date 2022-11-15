<?php

include "../../includes/dbh.inc.php";
include "../../includes/crmdbh.inc.php";

// echo "intra";
if(isset($_POST['acc-name'])){
    $accUsername= $_POST["acc-username"];
    
    $sql = "SELECT * FROM `users` WHERE username='$accUsername'";

    $result = mysqli_query($conn,$sql);
    if(mysqli_fetch_row($result)){
        echo '{"status":"fail","error":"Username folosit deja"}';
    }
    else{
        echo '{"status":"success"}';
    }

}
if(isset($_POST["client-name"])){
    $clientCompany= $_POST['client-company'];
    $clientCui= $_POST['client-cod-fiscal'];
    $clientNrc= $_POST['client-nr-reg-comert'];
    $clientUsername= $_POST["client-username"];

    $sql = "SELECT * FROM `users` WHERE username='$clientUsername'";

    $result = mysqli_query($conn,$sql);
    if(mysqli_fetch_row($result)){
        echo '{"status":"fail","error":"Username folosit deja"}';
    }
    else{
        $sql = "SELECT * FROM `fisa_client` WHERE `firma`='$clientCompany'";
        $result = mysqli_query($crmConn,$sql);
        if($result){
           
            
        }
        echo '{"status":"success"}';
    }
}

?>