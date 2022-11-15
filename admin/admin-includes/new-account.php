<?php

include "../../includes/dbh.inc.php";

$nume = $_POST['admin-nume'];
$prenume = $_POST['admin-prenume'];
$functie = $_POST['admin-functie'];
$rol = $_POST['admin-role'];
$username = $_POST['admin-username'];
$telefon = $_POST['admin-tel'];
$email = $_POST['admin-email'];
$password = $_POST['admin-password'];
$createDate = date("Y-m-d H:i:s");

$password_enc=password_hash($password,PASSWORD_BCRYPT,["cost"=>10]);
$accUnicId= uniqid('admin',false);

$sql = "INSERT INTO `admin_users`(`unicId`, `nume`, `prenume`, `username`, `email`, `telefon`, `functie`, `permissions_roles`, `create_date`, `password`) VALUES ('$accUnicId','$nume','$prenume','$username','$email','$telefon','$functie','$rol','$createDate','$password_enc')";

$result = mysqli_query($conn, $sql);
if($result){
    echo '{"status":"success"}';
}
else{
    echo '{"status":"fail","error":"'.$conn->error.'"}';
}


