<?php

include "../../includes/dbh.inc.php";
include "../../includes/tasksdbh.inc.php";

$tableJson = $_POST['tableJson'];
$data = json_decode($tableJson);

// echo var_dump($data);


$tmpRow = $data[0];
for($i=0;$i<sizeof($tmpRow);$i++){
    if($tmpRow[$i]==="Categorie"){
        $indexCategorie = $i;
    }
    if($tmpRow[$i]==="Compania"){
        $indexCompanie = $i;
    }
    if($tmpRow[$i]==="Brand"){
        $indexBrand = $i;
    }
    if($tmpRow[$i]==="Denumirea promotiei"){
        $indexDenProm = $i;
    }
    if($tmpRow[$i]==="Data Start"){
        $indexDataStart = $i;
    }
    if($tmpRow[$i]==="Data Sfarsit"){
        $indexDataSfarsit = $i;
    }
    if($tmpRow[$i]==="Slogan"){
        $indexSlogan = $i;
    }
    if($tmpRow[$i]==="Mecanism"){
        $indexMecanism = $i;
    }
    if($tmpRow[$i]==="Tip promotie"){
        $indexTipPromo = $i;
    }
    if($tmpRow[$i]==="Validare"){
        $indexValidare = $i;
    }
    if($tmpRow[$i]==="Valoare Premii"){
        $indexValPremii = $i;
    }
    if($tmpRow[$i]==="Premii"){
        $indexPremii = $i;
    }

    if($tmpRow[$i]==="SMS"){
        $indexSMS = $i;
    }
    if($tmpRow[$i]==="Website"){
        $indexWebsite = $i;
    }
    if($tmpRow[$i]==="App"){
        $indexApp = $i;
    }
    if($tmpRow[$i]==="Facebook"){
        $indexFacebook = $i;
    }
    if($tmpRow[$i]==="Whatsapp"){
        $indexWhatsapp = $i;
    }
    if($tmpRow[$i]==="Clip Youtube"){
        $indexYoutube = $i;
    }
    if($tmpRow[$i] === "Instagram\r"){
        $indexInstagram = $i;
    }
    if($tmpRow[$i]==="Masina"){
        $indexMasina = $i;
    }
    if($tmpRow[$i]==="Excursie"){
        $indexExcursie = $i;
    }
}



for($i=1;$i<sizeof($data);$i++){
    $tmpRow = $data[$i];

    $categorie = "";
    $companie = "";
    $brand = "";
    $denumireProm = "";
    $dataStart = "";
    $dataSfarsit = "";
    $durataZile = "";
    $durataLuni = "";
    $slogan = "";
    $tipPromo = "";
    $premii = array();
    $valoarePremii = "";
    $tipValidare = "";
    $promovare = array();
    $mecanism = "";
    $tipPremiere = array();


    
    $categorie = $tmpRow[$indexCategorie];
    $companie = $tmpRow[$indexCompanie];
    $brand = $tmpRow[$indexBrand];
    $denumireProm = $tmpRow[$indexDenProm];
    $dataStart = $tmpRow[$indexDataStart];
    $dataSfarsit = $tmpRow[$indexDataSfarsit];
    $slogan = $tmpRow[$indexSlogan];
    $tipPromo = $tmpRow[$indexTipPromo];
    $valoarePremii = $tmpRow[$indexValPremii];
    $tipValidare = $tmpRow[$indexValidare];
    $mecanism = $tmpRow[$indexMecanism];
    $premii = array("premii"=>$tmpRow[$indexPremii],"masina"=>$tmpRow[$indexMasina],"excurise"=>$tmpRow[$indexExcursie]);
    $promovare = array("sms"=>$tmpRow[$indexSMS],"website"=>$tmpRow[$indexWebsite],"app"=>$tmpRow[$indexApp],"facebook"=>$tmpRow[$indexFacebook],"whatsapp"=>$tmpRow[$indexWhatsapp],"youtube"=>$tmpRow[$indexYoutube],"instagram"=>$tmpRow[$indexInstagram]);
    $tipPremiere = array();

    $time = strtotime($dataStart);
    $dataStart=date("Y-m-d",$time);
    $time = strtotime($dataSfarsit);
    $dataSfarsit=date("Y-m-d",$time);

    $premiiJson = json_encode($premii);
    $promovareJson = json_encode($promovare);
    $tipPremiere = json_encode($tipPremiere);
    
    // echo "INSERT INTO `research`(`companie`, `brand`, `tip_promotie`, `premii`, `valoare_premii`, `tip_premiere`, `promovare`, `categorie`, `denumire_promotie`, `slogan`, `data_start`, `data_sfarsit`, `mecanism`) VALUES ('".$companie."','".$brand."','".$tipPromo."','".$premiiJson."','".$valoarePremii."','".$tipPremiere."','".$promovareJson."','".$categorie."','".$denumireProm."','".$slogan."','".$dataStart."','".$dataSfarsit.",'".$mecanism."')\n\n";
    $sql = "SELECT * FROM `research` WHERE `denumire_promotie`='".$denumireProm."'";
    $result = mysqli_query($conn,$sql);
    if(mysqli_num_rows($result)===0){
        $sql = "INSERT INTO `research`(`companie`, `brand`, `tip_promotie`, `premii`, `valoare_premii`, `tip_premiere`, `promovare`, `categorie`, `denumire_promotie`, `slogan`, `data_start`, `data_sfarsit`, `mecanism`) VALUES ('".$companie."','".$brand."','".$tipPromo."','".$premiiJson."','".$valoarePremii."','".$tipPremiere."','".$promovareJson."','".$categorie."','".$denumireProm."','".$slogan."','".$dataStart."','".$dataSfarsit."','".$mecanism."')";
        if(!mysqli_query($conn,$sql)){
            echo '{"status":"fail","row":"'.$i.'","error":"'.$conn->error.'"}';
            die;
        }
    }
}
echo '{"status":"success"}';