fetch("/admin/admin-includes/get-departments.php").then(response=>response.json()).then(response=>{
    document.getElementById("role-department").innerHTML="";
    for(i=1;i<response.length;i++){
        document.getElementById("role-department").innerHTML+="<option value='"+response[i].id+"'>"+response[i].nume+"</option>"
    }
})


let newRoleForm = document.getElementById("new-role-form");
newRoleForm.addEventListener("submit",e=>{
    e.preventDefault();

    const data = new FormData();
    for(const p of new FormData(newRoleForm)){
        data.append(p[0],p[1]);
    }

    fetch("/admin/admin-includes/new-role.php",{
        method:"POST",
        body:data
    }).then(response=>response.json()).then(response=>{
        console.log(response);
        if(response.status==="success"){
            newRoleForm.reset();
            successPopUp("Rolul a fost creat cu succes.");
        }
        else{
            failPopUp(response.error);
        }
    })
})


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