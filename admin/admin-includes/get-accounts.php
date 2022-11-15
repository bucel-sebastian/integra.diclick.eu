<?php

    include "../../includes/dbh.inc.php";

    session_start();

    error_reporting(0);

    $sql = "SELECT * FROM `users` ORDER BY role ASC";
    $result = mysqli_query($conn,$sql);
    $id=1;
    while($row = mysqli_fetch_assoc($result)){
        $password="";
        for($i=0;$i<strlen($row['password']);$i++){
            $password.="*";
        }
        $out = "<tr class='accounts-row'>
            <td class='id-col accounts-col'>".$id."</td>
            <td class='unicId-col accounts-col'>".$row['unicId']."</td>
            <td class='name-col accounts-col'>".$row['name']."</td>
            <td class='company-col accounts-col'>".$row['company']."</td>
            <td class='username-col accounts-col'>".$row['username']."</td>
            <td class='password-col accounts-col'>".$password."</td>
            <td class='role-col accounts-col'>".$row['role']."</td>
            <td class='edit-col accounts-col'><div class='btns'><i onclick='editAccount(\"".$row['unicId']."\")' class='fas fa-edit'></i></div></td>
            <td class='delete-col accounts-col'><div class='btns'><i onclick='deleteAccount(\"".$row['unicId']."\")' class='fas fa-trash-alt'></i></div></td></tr>";
        echo $out;
        $id++;
    }

?>