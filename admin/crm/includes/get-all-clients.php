<?php

include "../../../includes/dbh.inc.php";
include "../../../includes/crmdbh.inc.php";

session_start();
error_reporting(0);

$array = array();
    if(isset($_GET['status'])){
        $status = $_GET['status'];
        if($status==="1"){
            $sql = "SELECT * FROM `fisa_client` WHERE `status`='$status'";
            $result = mysqli_query($crmConn,$sql);
            if($result){
                if(mysqli_num_rows($result)>0){
                    while($row=mysqli_fetch_assoc($result)){
                        array_push($array,array("unicId"=>$row['unicId'],"numeClient"=>$row['nume_client'],"firma"=>$row['firma'],"logo"=>$row['logo']));
                    }
                }
            
            
            }
            
        }
        else if($status === 'lead'){
            $sql = "SELECT * FROM `companies` WHERE `status`!='1' AND `status`!='0'";
            $result = mysqli_query($conn,$sql);
            if($result){
                if(mysqli_num_rows($result)>0){
                    while($row=mysqli_fetch_assoc($result)){

                        $tmpId = $row['unicId'];
                        $sql = "SELECT `sursa` FROM `fisa_client` WHERE `unicId`='$tmpId'";
                        $resultData = mysqli_query($crmConn,$sql);
                        if($resultData){
                            if(mysqli_num_rows($resultData)===1){
                                $rowData = mysqli_fetch_assoc($resultData);

                                array_push($array,array("unicId"=>$row['unicId'],"nume"=>$row['nume'],"firma"=>$row['firma'],"status"=>$row['status'],"sursa"=>$rowData['sursa']));
                            }
                        }

                    }
                }
            }
            
               
        }
        else{
            
            $sql = "SELECT * FROM `fisa_client`";
            $result = mysqli_query($crmConn,$sql);
            if($result){
                if(mysqli_num_rows($result)>0){
                    while($row=mysqli_fetch_assoc($result)){
                        array_push($array,array("unicId"=>$row['unicId'],"numeClient"=>$row['nume_client'],"firma"=>$row['firma'],"logo"=>$row['logo']));
                    }
                }
            }
        }
            
    }
    
    else{
        $sql = "SELECT * FROM `fisa_client`";
        $result = mysqli_query($crmConn,$sql);
        if($result){
            if(mysqli_num_rows($result)>0){
                while($row=mysqli_fetch_assoc($result)){
                    array_push($array,array("unicId"=>$row['unicId'],"numeClient"=>$row['nume_client'],"firma"=>$row['firma'],"logo"=>$row['logo']));
                }
            }

        }

    }
    echo json_encode($array);
    
    
// }