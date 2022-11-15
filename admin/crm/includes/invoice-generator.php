<?php
require_once 'dompdf/autoload.inc.php';

include "../../../includes/crmdbh.inc.php";
include "../../../includes/dbh.inc.php";

session_start();
error_reporting(0);

use Dompdf\Dompdf;


$dompdf = new Dompdf();
$options=$dompdf->getOptions();
$options->set('isRemoteEnabled', true);
$dompdf->setOptions($options);

$securityCode=$_POST['gen-invoice-security-code'];
$adminId=$_SESSION['user-data']->unicId;


$sql = "SELECT * FROM `invoice_check` WHERE `userId`='$adminId'";
$result = mysqli_query($conn,$sql);
if($result){
    if(mysqli_num_rows($result)===1){
        $row=mysqli_fetch_assoc($result);
    }
}
if(password_verify($securityCode,$row['code'])){
       
    $emitor=$_POST['gen-invoice-emitator-value'];
    $client=$_POST['gen-invoice-client-value'];
    $proformNumber = $_POST['gen-invoice-proform-number'];
    
    $totalDePlata=$_POST['total-de-plata'];
    $totalFTva=$_POST['total-fara-tva'];
    $totalTva=$_POST['total-tva'];

    $moneda = $_POST['gen-invoice-moneda'];
    if($moneda === "EURO-ECHIVALENT"){
        $cursEuro=$_POST['gen-proforma-curs-euro'];
        $cursEuroRow = '<tr style="border:2px solid #000;border-collapse:collapse;">
            <td></td>
            <td style="text-align:right">BNR exchange rate RON / EUR</td>
            <td></td>
            <td>'.$cursEuro.'</td>
            <td></td>
            <td></td>
            <td></td>
        </tr>';
        $euroSymbol = "";
    }
    else if($moneda === "EURO"){
        $cursEuro=$_POST['gen-proforma-curs-euro'];
        $euroSymbol = "€";
        $cursEuroRow = '<tr style="border:2px solid #000;border-collapse:collapse;">
            <td></td>
            <td style="text-align:right">BNR exchange rate RON / EUR</td>
            <td></td>
            <td>'.$cursEuro.'</td>
            <td></td>
            <td></td>
            <td></td>
        </tr>';
    }
    else if($moneda === "HUF"){
        $euroSymbol = "HUF";
        $cursEuro="";
        $cursEuroRow = "";
    }
    else{
        $euroSymbol = "";
        $cursEuro="";
        $cursEuroRow = "";
    }
    


    $sql = "SELECT * FROM `fisa_client` WHERE `unicId`='$client'";
    $result = mysqli_query($crmConn,$sql);
    if($result){
        if(mysqli_num_rows($result)===1){
            $row=mysqli_fetch_assoc($result);
        }
    }

    $sql = "SELECT * FROM `email_adresses` WHERE `unicId`='$client' AND `billing_email`='1'";
    $result2 = mysqli_query($crmConn,$sql);
    $billingEmails="";
    if($result2){
        if(mysqli_num_rows($result2)>0){
            while($row2=mysqli_fetch_assoc($result2)){
                $billingEmails.=$row2['adresa_email']."<br>";
            }
        }
    }

    $invoiceTableData="";
    $products = array();

    $productList = json_decode($_POST['invoice-products']);
    // echo var_dump($productList);

    for($i=0;$i<sizeof($productList);$i++){
        // $products[$i]->nume = $_POST['product-name'][$i];
        // $products[$i]->um = $_POST['product-um'][$i];
        // $products[$i]->cant = $_POST['product-cant'][$i];
        // $products[$i]->pret = $_POST['product-price'][$i];
        // $products[$i]->val = $_POST['product-val'][$i];
        // $products[$i]->tva = $_POST['product-tva'][$i];
        $invoiceTableData.='<tr>
            <td style="border:2px solid #000;padding: 2px 5px;border-collapse:collapse;">'.($i+1).'</td>
            <td style="border:2px solid #000;padding: 2px 5px;border-collapse:collapse;">'.$productList[$i]->nume.'</td>
            <td style="border:2px solid #000;padding: 2px 5px;border-collapse:collapse;">'.$productList[$i]->um.'</td>
            <td style="border:2px solid #000;padding: 2px 5px;border-collapse:collapse;">'.$productList[$i]->cantitate.'</td>
            <td style="border:2px solid #000;padding: 2px 5px;border-collapse:collapse;">'.$productList[$i]->pretUnitar.' '.$euroSymbol.'</td>
            <td style="border:2px solid #000;padding: 2px 5px;border-collapse:collapse;">'.$productList[$i]->prevalFaraTvatUnitar.' '.$euroSymbol.'</td>
            <td style="border:2px solid #000;padding: 2px 5px;border-collapse:collapse;">'.$productList[$i]->tva.' '.$euroSymbol.'</td>
            
        </tr>';
        // echo var_dump($productList[$i]);
    }


    $productsJson = json_encode($productList,JSON_UNESCAPED_UNICODE);

    $invoiceDate=date("d-M-y");
    $prefix = $_POST['gen-invoice-invoice-serie'];
    $invoiceNumber=$_POST['gen-invoice-invoice-number'];
    $invoiceVAT=$_POST['gen-invoice-vat'];
    $invoicePayDayDays=$_POST['gen-invoice-tp'];
    
    $invoicePayDay=date("d-M-y",strtotime($invoiceDate."+ ".$invoicePayDayDays." days"));


    $totalWithoutVAT=$_POST['total-fara-tva'];
    $totalVAT=$_POST['total-tva'];
    $invoiceTotal=$_POST['total-de-plata'];

    $tmpId = uniqid("tmp",false);
    $filename=$prefix." ".$tmpId.".pdf";

    $i=1;
    while (file_exists('../../../clients-resources/'.$client.'/invoices/'.$filename)) {
        $filename = $prefix." tmp ".$i.".pdf";
        $i++;
    } 



    $sql="INSERT INTO `invoices`(`client`, `nr_reg_comert`, `cod_fiscal`, `adresa_facturare`, `oras_facturare`, `judet_facturare`, `tara_facturare`, `data_factura`, `invoice_number`, `vat`, `produse`, `termen_plata`, `emitor`, `total_tva`,`total_f_tva`,`total_de_plata`,`prefix_serie_factura`,`created_by`,`moneda`,`curs_euro`,`status`,`file`) VALUES ('$client','".$row['cod_fiscal']."','".$row['nr_reg_comert']."','".$row['adresa_facturare']."','".$row['oras_facturare']."','".$row['judet_facturare']."','".$row['tara_facturare']."','".date("Y-m-d")."','$tmpId','$invoiceVAT','$productsJson','$invoicePayDayDays','$emitor','$totalTva','$totalFTva','$totalDePlata','$prefix','$adminId','$moneda','$cursEuro','1','$filename')";
    if(!mysqli_query($crmConn,$sql)){
        echo $crmConn->error;
    }

    if($emitor==='1'){
        $emitorData='<div  style="display:inline-block;float:left;width:40%;background-color:$050505;vertical-align:top">
        <p style="margin:0;font-weight:700;font-size:12px">S.C D+I Activation Agency SRL</p>
        <p style="margin:0">Nr. Reg. Comertului: J40/9162/2021</p>
        <p style="margin:0">Cod Fiscal RO 41226367</p>
        <p style="margin:0">IBAN RON: RO55 BTRL RONC RT05 0371 2101</p>
        <p style="margin:0">IBAN EUR: RO05 BTRL EURC RT05 0371 2101</p>
        <p style="margin:0">Banca Transilvania</p>
        <p style="margin:0">SWIFT Code: BTRLRO22</p>
        <p style="margin:0">Adresa: Calea Griviței, Nr. 140, Etaj 5, Ap 19</p>
        <p style="margin:0">București, Sectorul 1</p>
    </div>';
    $emitorLogo='<img src="https://integra.diclick.eu/resources/img/diagency-logo.png" alt="" style="width:20%;display:block;margin:0;position:relative">
    ';

    $delegat="<tr><td>
    Numele Delegatului: Marius Baluta
    </td></tr>
    <tr><td>
    CNP: 1660715080019
    </td></tr>
    <tr><td>
    CI seria RX nr. 525905
    </td></tr>
    <tr><td>
    Auto nr.
    </td></tr>";
    }
    else if($emitor==='2'){
        $emitorData='<div  style="display:inline-block;float:left;width:40%;background-color:$050505;vertical-align:top">
        <p style="margin:0;font-weight:700;font-size:12px">SC Social Marketing Platform SRL</p>
        <p style="margin:0">Nr. Reg. Comertului: J13/2342/2021</p>
        <p style="margin:0">Cod Fiscal RO 44577699</p>
        <p style="margin:0">IBAN RON: RO96 BTRL RONC RT06 1007 7101</p>
        <p style="margin:0">Banca Transilvania</p>
        <p style="margin:0">Adresa: Strada Plopilor, Cam.1, Bloc B2, Scara C, Ap.50</p>
        <p style="margin:0">Neptun, Municipiul Mangalia</p>
    </div>';
        $emitorLogo='<img src="https://integra.diclick.eu/resources/img/logo-diclick.jpg" alt="" style="width:20%;display:block;margin:0;position:relative">
        ';

        $delegat="<tr><td>
        Numele Delegatului: Andreea Cristina Lepchihler
        </td></tr>
        <tr><td>
        CNP: 2960919090041
        </td></tr>
        <tr><td>
        CI seria RX nr. 610118
        </td></tr>
        <tr><td>
        Auto nr.
        </td></tr>";
    }


    // <td style="text-align:center">'.$prefix.' '.$invoiceNumber.'</td>
    


    $html = '<style>

    @import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");


    *{
        font-family: "Roboto", sans-serif;
        font-size: 10px;
    }

    </style>

    <div style="display:block;height: 160px;">
    '.$emitorData.'

        '.$emitorLogo.'

    <div style="font-family:Arial;display:inline-block;float:right;width:37%;background-color:$050505;vertical-align:top">
        <table>
            <tbody>
                <tr>
                    <td style="text-align:right;width:30px">Client</td>
                    <td>'.$row['firma'].'</td>
                </tr>
                <tr>
                    <td style="text-align:right;width:70px;">Nr. Reg. Com.</td>
                    <td style="">'.$row['nr_reg_comert'].'</td>
                </tr>
                <tr>
                    <td style="text-align:right">Cod Fiscal</td>
                    <td>'.$row['cod_fiscal'].'</td>
                </tr>
                <tr>
                    <td style="text-align:right">Adresa</td>
                    <td>'.$row['adresa_facturare'].'</td>
                </tr>
                <tr>
                    <td style="text-align:right">Oras</td>
                    <td>'.$row['oras_facturare'].'</td>
                </tr>
                <tr>
                    <td style="text-align:right">Judet</td>
                    <td>'.$row['judet_facturare'].'</td>
                </tr>
                <tr>
                    <td style="text-align:right">Tara</td>
                    <td>'.$row['tara_facturare'].'</td>
                </tr>
                <tr>
                    <td style="text-align:right">Cont</td>
                    <td>'.$row['cont_bancar'].'</td>
                </tr>
                <tr>
                    <td style="text-align:right">Banca</td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    </div>
    </div>
    <div >
        <div>
            <br><br><br><br><br>
            <h1 style="text-align:center; font-weight: 700;font-size:24px;">FACTURA</h1>
            <br>
        </div>
        <div>
            <table style="margin:0 auto;">
                <tbody>
                    <tr>
                        <td>Data facturii</td>
                        <td style="text-align:center">'.$invoiceDate.'</td>
                    </tr>
                    <tr>
                        <td>Numar factura</td>
                        <td style="text-align:center"></td>
                    </tr>
                    <tr>
                        <td>TVA</td>
                        <td style="text-align:center">'.$invoiceVAT.'%</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div style="">
            <table style="border-collapse:collapse">
                <thead>
                    <tr style="border:2px solid #000;border-collapse:collapse; width: 75%;">
                        <th style="border:2px solid #000;padding: 2px 5px;border-collapse:collapse;">Nr. Crt.</th>
                        <th style="border:2px solid #000;padding: 2px 45px 2px 5px;border-collapse:collapse;text-align: left;">Denumirea produselor sau serviciilor</th>
                        <th style="border:2px solid #000;padding: 2px 5px;border-collapse:collapse;">UM</th>
                        <th style="border:2px solid #000;padding: 2px 5px;border-collapse:collapse;">Cantitatea</th>
                        <th style="border:2px solid #000;padding: 2px 5px;border-collapse:collapse;">Pret Unitar fara TVA</th>
                        <th style="wborder:2px solid #000;border-collapse:collapse;padding: 2px 5px;">Valoare fara TVA</th>
                        <th style="border:2px solid #000;padding: 2px 5px;border-collapse:collapse;">Valoare TVA</th>
                    </tr>
                </thead>
                <tbody>

                    '.$invoiceTableData.'
                    <tr style="border:2px solid #000;border-collapse:collapse;">
                        <td></td>
                        <td>Factura circula fara semnatura si stampila 
                            conform legii 227/2015 privind codul fiscal 
                            2016 art.319 (29).
                            </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr style="border:2px solid #000;border-collapse:collapse;">
                        <td></td>
                        <td style="text-align:right">Termen de plata</td>
                        <td></td>
                        <td>'.$invoicePayDay.'</td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    '.$cursEuroRow.'
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td style="text-align:right;font-weight: 700;">Total</td>
                        <td style="border:2px solid #000;font-weight: 700;text-align:right;">'.$totalWithoutVAT.' '.$euroSymbol.'</td>
                        <td style="border:2px solid #000;font-weight: 700;text-align:right;">'.$totalVAT.' '.$euroSymbol.'</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div style="">
            
        
        
        </div>
        <div>
            
        </div>

        <div style="height:100px;">
            <div style="display:inline-block;width:40%;margin:0 auto 0 0;vertical-align:top">
                <table>
                    <tbody>
                        '.$delegat.'
                    </tbody>
                </table>
                
            </div>
            <div style="display:inline-block;width:19%;margin:0 auto;vertical-align:top">
                <p style="margin:0;text-align: center;">Semnatura<br>si stampila<br>furnizor</p>
            </div>
            <div style="display:inline-block;width:40%;vertical-align:top">
                <table style="margin:0 0 0 auto;width:50%">
                    <tbody>
                        <tr>
                            <td style="font-weight: 700;font-size:12px">Total de plata</td>
                            <td style="text-align:right;font-weight: 700;font-size:12px">'.$invoiceTotal.' '.$euroSymbol.'</td>
                        </tr> 
                    </tbody>
                </table>
                <table style="margin:0 0 0 auto;width:80%;margin-top:15px">
                    <tbody>
                        <tr>
                            <td  style="width:100px;text-align:center">
                                Semnatura de primire
                            </td>
                            <td style="width:50px;text-align:center">
                                via email
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td style="text-align:center">'.$billingEmails.'</td>
                        </td>
                    </tbody>
                </table>
                        
            </div>
        </div>';


    $dompdf -> loadHtml($html);


    $dompdf -> setPaper('A4', 'portrait');

    $dompdf -> render();
    // $dompdf -> stream("test",array("Attachement"=>0));
    $output = $dompdf->output();
    if(file_put_contents('../../../clients-resources/'.$client.'/invoices/'.$filename,$output)){
        $sql = "UPDATE `proforme` SET `invoice_created`='1', `status`='4' WHERE `invoice_number`='$proformNumber'";
        mysqli_query($crmConn,$sql);


        echo '{"status":"success","file":"'.$filename.'"}';
    }else{
        echo '{"status":"fail","error":"file error '.'../../../clients-resources/'.$client.'/invoices/'.$filename.'"}';
        $sql = "DELETE FROM `invoices` WHERE `invoice_number`='$invoiceNumber'";
        mysqli_query($crmConn,$sql);
        
    }
}
else{
    echo '{"status":"fail","error":"Codul de securitate este gresit."}';
}



