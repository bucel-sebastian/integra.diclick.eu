let roleType= document.getElementById("page-role-type").dataset.roletype;

fetch("/admin/admin-includes/role-check.php").then(response=>response.text()).then(response=>{
    console.log(response);
})