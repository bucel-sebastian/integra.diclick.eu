let leadList;
let clients;
fetchLeads();


function fetchLeads(){
    startLoading();
    fetch("/admin/crm/includes/get-leads.php").then(response=>response.json()).then(response=>{
        console.log(response);
        leadList = response;
        document.getElementById("crm-leads-table").innerHTML="";
        renderTable(leadList);
        
        // for(i=0;i<response.length;i++){



        //     // if(editLeadStatus){
        //     //     editLeadStatusBtn="<div class='crm-btn' style='background-color: #6baa41' title='Modifică status' onclick='openChangeStatus(\""+leadList[i].unicId+"\")'> <i class='fa-solid fa-user-check'></i> </div>";
        //     // }
        //     // else{
        //     //     editLeadStatusBtn="";
        //     // }
        //     editLeadStatusBtn="";
            
        //     document.getElementById("crm-leads-table").innerHTML+="<tr> <td> "+leadList[i].nume+" </td> <td> "+leadList[i].firma+" </td> <td>"+tmpStatus+"</td> <td>"+list[i].sursa+"</td> <td> <div class='crm-action-box-btns'> <a class='crm-btn' style='background-color: #3daad6;' href='/admin/crm/clients/client/?id="+leadList[i].unicId+"' title='Fisa client'> <i class='fa-solid fa-eye'></i> </a> "+editLeadStatusBtn+" <a class='crm-btn' style='background-color: #dea336;' href='/admin/crm/clients/client/modifica/?id="+leadList[i].unicId+"' title='Modifica client'> <i class='fa-solid fa-pen-to-square'></i> </a> <div class='crm-btn' style='background-color: #d94e47;' onclick='deleteClient(\""+leadList[i].unicId+"\")' title='Sterge client'> <i class='fa-solid fa-trash-can'></i> </div> </div> </td> </tr>";
        // }

        stopLoading();
        
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

function deleteClient(client){
    startLoading();
    if(confirm("Sigur doresti sa stergi acest client?")){
        fetch("/admin/admin-includes/delete-client.php?client="+client).then(response=>response.json()).then(response=>{
            if(response.status==="success"){
                successPopUp("Clientul a fost sters cu succes.");
                fetchLeads();
            }
            else{
                failPopUp(response.error);
            }
            stopLoading();
        })
    }
    else{
        stopLoading();
    }
}


function openChangeStatus(id){

}


function filterTable(){
    let name = document.getElementById("name-filter-search").value;
    let company = document.getElementById("company-filter-search").value;
    let status = document.getElementById("status-filter-search").value;
    console.log(status);

    console.log("merge");
    let clientsFiltered1 = [];
    let clientsFiltered2 = [];
    let clientsFiltered = [];
    for(i=0;i<leadList.length;i++){
        if(leadList[i].nume.toLowerCase().includes(name.toLowerCase())){
            clientsFiltered1.push(leadList[i]);
        }
    }
    for(i=0;i<clientsFiltered1.length;i++){
        if(clientsFiltered1[i].firma.toLowerCase().includes(company.toLowerCase())){
            clientsFiltered2.push(clientsFiltered1[i]);
        }
    }
    if(status != "all"){
        console.log("intra");
        for(i=0;i<clientsFiltered2.length;i++){
            if(clientsFiltered2[i].status===status){
                clientsFiltered.push(clientsFiltered2[i]);
            }
        }
    }
    else{
        clientsFiltered=clientsFiltered2;
    }
    renderTable(clientsFiltered);
}

function renderTable(list){
    document.getElementById("crm-leads-table").innerHTML="";
    // console.log(list);

    if(list.length>0){
        

        for(i=0;i<list.length;i++){
            console.log(list[i]);
            let tmpStatus;
            if(list[i].status==="2"){
                tmpStatus="Prospect";
            }
            else if(list[i].status==="1"){
                tmpStatus="Cold lead";
            }
            else if(list[i].status==="2"){
                tmpStatus="Hot lead";
            }
            else{
                tmpStatus="";
            }

            // console.log(list[i]);

            if(list[i].clientFile==="1"){
                createClientFileBtn = "";
                viewClientFileBtn = "<button onclick='openClientFile(\""+list[i].unicId+"\")' class='small-rectang-btn blue-btn' title='Vezi fișa de client'><i class='fa-solid fa-eye'></i></button>";
                editLeadBtn = "";
            }
            else{
                viewClientFileBtn = "";
                createClientFileBtn = "<button onclick='createClientFile(\""+list[i].unicId+"\")' class='small-rectang-btn green-btn' title='Creează fișa de client'><i class='fa-solid fa-folder-plus'></i></button>";
                editLeadBtn = "<button title='Modifică lead' onclick='editLead(\""+list[i].unicId+"\")' class='small-rectang-btn yellow-btn'><i class='fa-solid fa-pen-to-square'></i></button>";
                
            }
            changeStatusBtn = "<button onclick='openChangeStatus(\""+list[i].unicId+"\")' class='small-rectang-btn green-btn' title='Schimbă statusul'><i class='fa-solid fa-check'></i></button>";

            deleteLeadBtn = "<button title='Șterge lead' onclick='deleteLead(\""+list[i].unicId+"\")' class='small-rectang-btn red-btn'><i class='fa-solid fa-trash-can'></i></button>";

            

            


            document.getElementById("leads-table-body").innerHTML+="<tr><td><div class='crm-action-box-btns'> "+createClientFileBtn+""+viewClientFileBtn+""+changeStatusBtn+""+editLeadBtn+""+deleteLeadBtn+" </div></td><td>"+list[i].name+"</td><td>"+list[i].company+"</td><td>"+list[i].source+"</td><td>"+tmpStatus+"</td><td>"+list[i].phone+"</td><td>"+list[i].email+"</td><td>"+list[i].website+"</td><td>"+list[i].salesTarget+"</td><td>"+list[i].salesTarget+"</td><td>"+list[i].buget+"</td><td>"+list[i].message+"</td><td><div class='crm-action-box-btns'> "+createClientFileBtn+""+viewClientFileBtn+""+changeStatusBtn+""+editLeadBtn+""+deleteLeadBtn+" </div></td>";
            
            document.getElementById("crm-leads-table").innerHTML+="<tr> <td>"+list[i].nume+"</td> <td>"+list[i].firma+"</td> <td>"+tmpStatus+"</td> <td>"+list[i].sursa+"</td> <td> <div class='crm-action-box-btns'> <a class='crm-btn' style='background-color: #3daad6;' href='/admin/crm/clients/client/?id="+list[i].unicId+"' title='Vezi fisa'> <i class='fa-solid fa-eye'></i> </a> "+" <a class='crm-btn' style='background-color: #dea336;' href='/admin/crm/clients/client/modifica/?id="+list[i].unicId+"' title='Modifica lead'> <i class='fa-solid fa-pen-to-square'></i> </a> <div class='crm-btn' style='background-color: #d94e47;' onclick='deleteClient(\""+list[i].unicId+"\")' title='Sterge lead'> <i class='fa-solid fa-trash-can'></i> </div> </div> </td> </tr>";
        }
    }
    else{
        document.getElementById("crm-leads-table").innerHTML="";
    }
}



function createClientFile(id){
    if(confirm("Sigur dorești să creezi fișa de client?")){
        
    }
}