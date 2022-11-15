<?php
require '../../includes/vendor/autoload.php';

include "../../includes/crmdbh.inc.php";
include "../../includes/dbh.inc.php";

session_start();
error_reporting(0);


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

if(isset($_SESSION['user-data']) && $_SESSION['user-data']->tip==="admin"){
    $unicId=$_SESSION['user-data']->unicId;
    // $role=$_SESSION['role'];
    $sql = "SELECT * FROM `admin_users` WHERE `unicId`='$unicId'";
    $result=mysqli_query($conn,$sql);
    if($result){
        if(mysqli_num_rows($result)===1){
            $row=mysqli_fetch_assoc($result);
        }
    }

    $email=$row['email'];
    $code=rand(100000,999999);

    $sql = "UPDATE `invoice_check` SET `security_code`='$code' WHERE `userId`='$unicId'";
    if(mysqli_query($conn,$sql)){
        $mail = new PHPMailer(true);
        try{
            $mail -> SMTPDebug = 0;
            $mail -> isSMTP();
            $mail -> Host = 'mail.your-server.de';
            $mail -> SMTPAuth = true;
            $mail -> Username = 'sebastian@diagency.eu';
            $mail -> Password = 'Cb3I3Y6vuIqgH9vj';
            $mail -> SMTPSecure = 'TLS';
            $mail -> Port = 587;
    
            $mail -> setFrom("hello@diagency.eu","diagency"); 
            $mail -> addAddress($email);
    
            $mail -> addReplyTo("hello@diagency.eu","diagency"); 
    
            $mail -> Subject = "Cod de verificare";
            $mail -> Body = "Codul de verificare este:<br><br>".$code."<br><br>";
            $mail -> AltBody = "Acesta este un test nonHTML";
    
            $mail -> send();
            echo '{"status":"success"}';
        } catch (Exception $e){
            echo '{"status":"fail","error":"'.$mail->ErrorInfo.'"}';
        }
    }
    else{
        echo '{"status":"fail","error":"'.$conn->error.'"}';
    }

    
}