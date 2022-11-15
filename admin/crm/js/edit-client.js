const url = new URL (document.URL);
const param = new URLSearchParams(url.search);
let clientId = param.get("id");
fetchAdminsByRoles();

function fetchAdminsByRoles(){
    fetch("/admin/admin-includes/get-clients-admins.php").then(response=>response.json()).then(response=>{
        console.log(response);
        let salesAdmin = response[1];
        let clientAdmin = response[3];
        let performanceAdmin = response[5];
        let salesAdminId = response[0];
        let clientAdminId = response[2];
        let performanceAdminId = response[4];

        for(i=0;i<salesAdmin.length;i++){
            document.getElementById("edit-client-sales-responsabil").innerHTML+="<option value='"+salesAdminId[i]+"'>"+salesAdmin[i]+"</option>";
        }
        for(i=0;i<clientAdmin.length;i++){
            document.getElementById("edit-client-client-service-responsabil").innerHTML+="<option value='"+clientAdminId[i]+"'>"+clientAdmin[i]+"</option>";
        }
        for(i=0;i<performanceAdmin.length;i++){
            document.getElementById("edit-client-performance-responsabil").innerHTML+="<option value='"+performanceAdminId[i]+"'>"+performanceAdmin[i]+"</option>";
        }
        fetchClientFile();
    })
   
}



function fetchClientFile(){
    fetch("/admin/crm/includes/get-client-file-basic.php?id="+clientId).then(response=>response.json()).then(response=>{
        console.log(response);
        document.getElementById("edit-client-name").value=response.numeClient;
        document.getElementById("edit-client-firma").value=response.firma;
        document.getElementById("edit-client-cod-fiscal").value=response.codFiscal;
        document.getElementById("edit-client-nr-reg-com").value=response.nrRegCom;

        document.getElementById("edit-client-performance-responsabil").value=response.performanceAdminId;
        document.getElementById("edit-client-client-service-responsabil").value=response.clientServiceId;
        document.getElementById("edit-client-sales-responsabil").value=response.salesAdminId;
        document.getElementById("edit-client-bank-account").value=response.contBancar;
        let status=response.status;

        // status = response.status;
        // if(response.status==="Prospect"){
        //     status="0";
        // }
        // else if(response.status==="Cold lead"){
        //     status="3";
        // }
        // else if(response.status==="Hot lead"){
        //     status="4";
        // }
        // else if(response.status==="Client"){
        //     status="1";
        // }
        // else if(response.status==="Closed"){
        //     status="4";
        // }

        if(response.logo!=""){
            document.getElementById("preview-file").style.backgroundImage='url(/clients-resources/'+clientId+'/'+response.logo+'?'+new Date().getFullYear()+ new Date().getMonth()+new Date().getDate()+new Date().getTime()+')';
            document.getElementById("preview-file").style.backgroundSize='contain';
            document.getElementById("preview-file").style.backgroundPosition='center';
            document.getElementById("preview-file").style.backgroundRepeat='no-repeat';
        }
        else{
            document.getElementById("preview-file").style.backgroundImage="";
        }
        document.getElementById("edit-client-status").value=status;
        
        document.getElementById("edit-client-categorie").value=response.categorie;
        
        document.getElementById("edit-client-adresa-facturare").value=response.adresaFacturare;
        document.getElementById("edit-client-tara-facturare").value=response.taraFact;
        document.getElementById("edit-client-oras-facturare").value=response.orasFact;
        document.getElementById("edit-client-judet-facturare").value=response.judetFact;

        document.getElementById("edit-client-phone").value=response.nrTel;
    })
}

document.getElementById("edit-client-logo").addEventListener("input",e=>{
    e.preventDefault();
    const[file] = e.target.files;
    document.getElementById("preview-file").style.backgroundImage='url('+URL.createObjectURL(file)+')';
})

let editClientForm = document.getElementById("edit-client-form");
editClientForm.addEventListener("submit",e=>{
    e.preventDefault();
    startLoading();
    const data= new FormData();
    data.append("logo",document.getElementById("edit-client-logo").file);
    data.append("clientId",clientId);

    for(const p of new FormData(editClientForm)){
        data.append(p[0],p[1]);
        console.log(p[0],p[1]);
    }

    fetch("/admin/crm/includes/edit-client.php",{
        method:"POST",
        body:data
    }).then(response=>response.json()).then(response=>{
        console.log("cepl");
        console.log(response);

        if(response.status==="success"){
            successPopUp("Clientul a fost modificat cu succes.\nVei fi redirectionat curand.");
            // setTimeout(() => {
            //     window.history.back();
            // }, 500);
        }
        else{
            failPopUp(response.error);
        }
        stopLoading();
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