<?php

include "../../includes/dbh.inc.php";

session_start();
error_reporting(0);


if(isset($_SESSION['username']) && isset($_SESSION['role']) && ($_SESSION['role']==='admin' || $_SESSION['role'] === 'Owner')){

    $permissions = array();

    $roleId=uniqid("role",false);
    $roleName = $_POST['role-name'];
    $roleDepartment = $_POST['role-department'];

    if(isset($_POST['perm-add-role'])){
        array_push($permissions,"add role");
    }

    if(isset($_POST['perm-edit-role'])){
        array_push($permissions,"edit role");
    }

    if(isset($_POST['perm-delete-role'])){
        array_push($permissions,"delete role");
    }


    if(isset($_POST['perm-add-admin-account'])){
        array_push($permissions,"add admin account");
    }
    if(isset($_POST['perm-edit-admin-account'])){
        array_push($permissions,"edit admin account");
    }
    if(isset($_POST['perm-edit-admin-role'])){
        array_push($permissions,"add admin role");
    }
    if(isset($_POST['perm-delete-admin-account'])){
        array_push($permissions,"delete admin account");
    }
    if(isset($_POST['perm-add-client-account'])){
        array_push($permissions,"add client account");
    }
    if(isset($_POST['perm-edit-client-account'])){
        array_push($permissions,"edit client account");
    }
    if(isset($_POST['perm-delete-client-account'])){
        array_push($permissions,"delete client account");
    }

    if(isset($_POST['perm-view-mp'])){
        array_push($permissions,"view media plan");
    }
    if(isset($_POST['perm-add-mp'])){
        array_push($permissions,"add media plan");
    }
    if(isset($_POST['perm-edit-mp'])){
        array_push($permissions,"edit media plan");
    }
    if(isset($_POST['perm-delete-mp'])){
        array_push($permissions,"delete media plan");
    }
    if(isset($_POST['perm-write-com-mp'])){
        array_push($permissions,"write comments media plan");
    }
    if(isset($_POST['perm-remove-com-mp'])){
        array_push($permissions,"remove comments media plan");
    }

    

    
    if(isset($_POST['perm-crm-view-all-clients'])){
        array_push($permissions,"crm view all clients");
    }
    if(isset($_POST['perm-crm-view-client-file'])){
        array_push($permissions,"crm view client file");
    }
    if(isset($_POST['perm-crm-view-client-file-full'])){
        array_push($permissions,"crm view all data client file");
    }
    if(isset($_POST['perm-crm-edit-client-file'])){
        array_push($permissions,"crm edit client file");
    }
    if(isset($_POST['perm-crm-view-proforms'])){
        array_push($permissions,"crm view proforms");
    }
    if(isset($_POST['perm-crm-generate-proforms'])){
        array_push($permissions,"crm generate proforms");
    }
    if(isset($_POST['perm-crm-send-proforms'])){
        array_push($permissions,"crm send proforms");
    }
    if(isset($_POST['perm-crm-view-invoices'])){
        array_push($permissions,"crm view invoices");
    }
    if(isset($_POST['perm-crm-generate-invoices'])){
        array_push($permissions,"crm generate invoices");
    }
    if(isset($_POST['perm-crm-send-invoices'])){
        array_push($permissions,"crm send invoices");
    }

    
    $permissionsJSON = json_encode($permissions);
    

    $sql = "INSERT INTO `admin_roles`(`roleId`, `role`, `permissions`, `superuser`, `departament`) VALUES ('$roleId','$roleName','$permissionsJSON','0','$roleDepartment')";
    if(mysqli_query($conn,$sql)){
        echo '{"status":"success"}';
    }
    else{
        echo '{"status":"fail","error":"'.$conn->error.'"}';

    }
}