<?php

session_start();

error_reporting(0);

if(isset($_SESSION['username']) && isset($_SESSION['role'])){
    if($_SESSION['role']==="admin"){
        echo "administrator";
    }
    else if($_SESSION['role']==="Owner"){
        echo "administrator";
    }
    else{
        echo "Client";
    }
}
else{
    echo "notLoggedIn";
}

?>