<?php
require '../../../includes/vendor/autoload.php';

include "../../../includes/crmdbh.inc.php";
include "../../../includes/dbh.inc.php";


session_start();
error_reporting(0);


use Dompdf\Dompdf;

$dompdf = new Dompdf();
$options=$dompdf->getOptions();
// echo $options;
$options->set('isRemoteEnabled', true);



$dompdf->setOptions($options);

$productsDetailsJSON = json_decode($_POST['fullCart']);
// echo var_dump($productsDetailsJSON);
// echo "\n\n";
// echo var_dump($productsDetailsJSON[0]);
// echo "\n\n";
// echo $productsDetailsJSON[0]->nume;
$admin=$_SESSION['user-data'];

$adminId = $admin->unicId;

$months = array("Ian","Feb","Mar","Apr","Mai","Iun","Iul","Aug","Sep","Oct","Noi","Dec");


$emitor=$_POST['new-proforma-emitator'];
$client=$_POST['new-proforma-client'];
$totalDePlata=$_POST['total-de-plata'];
$totalFTva=$_POST['total-fara-tva'];
$totalTva=$_POST['total-tva'];

$moneda = $_POST['gen-proforma-moneda'];

if($moneda === "EURO-ECHIVALENT"){
    $cursEuro=$_POST['gen-proforma-curs-euro'];
    $cursEuro=number_format($cursEuro,3,",",".");
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
    $totalEuroSymbol = "";
    // $totalDePlata = $totalDePlata * $cursEuro;
    
}
else if($moneda === "EURO"){
    $cursEuro=$_POST['gen-proforma-curs-euro'];
    $cursEuro=number_format($cursEuro,3,",",".");
    $euroSymbol = "€";
    $totalEuroSymbol = "€";
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
    $totalEuroSymbol = "HUF";
    $cursEuroRow = "";
}
else{
    $euroSymbol = "";
    $cursEuro="";
    $totalEuroSymbol = "";
    $cursEuroRow = "";
}

$delegat = $_POST['new-proforma-pers-delegata'];

$sql = "SELECT * FROM `delegated_persons` WHERE `unicId`='$delegat'";
$result = mysqli_query($conn,$sql);
if($result){
    if(mysqli_num_rows($result)===1){
        $row = mysqli_fetch_assoc($result);

        $delegatArray = (object) array("nume"=>$row['nume'],"prenume"=>$row['prenume'],"cnp"=>$row['cnp'],"serieCi"=>$row['serie_ci'],"nrCi"=>$row['nr_ci']);
    }
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
$productsList=array();


for($i=0;$i<sizeof($productsDetailsJSON);$i++){
    if($productsDetailsJSON[$i]->tip!="0"){
        array_push($productsList,array("tip"=>$productsDetailsJSON[$i]->tip,"nume"=>str_replace(array("\r\n", "\r", "\n"), "<br>", $productsDetailsJSON[$i]->nume),"um"=>$productsDetailsJSON[$i]->um,"cantitate"=>$productsDetailsJSON[$i]->cantitate,"pretUnitar"=>$productsDetailsJSON[$i]->pretUnitar,"prevalFaraTvatUnitar"=>$productsDetailsJSON[$i]->valFaraTva,"tva"=>$productsDetailsJSON[$i]->tva,"per1"=>$productsDetailsJSON[$i]->per1,"per2"=>$productsDetailsJSON[$i]->per2,"nr"=>$productsDetailsJSON[$i]->nr,"data"=>$productsDetailsJSON[$i]->data));
    }
    else{
        array_push($productsList,array("tip"=>$productsDetailsJSON[$i]->tip,"nume"=>str_replace(array("\r\n", "\r", "\n"), "<br>", $productsDetailsJSON[$i]->nume),"um"=>$productsDetailsJSON[$i]->um,"cantitate"=>$productsDetailsJSON[$i]->cantitate,"pretUnitar"=>$productsDetailsJSON[$i]->pretUnitar,"prevalFaraTvatUnitar"=>$productsDetailsJSON[$i]->valFaraTva,"tva"=>$productsDetailsJSON[$i]->tva));
    }
    
}


for($i=0;$i<sizeof($_POST['product-name']);$i++){
    array_push($products, array("nume"=>str_replace(array("\r\n", "\r", "\n"), "<br>", $_POST['product-name'][$i]),"um"=>$_POST['product-um'][$i],"cant"=>$_POST['product-cant'][$i],"pret"=>$_POST['product-price'][$i],"val"=>$_POST['product-val'][$i],"tva"=>$_POST['product-tva'][$i]));

    if($moneda === "EURO-ECHIVALENT"){
        $tmpPrice=number_format($_POST['product-price'][$i]*$cursEuro,2,",",".");
        $tmpVal=number_format($_POST['product-val'][$i]*$cursEuro,2,",",".");
        $tmpTva=number_format($_POST['product-tva'][$i]*$cursEuro,2,",",".");
    }
    else{
        $tmpPrice=number_format($_POST['product-price'][$i],2,",",".");
        $tmpVal=number_format($_POST['product-val'][$i],2,",",".");
        $tmpTva=number_format($_POST['product-tva'][$i],2,",",".");
    }

    $invoiceTableData.='<tr>
        <td style="border:2px solid #000;padding: 2px 5px;border-collapse:collapse;">'.($i+1).'</td>
        <td style="border:2px solid #000;padding: 2px 5px;border-collapse:collapse;">'.str_replace(array("\r\n", "\r", "\n"), "<br>", $_POST['product-name'][$i]).'</td>
        <td style="border:2px solid #000;padding: 2px 5px;border-collapse:collapse;text-align:center;">'.$_POST['product-um'][$i].'</td>
        <td style="border:2px solid #000;padding: 2px 5px;border-collapse:collapse;text-align:center;">'.$_POST['product-cant'][$i].'</td>
        <td style="border:2px solid #000;padding: 2px 5px;border-collapse:collapse;text-align:center;">'.$tmpPrice.' '.$euroSymbol.'</td>
        <td style="border:2px solid #000;padding: 2px 5px;border-collapse:collapse;text-align:center;">'.$tmpVal.' '.$euroSymbol.'</td>
        <td style="border:2px solid #000;padding: 2px 5px;border-collapse:collapse;text-align:center;">'.$tmpTva.' '.$euroSymbol.'</td>
        
    </tr>';
}

$productsJson = json_encode($products,JSON_UNESCAPED_UNICODE);
$productsListJson = json_encode($productsList,JSON_UNESCAPED_UNICODE);

$invoiceDate=date("d-M-y");

$invoiceDateDay = date("d");
$invoiceDateMonth = date("m");
$invoiceDateYear = date("y");
$invoiceDate = $invoiceDateDay."-".$months[$invoiceDateMonth-1]."-".$invoiceDateYear;

$invoiceNumber=$_POST['new-proforma-invoice-number'];
$invoiceVAT=$_POST['new-proforma-vat'];
$invoicePayDay=$_POST['new-proforma-tp'];
$totalWithoutVAT=$_POST['total-fara-tva'];
$totalVAT=$_POST['total-tva'];
$invoiceTotal=$_POST['total-de-plata'];

if($moneda === "EURO-ECHIVALENT"){
    $invoiceTotal = number_format($totalDePlata * $cursEuro,2,",",".");
    $totalVAT = number_format($totalVAT * $cursEuro,2,",",".");
    $totalWithoutVAT = number_format($totalWithoutVAT * $cursEuro,2,",",".");
}
else{
    $totalWithoutVAT = number_format($totalWithoutVAT,2,",",".");;
    $totalVAT = number_format($totalVAT,2,",",".");;
    $invoiceTotal = number_format($totalDePlata,2,",",".");
}



                    


$sql = "INSERT INTO `proforme`(`client`, `nr_reg_comert`, `cod_fiscal`, `adresa_facturare`, `oras_facturare`, `judet_facturare`, `tara_facturare`, `data_factura`, `invoice_number`, `vat`, `produse`, `termen_plata`, `emitor`, `total_tva`, `total_f_tva`, `total_de_plata`,`created_by`, `status`, `persoana_delegata`, `moneda`, `curs_euro`) VALUES ('$client','".$row['nr_reg_comert']."','".$row['cod_fiscal']."','".$row['adresa_facturare']."','".$row['oras_facturare']."','".$row['judet_facturare']."','".$row['tara_facturare']."','".date("Y-m-d")."','$invoiceNumber','$invoiceVAT','$productsListJson','$invoicePayDay','$emitor','$totalTva','$totalFTva','$totalDePlata','$adminId','1','$delegat','$moneda','$cursEuro')";
mysqli_query($crmConn,$sql);

$delegat="<tr><td>
        Numele delegatului: ".$delegatArray->prenume." ".$delegatArray->nume."
        </td></tr>
        <tr><td>
        CNP: ".$delegatArray->cnp."
        </td></tr>
        <tr><td>
        CI seria ".$delegatArray->serieCi." nr. ".$delegatArray->nrCi."
        </td></tr>
        <tr><td>
        Auto nr.
        </td></tr>";

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

}

$html = '<head>
<meta charset="UTF-8">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
</head>

<style>

@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");


*{
    font-family: "Roboto", sans-serif;
    font-size: 10px;
}


</style>

<div style="display:block;height: 160px;">
'.$emitorData.'


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
<div>
    <div>
    <br><br><br>        
        <h1 style="text-align:center; font-weight: 700;font-size:24px;">Factura PROFORMA</h1>
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
                    <td style="text-align:center">'.$invoiceNumber.'</td>
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
            <table style="margin:0 0 0 auto;width:60%">
                <tbody>
                    
                    <tr>
                        <td style="font-weight: 700;font-size:12px">Total de plata</td>
                        <td style="text-align:right;font-weight: 700;font-size:12px">'.$invoiceTotal.'</td>
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


$dompdf -> loadHtml($html, 'UTF-8');


$dompdf -> setPaper('A4', 'portrait');

$dompdf -> render();

// $dompdf -> stream("test",array("Attachement"=>0));
$output = $dompdf->output();
if(file_put_contents('../../../clients-resources/'.$client.'/proforms/'.$invoiceNumber.'.pdf',$output)){
    echo '{"status":"success"}';
}
else{
    echo '{"status":"fail","error":"file error"}';
}


