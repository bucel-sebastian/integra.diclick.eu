let getUpdatesLink = "../user-includes/get-updates.php";

fetch(getUpdatesLink).then(response=>response.text()).then(response =>{
    document.getElementById("updates-table-body").innerHTML = response;
})