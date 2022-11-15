<?php

include "../../includes/dbh.inc.php";
include "../../includes/mediaplandbh.inc.php";

session_start();
error_reporting(0);

if(isset($_SESSION['unicId']) && isset($_SESSION['role'])){
    
        $sql = "SELECT * FROM `users` where `role`='client' ORDER BY `name` ASC";
        $result = mysqli_query($conn,$sql);
        while($row=mysqli_fetch_assoc($result)){
            $unicId=$row['unicId'];
            $sql2="SELECT * FROM `$unicId`";
            $result2=mysqli_query($conn,$sql2);
            while($rows=mysqli_fetch_assoc($result2)){
                $company=$rows['company'];
            }
            echo $row['name']."_".$company."_".$unicId."\n";
        
    }
}