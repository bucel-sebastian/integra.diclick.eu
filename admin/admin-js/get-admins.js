let adminList = [];

let addAdminAcc=false;
let editAdminAcc=false;
let deleteAdminAcc=false;
let editAdminRole=false;
let createAccForm = document.getElementById("create-account-form");

let newAccLink = "/admin/admin-includes/new-account.php";
let checkAccLink = "/admin/admin-includes/check-account.php";
checkRole();
fetchRoles();


function fetchRoles(){
    fetch("/admin/admin-includes/get-roles.php").then(response=>response.json()).then(response=>{
        console.log(response);
        for(i=1;i<response.length;i++){
            document.getElementById("edit-role-role").innerHTML+="<option value='"+response[i].id+"'>"+response[i].nume+"</option>";
            document.getElementById("new-account-role").innerHTML+="<option value='"+response[i].id+"'>"+response[i].nume+"</option>";
        }
    })
}

function checkRole(){
    fetch("/admin/admin-includes/role-check.php").then(response=>response.json()).then(response=>{
        console.log(response);
        for(i=0;i<response.length;i++){
            if(response[i]==="add admin account"){
                addAdminAcc=true;
            }
            if(response[i]==="edit admin account"){
                editAdminAcc=true;     
            }
            if(response[i]==="delete admin account"){
                deleteAdminAcc=true;
            }
            if(response[i]==="add admin role"){
                editAdminRole=true;
            }
        }
        if(!addAdminAcc){
            document.getElementById("add-admin-btn").style.display="none";
            document.getElementById("add-admin-btn").parentNode.removeChild(document.getElementById("add-admin-btn"));
        }
        fetchAdmins();
    });
}

function openNewAdmin(){
    let modal=document.getElementById('modal-new-admin');
    document.body.style.overflow="hidden";
    modal.style.display="block";
    setTimeout(()=>{
        modal.style.opacity="1";
    },50);

}

function closeNewAdmin(){
    let modal=document.getElementById('modal-new-admin');
    document.body.style.overflow="auto";
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
    },300);
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
function generatePassword(x) {
    let r = (Math.random() + 11).toString(36).substring(2);
    if (x === 1) {
        document.getElementById("new-account-client-password").value = r;
    }
    if (x === 2) {
        document.getElementById("new-account-password").value = r;
    }
}


createAccForm.addEventListener("submit", e => {
    e.preventDefault();
    startLoading();

    const data = new URLSearchParams();

    for (const p of new FormData(createAccForm)) {
        data.append(p[0], p[1]);
    }

    // fetch(checkAccLink, {
    //     method: "POST",
    //     body: data
    // }).then(response => response.text()).then(response => {
    //     console.log(response);
    //     if (response === "used") {
    //         failPopUp("used");
    //     }
    //     else {
            fetch(newAccLink, {
                method: "POST",
                body: data
            }).then(response => response.json()).then(response => {

                if (response.status === "success") {
                    console.log("success");
                    successPopUp("Admin-ul a fost adaugat cu succes!");
                    createAccForm.reset();
                    closeNewAdmin();
                }
                else {
                    console.log("fail");
                    failPopUp("");
                }
                fetchAdmins();
                stopLoading();
            })
    //     }
    // })


})





function fetchAdmins(){
    adminList = [];
    fetch("/admin/admin-includes/get-admin.php").then(response=>response.json()).then(response=>{
        console.log(response);
        document.getElementById("admins-table-body").innerHTML="";
        for(i=0;i<response.length;i++){
            adminList.push(response[i]);
            let editAdminAccBtn;
            let deleteAdminAccBtn;
            let editAdminRoleBtn;

            if(editAdminAcc){
                editAdminAccBtn="<div class='crm-btn' onclick='editAdmin(\""+response[i].id+"\")' style='background-color:#dea336' title='Modifica'> <i class='fa-solid fa-pen-to-square'></i> </div>";
            }else{
                editAdminAccBtn="";
                
            }
            if(deleteAdminAcc){
                deleteAdminAccBtn="<div class='crm-btn' onclick='deleteAdmin(\""+response[i].id+"\")' style='background-color:#d94e47'> <i class='fa-solid fa-trash-can' title='Sterge'></i> </div>";
            }else{
                deleteAdminAccBtn="";
            }
            if(editAdminRole){
                editAdminRoleBtn="<div class='crm-btn' onclick='changeRole(\""+response[i].id+"\")' style='background-color:#3daad6' title='Schimba rolul'> <i class='fa-solid fa-user-gear'></i> </div>";
            }else{
                editAdminRoleBtn="";
                
            }

            document.getElementById("admins-table-body").innerHTML+="<tr><td>"+(i+1)+"</td><td>"+response[i].nume+"</td> <td>"+response[i].role+"</td> <td> <div class='crm-action-box-btns'> "+editAdminRoleBtn+" "+editAdminAccBtn+" "+deleteAdminAccBtn+" </div> </td> </tr>";
        }
    })
}

function changeRole(id){
    fetch("/admin/admin-includes/get-admin-info.php?get-role=1&id="+id).then(response=>response.json()).then(response=>{
        console.log(response);
        document.getElementById("edit-role-role").value=response.role;
        document.getElementById("edit-role-id").value = response.id;
    })
    let modal=document.getElementById('modal-change-role');
    document.body.style.overflow="hidden";
    modal.style.display="block";
    setTimeout(()=>{
        modal.style.opacity="1";
    },50);
}

function closeChangeRole(){
    let modal=document.getElementById('modal-change-role');
    document.body.style.overflow="auto";
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
    },300);
}

let changeRoleForm = document.getElementById("change-role-form");
changeRoleForm.addEventListener("submit",e=>{
    e.preventDefault();
    startLoading();
    const data=new FormData();
    for(const p of new FormData(changeRoleForm)){
        data.append(p[0],p[1]);
    }
    fetch("/admin/admin-includes/change-admin-role.php",{
        method:"POST",
        body:data
    }).then(response=>response.json()).then(response=>{
        if(response.status==="success"){
            successPopUp("Rolul a fost modificat cu succes.");
            fetchAdmins();
            closeChangeRole();
        }
        else{
            failPopUp(response.error);
        }
        stopLoading();
    })
});


function searchInArray(adminId){
    for(i=0;i<adminList.length;i++){
        if(adminList[i].id === adminId){
            return i;
        }
    }
    return false;
}


function deleteAdmin(adminId){
    
    if(searchInArray(adminId) != false){
        deleteIndex = searchInArray(adminId);
    }
    console.log(deleteIndex);
    if(confirm("Sigur doresti sa l stergi pe "+adminList[deleteIndex].nume)){
        startLoading();
        let deleteName = adminList[deleteIndex].nume;
        fetch("/admin/admin-includes/delete-admin.php?id="+adminId).then(response=>response.json()).then(response=>{
            if(response.status==="success"){
                fetchAdmins();

                successPopUp(deleteName+" a fost șters cu succes!");
            }
            else{
                failPopUp(response.error);
            }
            stopLoading();
        });
    }
}