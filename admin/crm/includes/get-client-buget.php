<?php

include "../../../includes/dbh.inc.php";
include "../../../includes/crmdbh.inc.php";

session_start();
error_reporting(0);

    if(isset($_GET['id'])){
        $clientId=$_GET['id'];

        echo "[";
        $sql = "SELECT * FROM `buget` WHERE `unicId`='$clientId'";
        $result = mysqli_query($crmConn,$sql);
        if($result){
            if(mysqli_num_rows($result)>0){
                echo '{"numRes":"'.mysqli_num_rows($result).'"}';
                while($row=mysqli_fetch_assoc($result)){
                    $comentariiRaw = $row['comentarii'];
                    $text = str_replace(array("\r\n", "\n\r", "\r", "\n"),"<br>",$comentariiRaw);

                    echo ",".json_encode(array("id"=>$row['id'],"clientId"=>$clientId,"tip"=>$row['tip'],"perioadaStart"=>$row['perioada_start'],"perioadaSfarsit"=>$row['perioada_sfarsit'],"bugetTotal"=>$row['buget_total'],"bugetPeZi"=>$row['buget_pe_zi'],"comentarii"=>$text,"retele"=>$row['retele']));


                    // echo '{"id":"'.$row['id'].'","tip":"'.$row['tip'].'","perioadaStart":"'.$row['perioada_start'].'","perioadaSfarsit":"'.$row['perioada_sfarsit'].'","bugetTotal":"'.$row['buget_total'].'","bugetPeZi":"'.$row['buget_pe_zi'].'","comentarii":"'.$text.'","retele":"'.$row['retele'].'"}';
                }
            }
        }
        echo "]";
    }

