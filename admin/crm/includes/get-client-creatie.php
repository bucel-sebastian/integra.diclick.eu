<?php

include "../../../includes/dbh.inc.php";
include "../../../includes/crmdbh.inc.php";

session_start();
error_reporting(0);

    if(isset($_GET['id'])){
        $clientId=$_GET['id'];
        echo "[";
        $sql = "SELECT * FROM `creatie` WHERE `unicId`='$clientId'";
        $result = mysqli_query($crmConn,$sql);
        if($result){
            if(mysqli_num_rows($result)>0){
                echo '{"numRes":"'.mysqli_num_rows($result).'"}';
                while($row = mysqli_fetch_assoc($result)){
                    $comentariiRaw = $row['comentarii'];
                    $text = str_replace(array("\r\n", "\n\r", "\r", "\n"),"<br>",$comentariiRaw);

                    echo ",".json_encode(array("id"=>$row['id'],"clientId"=>$clientId,"pachet"=>$row['pachet'],"perStart"=>$row['perioada_start'],"perSfarsit"=>$row['perioada_sfarsit'],"comentarii"=>$text,"produse"=>$row['produse']));
                }
            }
        }
        echo "]";
    }
