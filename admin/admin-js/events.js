function openNewEvent(){


    let modal=document.getElementById('modal-new-event');
    document.body.style.overflow="hidden";
    modal.style.display="block";
    setTimeout(()=>{
        modal.style.opacity="1";
    },50);
}

function closeNewEventModal(){
    let modal=document.getElementById('modal-new-event');
    document.body.style.overflow="auto";
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
    },300);
}

document.getElementById("new-event-repeat").addEventListener("change",e=>{
    if(document.getElementById("new-event-repeat").checked === true){
        document.getElementById("")
    }
})


function fetchEvents(){
    startLoading();
    events = [];
    fetch("/admin/admin-includes/get-events.php").then(response=>response.json()).then(response=>{
        console.log(response);
        if(response.length<1){
            failPopUp("Momentant nu există evenimente..");
        }
        else{
            for(i=0;i<response.length;i++){
                events.push(response[i]);
            }
        }

        renderTable(events);
        stopLoading();
    })
}

function renderTable(eventsList){
    document.getElementById("event-table-body").innerHTML="";

    if(eventsList.length>0){
        for(i=0;i<eventsList.length;i++){

            document.getElementById("event-table-body").innerHTML += "<tr><td>"+(i+1)+"</td><td>"+eventsList[i].nume+"</td><td>"+eventsList[i].client+"</td><td>"+eventsList[i].responsabil+"</td><td>"+eventsList[i].data+"</td><td>"+eventsList[i].recursiv+"</td><td></td></tr>";
        }
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



