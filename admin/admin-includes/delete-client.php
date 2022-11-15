<?php

include "../../includes/dbh.inc.php";
include "../../includes/updatesdbh.inc.php";
include "../../includes/tasksdbh.inc.php";
include "../../includes/mediaplandbh.inc.php";
include "../../includes/crmdbh.inc.php";
session_start();
error_reporting(0);
    

    if(isset($_GET['client'])){
        $client=$_GET['client'];

        $sql = "DELETE FROM `companies` WHERE `unicId`='$client'";
        if(mysqli_query($conn,$sql)){
            $updtUnicId = $client."_updates";
            $sql = "DROP TABLE $updtUnicId";
            if(mysqli_query($updsConn,$sql)){
                $mpUnicId=$client."_mediaplan";
                $sql = "DROP TABLE $mpUnicId";
                if(mysqli_query($mpConn,$sql)){
                    $sql = "DROP TABLE $client";
                    if(mysqli_query($tasksConn,$sql)){
                        $sql = "DELETE FROM `fisa_client` WHERE `unicId`='$client'";
                        if(mysqli_query($crmConn,$sql)){
                            echo '{"status":"success"}'; 
                        }
                        else{
                            echo '{"status":"fail","error":"'.$crmConn->error.'"}'; 
                        }
                    }
                    else{
                        echo '{"status":"fail","error":"'.$tasksConn->error.'"}'; 
                    }
                }
                else{
                    echo '{"status":"fail","error":"'.$mpConn->error.'"}'; 
                }
            }
            else{
                echo '{"status":"fail","error":"'.$updsConn->error.'"}';
            }

        }
        else{
            echo '{"status":"fail","error":"'.$conn->error.'"}';
        }
    }
