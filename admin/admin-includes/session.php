<?php

session_start();

error_reporting(0);

if(isset($_SESSION['user-data'])){
    $userData=$_SESSION['user-data'];

    if($userData->tip==="admin"){
        echo '{"status":"loggedIn","tip":"admin"}';
    }
    else if($userData->tip==="client"){
        echo '{"status":"loggedIn","tip":"client"}';
    }
}
else{
    echo '{"status":"notLoggedIn"}';
}

?>