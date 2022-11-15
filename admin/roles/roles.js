let addRole=false;
let editRole=false;
let delRole=false;

checkRole();

function checkRole(){
    console.log("Check role");
    fetch("/admin/admin-includes/role-check.php").then(response=>response.json()).then(response=>{
        console.log("Role checked");
        console.log(response);
        for(i=0;i<response.length;i++){
            if(response[i]==="add role"){
                addRole=true;
            }
            
            if(response[i]==="edit role"){
                editRole=true;
                
            }
            if(response[i]==="delete role"){
                delRole=true;
                
            }
        }
        if(!addRole){
            document.getElementById("add-role-btn").style.display="none";
            document.getElementById("add-role-btn").parentNode.removeChild(document.getElementById("add-role-btn"));
        }
        fetchRoles();
    });
}






function fetchRoles(){
    fetch("/admin/admin-includes/get-roles.php").then(response=>response.json()).then(response=>{
        console.log(response);
        document.getElementById("roles-table-content").innerHTML="";
        for(i=1;i<response.length;i++){
            let permissions="";
            let permissionsJSON =JSON.parse(response[i].permissions.replaceAll('\'','"'));
            console.log(permissionsJSON);
            for(j=0;j<permissionsJSON.length;j++){
                if(j===0){
                    permissions+=permissionsJSON[j];
                }
                else{
                    permissions+=", "+permissionsJSON[j];
                }
            }
            if(response[i].superuser==="1"){
                document.getElementById("roles-table-content").innerHTML+="<tr> <td> "+response[i].nume+" </td><td></td> <td> "+permissions+" </td> <td> <div class='crm-action-box-btns'> </td> </tr>";
            }
            else{
                if(editRole){
                    editRoleBtn="<a href='/admin/roles/role/?id="+response[i].id+"' class='crm-btn' style='background-color:#dea336;text-decoration: none;' title='Modifica rol'> <i class='fa-solid fa-pen-to-square'></i> </a>";
                }
                else{
                    editRoleBtn="";
                }
                if(delRole){
                    delRoleBtn="<div onclick='deleteRole(\""+response[i].id+"\")' class='crm-btn' style='background-color:#d94e47' title='Sterge rol'> <i class='fa-solid fa-trash-can'></i> </div>";
                }
                else{
                    delRoleBtn="";
                }
                document.getElementById("roles-table-content").innerHTML+="<tr> <td> "+response[i].nume+" </td><td style='text-transform:capitalize'>"+response[i].departament+"</td> <td> "+permissions+" </td> <td> <div class='crm-action-box-btns'> "+editRoleBtn+" "+delRoleBtn+"  </div> </td> </tr>";
            }
            
        }
    })
}



function deleteRole(id){
    if(confirm("Sigur doresti sa stergi acest rol?")){
        startLoading();

        fetch("/admin/admin-includes/delete-role.php?id="+id).then(response=>response.json()).then(response=>{
            if(response.status==="success"){
                successPopUp("Rolul a fost sters.");
                fetchRoles();
            }
            else{
                failPopUp(response.error);
            }
            stopLoading();
        })
    }
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