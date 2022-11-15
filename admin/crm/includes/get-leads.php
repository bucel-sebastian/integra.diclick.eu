<?php

include "../../../includes/crmdbh.inc.php";

$sql = "SELECT * FROM `leads`";

$array = array();

$result = mysqli_query($crmConn,$sql);
if($result){
    while($row=mysqli_fetch_assoc($result)){
        array_push($array,array("unicId"=>$row['unicId'],"source"=>$row['source'],"name"=>$row['name'],"company"=>$row['company'],"phone"=>$row['phone'],"email"=>$row['email'],"website"=>$row['website'],"message"=>$row['message'],"salesTarget"=>$row['sales_target'],"objective"=>$row['objective'],"buget"=>$row['buget'],"status"=>$row['status'],"clientFile"=>$row['client_file']));
    }
}

echo json_encode($array);