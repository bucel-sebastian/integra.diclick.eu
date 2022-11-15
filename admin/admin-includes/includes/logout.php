<?php

session_start();

session_destroy();
$_SESSION['username']=null;
$_SESSION['role']=null;
$_SESSION['unicId']=null;
echo "logout-success";

?>