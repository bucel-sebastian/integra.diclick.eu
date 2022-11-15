const url = new URL (document.URL);
const param = new URLSearchParams(url.search);
let roleId = param.get("id");
document.getElementById("role-id").value=roleId;

fetch("/admin/admin-includes/get-departments.php").then(response=>response.json()).then(response=>{
    document.getElementById("role-department").innerHTML="";
    for(i=1;i<response.length;i++){
        document.getElementById("role-department").innerHTML+="<option value='"+response[i].id+"'>"+response[i].nume+"</option>"
    }
})

let editRoleForm = document.getElementById("edit-role-form");
editRoleForm.addEventListener("submit",e=>{
    e.preventDefault();
    startLoading();

    const data = new FormData();

    for(const p of new FormData(editRoleForm)){
        data.append(p[0],p[1]);
    }

    fetch("/admin/admin-includes/edit-role.php",{
        method:"POST",
        body:data
    }).then(response=>response.json()).then(response=>{
        console.log(response);
        if(response.status==="success"){
            successPopUp("Rolul a fost modificat cu succes!");

        }
        else{
            failPopUp(response.error);
        }
        stopLoading();

    })
})

fetchRoleInfo(roleId);

function fetchRoleInfo(id){
    console.log(id);
    fetch("/admin/admin-includes/get-roles.php?id="+id).then(response=>response.json()).then(response=>{
        console.log(response);
        document.getElementById("role-name").value=response.nume;
        document.getElementById("role-department").value=response.departament;
        let permissions = response.permissions.replaceAll('\'','"');
        permissions=JSON.parse(permissions);
        console.log(permissions);
        for(i=0;i<permissions.length;i++){

            


            if(permissions[i]==="add role"){
                document.getElementById("perm-add-role").checked=true;
            }
            if(permissions[i]==="edit role"){
                document.getElementById("perm-edit-role").checked=true;
            }
            if(permissions[i]==="delete role"){
                document.getElementById("perm-delete-role").checked=true;
            }
            if(permissions[i]==="add admin account"){
                document.getElementById("perm-add-admin-account").checked=true;
            }
            if(permissions[i]==="edit admin account"){
                document.getElementById("perm-edit-admin-account").checked=true;
            }
            if(permissions[i]==="add admin role"){
                document.getElementById("perm-edit-admin-role").checked=true;
            }
            if(permissions[i]==="delete admin account"){
                document.getElementById("perm-delete-admin-account").checked=true;
            }
            if(permissions[i]==="add client account"){
                document.getElementById("perm-add-client-account").checked=true;
            }
            if(permissions[i]==="edit client account"){
                document.getElementById("perm-edit-client-account").checked=true;
            }
            if(permissions[i]==="delete client account"){
                document.getElementById("perm-delete-client-account").checked=true;
            }
            if(permissions[i]==="view media plan"){
                document.getElementById("perm-view-mp").checked=true;
            }
            if(permissions[i]==="add media plan"){
                document.getElementById("perm-add-mp").checked=true;
            }
            if(permissions[i]==="edit media plan"){
                document.getElementById("perm-edit-mp").checked=true;
            }
            if(permissions[i]==="delete media plan"){
                document.getElementById("perm-delete-mp").checked=true;
            }
            if(permissions[i]==="write comments media plan"){
                document.getElementById("perm-write-com-mp").checked=true;
            }
            if(permissions[i]==="remove comments media plan"){
                document.getElementById("perm-remove-com-mp").checked=true;
            }
            if(permissions[i]==="crm view all clients"){
                document.getElementById("perm-crm-view-all-clients").checked=true;
            }
            if(permissions[i]==="crm view client file"){
                document.getElementById("perm-crm-view-client-file").checked=true;
            }
            if(permissions[i]==="crm view all data client file"){
                document.getElementById("perm-crm-view-client-file-full").checked=true;
            }
            if(permissions[i]==="crm edit client file"){
                document.getElementById("perm-crm-edit-client-file").checked=true;
            }
            if(permissions[i]==="crm view proforms"){
                document.getElementById("perm-crm-view-proforms").checked=true;
            }
            if(permissions[i]==="crm generate proforms"){
                document.getElementById("perm-crm-generate-proforms").checked=true;
            }
            if(permissions[i]==="crm send proforms"){
                document.getElementById("perm-crm-send-proforms").checked=true;
            }
            if(permissions[i]==="crm view invoices"){
                document.getElementById("perm-crm-view-invoices").checked=true;
            }
            if(permissions[i]==="crm generate invoices"){
                document.getElementById("perm-crm-generate-invoices").checked=true;
            }
            if(permissions[i]==="crm send invoices"){
                document.getElementById("perm-crm-send-invoices").checked=true;
            }
        }
    })
}




function closePopUp(id){
    if(document.getElementById(id)){
        document.getElementById(id).style.opacity="0";
        document.getElementById(id).style.transform="translateY(-15px)";
        setTimeout(()=>{
            document.getElementById(id).parentNode.removeChild(document.getElementById(id));
        },
        200);
    }
}

function successPopUp(message){
    let el= document.createElement("div");
    let notifId="notif-"+Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
    el.setAttribute("class","success-notif");
    el.setAttribute("id",notifId);
    el.style.opacity="0";
    el.style.transform="translateY(15px)";
    el.innerHTML='<div class="btns-box"> <span>Success</span> <div onclick=\'closePopUp(\"'+notifId+'\")\' class="close-popup-btn"> <i class="fa-solid fa-xmark"></i> </div> </div> <p>'+message+'</p>';
    document.getElementById("notification-corner").appendChild(el);

    setTimeout(()=>{
        document.getElementById(notifId).style.opacity="1";
        document.getElementById(notifId).style.transform="translateY(0)"; 
    },25);
    setTimeout(()=>{
        closePopUp(notifId);
    },10000);
}

function failPopUp(error){
    let el= document.createElement("div");
    let notifId="notif-"+Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
    el.setAttribute("class","fail-notif");
    el.setAttribute("id",notifId);
    el.style.opacity="0";
    el.style.transform="translateY(15px)";
    el.innerHTML='<div class="btns-box"> <span>Fail</span> <div onclick=\'closePopUp(\"'+notifId+'\")\' class="close-popup-btn"> <i class="fa-solid fa-xmark"></i> </div> </div><p>'+error+'</p>';
    document.getElementById("notification-corner").appendChild(el);
    setTimeout(()=>{
        document.getElementById(notifId).style.opacity="1";
        document.getElementById(notifId).style.transform="translateY(0)"; 
    },25);
    setTimeout(()=>{
        closePopUp(notifId);
    },10000);
}
function startLoading(){
    document.getElementById("loading-screen").style.display='flex';
    setTimeout(()=>{
        document.getElementById("loading-screen").style.opacity='1';
    },50);

}
function stopLoading(){
    document.getElementById("loading-screen").style.opacity='0';
    setTimeout(()=>{
        document.getElementById("loading-screen").style.display='none';
    },200);
}

function deleteRole(){
    if(confirm("Sigur doresti sa stergi acest rol?")){
        startLoading();

        fetch("/admin/admin-includes/delete-role.php?id="+roleId).then(response=>response.json()).then(response=>{
            if(response.status==="success"){
                successPopUp("Acest rol a fost sters! Vei fi redirectionat in cateva momente.");
                setTimeout(()=>{
                    window.location.href = "/admin/roles/";
                },1000);
            }
            else{
                failPopUp(response.error);
            }
        })

        stopLoading();
    }
}