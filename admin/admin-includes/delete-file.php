<?php

include "../../includes/dbh.inc.php";
    include "../../includes/updatesdbh.inc.php";

    session_start();

    error_reporting(0);

    if(isset($_GET['file']) && isset($_GET['clientId'])){

        $file=$_GET['file'];
        $clientId=$_GET['clientId'];

        $sql="SELECT * FROM `$clientId` WHERE `file` LIKE '%$file%'";
        $result=mysqli_query($updsConn,$sql);
        if($result){
            $row=mysqli_fetch_assoc($result);
            $date=$row['date'];
            
            $allFiles=$row['file'];
            if($allFiles===$file){
                $newFiles="";
            }
            else if(strpos($allFiles,$file)===0){
                $newFiles=str_replace($file."\n","",$allFiles);
            }
            else{
                $newFiles=str_replace("\n".$file,"",$allFiles);
            }
            

            $sql="UPDATE `$clientId` SET `file`='$newFiles' WHERE `file` LIKE '%$file%'";
            $result=mysqli_query($updsConn,$sql);
            if($result){
                if(unlink("../../user/updates/".$file)){
                    echo "success";
                }
                else{
                    echo "error delete";
                }
            }
            else{
                echo $updsConn->error;
            }
        }
        else{
            echo $updsConn->error;
        }

    }