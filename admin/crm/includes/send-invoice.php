<?php

require '../../../includes/vendor/autoload.php';

include "../../../includes/crmdbh.inc.php";
include "../../../includes/dbh.inc.php";

session_start();
error_reporting(0);


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
if(isset($_POST['clientId']) && isset($_POST['number']) && isset($_POST['invoice-mail-subject']) && isset($_POST['invoice-mail-body'])){
    if(isset($_SESSION['username']) && ($_SESSION['role']==='admin' || $_SESSION['role'] === 'Owner')){

        $client = $_POST['clientId'];
        $file = $_POST['number'];
        $subject = $_POST['invoice-mail-subject'];
        $bodyText = $_POST['invoice-mail-body'];
        $wishes = $_POST['invoice-mail-wishes'];

        $sender = $_SESSION['unicId'];
        $sql = "SELECT * FROM `users` WHERE `unicId`='$sender'";
        $result=mysqli_query($conn,$sql);
        if($result){
            if(mysqli_num_rows($result)===1){
                $row = mysqli_fetch_assoc($result);
                $senderName = " ".$row['name'];//$row['prenume'].
                $senderPhone = $row['telefon']; 
                $senderMail = $row['email'];
                $senderFunction = strtoupper($row['function']);
            }
            else{
                echo "nu intra";
            }
        }

        // echo $bodyText;
        $body="";


        $signature = "<br><br><p>".$wishes.",</p><table style='border-collapse:collapse;'>
            <tr style='border-collapse:collapse;'>
                <td style='border-right:2px solid #D51B32;border-collapse:collapse;width:100px;padding:15px 20px 30px'>
                    <img src='cid:logo_diagency' style='width:100px'>
                </td>
                <td style='border-left:2px solid #D51B32;border-collapse:collapse; padding:20px 10px 30px'>
                    <p style='margin:5px 0'><b><span style='color:#333333;text-transform:uppercase;font-size:22px'>".strtoupper($senderName)."</span>&nbsp;<span style='color:#D51B32;;font-size:22px'>|</span>&nbsp;<span style='color:#C00000;text-transform:uppercase;font-size:22px'>".strtoupper($senderFunction)."</span></b>
                    </p>
                    <p style='margin:2px 0'>📱: &nbsp;<a style='color:#C00000' href='tel: ".$senderPhone."'>".$senderPhone."</a></p>
                    <p style='margin:2px 0'>📧: <a style='color:#C00000' href='mailto: ".$senderMail."'>".$senderMail."</a></p>
                    <p style='margin:2px 0'>🌐: <a style='color:#C00000' href='https://www.diagency.eu'>https://www.diagency.eu</a></p>
                    <p style='margin:2px 0'>🌐: <a style='color:#C00000' href='https://www.diclick.eu'>https://www.diclick.eu </a></p>
                    <p style='margin:2px 0'>🗺: Bd. Pipera, nr. 1i, 077190, București, România</p>
                    <p style='margin:2px 0'>🗺: Str. Arhiepiscopiei, nr.19, 900732, Constanța, România </p>
                </td>
            </tr>
        </table>";


        for($i=0;$i<strlen($bodyText);$i++){
            if($bodyText[$i]==="\n"){
                $body.="<br>";
            }
            else{
                $body.=$bodyText[$i];
            }
        }
        // echo $body;
        $body.="<br><br>".$signature;

        $toMails = array();
        $attachFile= '../../../clients-resources/'.$client.'/invoices/'.$file;

        $sql = "SELECT * FROM `email_adresses` WHERE `unicId`='$client' AND `billing_email`='1'";
        $result = mysqli_query($crmConn,$sql);
        if($result){
            if(mysqli_num_rows($result)>0){
                while($row=mysqli_fetch_assoc($result)){
                    array_push($toMails,$row['adresa_email']);
                }
            }
        }
        else{
            echo $crmConn->error;
        }

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

            $mail -> setFrom($senderMail,$senderName);

            for($i=0;$i<sizeof($toMails);$i++){
                $mail ->addAddress($toMails[$i]);
            }
            $mail -> addReplyTo($senderMail,$senderName);
            // $mail -> addCC('marius@diagency.eu');
            $mail -> addCC('hello@diagency.eu');
            // $mail -> addCC('sebastian@diagency.eu');

            $mail -> addAttachment($attachFile);

            $mail -> AddEmbeddedImage('../../../resources/img/diagency-logo-mail.png', 'logo_diagency');
            $mail -> CharSet = 'UTF-8';
            $mail -> isHTML(true);
            $mail -> Subject = $subject;
            $mail -> Body = $body;
            $mail -> AltBody = "Acesta este un test nonHTML";

            $mail -> send();
            echo '{"status":"success"}';
        } catch (Exception $e){
            echo "Message coult not be sent. Mailer Error: {$mail->ErrorInfo}";
        }
    }
}


 

