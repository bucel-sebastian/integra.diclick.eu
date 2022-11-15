<?php

include "../../../includes/dbh.inc.php";
include "../../../includes/crmdbh.inc.php";

session_start();
error_reporting(0);


$sql = "SELECT * FROM `fisa_client` WHERE `status`='1'";
$result = mysqli_query($crmConn,$sql);

$array = array();
if($result){
    if(mysqli_num_rows($result)>0){
        
        while($row=mysqli_fetch_assoc($result)){

            array_push($array,array("unicId"=>$row['unicId'],"numeClient"=>$row['nume_client'],"firma"=>$row['firma'],"codFiscal"=>$row['cod_fiscal'],"nrRegComert"=>$row['nr_reg_comert'],"nrTel"=>$row['nr_tel'],"taraFact"=>$row['tara_facturare'],"judetFact"=>$row['judet_facturare'],"orasFact"=>$row['oras_facturare'],"adresaFact"=>$row['adresa_facturare']));

            // echo ',{"unicId":"'.$row['unicId'].'","numeClient":"'.$row['nume_client'].'","firma":"'.$row['firma'].'","codFiscal":"'.$row['cod_fiscal'].'","nrRegComert":"'.$row['nr_reg_comert'].'","nrTel":"'.$row['nr_tel'].'","taraFact":"'.$row['tara_facturare'].'","judetFact":"'.$row['judet_facturare'].'","orasFact":"'.$row['oras_facturare'].'","adresaFact":"'.$row['adresa_facturare'].'"}';
        }
    }
}

echo json_encode($array);