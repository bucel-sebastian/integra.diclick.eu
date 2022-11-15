<?php
include 'includes/dbh.inc.php';
session_start();
error_reporting(0);
if(isset($_SESSION['unicId']) && isset($_SESSION['role'])){
    $role=$_SESSION['role'];
    if($role==="admin"){
        echo '{"role":"admin","id":"'.$_SESSION['unicId'].'"}';
    }
    else if($role==="Owner"){
        echo '{"role":"owner"}';
    }
}
?>