<?php

include "../../includes/dbh.inc.php";
include "../../includes/updatesdbh.inc.php";
include "../../includes/mediaplandbh.inc.php";
include "../../includes/tasksdbh.inc.php";
include "../../includes/crmdbh.inc.php";

session_start();
error_reporting(0);
$userData=$_SESSION['user-data'];

$clientLa = $_POST['client-at-selector'];
$adminClientService = $_POST['client-client-service-admin'];
$adminSales = $_POST['client-sales-admin'];
$adminPerformance = $_POST['client-performance-admin'];

$admins = array("clientService"=>$adminClientService,"sales"=>$adminSales,"performanceMarketing"=>$adminPerformance);
$adminsJson = json_encode($admins);


$clientName = $_POST["client-name"];
$status = $_POST['client-status'];
$clientCompany = $_POST["client-company"];
$clientFiscalCode = $_POST['client-cod-fiscal'];
$clientRegNum = $_POST['client-nr-reg-comert'];
$clientBillingAdrs = $_POST['client-billing-adress'];
$clientBillingCounty = $_POST['client-billing-county'];
$clientBillingLocality = $_POST['client-billing-locality'];
$clientBillingCountry = $_POST['client-billing-country'];

$categorie=$_POST['client-category'];
$clientLanguage = $_POST['client-language'];
$clientSource=$_POST['client-source'];
$clientSourceUrl= $_POST['client-source-url'];

$clientDate = date("Y-m-d");



$contactPersons = array();
$emailList = array();

if(isset($_POST['person-id'])){
    for($i=0;$i<sizeof($_POST['person-id']);$i++){
        if(isset($_POST['new-person-decident-'.$_POST['person-id'][$i]])){
            $decident = 1;
        }
        else{
            $decident = 0;            
        }
        array_push($contactPersons,(object) array("nume"=>$_POST['person-nume-'.$_POST['person-id'][$i]],"prenume"=>$_POST['person-prenume-'.$_POST['person-id'][$i]],"functie"=>$_POST['person-functie-'.$_POST['person-id'][$i]],"email"=>$_POST['person-email-'.$_POST['person-id'][$i]],"telefon"=>$_POST['person-telefon-'.$_POST['person-id'][$i]],"decident"=>$decident));

    }
}



if(isset($_POST['email-id'])){
    for($i=0;$i<sizeof($_POST['email-id']);$i++){
        if(isset($_POST['new-billing-email-'.$_POST['email-id'][$i]])){
            $billingEmail=1;
        }
        else{
            $billingEmail=0;
        }
        array_push($emailList,(object) array("email"=>$_POST['new-email-'.$_POST['email-id'][$i]],"billing"=>$billingEmail));
    }
}


$clientUnicId= uniqid('client',false);
$clientUpdates = $clientUnicId;
$clientUpdates.="_updates";
$clientMp=$clientUnicId."_mediaplan";




$sql = "INSERT INTO `companies`(`unicId`, `nume`, `firma`, `status`, `added_by`) VALUES ('$clientUnicId','$clientName','$clientCompany','$status','$userData->unicId')";

if(mysqli_query($conn,$sql)){
    if($status === "1"){
        $sql = "CREATE TABLE `$clientMp`(
             id int(11) not null PRIMARY KEY AUTO_INCREMENT,
             scheduleUnicId varchar(255) not null,
             file text not null,
             title text not null,
             text text not null,
             platforms text not null,
             date date not null,
             time time not null,
             status varchar(40) not null,
             comments text not null
         )engine=INNODB default charset=utf8mb4";
        if(mysqli_query($mpConn,$sql)){
             $sql = "INSERT INTO `fisa_client` (`unicId`, `nume_client`, `firma`, `cod_fiscal`, `nr_reg_comert`, `adresa_facturare`, `nr_tel`,`sursa`,`oras_facturare`,`judet_facturare`,`tara_facturare`,`categorie`,`status`,`admin`,`url_sursa`) VALUES ('$clientUnicId','$clientName','$clientCompany','$clientFiscalCode','$clientRegNum','$clientBillingAdrs','$clientPhone','$clientSource','$clientBillingLocality','$clientBillingCounty','$clientBillingCountry','$categorie','$status','$adminsJson','$clientSourceUrl')";
             if(mysqli_query($crmConn,$sql)){
                for($i=0;$i<sizeof($contactPersons);$i++){
                    $sql = "INSERT INTO `client_pers`(`unicId`, `nume`, `prenume`, `email`, `telefon`, `este_decident`, `functie`) VALUES ('".$clientUnicId."','".$contactPersons[$i]->nume."','".$contactPersons[$i]->prenume."','".$contactPersons[$i]->email."','".$contactPersons[$i]->telefon."','".$contactPersons[$i]->decident."','".$contactPersons[$i]->functie."')";
                    mysqli_query($crmConn,$sql);
                }                  
                for($i=0;$i<sizeof($emailList);$i++){
                    $sql = "INSERT INTO `email_adresses`(`unicId`, `adresa_email`, `billing_email`) VALUES ('".$clientUnicId."','".$emailList[$i]->email."','".$emailList[$i]->billing."')";
                    mysqli_query($crmConn,$sql);
                }
                
                $sql = "CREATE TABLE `$clientUnicId`(
                    `id` int(11) not null PRIMARY KEY AUTO_INCREMENT,
                    `data` date NOT NULL,
                    `timp` time NOT NULL,
                    `actiune` text NOT NULL,
                    `concluzie` text NOT NULL,
                    `observatii_concluzie` text NOT NULL,
                    `documente_atasate` text NOT NULL,
                    `todo` text NOT NULL,
                    `status` int(5) NOT NULL,
                    `autor` varchar(255) NOT NULL
                )engine=INNODB default charset=utf8mb4";
                if(mysqli_query($crmConn,$sql)){
                    $resourcesPath="../../clients-resources/".$clientUnicId;
                    if(mkdir($resourcesPath,0777)){
                        if(mkdir($resourcesPath."/proforms")){
                            if(mkdir($resourcesPath."/media-plan")){
                                if(mkdir($resourcesPath."/invoices")){
                                    if(mkdir($resourcesPath."/other")){
                                        if(mkdir($resourcesPath."/projects")){
                                            if(mkdir($resourcesPath."/contracts")){
                                                echo '{"status":"success"}';
                                            }
                                            else{
                                                echo '{"status":"fail","error":"Fisierul /contracts nu a putut fi creat"}';
                                            }
                                        }
                                        else{
                                            echo '{"status":"fail","error":"Fisierul /projects nu a putut fi creat"}';
                                        }
                                    }
                                    else{
                                        echo '{"status":"fail","error":"Fisierul /other nu a putut fi creat"}';
                                    }
                                }
                                else{
                                    echo '{"status":"fail","error":"Fisierul /invoices nu a putut fi creat"}';
                                }
                            }
                            else{
                                echo '{"status":"fail","error":"Fisierul /media-plan nu a putut fi creat"}';
                            }
                        }
                        else{
                            echo '{"status":"fail","error":"Fisierul /proforms nu a putut fi creat"}';
                        }
                    }
                    else{
                        echo '{"status":"fail","error":"Fisierul clientului nu a putut fi creat"}';
                    }
                }                
                else{
                    echo '{"status":"fail","error":"'.$crmConn->error.'"}';
                }
            }
            else{
                echo '{"status":"fail","error":"'.$crmConn->error.'"}';
            }
        }
        else{
            echo '{"status":"fail","error":"'.$mpConn->error.'"}';
        }
    }
    else{
        $sql = "INSERT INTO `fisa_client` (`unicId`, `nume_client`, `firma`, `cod_fiscal`, `nr_reg_comert`, `adresa_facturare`, `nr_tel`,`sursa`,`oras_facturare`,`judet_facturare`,`tara_facturare`,`categorie`,`status`,`admin`,`url_sursa`) VALUES ('$clientUnicId','$clientName','$clientCompany','$clientFiscalCode','$clientRegNum','$clientBillingAdrs','$clientPhone','$clientSource','$clientBillingLocality','$clientBillingCounty','$clientBillingCountry','$categorie','$status','$adminsJson','$clientSourceUrl')";
        if(mysqli_query($crmConn,$sql)){
            for($i=0;$i<sizeof($contactPersons);$i++){
                $sql = "INSERT INTO `client_pers`(`unicId`, `nume`, `prenume`, `email`, `telefon`, `este_decident`, `functie`) VALUES ('".$clientUnicId."','".$contactPersons[$i]->nume."','".$contactPersons[$i]->prenume."','".$contactPersons[$i]->email."','".$contactPersons[$i]->telefon."','".$contactPersons[$i]->decident."','".$contactPersons[$i]->functie."')";
                mysqli_query($crmConn,$sql);
            }                  
            for($i=0;$i<sizeof($emailList);$i++){
                $sql = "INSERT INTO `email_adresses`(`unicId`, `adresa_email`, `billing_email`) VALUES ('".$clientUnicId."','".$emailList[$i]->email."','".$emailList[$i]->billing."')";
                mysqli_query($crmConn,$sql);
            }
            
            $sql = "CREATE TABLE `$clientUnicId`(
                `id` int(11) not null PRIMARY KEY AUTO_INCREMENT,
                `data` date NOT NULL,
                `timp` time NOT NULL,
                `actiune` text NOT NULL,
                `concluzie` text NOT NULL,
                `observatii_concluzie` text NOT NULL,
                `documente_atasate` text NOT NULL,
                `todo` text NOT NULL,
                `status` int(5) NOT NULL,
                `autor` varchar(255) NOT NULL
            )engine=INNODB default charset=utf8mb4";
            if(mysqli_query($crmConn,$sql)){
                $resourcesPath="../../clients-resources/".$clientUnicId;
                if(mkdir($resourcesPath,0777)){
                    echo '{"status":"success"}';
                }
                else{
                    echo '{"status":"fail","error":"File error"}';
                }
            }
            else{
                echo '{"status":"fail","error":"'.$crmConn->error.'"}';
            }
        }
        else{
            echo '{"status":"fail","error":"'.$crmConn->error.'"}';
        }
    }
}
else{
    echo '{"status":"fail","error":"'.$conn->error.'"}';
}
      
                    
?>
