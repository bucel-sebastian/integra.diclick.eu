<?php


include "../../includes/dbh.inc.php";

    session_start();

    error_reporting(0);

    echo "macar incepe?";

    if(isset($_SESSION['user-data']) && $_SESSION['user-data']->tip==="admin"){

        $unicId = $_GET['unicId'];
        $array=array();

        $sql="SELECT * FROM `admin_users` WHERE `unicId` ='$unicId'";
        $result=mysqli_query($conn,$sql);
        if($result){
            if(mysqli_num_rows($result)===1){
                $row = mysqli_fetch_assoc($result);

                array_push($array,array("nume"=>$row['nume'],"prenume"=>$row['prenume'],"username"=>$row['username'],"email"=>$row['email'],"telefon"=>$row['telefon'],"functie"=>$row['functie']));
            }
        }

        echo json_encode($array);
    }
    else{
        echo "nu intra";
    }


?>