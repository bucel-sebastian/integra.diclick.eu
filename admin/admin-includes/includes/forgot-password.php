<?php

include "dbh.inc.php";


if(isset($_POST['email'])){
    $email = $_POST['email'];
    $sql = "SELECT * FROM users WHERE `email`='$email'";
    $result=mysqli_query($conn,$sql);
    if($result){
        while($row = mysqli_fetch_assoc($result)){
            $fromDbEmail = $row['email'];
            $username = $row['username'];
            $name = $row['name'];
            $password = $row['password'];
        }
        if(isset($fromDbEmail)){
            $to = $fromDbEmail;
            $subject = "Your login details recovery.";
            $message = "Hi, ".$name."<br><br>Your login details are:<br>Username: ".$username."<br>Password: ".$password."<br><br><br><br>Best wishes,<br>diclick team";
            $headers  = "From: diclick.eu <hello@diclick.eu>\n";
            $headers .= "Cc: diclick.eu <hello@diclick.eu\n"; 
            $headers .= "X-Sender: diclick.eu <hello@diclick.eu>\n";
            $headers .= 'X-Mailer: PHP/' . phpversion();
            $headers .= "X-Priority: 1\n";
            $headers .= "Return-Path: hello@diclick.eu\n";
            $headers .= "MIME-Version: 1.0\r\n";
            $headers .= "Content-Type: text/html; charset=iso-8859-1\n";

            if(mail($to,$subject,$message,$headers)){
                echo "success";
            }
            else{
                echo "fail send mail";
            }
        }
        else{
            echo "no-account";
        }
    }
    else{
        echo $conn -> error;
    }
}
