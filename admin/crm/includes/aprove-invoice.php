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

$months = array("Ian","Feb","Mar","Apr","Mai","Iun","Iul","Aug","Sep","Oct","Noi","Dec");

$invoiceTmp = $_GET['invoice'];

$sql = "SELECT * FROM `invoices` WHERE `invoice_number`='$invoiceTmp'";
$result= mysqli_query($crmConn,$sql);
if($result){
    if(mysqli_num_rows($result)===1){
        $row = mysqli_fetch_assoc($result);
        $moneda = $row['moneda'];
    }
}

// echo $row['produse'];

$productList = json_decode($row['produse']);

$emitor=$row['emitor'];
$client=$_GET['client'];

$serie = $row['prefix_serie_factura'];


    $invoiceDate=date("y-m-d");

    // echo $invoiceDate;

    $prefix = $row['prefix_serie_factura'];
    $invoiceVAT=$row['vat'];

    // $invoicePayDayDays=$row['termen_plata'];


    // echo $invoicePayDayDays;
    
    // $invoicePayDay=date("d-M-y",strtotime($invoiceDate."+ ".$invoicePayDayDays." days"));

    $invoicePayDay = $invoiceDate;

    // echo $invoicePayDay;

    $paydayMonth = date("m",strtotime($invoicePayDay));
    $paydayDay = date("d",strtotime($invoicePayDay));
    $paydayYear = date("y",strtotime($invoicePayDay));
    $invoicePayDay=$paydayDay."-".$months[$paydayMonth-1]."-".$paydayYear;

    $invoiceDateDay = date("d");
    $invoiceDateMonth = date("m");
    $invoiceDateYear = date("y");
    $invoiceDate=$invoiceDateDay."-".$months[$invoiceDateMonth-1]."-".$invoiceDateYear;


    $totalWithoutVAT=$row['total_f_tva'];
    $totalVAT=$row['total_tva'];
    $invoiceTotal=$row['total_de_plata'];





// echo "Serie ".$serie;

$sql = "SELECT * FROM `invoice_series` WHERE `serie`='$serie' AND `company`='$emitor'";

    $result = mysqli_query($conn,$sql);
    if($result){
        if(mysqli_num_rows($result)===1){
            $row = mysqli_fetch_assoc($result);
            $startNumber = $row['start_number'];
        }
    }


$sql = "SELECT * FROM `invoices` WHERE `prefix_serie_factura`='$serie' AND `emitor`='$emitor' AND `invoice_number` REGEXP '^[0-9]+$' ORDER BY `invoice_number` DESC LIMIT 0,1";

    $result = mysqli_query($crmConn,$sql);
    if($result){
        if(mysqli_num_rows($result)===1){
            $row = mysqli_fetch_assoc($result);
            $latestNumber = $row['invoice_number'];
            
            // echo json_encode(array("newInvoiceNumber"=>$latestNumber));
            if($latestNumber!=""){
                $latestNumberSplit =str_split($latestNumber);
                $latestNumberWZero = "";
                $howManyZeros = 0;

                $numberStarted=false;
                
                    for($i=0;$i<sizeof($latestNumberSplit);$i++){
                        if($numberStarted){
                            $latestNumberWZero.=$latestNumberSplit[$i];
                        }
                        else{
                            if($latestNumberSplit[$i]!="0"){
                                $latestNumberWZero.=$latestNumberSplit[$i];
                                $numberStarted=true;
                            }
                            else{
                                $howManyZeros++;
                            }
                        }
                        
                    }

                $integerLatestNumber = (int) $latestNumberWZero;
        
                $integerNumber = ++$integerLatestNumber;

                $newNumber = strval($integerNumber);

                $count1 = 0;
                $count1Number = $latestNumberWZero;
                $count2 = 0;
                $count2Number = $integerNumber;

                while($count1Number!=0){
                    $count1Number= (int) ($count1Number/10);
                    $count1++;
                }
                while($count2Number!=0){
                    $count2Number= (int) ($count2Number/10);
                    $count2++;
                }
                if($count1<$count2){
                    $howManyZeros--;
                }
            
                $newInvoiceNumber="";
                for($i=0;$i<$howManyZeros;$i++){
                    $newInvoiceNumber.="0";
                }
                $newInvoiceNumber.=$integerNumber;
            }
            else{
                $newInvoiceNumber=$startNumber;
            }
            
                $proformNumber=$newInvoiceNumber;
        
        }
        else{
            $proformNumber=$startNumber;
        }
    }
    else{
        $proformNumber=$startNumber;
    }

    // $proformNumber = $_POST['gen-invoice-proform-number'];
    
    $totalDePlata=$row['total_de_plata'];
    $totalFTva=$row['total_f_tva'];
    $totalTva=$row['total_tva'];

   
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
// echo 'merge2';
    


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
    // echo 'merge3';

    $invoiceTableData="";
    $products = array();
    $invoiceNumber=$newInvoiceNumber;

    $filename=$serie." ".$proformNumber.".pdf";
    
    // echo var_dump($productList);

    // echo "\n".$productList;

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

    
    // echo $filename;
    



    $sql="UPDATE `invoices` SET `invoice_number`='$proformNumber' , `status`='2', `file`='$filename' WHERE `invoice_number`='$invoiceTmp'";
    if(!mysqli_query($crmConn,$sql)){
        echo '{"status":"'.$crmConn->error.'"}';
        die;
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
                        <td style="text-align:center">'.$serie.' '.$proformNumber.'</td>
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
        


        echo '{"status":"success","file":"'.$filename.'"}';
    }else{
        echo '{"status":"fail","error":"file error '.'../../../clients-resources/'.$client.'/invoices/'.$filename.'"}';
        $sql = "DELETE FROM `invoices` WHERE `invoice_number`='$invoiceNumber'";
        mysqli_query($crmConn,$sql);
        
    }