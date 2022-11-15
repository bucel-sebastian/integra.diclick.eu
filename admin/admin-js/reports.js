let clientSelector = document.getElementById("client-selector");
let clientsList = [];
let filteredClientList = [];
fetchClients();

let reportsList = [];


function fetchClients(){
    fetch("/admin/admin-includes/get-clients-selector.php").then(response=>response.json()).then(response=>{
        clientsList=response;
        console.log(clientsList);


        renderClientList(clientsList);
    })
}


function renderClientList(list){
    console.log("merge?");
    let clientListDiv = document.getElementById("clients-list");
    clientListDiv.innerHTML="";
    let element = document.createElement("div");
        element.dataset.clientId = 'none';
        element.classList.add("client-selector-value");
        element.setAttribute("onclick","setClient('none','Selectează un client')");
        element.innerHTML= 'none';
        clientListDiv.appendChild(element);

    for(i=0;i<list.length;i++){
        let element = document.createElement("div");
        element.dataset.clientId = list[i].clientId;
        element.classList.add("client-selector-value");
        element.setAttribute("onclick","setClient('"+list[i].clientId+"','"+list[i].name+"')");
        element.innerHTML=list[i].name;
        clientListDiv.appendChild(element);
    }   
}

function openChangeClient(){
    document.getElementById("client-selector-container").style.display="block";
    document.getElementById("client-selector").setAttribute("onclick","closeChangeClient()");
}

function closeChangeClient(){
    document.getElementById("client-selector-container").style.display="none";
    document.getElementById("client-selector").setAttribute("onclick","openChangeClient()");
    document.getElementById("search-client-input").value = "";
    renderClientList(clientsList);
}

function setClient(client,name){
    startLoading();
    document.getElementById("view-reports-content").innerHTML="";
    document.getElementById("new-report-btn").removeAttribute('onclick');
    reportsList= [];
    if(client==="none"){
        // document.getElementById("view-reports-content").innerHTML="";
    }
    else{

        document.getElementById("new-report-btn").setAttribute('onclick','openNewReport("'+client+'","'+name+'")');
        fetch("/admin/admin-includes/get-client-reports.php?client="+client).then(response=>response.json()).then(response=>{
            console.log(response);
            if(response[0]){
                reportsList = JSON.parse(response[0].reports);
                console.log(reportsList,reportsList.length);
                for(i=0;i<reportsList.length;i++){
        
                    let editBtn = "";
                    let deleteBtn = "";
        
                    // if(editRole){
                        editBtn="<button class='small-rectang-btn yellow-btn' title='Modifică raportul' onclick='editReport(\""+reportsList[i].reportId+"\",\""+client+"\",\""+name+"\")'> <i class='fa-solid fa-pen-to-square'></i> </button>";
                    // }
        
                    // if(deleteRole){
                        deleteBtn="<button class='small-rectang-btn red-btn' title='Șterge raportul' onclick='deleteReport(\""+reportsList[i].reportId+"\",\""+client+"\",\""+name+"\")'> <i class='fa-solid fa-trash-can'></i> </button>";
                    // }
        
                    let element = document.createElement("div");
                    element.classList.add("report-box");
                    element.id=reportsList[i].reportId;
                    element.innerHTML="<div class='row space-between-center'> <div> <h3>"+reportsList[i].name+"</h3> </div> <div class='crm-action-box-btns'><button class='small-rectang-btn blue-btn' title='Vezi raportul' onclick='openReport(\""+reportsList[i].reportId+"\")'> <i class='fa-solid fa-eye'></i> </button> "+editBtn+" "+deleteBtn+" </div> </div> <div>  </div>";
                    document.getElementById("view-reports-content").appendChild(element);
                    // document.getElementById("view-reports-content").innerHTML+="";
                }
            }
            stopLoading();
            
        })
    }
    let clientSelector = document.getElementById("client-selector");
    clientSelector.innerHTML=name;
    

    
    closeChangeClient();
}


function openReport(reportId){
    startLoading();
    for(i=0;i<reportsList.length;i++){
        if(reportsList[i].reportId===reportId){
            document.getElementById("view-report-iframe").src = reportsList[i].link;
        }
    }
    let modal=document.getElementById('modal-view-report');
        document.body.style.overflow="hidden";
        modal.style.display="block";
        setTimeout(()=>{
            modal.style.opacity="1";
        },50);

}

document.getElementById("view-report-iframe").addEventListener("load",e=>{
    stopLoading();
})

function closeReport(){
    let modal=document.getElementById('modal-view-report');
    document.body.style.overflow="auto";
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
    },300);
    document.getElementById("view-report-iframe").src = "";
}


function editReport(reportId,clientId,clientName){
    startLoading();
    document.getElementById("edit-report-form").reset();
    document.getElementById("edit-report-client").value=clientId;
    document.getElementById("edit-report-nume-client").value=clientName;
    document.getElementById("edit-report-id").value=reportId;

    fetch("/admin/admin-includes/get-report-by-id.php?report="+reportId+"&client="+clientId).then(response=>response.json()).then(response=>{
        console.log(response);
        document.getElementById("edit-nume-raport").value=response.name;
        document.getElementById("edit-link-raport").value=response.link;

        let modal=document.getElementById('modal-edit-report');
        document.body.style.overflow="hidden";
        modal.style.display="block";
        setTimeout(()=>{
            modal.style.opacity="1";
        },50);
        stopLoading();
    });
}

function closeEditReport(){
    let modal=document.getElementById('modal-edit-report');
    document.body.style.overflow="auto";
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
    },300);
    document.getElementById("edit-report-form").reset();
}

let editReportForm = document.getElementById("edit-report-form");
editReportForm.addEventListener("submit",e=>{
    e.preventDefault();
    startLoading();
    const data = new FormData();

    for(const p of new FormData(editReportForm)){
        data.append(p[0],p[1]);
    }

    fetch("/admin/admin-includes/edit-report.php",{
        method:"POST",
        body:data
    }).then(response=>response.json()).then(response=>{
        console.log(response);
        if(response.status==="success"){
            setClient(document.getElementById("edit-report-client").value,document.getElementById("edit-report-nume-client").value);
            closeEditReport();
            successPopUp("Raportul a fost modificat cu succes.");
        }
        else{
            failPopUp(response.error);
        }
        stopLoading();
    })
})

function deleteReport(reportId,clientId,clientName){
    
    if(confirm("Sigur dorești să ștergi acest raport?")){
        startLoading();
        fetch("/admin/admin-includes/delete-report.php?client="+clientId+"&report="+reportId).then(response=>response.json()).then(response=>{
            console.log(response);

            if(response.status==="success"){
                setClient(clientId,clientName);
                successPopUp("Raportul a fost sters cu succes.");
            }
            else{
                failPopUp(response.error);
            }
            stopLoading();
        })
    }
}

function searchClient(e){
    filteredClientList=[];
    if(e.target.value!=""){
        for(i=0;i<clientsList.length;i++){
            if(clientsList[i].name.toLowerCase().includes(e.target.value.toLowerCase())){
                filteredClientList.push(clientsList[i]);
            }
        }
        renderClientList(filteredClientList);
    }
    else{
        renderClientList(clientsList);
    }
    
}

clientSelector.addEventListener("change",e=>{
    e.preventDefault();
})


function openNewReport(client,nume){
    document.getElementById("new-report-client").value=client;
    document.getElementById("new-report-nume-client").value=nume;

    let modal=document.getElementById('modal-new-report');
    document.body.style.overflow="hidden";
    modal.style.display="block";
    setTimeout(()=>{
        modal.style.opacity="1";
    },50);
}

function closeNewReport(){
    let modal=document.getElementById('modal-new-report');
    document.body.style.overflow="auto";
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
    },300);
}

let newReportForm = document.getElementById("new-report-form");

newReportForm.addEventListener("submit",e=>{
    e.preventDefault();

    startLoading();


    const data = new FormData();

    for(const p of new FormData(newReportForm)){
        data.append(p[0],p[1]);
    }

    fetch("/admin/admin-includes/new-report.php",{
        method:"POST",
        body:data
    }).then(response=>response.json()).then(response=>{
        if(response.status==="success"){
            setClient(document.getElementById("new-report-client").value,document.getElementById("new-report-nume-client").value);
            newReportForm.reset();
            closeNewReport();
            successPopUp("Raportul a fost adaugat cu succes.");
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