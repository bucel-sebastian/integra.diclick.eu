<?php

    include "../../includes/dbh.inc.php";
    include "../../includes/updatesdbh.inc.php";
    include "../../includes/tasksdbh.inc.php";
    include "../../includes/mediaplandbh.inc.php";

    session_start();

    error_reporting(0);
    
    if(isset($_SESSION['username']) && isset($_SESSION['role']) && ($_SESSION['role']==='admin' || $_SESSION['role'] === 'Owner')){
        $unicId= $_GET['unicId'];
        $sql = "DELETE FROM `users` WHERE `unicId` = '$unicId'";
        $result = mysqli_query($conn,$sql);
        if($result){
            $sql ="DROP TABLE $unicId";
            $result2 = mysqli_query($conn,$sql);
            if($result2){
                $updUnicId = $unicId."_updates";
                $sql ="DROP TABLE $updUnicId";
                $result3 = mysqli_query($updsConn,$sql);
                if($result3){
                    $sql="DROP TABLE $unicId";
                    $result4=mysqli_query($tasksConn,$sql);
                    if($resul4){
                        $sql = "DROP TABLE $mpUnicId";
                        $result5=mysqli_query($mpConn,$sql);
                        if($result5){
                            echo "success";
                        }
                        else{
                            echo "fail 5";
                        }
                    }
                    else{
                        echo "fail 4".$tasksConn->error;
                    }
                }
                else{
                    echo "fail 3";
                }
            }
            else{
                echo "fail 2";
            }
        }
        else{
            echo $conn->error;
        }
    }
    else{
        echo "not isset";
    }

?>