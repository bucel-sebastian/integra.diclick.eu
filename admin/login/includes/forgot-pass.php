<?php

include "../../../includes/dbh.inc.php";

require '../../../includes/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

if(isset($_POST['email'])){
    $email = $_POST['email'];
    $sql = "SELECT * FROM `admin_users` WHERE `email`='$email'";
    $result=mysqli_query($conn,$sql);
    if($result){
        if(mysqli_num_rows($result)===1){
            $row = mysqli_fetch_assoc($result);

            $unicId = $row['unicId'];
            $actualDate = date("Y-m-d H:i:s");

            $token = bin2hex(random_bytes(3));
            $sql = "INSERT INTO `reset_password_tokens`(`unicId`, `token`, `create_date`) VALUES ('$unicId','$token ','$actualDate')";
            if(mysqli_query($conn,$sql)){
                
                $subject = "Schimbare parola";
                $body = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
                    <head>
                        <!--[if gte mso 9]>
                        <xml>
                            <o:OfficeDocumentSettings>
                            <o:AllowPNG/>
                            <o:PixelsPerInch>96</o:PixelsPerInch>
                            </o:OfficeDocumentSettings>
                        </xml>
                        <![endif]-->
                        <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
                        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                        <meta name="format-detection" content="date=no" />
                        <meta name="format-detection" content="address=no" />
                        <meta name="format-detection" content="telephone=no" />
                        <meta name="x-apple-disable-message-reformatting" />
                
                    </head>
                    <body class="body" style="padding: 0 !important;margin:0 ;!important;display:block !important; min-width: 100% !important; width:100% !important; background: #bd0023 !important; -webkit-text-size-adjust:none;">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#bd0023">
                            <tr>
                                <td align="center" style="padding: 15px 0px 15px;font-family:Arial, Helvetica, sans-serif;font-size: 90%;color:#ffffff">
                                    <h3>Obtine clickurile care conteaza!</h3>
                                </td>
                            </tr>
                            
                            <tr>
                
                                <td align="center" style="padding: 0px 0px 20px 0px;">
                                    <table  width="650" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff">
                                        <tr>
                                            <td>
                                                
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="font-family:Arial, Helvetica, sans-serif;font-size: 120%;padding: 0 20px;">
                                                <h2 style="text-align:center">Resetează parola</h2>
                                                <p style="padding:0 20px">'.$token.'</p>
                                                
                
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                               
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin:0px 0px 20px 0px">
                                                    <tr>
                                                        <td style="display:block" align="center">
                                                            <a href="https://www.facebook.com/diclickmarketing" width="50px" style="display: inline-block;padding: 0px 10px 0px 10px;margin: 0 10px 0 10px;width:50px;" alt="">
                                                                
                                                            </a>
                                                            <a href="https://www.instagram.com/di_click_marketing/?utm_medium=copy_link" style="display: inline-block;padding: 0px 10px 0px 10px;margin: 0 10px 0 10px;width:50px;">
                                                                
                                                            </a>
                                                            <a href="https://www.linkedin.com/company/di-click" style="display: inline-block;padding: 0px 10px 0px 10px;margin: 0 10px 0 10px;width:50px;">
                                                                
                                                            </a>
                                                        </td>
                                                        
                                                    </tr>
                                                </table>
                                                <br><br>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                
                            </tr>
                                
                                    
                
                        </table>
                
                
                
                
                    </body>
                    </html>';
               

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
            
                    $mail -> setFrom("hello@diclick.eu");
                    $mail -> addAddress($email);
                    // $mail -> addCC('dan@diagency.eu');
            
            
                    // $mail -> AddEmbeddedImage('banner-top-01.png','banner-top');
                    // $mail -> AddEmbeddedImage('banner-bottom-01.png','banner-bottom');
                    // $mail -> AddEmbeddedImage('icon-insta.png','icon-insta');
                    // $mail -> AddEmbeddedImage('icon-fb.png','icon-fb');
                    // $mail -> AddEmbeddedImage('icon-linkd.png','icon-linkd');
            
            
                    $mail -> CharSet = 'UTF-8';
                    $mail -> isHTML(true);
                    $mail -> Subject = $subject;
                    $mail -> Body = $body;
                    // $mail -> AltBody = $altBody;
             
                    $mail -> send();
                    echo '{"status":"success"}';
                } catch (Exception $e){
                    echo '{"status":"fail","error":"'.$mail->ErrorInfo.'"}';
                }
            }
        }
        else{
            echo '{"status":"fail","error":"no account"}';
        }
    }
    else{
        echo $conn -> error;
    }
}
