<?php

require '../../../includes/vendor/autoload.php';

include "../../../includes/crmdbh.inc.php";
include "../../../includes/dbh.inc.php";


use Dompdf\Dompdf;

$dompdf = new Dompdf();
$options=$dompdf->getOptions();
$options->set('isRemoteEnabled', true);
$dompdf->setOptions($options);

$xmlData = json_decode($_POST['xmlData']);
$invoiceId = $xmlData[0]->RegistrationName." ".$xmlData[0]->InvoiceId;

$sql = "SELECT * FROM `xml_invoices` WHERE `invoiceId`='$invoiceId'";
// echo $sql;
$result = mysqli_query($crmConn,$sql);
if(mysqli_num_rows($result)>0){
    $row=mysqli_fetch_assoc($result);
    echo '{"status":"fail","error":"Factura deja există","file":"'.$row['file'].'"}';
    die;
}

$aSide = $xmlData[0];
$bSide = $xmlData[1];
$products = $xmlData[2];


$emitorData = '<div  style="display:inline-block;float:left;width:40%;background-color:$050505;vertical-align:top">
<p style="margin:0;font-weight:700;font-size:12px">'.$aSide->RegistrationName.'</p>
<p style="margin:0">Nr. Reg. Comertului: '.$aSide->CompanyIDJ.'</p>
<p style="margin:0">Cod Fiscal: '.$aSide->CompanyID.'</p>
<p style="margin:0">Adresa: '.$aSide->StreetName.' '.$aSide->AdditionalStreetName.'</p>
<p style="margin:0">'.$aSide->CityName.'</p>
</div>';

$invoiceTableData = "";
$totalWithoutVAT=0;
$totalVAT=0;

for($i=0;$i<count($products);$i++){
    $invoiceTableData.='<tr>
    <td style="border:2px solid #000;padding: 2px 5px;border-collapse:collapse;">'.$products[$i]->id.'</td>
    <td style="border:2px solid #000;padding: 2px 5px;border-collapse:collapse;">'.$products[$i]->name.'</td>
    <td style="border:2px solid #000;padding: 2px 5px;border-collapse:collapse;text-align:center;">'.$products[$i]->quantity.'</td>
    <td style="border:2px solid #000;padding: 2px 5px;border-collapse:collapse;text-align:center;">'.$products[$i]->price.'</td>
    <td style="border:2px solid #000;padding: 2px 5px;border-collapse:collapse;text-align:center;">'.($products[$i]->quantity*$products[$i]->price).'</td>
    <td style="border:2px solid #000;padding: 2px 5px;border-collapse:collapse;text-align:center;">'.($products[$i]->quantity*(($products[$i]->price*$products[$i]->tva)/100)).'</td>
</tr>';

$totalWithoutVAT+=$products[$i]->quantity*$products[$i]->price;
$totalVAT+=$products[$i]->quantity*(($products[$i]->price*$products[$i]->tva)/100);                    
}
$invoiceTotal = $totalWithoutVAT + $totalVAT;


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
                <td>'.$bSide->RegistrationName.'</td>
            </tr>
            <tr>
                <td style="text-align:right;width:70px;">Nr. Reg. Com.</td>
                <td style="">'.$bSide->CompanyIDJ.'</td>
            </tr>
            <tr>
                <td style="text-align:right">Cod Fiscal</td>
                <td>'.$bSide->CompanyID.'</td>
            </tr>
            <tr>
                <td style="text-align:right">Adresa</td>
                <td>'.$bSide->StreetName.' '.$bSide->AdditionalStreetName.'</td>
            </tr>
            <tr>
                <td style="text-align:right">Oras</td>
                <td>'.$bSide->CityName.'</td>
            </tr>
            
            
        </tbody>
    </table>
</div>
</div>
<div>
    <div>
    <br><br><br>        
        <h1 style="text-align:center; font-weight: 700;font-size:24px;">Factura</h1>
        <br>
    </div>
    <div>
        <table style="margin:0 auto;">
            <tbody>
                <tr>
                    <td>Data facturii</td>
                    <td style="text-align:center">'.$aSide->IssueDate.'</td>
                </tr>
                <tr>
                    <td>Numar factura</td>
                    <td style="text-align:center">'.$aSide->InvoiceId.'</td>
                </tr>
                
            </tbody>
        </table>
    </div>
</div>
<div style="">
        <table style="border-collapse:collapse;width:100%">
            <thead>
                <tr style="border:2px solid #000;border-collapse:collapse; width: 100%;">
                    <th style="border:2px solid #000;padding: 2px 5px;border-collapse:collapse;">Nr. Crt.</th>
                    <th style="border:2px solid #000;padding: 2px 45px 2px 5px;border-collapse:collapse;text-align: left;">Denumirea produselor sau serviciilor</th>
                    <th style="border:2px solid #000;padding: 2px 5px;border-collapse:collapse;">Cantitatea</th>
                    <th style="border:2px solid #000;padding: 2px 5px;border-collapse:collapse;">Pret Unitar fara TVA</th>
                    <th style="wborder:2px solid #000;border-collapse:collapse;padding: 2px 5px;">Valoare fara TVA</th>
                    <th style="border:2px solid #000;padding: 2px 5px;border-collapse:collapse;">Valoare TVA</th>
                </tr>
            </thead>
            <tbody>

                '.$invoiceTableData.'
                
                
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style="text-align:right;font-weight: 700;">Total</td>
                    <td style="border:2px solid #000;font-weight: 700;text-align:right;">'.$totalWithoutVAT.'</td>
                    <td style="border:2px solid #000;font-weight: 700;text-align:right;">'.$totalVAT.'</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div style="">
        
    
    
    </div>
    <div>
        
    </div>

    <div style="height:100px;">
        
        <div style="display:inline-block;width:100%;vertical-align:top">
            <table style="margin:0 0 0 auto;width:30%">
                <tbody>
                    
                    <tr>
                        <td style="font-weight: 700;font-size:12px">Total de plata</td>
                        <td style="text-align:right;font-weight: 700;font-size:12px">'.$invoiceTotal.'</td>
                    </tr>
                        
                    
                </tbody>
            </table>
                    
        </div>
    </div>';


$dompdf -> loadHtml($html, 'UTF-8');
$dompdf -> setPaper('A4', 'portrait');

$dompdf -> render();

// $dompdf -> stream("test",array("Attachement"=>0));
$output = $dompdf->output();
if(file_put_contents('../../../clients-resources/intern/'.$aSide->InvoiceId.'.pdf',$output)){
    $date = date("Y-m-d");
    $sql = "INSERT INTO `xml_invoices` (`invoiceId`, `xml_data`, `file`, `date`) VALUES ('".$aSide->RegistrationName." ".$aSide->InvoiceId."','".json_encode($xmlData)."','".$aSide->InvoiceId.".pdf','$date')";
    if(mysqli_query($crmConn,$sql)){
        echo '{"status":"success"}';
    }
    else{
        echo '{"status":"fail","error":"'.$crmConn->error.'"}';
    }

}
else{
    echo '{"status":"fail","error":"file error"}';
}

