<?php

include "../../../includes/dbh.inc.php";
include "../../../includes/crmdbh.inc.php";

session_start();
error_reporting(0);


    if(isset($_GET['id'])){
        $clientId=$_GET['id'];

        $sql = "SELECT * FROM `media_plan` WHERE `unicId`='$clientId' ORDER BY `perioada_start` DESC";
        $result = mysqli_query($crmConn,$sql);
        if($result){
            $index=0;
            // echo "[";
            $array = array();
            while($row=mysqli_fetch_assoc($result)){
                
                $comentariiRaw = $row['comentarii'];
                $text = str_replace(array("\r\n", "\n\r", "\r", "\n"),"<br>",$comentariiRaw);

                // echo $row['retea'];
                // $retea = $row['retea'];
                // echo $retea."\n";

                // $reteaJson = json_encode($retea);
                // echo var_dump($reteaJson);


                $frecventaJson = $row['frecventa'];
               
                array_push($array,array("id"=>$row['id'],"clientId"=>$row['unicId'],"comentarii"=>$text,"retea"=>$row['retea'],"perStart"=>$row['perioada_start'],"perSfarsit"=>$row['perioada_sfarsit']));
                
                // if($index===0){
                //     echo '{"id":"'.$row['id'].'","clientId":"'.$row['unicId'].'","comentarii":"'.$text.'","retea":"'.$row['retea'].'","tipContent":"'.$row['tip_content'].'","frecventa":'.$frecventaJson.',"perStart":"'.$row['perioada_start'].'","perSfarsit":"'.$row['perioada_sfarsit'].'"}';
                //     $index++;
                // }
                // else{
                //     echo ',{"id":"'.$row['id'].'","clientId":"'.$row['unicId'].'","comentarii":"'.$text.'","retea":"'.$row['retea'].'","tipContent":"'.$row['tip_content'].'","frecventa":'.$frecventaJson.',"perStart":"'.$row['perioada_start'].'","perSfarsit":"'.$row['perioada_sfarsit'].'"}';
                //     $index++;
                // }
            }
            echo json_encode($array);
            // echo "]";
        }
    }
