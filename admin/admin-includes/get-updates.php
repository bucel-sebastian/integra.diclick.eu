<?php

    include "../../includes/dbh.inc.php";
    include "../../includes/updatesdbh.inc.php";

    session_start();

    error_reporting(0);

    if(isset($_GET['unicId'])){
        $unicId=$_GET['unicId'];
        $unicIdUpds=$unicId;
        $unicIdUpds.="_updates";
        $sql = "SELECT * FROM `$unicIdUpds` ORDER BY date DESC";
        $result = mysqli_query($updsConn,$sql);
        while($row = mysqli_fetch_assoc($result)){
            $out= "<tr class='updates-row'><td class='date-col'>".$row["date"]."</td><td class='desc-col'><p>";
            $descriptionText = "";
            for($i=0;$i<strlen($row['description']);$i++){
                if($row['description'][$i]==="\n"){
                    $descriptionText.="<br>";
                }
                else{
                    $descriptionText.=$row['description'][$i];
                }
            }
            $out.=$descriptionText."</p><div class='update-files'>";
            
            $files = $row['file'];
            
            $j=0;
            $realFile=NULL;
            $fileName=NULL;
            $fileTmpName=NULL;
            
            for($i=0;$i<strlen($files);$i++){
                $realFile[$j];
                if($files[$i]==="\n"){
                    $j++;
                }
                else{
                    $realFile[$j].=$files[$i];
                }        
            }

            $numFiles=$j;
            
            for($i=0;$i<=$numFiles;$i++){
                $endName=0;
                for($j=strlen($realFile[$i]);$j>=0;$j--){
                    if($endName!=1){
                        if($realFile[$i][$j]==="/"){
                            $endName=1;
                        }
                        else{
                            $fileTmpName[$i].=$realFile[$i][$j];
                        }
                    }
                }
            }

            for($i=0;$i<=$numFiles;$i++){
                for($j=strlen($fileTmpName[$i]);$j>=0;$j--){
                    $fileName[$i].=$fileTmpName[$i][$j];
                }
            }

            for($i=0;$i<=$numFiles;$i++){
                
                if(strpos($realFile[$i],'.pdf')){
                    $out.= "<div><a class='updates-download-link' href='../../user/updates/".$realFile[$i]."' download><i class='fas fa-file-pdf'></i></a><span>".$fileName[$i]."</span></div>";
                }
                else if(strpos($realFile[$i],'.png')||strpos($realFile[$i],'.jpeg') || strpos($realFile[$i],'.jpg')){
                    $out.="<div><a class='updates-download-link' href='../../user/updates/".$realFile[$i]."' download><i class='fas fa-file-image'></i></a><span>".$fileName[$i]."</span></div>";    
                }
                else if(strpos($realFile[$i],'.xlsx')){
                    $out.="<div><a class='updates-download-link' href='../../user/updates/".$realFile[$i]."' download><i class='fas fa-file-excel'></i></a><span>".$fileName[$i]."</span></div>";
                }
                else if($realFile[$i]!=""){
                    $out.="<div><a class='updates-download-link' href='../../user/updates/".$realFile[$i]."' download><i class='fas fa-file-alt'></i></a><span>".$fileName[$i]."</span></div>";
                }
            }
            $out.="</div></td><td><div class='btns' onclick='openEditUpd(\"".$row['id']."\",\"".$unicIdUpds."\")'><i class='fas fa-edit'></i></div><div class='btns' onclick='deleteUpd(\"".$row['id']."\",\"".$unicIdUpds."\")'><i class='fas fa-trash'></i></div></td></tr>";
            echo $out;
        }
    }





?>