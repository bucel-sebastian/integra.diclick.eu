<?php

include "../../includes/dbh.inc.php";

$sql="SELECT * FROM `admin_notifications` ORDER BY date DESC";
$result=mysqli_query($conn,$sql);

if($result){
    $rows= mysqli_num_rows($result);
    echo '[{"numRes":"'.$rows.'"}';
    while($row=mysqli_fetch_assoc($result)){
        echo ',{"id":"'.$row['id'].'","client":"'.$row['client'].'","text":"'.$row['text'].'","date":"'.$row['date'].'"}';

        // echo "<div class='notif-container'>
        // <div class='notif-left'>
        //         <h3>
        //             ".$row['text']."
        //         </h3>
        //         <p>
        //             ".$row['client']."
        //         </p>
        //         <span>
        //             ".$row['date']."
        //         </span>
        //     </div>
        //     <div class='notif-right'>
        //         <div class='btns-box' onclick='delNotif(".$row['id'].")'>
        //             <i class='fas fa-times'></i>
        //         </div>
        //     </div>
        // </div>";
    }
    echo "]";
}