<?php

include "../../../includes/dbh.inc.php";
include "../../../includes/crmdbh.inc.php";

session_start();
error_reporting(0);



    $clientId=$_POST['clientId'];

    $clientService = $_POST['edit-client-client-service-responsabil'];
    $salesService = $_POST['edit-client-sales-responsabil'];
    $performanceService = $_POST['edit-client-performance-responsabil'];

    $nume = $_POST['edit-client-name'];
    $firma = $_POST['edit-client-firma'];
    $cui = $_POST['edit-client-cod-fiscal'];
    $nrc = $_POST['edit-client-nr-reg-com'];

    $status = $_POST['edit-client-status'];
    $categorie = $_POST['edit-client-categorie'];

    $orasFact = $_POST['edit-client-oras-facturare'];
    $judFact = $_POST['edit-client-judet-facturare'];
    $taraFact = $_POST['edit-client-tara-facturare'];
    $adresaFact = $_POST['edit-client-adresa-facturare'];
    $telefon = $_POST['edit-client-phone'];

    $bankAcc = $_POST['edit-client-bank-account'];

    $uploadedFile=false;

    $oldStatus=null;

    $sql = "Select * from `fisa_client` where `unicId`='$clientId'";
    $result = mysqli_query($crmConn,$sql);
    if($result){
        if(mysqli_num_rows($result)!=0){
            $row = mysqli_fetch_assoc($result);
            $oldStatus = $row['status'];
        }
    }


    if($_FILES['edit-client-logo']['name']!=""){
        $fileName = $_FILES['edit-client-logo']['name'];
        $fileTmpName = $_FILES['edit-client-logo']['tmp_name'];
        $fileSize = $_FILES['edit-client-logo']['size'];
        $fileError = $_FILES['edit-client-logo']['error'];
        $fileType = $_FILES['edit-client-logo']['type'];

        $fileExt = explode(".",$fileName);
        $fileActualExt = strtolower(end($fileExt));

        $fileNewName = "logo.".$fileActualExt;

        $fileExist = "../../../clients-resources/".$clientId."/logo.*";
        $filePath = "../../../clients-resources/".$clientId."/".$fileNewName;

        $logo=$fileNewName;

        $uploadedFile=true;
    
    }

    if($status === "1" && $oldStatus != "1"){
        $resourcesPath="../../../clients-resources/".$clientId;
        
        if(mkdir($resourcesPath,0777)){

        }
        else{
            echo '{"status":"fail","error":"Fisierul clientului nu a putut fi creat"}';
            die;
        }
        if(mkdir($resourcesPath."/proforms")){
            if(mkdir($resourcesPath."/media-plan")){
                if(mkdir($resourcesPath."/invoices")){
                    if(mkdir($resourcesPath."/other")){
                        if(mkdir($resourcesPath."/projects")){
                            if(mkdir($resourcesPath."/contracts")){
                                // echo '{"status":"success"}';
                            }
                            else{
                                echo '{"status":"fail","error":"Fisierul /contracts nu a putut fi creat"}';
                                die;
                            }
                        }
                        else{
                            echo '{"status":"fail","error":"Fisierul /projects nu a putut fi creat"}';
                            die;

                        }
                    }
                    else{
                        echo '{"status":"fail","error":"Fisierul /other nu a putut fi creat"}';
                        die;

                    }
                }
                else{
                    echo '{"status":"fail","error":"Fisierul /invoices nu a putut fi creat"}';
                    die;

                }
            }
            else{
                echo '{"status":"fail","error":"Fisierul /media-plan nu a putut fi creat"}';
                die;

            }
        }
        else{
            echo '{"status":"fail","error":"Fisierul /proforms nu a putut fi creat"}';
            die;

        }
                    
    }
   

    if(glob($fileExist)){
        $exitingFile = glob($fileExist);
    }
    else{
        $exitingFile= false;
    }

    if($uploadedFile!=false){
        $sql = "UPDATE `fisa_client` SET `nume_client`='$nume',`firma`='$firma',`cod_fiscal`='$cui',`nr_reg_comert`='$nrc',`adresa_facturare`='$adresaFact',`nr_tel`='$telefon',`logo`='$logo',`status`='$status',`categorie`='$categorie',`oras_facturare`='$orasFact',`judet_facturare`='$judFact',`tara_facturare`='$taraFact',`cont_bancar`='$bankAcc' WHERE `unicId`='$clientId'";
    }
    else{
        $sql = "UPDATE `fisa_client` SET `nume_client`='$nume',`firma`='$firma',`cod_fiscal`='$cui',`nr_reg_comert`='$nrc',`adresa_facturare`='$adresaFact',`nr_tel`='$telefon',`status`='$status',`categorie`='$categorie',`oras_facturare`='$orasFact',`judet_facturare`='$judFact',`tara_facturare`='$taraFact',`cont_bancar`='$bankAcc' WHERE `unicId`='$clientId'";
    }
    
    if(mysqli_query($crmConn,$sql)){        
        
        
            if($uploadedFile!=false){
                if($exitingFile[0]!=""){
                    unlink($exitingFile[0]);
                    if(move_uploaded_file($fileTmpName,$filePath)){
                        echo '{"status":"success"}';
                    }
                    else{
                        echo '{"status":"fail","error":"File error"}';
                    }
                    
                }
                else{
                    if(move_uploaded_file($fileTmpName,$filePath)){
                        echo '{"status":"success"}';
                    }
                    else{
                        echo '{"status":"fail","error":"File error 1"}';
                    }
                }
            }
            else{
                echo '{"status":"success"}';
            }

       
    }
    else{
        echo '{"status":"fail","error":"'.$crmConn->error.'"}';

    }

