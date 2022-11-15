let clientSelector = document.getElementById("client-selector");
let clientsList = [];
let filteredClientList = [];

let selectedClient;

fetchClients();

let projectTypes = [];

fetchProjectTypes();

function fetchProjectTypes(){
    fetch("/admin/admin-includes/get-project-types.php").then(response=>response.json()).then(response=>{
        console.log(response);
        projectTypes = response;
        document.getElementById("new-project-type").innerHTML="<option value='' disabled selected>Tip proiect</option>"

        for(i=0;i<projectTypes.length;i++){
            document.getElementById("new-project-type").innerHTML+="<option value='"+projectTypes[i].id+"'>"+projectTypes[i].nume+"</option>";
        }
    })
}


function fetchClients(){
    fetch("/admin/admin-includes/get-clients-selector.php").then(response=>response.json()).then(response=>{
        clientsList=response;
        console.log(clientsList);
        document.getElementById("new-project-client").innerHTML="<option value='' selected disabled>Client</option><option value='intern'>Intern</option>";

        for(i=0;i<clientsList.length;i++){

            document.getElementById("new-project-client").innerHTML+="<option value='"+clientsList[i].clientId+"'>"+clientsList[i].name+"</option>";
        }

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
        
    element = document.createElement("div");
        element.dataset.clientId = 'intern';
        element.classList.add("client-selector-value");
        element.setAttribute("onclick","setClient('intern','Intern')");
        element.innerHTML= 'Intern';
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
    console.log(client);
    
    if(client==="none"){
        // document.getElementById("view-reports-content").innerHTML="";
        selectedClient="";
    }
    else{
        selectedClient=client;

    
    }
    stopLoading();
    let clientSelector = document.getElementById("client-selector");
    clientSelector.innerHTML=name;
    

    
    closeChangeClient();
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



function openNewProject(){
    // document.getElementById("new-report-client").value=client;
    // document.getElementById("new-report-nume-client").value=nume;

    document.getElementById("new-project-client").value =selectedClient;


    let modal=document.getElementById('modal-new-project');
    document.body.style.overflow="hidden";
    modal.style.display="block";
    setTimeout(()=>{
        modal.style.opacity="1";
    },50);
}

function closeNewProject(){
    let modal=document.getElementById('modal-new-project');
    document.body.style.overflow="auto";
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
    },300);
}