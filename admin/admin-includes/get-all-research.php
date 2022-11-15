<?php

include '../../includes/dbh.inc.php';

$array = array();

$sql = "SELECT * FROM `research`";
$result = mysqli_query($conn,$sql);
if($result){
    while($row = mysqli_fetch_assoc($result)){
        array_push($array,array("unicId"=>$row['unicId'],
                                "agentieImplementare"=>$row['agentie_implementare'],
                                "companie"=>$row['companie'],
                                "brand"=>$row['brand'],
                                "tipPromotie"=>$row['tip_promotie'],
                                "premii"=>$row['premii'],
                                "valoarePremii"=>$row['valoare_premii'],
                                "tipPremiere"=>$row['tip_premiere'],
                                "promovare"=>$row['promovare'],
                                "categorie"=>$row['categorie'],
                                "subcategorie"=>$row['subcategorie'],
                                "denumirePromotie"=>$row['denumire_promotie'],
                                "slogan"=>$row['slogan'],
                                "dataStart"=>$row['data_start'],
                                "dataSfarsit"=>$row['data_sfarsit'],
                                "mecanism"=>$row['mecanism'],
                                "fisiereAtasate"=>$row['fisiere_atasate'],
                                "comentarii"=>$row['comentarii'],
        ));
    }
 
}
echo json_encode($array);
?>