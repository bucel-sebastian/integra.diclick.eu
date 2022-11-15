<?php

    include "../../includes/dbh.inc.php";
    include "../../includes/updatesdbh.inc.php";
    include "../../includes/crmdbh.inc.php";

    session_start();

    error_reporting(0);


    $userData=$_SESSION['user-data'];


    $sql = "SELECT * FROM `companies` WHERE `added_by`='$userData->unicId' ORDER BY 'name' ASC ";
    $result = mysqli_query($conn,$sql);
    if($result){
        if(mysqli_num_rows($result)>0){

            $idList = array();
            $clientsList = array();


            // echo '[{"numRes":"'.mysqli_num_rows($result).'"}';
            // echo '[';
            // $array = array(array("numRes"=>mysqli_num_rows($result)));
            while($row = mysqli_fetch_assoc($result)){
                $unicId= $row['unicId'];
                array_push($idList,$unicId);
            }

            for($i=0;$i<sizeof($idList);$i++){

                $sql = "SELECT * FROM `fisa_client` WHERE `unicId`='$idList[$i]'";
                $result = mysqli_query($crmConn,$sql);
                if($result){
                    if(mysqli_num_rows($result)===1){
                        $row = mysqli_fetch_assoc($result);

                        array_push($clientsList,array("id"=>$row['unicId'],"nume"=>$row['nume_client'],"companie"=>$row['firma'],"email"=>"","telefon"=>"","status"=>$row['status']));
                    }
                }
            }

            echo json_encode($clientsList);
            // echo"]";  
        }
        else{
            $sql = "SELECT * FROM `companies` ORDER BY 'name' ASC ";
            $result = mysqli_query($conn,$sql);
            if(mysqli_num_rows($result)>0){

                $idList = array();
                $clientsList = array();
    
    
                // echo '[{"numRes":"'.mysqli_num_rows($result).'"}';
                // echo '[';
                // $array = array(array("numRes"=>mysqli_num_rows($result)));
                while($row = mysqli_fetch_assoc($result)){
                    $unicId= $row['unicId'];
                    array_push($idList,$unicId);
                }
    
                for($i=0;$i<sizeof($idList);$i++){
    
                    $sql = "SELECT * FROM `fisa_client` WHERE `unicId`='$idList[$i]'";
                    $result = mysqli_query($crmConn,$sql);
                    if($result){
                        if(mysqli_num_rows($result)===1){
                            $row = mysqli_fetch_assoc($result);
    
                            array_push($clientsList,array("id"=>$row['unicId'],"nume"=>$row['nume_client'],"companie"=>$row['firma'],"email"=>"","telefon"=>"","status"=>$row['status']));
                        }
                    }
                }
    
                echo json_encode($clientsList);
                // echo"]";  
            }
            else{
                $array=array();
                echo json_encode($array);
            }
        }
    }


?>