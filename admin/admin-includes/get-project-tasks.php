<?php 

include "../../includes/dbh.inc.php";
include "../../includes/tasksdbh.inc.php";

$localTime=date("Y-m-d");

if(isset($_GET['projectId'])){
    if($_GET['projectId']==="All"){
        $projectId=$_GET['projectId'];
        $clientId=$_GET['clientId'];
        $sql="SELECT * FROM `$clientId`";
        $out="";
        $result=mysqli_query($tasksConn,$sql);
        $i=0;
        
        if($result){
            while($row=mysqli_fetch_assoc($result)){
                $project[$i]=$row['projectId'];
                $i++;
            }
            // for($j=0;$j<$i;$j++){
            //     echo $out;
            //     $sql = "SELECT * FROM `$project[$j]` ORDER BY `endDate` ASC";
            //     $result=mysqli_query($tasksConn,$sql);
            //     if($result){
            //         while($row=mysqli_fetch_assoc($result)){
            //             $endDate=$row['endDate'];

            //             $singleFile=array(strlen($row['files']));
            //             $fileOut="";
            //             $files=$row['files'];
            //             $indexFile=0;
            //             $singleFile[$indexFile]="";
            //             for($j=0;$j<strlen($files);$j++){
            //                 if($files[$j]==="\n"){
            //                     $indexFile++;
            //                     $singleFile[$indexFile]="";
            //                 }
            //                 else{
            //                     $singleFile[$indexFile].=$files[$j];
            //                 }
            //             }

            //             for($j=0;$j<=$indexFile;$j++){
            //                 $fileName[$j]=basename($singleFile[$j]);
            //                 if(strpos(strtolower($singleFile[$j]),'.pdf')){
            //                     $fileOut.= "<div><a class='updates-download-link' href='../../user/tasks/".$singleFile[$j]."' download><i class='fas fa-file-pdf'></i></a><span>".$fileName[$j]."</span></div>";
            //                 }
            //                 else if(strpos(strtolower($singleFile[$j]),'.png')||strpos(strtolower($singleFile[$j]),'.jpeg') || strpos(strtolower($singleFile[$j]),'.jpg')){
            //                     $fileOut.="<div><a class='updates-download-link' href='../../user/tasks/".$singleFile[$j]."' download><i class='fas fa-file-image'></i></a><span>".$fileName[$j]."</span></div>";    
            //                 }
            //                 else if(strpos(strtolower($singleFile[$j]),'.xlsx')){
            //                     $fileOut.="<div><a class='updates-download-link' href='../../user/tasks/".$singleFile[$j]."' download><i class='fas fa-file-excel'></i></a><span>".$fileName[$j]."</span></div>";
            //                 }
            //                 else if($singleFile[$j]!=""){
            //                     $fileOut.="<div><a class='updates-download-link' href='../../user/tasks/".$singleFile[$j]."' download><i class='fas fa-file-alt'></i></a><span>".$fileName[$j]."</span></div>";
            //                 }

            //                 // $fileOut.="<div>".$singleFile[$j]."</div>";
            //             }
            //             if($endDate==="0000-00-00"){
            //                 if($row['status']==='0'){
            //                     $out.="<div class='task-container'><div class='task-left'><div class='task-title'><div>".$row['icon']."</div><div><h3>".$row['name']."</h3><hr><p>Status - New</p><p>By ".$row['author']."</div></div><div class='task-dates'><div>Start-date: ".$row['startDate']."</div><div class='end-date'>End-date: ".$row['endDate']."</div></div><br><div><span>Description</span><br>".$row['description']."</div><div class='update-files'>".$fileOut."</div></div><div class='task-right'><div class='task-btns'><div onclick='editTask(\"".$row['taskId']."\",\"".$projectId."\")' class='task-edit-btn'><i class='fas fa-edit'></i></div><div onclick='taskDelete(\"".$row['taskId']."\",\"".$projectId."\")' class='task-delete-btn'><i class='fas fa-trash-alt'></i></div><div class='task-comments-btn' onclick='openComments(\"".$row['taskId']."\",\"".$projectId."\")'><i class='fas fa-comments'></i></div></div><div class='task-status-btns'><div class='task-change-status-btn' onclick='changeStatus(\"".$row['taskId']."\",\"".$projectId."\",\"".$row['status']."\")'>Change status <i class='fas fa-cog'></i></div><div class='task-complete-btn' onclick='completeTask(\"".$row['taskId']."\",\"".$projectId."\")'>Mark complete <i class='fas fa-check'></i></div></div></div></div>";
            //                 }
            //                 else if($row['status']==='1'){
            //                     $out.="<div class='task-container'><div class='task-left'><div class='task-title'><div>".$row['icon']."</div><div><h3>".$row['name']."</h3><hr><p>Status - In progress</p><p>By ".$row['author']."</div></div><div class='task-dates'><div>Start-date: ".$row['startDate']."</div><div class='end-date'>End-date: ".$row['endDate']."</div></div><br><div><span>Description</span><br>".$row['description']."</div><div class='update-files'>".$fileOut."</div></div><div class='task-right'><div class='task-btns'><div onclick='editTask(\"".$row['taskId']."\",\"".$projectId."\")' class='task-edit-btn'><i class='fas fa-edit'></i></div><div onclick='taskDelete(\"".$row['taskId']."\",\"".$projectId."\")' class='task-delete-btn'><i class='fas fa-trash-alt'></i></div><div class='task-comments-btn' onclick='openComments(\"".$row['taskId']."\",\"".$projectId."\")'><i class='fas fa-comments'></i></div></div><div class='task-status-btns'><div class='task-change-status-btn' onclick='changeStatus(\"".$row['taskId']."\",\"".$projectId."\",\"".$row['status']."\")'>Change status <i class='fas fa-cog'></i></div><div class='task-complete-btn' onclick='completeTask(\"".$row['taskId']."\",\"".$projectId."\")'>Mark complete <i class='fas fa-check'></i></div></div></div></div>";
            //                 }
            //                 else if($row['status']==='2'){
            //                     $out.="<div class='task-container'><div class='task-left'><div class='task-title'><div>".$row['icon']."</div><div><h3>".$row['name']."</h3><hr><p class='red'>Status - Pending (need clarifications)</p><p>By ".$row['author']."</div></div><div class='task-dates'><div>Start-date: ".$row['startDate']."</div><div class='end-date'>End-date: ".$row['endDate']."</div></div><br><div><span>Description</span><br>".$row['description']."</div><div class='update-files'>".$fileOut."</div></div><div class='task-right'><div class='task-btns'><div onclick='editTask(\"".$row['taskId']."\",\"".$projectId."\")' class='task-edit-btn'><i class='fas fa-edit'></i></div><div onclick='taskDelete(\"".$row['taskId']."\",\"".$projectId."\")' class='task-delete-btn'><i class='fas fa-trash-alt'></i></div><div class='task-comments-btn' onclick='openComments(\"".$row['taskId']."\",\"".$projectId."\")'><i class='fas fa-comments'></i></div></div><div class='task-status-btns'><div class='task-change-status-btn' onclick='changeStatus(\"".$row['taskId']."\",\"".$projectId."\",\"".$row['status']."\")'>Change status <i class='fas fa-cog'></i></div><div class='task-complete-btn' onclick='completeTask(\"".$row['taskId']."\",\"".$projectId."\")'>Mark complete <i class='fas fa-check'></i></div></div></div></div>";
            //                 }
            //                 else{
            //                     $out.="<div class='task-container-complete'><div class='task-left'><div class='task-title'><div>".$row['icon']."</div><div><h3>".$row['name']."</h3><hr><p>Status - Completed</p><p>By ".$row['author']."</div></div><div class='task-dates'><div>Start-date: ".$row['startDate']."</div><div class='end-date'>End-date: ".$row['endDate']."</div></div><br><div><span>Description</span><br>".$row['description']."</div><div class='update-files'>".$fileOut."</div></div><div class='task-right'><div class='task-btns'><div onclick='editTask(\"".$row['taskId']."\",\"".$projectId."\")' class='task-edit-btn'><i class='fas fa-edit'></i></div><div onclick='taskDelete(\"".$row['taskId']."\",\"".$projectId."\")' class='task-delete-btn'><i class='fas fa-trash-alt'></i></div><div class='task-comments-btn' onclick='openComments(\"".$row['taskId']."\",\"".$projectId."\")'><i class='fas fa-comments'></i></div></div><div class='task-status-btns'><div class='task-uncomplete-btn' onclick='uncompleteTask(\"".$row['taskId']."\",\"".$projectId."\")'>Unmark complete <i class='fas fa-times'></i></div></div></div></div>";
            //                 }
            //             }
            //             else if($endDate<$localTime){
            //                 if($row['status']==='0'){
            //                     $out.="<div class='task-container task-overtime'><div class='task-left'><div class='task-title'><div>".$row['icon']."</div><div><h3>".$row['name']."</h3><hr><p>Status - New</p><p>By ".$row['author']."</div></div><div class='task-dates'><div>Start-date: ".$row['startDate']."</div><div class='end-date'>End-date: ".$row['endDate']."</div></div><br><div><span>Description</span><br>".$row['description']."</div><div class='update-files'>".$fileOut."</div></div><div class='task-center'><i class='fas fa-exclamation'></i></div><div class='task-right'><div class='task-btns'><div onclick='editTask(\"".$row['taskId']."\",\"".$projectId."\")' class='task-edit-btn'><i class='fas fa-edit'></i></div><div onclick='taskDelete(\"".$row['taskId']."\",\"".$projectId."\")' class='task-delete-btn'><i class='fas fa-trash-alt'></i></div><div class='task-comments-btn' onclick='openComments(\"".$row['taskId']."\",\"".$projectId."\")'><i class='fas fa-comments'></i></div></div><div class='task-status-btns'><div class='task-change-status-btn' onclick='changeStatus(\"".$row['taskId']."\",\"".$projectId."\",\"".$row['status']."\")'>Change status <i class='fas fa-cog'></i></div><div class='task-complete-btn' onclick='completeTask(\"".$row['taskId']."\",\"".$projectId."\")'>Mark complete <i class='fas fa-check'></i></div></div></div></div>";
            //                 }
            //                 else if($row['status']==='1'){
            //                     $out.="<div class='task-container task-overtime'><div class='task-left'><div class='task-title'><div>".$row['icon']."</div><div><h3>".$row['name']."</h3><hr><p>Status - In progress</p><p>By ".$row['author']."</div></div><div class='task-dates'><div>Start-date: ".$row['startDate']."</div><div class='end-date'>End-date: ".$row['endDate']."</div></div><br><div><span>Description</span><br>".$row['description']."</div><div class='update-files'>".$fileOut."</div></div><div class='task-center'><i class='fas fa-exclamation'></i></div><div class='task-right'><div class='task-btns'><div onclick='editTask(\"".$row['taskId']."\",\"".$projectId."\")' class='task-edit-btn'><i class='fas fa-edit'></i></div><div onclick='taskDelete(\"".$row['taskId']."\",\"".$projectId."\")' class='task-delete-btn'><i class='fas fa-trash-alt'></i></div><div class='task-comments-btn' onclick='openComments(\"".$row['taskId']."\",\"".$projectId."\")'><i class='fas fa-comments'></i></div></div><div class='task-status-btns'><div class='task-change-status-btn' onclick='changeStatus(\"".$row['taskId']."\",\"".$projectId."\",\"".$row['status']."\")'>Change status <i class='fas fa-cog'></i></div><div class='task-complete-btn' onclick='completeTask(\"".$row['taskId']."\",\"".$projectId."\")'>Mark complete <i class='fas fa-check'></i></div></div></div></div>";
            //                 }
            //                 else if($row['status']==='2'){
            //                     $out.="<div class='task-container task-overtime'><div class='task-left'><div class='task-title'><div>".$row['icon']."</div><div><h3>".$row['name']."</h3><hr><p class='red'>Status - Pending (need clarifications)</p><p>By ".$row['author']."</div></div><div class='task-dates'><div>Start-date: ".$row['startDate']."</div><div class='end-date'>End-date: ".$row['endDate']."</div></div><br><div><span>Description</span><br>".$row['description']."</div><div class='update-files'>".$fileOut."</div></div><div class='task-center'><i class='fas fa-exclamation'></i></div><div class='task-right'><div class='task-btns'><div onclick='editTask(\"".$row['taskId']."\",\"".$projectId."\")' class='task-edit-btn'><i class='fas fa-edit'></i></div><div onclick='taskDelete(\"".$row['taskId']."\",\"".$projectId."\")' class='task-delete-btn'><i class='fas fa-trash-alt'></i></div><div class='task-comments-btn' onclick='openComments(\"".$row['taskId']."\",\"".$projectId."\")'><i class='fas fa-comments'></i></div></div><div class='task-status-btns'><div class='task-change-status-btn' onclick='changeStatus(\"".$row['taskId']."\",\"".$projectId."\",\"".$row['status']."\")'>Change status <i class='fas fa-cog'></i></div><div class='task-complete-btn' onclick='completeTask(\"".$row['taskId']."\",\"".$projectId."\")'>Mark complete <i class='fas fa-check'></i></div></div></div></div>";
            //                 }
            //                 else{
            //                     $out.="<div class='task-container-complete'><div class='task-left'><div class='task-title'><div>".$row['icon']."</div><div><h3>".$row['name']."</h3><hr><p>Status - Completed</p><p>By ".$row['author']."</div></div><div class='task-dates'><div>Start-date: ".$row['startDate']."</div><div class='end-date'>End-date: ".$row['endDate']."</div></div><br><div><span>Description</span><br>".$row['description']."</div><div class='update-files'>".$fileOut."</div></div><div class='task-right'><div class='task-btns'><div onclick='editTask(\"".$row['taskId']."\",\"".$projectId."\")' class='task-edit-btn'><i class='fas fa-edit'></i></div><div onclick='taskDelete(\"".$row['taskId']."\",\"".$projectId."\")' class='task-delete-btn'><i class='fas fa-trash-alt'></i></div><div class='task-comments-btn' onclick='openComments(\"".$row['taskId']."\",\"".$projectId."\")'><i class='fas fa-comments'></i></div></div><div class='task-status-btns'><div class='task-uncomplete-btn' onclick='uncompleteTask(\"".$row['taskId']."\",\"".$projectId."\")'>Unmark complete <i class='fas fa-times'></i></div></div></div></div>";
            //                 }
            //             }
            //             else{
            //                 if($row['status']==='0'){
            //                     $out.="<div class='task-container'><div class='task-left'><div class='task-title'><div>".$row['icon']."</div><div><h3>".$row['name']."</h3><hr><p>Status - New</p><p>By ".$row['author']."</div></div><div class='task-dates'><div>Start-date: ".$row['startDate']."</div><div class='end-date'>End-date: ".$row['endDate']."</div></div><br><div><span>Description</span><br>".$row['description']."</div><div class='update-files'>".$fileOut."</div></div><div class='task-right'><div class='task-btns'><div onclick='editTask(\"".$row['taskId']."\",\"".$projectId."\")' class='task-edit-btn'><i class='fas fa-edit'></i></div><div onclick='taskDelete(\"".$row['taskId']."\",\"".$projectId."\")' class='task-delete-btn'><i class='fas fa-trash-alt'></i></div><div class='task-comments-btn' onclick='openComments(\"".$row['taskId']."\",\"".$projectId."\")'><i class='fas fa-comments'></i></div></div><div class='task-status-btns'><div class='task-change-status-btn' onclick='changeStatus(\"".$row['taskId']."\",\"".$projectId."\",\"".$row['status']."\")'>Change status <i class='fas fa-cog'></i></div><div class='task-complete-btn' onclick='completeTask(\"".$row['taskId']."\",\"".$projectId."\")'>Mark complete <i class='fas fa-check'></i></div></div></div></div>";
            //                 }
            //                 else if($row['status']==='1'){
            //                     $out.="<div class='task-container'><div class='task-left'><div class='task-title'><div>".$row['icon']."</div><div><h3>".$row['name']."</h3><hr><p>Status - In progress</p><p>By ".$row['author']."</div></div><div class='task-dates'><div>Start-date: ".$row['startDate']."</div><div class='end-date'>End-date: ".$row['endDate']."</div></div><br><div><span>Description</span><br>".$row['description']."</div><div class='update-files'>".$fileOut."</div></div><div class='task-right'><div class='task-btns'><div onclick='editTask(\"".$row['taskId']."\",\"".$projectId."\")' class='task-edit-btn'><i class='fas fa-edit'></i></div><div onclick='taskDelete(\"".$row['taskId']."\",\"".$projectId."\")' class='task-delete-btn'><i class='fas fa-trash-alt'></i></div><div class='task-comments-btn' onclick='openComments(\"".$row['taskId']."\",\"".$projectId."\")'><i class='fas fa-comments'></i></div></div><div class='task-status-btns'><div class='task-change-status-btn' onclick='changeStatus(\"".$row['taskId']."\",\"".$projectId."\",\"".$row['status']."\")'>Change status <i class='fas fa-cog'></i></div><div class='task-complete-btn' onclick='completeTask(\"".$row['taskId']."\",\"".$projectId."\")'>Mark complete <i class='fas fa-check'></i></div></div></div></div>";
            //                 }
            //                 else if($row['status']==='2'){
            //                     $out.="<div class='task-container'><div class='task-left'><div class='task-title'><div>".$row['icon']."</div><div><h3>".$row['name']."</h3><hr><p class='red'>Status - Pending (need clarifications)</p><p>By ".$row['author']."</div></div><div class='task-dates'><div>Start-date: ".$row['startDate']."</div><div class='end-date'>End-date: ".$row['endDate']."</div></div><br><div><span>Description</span><br>".$row['description']."</div><div class='update-files'>".$fileOut."</div></div><div class='task-right'><div class='task-btns'><div onclick='editTask(\"".$row['taskId']."\",\"".$projectId."\")' class='task-edit-btn'><i class='fas fa-edit'></i></div><div onclick='taskDelete(\"".$row['taskId']."\",\"".$projectId."\")' class='task-delete-btn'><i class='fas fa-trash-alt'></i></div><div class='task-comments-btn' onclick='openComments(\"".$row['taskId']."\",\"".$projectId."\")'><i class='fas fa-comments'></i></div></div><div class='task-status-btns'><div class='task-change-status-btn' onclick='changeStatus(\"".$row['taskId']."\",\"".$projectId."\",\"".$row['status']."\")'>Change status <i class='fas fa-cog'></i></div><div class='task-complete-btn' onclick='completeTask(\"".$row['taskId']."\",\"".$projectId."\")'>Mark complete <i class='fas fa-check'></i></div></div></div></div>";
            //                 }
            //                 else{
            //                     $out.="<div class='task-container-complete'><div class='task-left'><div class='task-title'><div>".$row['icon']."</div><div><h3>".$row['name']."</h3><hr><p>Status - Completed</p><p>By ".$row['author']."</div></div><div class='task-dates'><div>Start-date: ".$row['startDate']."</div><div class='end-date'>End-date: ".$row['endDate']."</div></div><br><div><span>Description</span><br>".$row['description']."</div><div class='update-files'>".$fileOut."</div></div><div class='task-right'><div class='task-btns'><div onclick='editTask(\"".$row['taskId']."\",\"".$projectId."\")' class='task-edit-btn'><i class='fas fa-edit'></i></div><div onclick='taskDelete(\"".$row['taskId']."\",\"".$projectId."\")' class='task-delete-btn'><i class='fas fa-trash-alt'></i></div><div class='task-comments-btn' onclick='openComments(\"".$row['taskId']."\",\"".$projectId."\")'><i class='fas fa-comments'></i></div></div><div class='task-status-btns'><div class='task-uncomplete-btn' onclick='uncompleteTask(\"".$row['taskId']."\",\"".$projectId."\")'>Unmark complete <i class='fas fa-times'></i></div></div></div></div>";
            //                 }
                            
            //             }
                       
            //         }
                    
            //     }
            // }
        }
        else{
            echo "None";
        }
    }
    else{
        $projectId= $_GET['projectId'];
        $sql = "SELECT * FROM `$projectId` ORDER BY `endDate` ASC";
        $out="";

        $result = mysqli_query($tasksConn,$sql);
        if($result){
            $i=0;
            while($row=mysqli_fetch_assoc($result)){
                $endDate=$row['endDate'];

                $singleFile=array(strlen($row['files']));
                $fileOut="";
                $files=$row['files'];
                $indexFile=0;
                $singleFile[$indexFile]="";
                for($j=0;$j<strlen($files);$j++){
                    if($files[$j]==="\n"){
                        $indexFile++;
                        $singleFile[$indexFile]="";
                    }
                    else{
                        $singleFile[$indexFile].=$files[$j];
                    }
                }

                for($j=0;$j<=$indexFile;$j++){
                    $fileName[$j]=basename($singleFile[$j]);
                    if(strpos(strtolower($singleFile[$j]),'.pdf')){
                        $fileOut.= "<div><a class='updates-download-link' href='../../user/tasks/".$singleFile[$j]."' download><i class='fas fa-file-pdf'></i></a><span>".$fileName[$j]."</span></div>";
                    }
                    else if(strpos(strtolower($singleFile[$j]),'.png')||strpos(strtolower($singleFile[$j]),'.jpeg') || strpos(strtolower($singleFile[$j]),'.jpg')){
                        $fileOut.="<div><a class='updates-download-link' href='../../user/tasks/".$singleFile[$j]."' download><i class='fas fa-file-image'></i></a><span>".$fileName[$j]."</span></div>";    
                    }
                    else if(strpos(strtolower($singleFile[$j]),'.xlsx')){
                        $fileOut.="<div><a class='updates-download-link' href='../../user/tasks/".$singleFile[$j]."' download><i class='fas fa-file-excel'></i></a><span>".$fileName[$j]."</span></div>";
                    }
                    else if($singleFile[$j]!=""){
                        $fileOut.="<div><a class='updates-download-link' href='../../user/tasks/".$singleFile[$j]."' download><i class='fas fa-file-alt'></i></a><span>".$fileName[$j]."</span></div>";
                    }

                    // $fileOut.="<div>".$singleFile[$j]."</div>";
                }
                if($endDate==="0000-00-00"){
                    if($row['status']==='0'){
                        $out.="<div class='task-container'><div class='task-left'><div class='task-title'><div>".$row['icon']."</div><div><h3>".$row['name']."</h3><hr><p>Status - New</p><p>By ".$row['author']."</div></div><div class='task-dates'><div>Start-date: ".$row['startDate']."</div><div class='end-date'>End-date: ".$row['endDate']."</div></div><br><div><span>Description</span><br>".$row['description']."</div><div class='update-files'>".$fileOut."</div></div><div class='task-right'><div class='task-btns'><div onclick='editTask(\"".$row['taskId']."\",\"".$projectId."\")' class='task-edit-btn'><i class='fas fa-edit'></i></div><div onclick='taskDelete(\"".$row['taskId']."\",\"".$projectId."\")' class='task-delete-btn'><i class='fas fa-trash-alt'></i></div><div class='task-comments-btn' onclick='openComments(\"".$row['taskId']."\",\"".$projectId."\")'><i class='fas fa-comments'></i></div></div><div class='task-status-btns'><div class='task-change-status-btn' onclick='changeStatus(\"".$row['taskId']."\",\"".$projectId."\",\"".$row['status']."\")'>Change status <i class='fas fa-cog'></i></div><div class='task-complete-btn' onclick='completeTask(\"".$row['taskId']."\",\"".$projectId."\")'>Mark complete <i class='fas fa-check'></i></div></div></div></div>";
                    }
                    else if($row['status']==='1'){
                        $out.="<div class='task-container'><div class='task-left'><div class='task-title'><div>".$row['icon']."</div><div><h3>".$row['name']."</h3><hr><p>Status - In progress</p><p>By ".$row['author']."</div></div><div class='task-dates'><div>Start-date: ".$row['startDate']."</div><div class='end-date'>End-date: ".$row['endDate']."</div></div><br><div><span>Description</span><br>".$row['description']."</div><div class='update-files'>".$fileOut."</div></div><div class='task-right'><div class='task-btns'><div onclick='editTask(\"".$row['taskId']."\",\"".$projectId."\")' class='task-edit-btn'><i class='fas fa-edit'></i></div><div onclick='taskDelete(\"".$row['taskId']."\",\"".$projectId."\")' class='task-delete-btn'><i class='fas fa-trash-alt'></i></div><div class='task-comments-btn' onclick='openComments(\"".$row['taskId']."\",\"".$projectId."\")'><i class='fas fa-comments'></i></div></div><div class='task-status-btns'><div class='task-change-status-btn' onclick='changeStatus(\"".$row['taskId']."\",\"".$projectId."\",\"".$row['status']."\")'>Change status <i class='fas fa-cog'></i></div><div class='task-complete-btn' onclick='completeTask(\"".$row['taskId']."\",\"".$projectId."\")'>Mark complete <i class='fas fa-check'></i></div></div></div></div>";
                    }
                    else if($row['status']==='2'){
                        $out.="<div class='task-container'><div class='task-left'><div class='task-title'><div>".$row['icon']."</div><div><h3>".$row['name']."</h3><hr><p class='red'>Status - Pending (need clarifications)</p><p>By ".$row['author']."</div></div><div class='task-dates'><div>Start-date: ".$row['startDate']."</div><div class='end-date'>End-date: ".$row['endDate']."</div></div><br><div><span>Description</span><br>".$row['description']."</div><div class='update-files'>".$fileOut."</div></div><div class='task-right'><div class='task-btns'><div onclick='editTask(\"".$row['taskId']."\",\"".$projectId."\")' class='task-edit-btn'><i class='fas fa-edit'></i></div><div onclick='taskDelete(\"".$row['taskId']."\",\"".$projectId."\")' class='task-delete-btn'><i class='fas fa-trash-alt'></i></div><div class='task-comments-btn' onclick='openComments(\"".$row['taskId']."\",\"".$projectId."\")'><i class='fas fa-comments'></i></div></div><div class='task-status-btns'><div class='task-change-status-btn' onclick='changeStatus(\"".$row['taskId']."\",\"".$projectId."\",\"".$row['status']."\")'>Change status <i class='fas fa-cog'></i></div><div class='task-complete-btn' onclick='completeTask(\"".$row['taskId']."\",\"".$projectId."\")'>Mark complete <i class='fas fa-check'></i></div></div></div></div>";
                    }
                    else{
                        $out.="<div class='task-container-complete'><div class='task-left'><div class='task-title'><div>".$row['icon']."</div><div><h3>".$row['name']."</h3><hr><p>Status - Completed</p><p>By ".$row['author']."</div></div><div class='task-dates'><div>Start-date: ".$row['startDate']."</div><div class='end-date'>End-date: ".$row['endDate']."</div></div><br><div><span>Description</span><br>".$row['description']."</div><div class='update-files'>".$fileOut."</div></div><div class='task-right'><div class='task-btns'><div onclick='editTask(\"".$row['taskId']."\",\"".$projectId."\")' class='task-edit-btn'><i class='fas fa-edit'></i></div><div onclick='taskDelete(\"".$row['taskId']."\",\"".$projectId."\")' class='task-delete-btn'><i class='fas fa-trash-alt'></i></div><div class='task-comments-btn' onclick='openComments(\"".$row['taskId']."\",\"".$projectId."\")'><i class='fas fa-comments'></i></div></div><div class='task-status-btns'><div class='task-uncomplete-btn' onclick='uncompleteTask(\"".$row['taskId']."\",\"".$projectId."\")'>Unmark complete <i class='fas fa-times'></i></div></div></div></div>";
                    }
                }
                else if($endDate<$localTime){
                    if($row['status']==='0'){
                        $out.="<div class='task-container task-overtime'><div class='task-left'><div class='task-title'><div>".$row['icon']."</div><div><h3>".$row['name']."</h3><hr><p>Status - New</p><p>By ".$row['author']."</div></div><div class='task-dates'><div>Start-date: ".$row['startDate']."</div><div class='end-date'>End-date: ".$row['endDate']."</div></div><br><div><span>Description</span><br>".$row['description']."</div><div class='update-files'>".$fileOut."</div></div><div class='task-center'><i class='fas fa-exclamation'></i></div><div class='task-right'><div class='task-btns'><div onclick='editTask(\"".$row['taskId']."\",\"".$projectId."\")' class='task-edit-btn'><i class='fas fa-edit'></i></div><div onclick='taskDelete(\"".$row['taskId']."\",\"".$projectId."\")' class='task-delete-btn'><i class='fas fa-trash-alt'></i></div><div class='task-comments-btn' onclick='openComments(\"".$row['taskId']."\",\"".$projectId."\")'><i class='fas fa-comments'></i></div></div><div class='task-status-btns'><div class='task-change-status-btn' onclick='changeStatus(\"".$row['taskId']."\",\"".$projectId."\",\"".$row['status']."\")'>Change status <i class='fas fa-cog'></i></div><div class='task-complete-btn' onclick='completeTask(\"".$row['taskId']."\",\"".$projectId."\")'>Mark complete <i class='fas fa-check'></i></div></div></div></div>";
                    }
                    else if($row['status']==='1'){
                        $out.="<div class='task-container task-overtime'><div class='task-left'><div class='task-title'><div>".$row['icon']."</div><div><h3>".$row['name']."</h3><hr><p>Status - In progress</p><p>By ".$row['author']."</div></div><div class='task-dates'><div>Start-date: ".$row['startDate']."</div><div class='end-date'>End-date: ".$row['endDate']."</div></div><br><div><span>Description</span><br>".$row['description']."</div><div class='update-files'>".$fileOut."</div></div><div class='task-center'><i class='fas fa-exclamation'></i></div><div class='task-right'><div class='task-btns'><div onclick='editTask(\"".$row['taskId']."\",\"".$projectId."\")' class='task-edit-btn'><i class='fas fa-edit'></i></div><div onclick='taskDelete(\"".$row['taskId']."\",\"".$projectId."\")' class='task-delete-btn'><i class='fas fa-trash-alt'></i></div><div class='task-comments-btn' onclick='openComments(\"".$row['taskId']."\",\"".$projectId."\")'><i class='fas fa-comments'></i></div></div><div class='task-status-btns'><div class='task-change-status-btn' onclick='changeStatus(\"".$row['taskId']."\",\"".$projectId."\",\"".$row['status']."\")'>Change status <i class='fas fa-cog'></i></div><div class='task-complete-btn' onclick='completeTask(\"".$row['taskId']."\",\"".$projectId."\")'>Mark complete <i class='fas fa-check'></i></div></div></div></div>";
                    }
                    else if($row['status']==='2'){
                        $out.="<div class='task-container task-overtime'><div class='task-left'><div class='task-title'><div>".$row['icon']."</div><div><h3>".$row['name']."</h3><hr><p class='red'>Status - Pending (need clarifications)</p><p>By ".$row['author']."</div></div><div class='task-dates'><div>Start-date: ".$row['startDate']."</div><div class='end-date'>End-date: ".$row['endDate']."</div></div><br><div><span>Description</span><br>".$row['description']."</div><div class='update-files'>".$fileOut."</div></div><div class='task-center'><i class='fas fa-exclamation'></i></div><div class='task-right'><div class='task-btns'><div onclick='editTask(\"".$row['taskId']."\",\"".$projectId."\")' class='task-edit-btn'><i class='fas fa-edit'></i></div><div onclick='taskDelete(\"".$row['taskId']."\",\"".$projectId."\")' class='task-delete-btn'><i class='fas fa-trash-alt'></i></div><div class='task-comments-btn' onclick='openComments(\"".$row['taskId']."\",\"".$projectId."\")'><i class='fas fa-comments'></i></div></div><div class='task-status-btns'><div class='task-change-status-btn' onclick='changeStatus(\"".$row['taskId']."\",\"".$projectId."\",\"".$row['status']."\")'>Change status <i class='fas fa-cog'></i></div><div class='task-complete-btn' onclick='completeTask(\"".$row['taskId']."\",\"".$projectId."\")'>Mark complete <i class='fas fa-check'></i></div></div></div></div>";
                    }
                    else{
                        $out.="<div class='task-container-complete'><div class='task-left'><div class='task-title'><div>".$row['icon']."</div><div><h3>".$row['name']."</h3><hr><p>Status - Completed</p><p>By ".$row['author']."</div></div><div class='task-dates'><div>Start-date: ".$row['startDate']."</div><div class='end-date'>End-date: ".$row['endDate']."</div></div><br><div><span>Description</span><br>".$row['description']."</div><div class='update-files'>".$fileOut."</div></div><div class='task-right'><div class='task-btns'><div onclick='editTask(\"".$row['taskId']."\",\"".$projectId."\")' class='task-edit-btn'><i class='fas fa-edit'></i></div><div onclick='taskDelete(\"".$row['taskId']."\",\"".$projectId."\")' class='task-delete-btn'><i class='fas fa-trash-alt'></i></div><div class='task-comments-btn' onclick='openComments(\"".$row['taskId']."\",\"".$projectId."\")'><i class='fas fa-comments'></i></div></div><div class='task-status-btns'><div class='task-uncomplete-btn' onclick='uncompleteTask(\"".$row['taskId']."\",\"".$projectId."\")'>Unmark complete <i class='fas fa-times'></i></div></div></div></div>";
                    }
                }
                else{
                    if($row['status']==='0'){
                        $out.="<div class='task-container'><div class='task-left'><div class='task-title'><div>".$row['icon']."</div><div><h3>".$row['name']."</h3><hr><p>Status - New</p><p>By ".$row['author']."</div></div><div class='task-dates'><div>Start-date: ".$row['startDate']."</div><div class='end-date'>End-date: ".$row['endDate']."</div></div><br><div><span>Description</span><br>".$row['description']."</div><div class='update-files'>".$fileOut."</div></div><div class='task-right'><div class='task-btns'><div onclick='editTask(\"".$row['taskId']."\",\"".$projectId."\")' class='task-edit-btn'><i class='fas fa-edit'></i></div><div onclick='taskDelete(\"".$row['taskId']."\",\"".$projectId."\")' class='task-delete-btn'><i class='fas fa-trash-alt'></i></div><div class='task-comments-btn' onclick='openComments(\"".$row['taskId']."\",\"".$projectId."\")'><i class='fas fa-comments'></i></div></div><div class='task-status-btns'><div class='task-change-status-btn' onclick='changeStatus(\"".$row['taskId']."\",\"".$projectId."\",\"".$row['status']."\")'>Change status <i class='fas fa-cog'></i></div><div class='task-complete-btn' onclick='completeTask(\"".$row['taskId']."\",\"".$projectId."\")'>Mark complete <i class='fas fa-check'></i></div></div></div></div>";
                    }
                    else if($row['status']==='1'){
                        $out.="<div class='task-container'><div class='task-left'><div class='task-title'><div>".$row['icon']."</div><div><h3>".$row['name']."</h3><hr><p>Status - In progress</p><p>By ".$row['author']."</div></div><div class='task-dates'><div>Start-date: ".$row['startDate']."</div><div class='end-date'>End-date: ".$row['endDate']."</div></div><br><div><span>Description</span><br>".$row['description']."</div><div class='update-files'>".$fileOut."</div></div><div class='task-right'><div class='task-btns'><div onclick='editTask(\"".$row['taskId']."\",\"".$projectId."\")' class='task-edit-btn'><i class='fas fa-edit'></i></div><div onclick='taskDelete(\"".$row['taskId']."\",\"".$projectId."\")' class='task-delete-btn'><i class='fas fa-trash-alt'></i></div><div class='task-comments-btn' onclick='openComments(\"".$row['taskId']."\",\"".$projectId."\")'><i class='fas fa-comments'></i></div></div><div class='task-status-btns'><div class='task-change-status-btn' onclick='changeStatus(\"".$row['taskId']."\",\"".$projectId."\",\"".$row['status']."\")'>Change status <i class='fas fa-cog'></i></div><div class='task-complete-btn' onclick='completeTask(\"".$row['taskId']."\",\"".$projectId."\")'>Mark complete <i class='fas fa-check'></i></div></div></div></div>";
                    }
                    else if($row['status']==='2'){
                        $out.="<div class='task-container'><div class='task-left'><div class='task-title'><div>".$row['icon']."</div><div><h3>".$row['name']."</h3><hr><p class='red'>Status - Pending (need clarifications)</p><p>By ".$row['author']."</div></div><div class='task-dates'><div>Start-date: ".$row['startDate']."</div><div class='end-date'>End-date: ".$row['endDate']."</div></div><br><div><span>Description</span><br>".$row['description']."</div><div class='update-files'>".$fileOut."</div></div><div class='task-right'><div class='task-btns'><div onclick='editTask(\"".$row['taskId']."\",\"".$projectId."\")' class='task-edit-btn'><i class='fas fa-edit'></i></div><div onclick='taskDelete(\"".$row['taskId']."\",\"".$projectId."\")' class='task-delete-btn'><i class='fas fa-trash-alt'></i></div><div class='task-comments-btn' onclick='openComments(\"".$row['taskId']."\",\"".$projectId."\")'><i class='fas fa-comments'></i></div></div><div class='task-status-btns'><div class='task-change-status-btn' onclick='changeStatus(\"".$row['taskId']."\",\"".$projectId."\",\"".$row['status']."\")'>Change status <i class='fas fa-cog'></i></div><div class='task-complete-btn' onclick='completeTask(\"".$row['taskId']."\",\"".$projectId."\")'>Mark complete <i class='fas fa-check'></i></div></div></div></div>";
                    }
                    else{
                        $out.="<div class='task-container-complete'><div class='task-left'><div class='task-title'><div>".$row['icon']."</div><div><h3>".$row['name']."</h3><hr><p>Status - Completed</p><p>By ".$row['author']."</div></div><div class='task-dates'><div>Start-date: ".$row['startDate']."</div><div class='end-date'>End-date: ".$row['endDate']."</div></div><br><div><span>Description</span><br>".$row['description']."</div><div class='update-files'>".$fileOut."</div></div><div class='task-right'><div class='task-btns'><div onclick='editTask(\"".$row['taskId']."\",\"".$projectId."\")' class='task-edit-btn'><i class='fas fa-edit'></i></div><div onclick='taskDelete(\"".$row['taskId']."\",\"".$projectId."\")' class='task-delete-btn'><i class='fas fa-trash-alt'></i></div><div class='task-comments-btn' onclick='openComments(\"".$row['taskId']."\",\"".$projectId."\")'><i class='fas fa-comments'></i></div></div><div class='task-status-btns'><div class='task-uncomplete-btn' onclick='uncompleteTask(\"".$row['taskId']."\",\"".$projectId."\")'>Unmark complete <i class='fas fa-times'></i></div></div></div></div>";
                    }
                    $i++;
                }
            }
            echo $out;
        }
        else{
            echo "None";
        }
    }
    

}



?>