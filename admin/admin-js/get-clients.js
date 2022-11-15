let addClientAcc=false;
let editClientAcc=false;
let deleteClientAcc=false;
let viewClientFile=false;
let viewMediaPlan=false;
let viewInvoice=false;
let viewProforma=false;
let clients=[];
startLoading();
checkRole();
fetchAdminsByRoles();
stopLoading();

function checkRole(){
    fetch("/admin/admin-includes/role-check.php").then(response=>response.json()).then(response=>{
        console.log(response);
        for(i=0;i<response.length;i++){
            if(response[i]==="add client account"){
                addClientAcc=true;
            }
            
            if(response[i]==="edit client account"){
                editClientAcc=true;
                
            }
            if(response[i]==="delete client account"){
                deleteClientAcc=true;
                
            }

            if(response[i]==="crm view invoices"){
                viewInvoice=true;
                
            }
            if(response[i]==="crm view proforms"){
                viewProforma=true;
                
            }
            if(response[i]==="crm view client file"){
                viewClientFile=true;
                
            }
            if(response[i]==="view media plan"){
                viewMediaPlan=true;
                
            }
        }
        if(!addClientAcc){
            document.getElementById("add-client-btn").style.display="none";
            document.getElementById("add-client-btn").parentNode.removeChild(document.getElementById("add-client-btn"));
        }
        fetchClients();
    });
}

function fetchAdminsByRoles(){
    fetch("/admin/admin-includes/get-clients-admins.php").then(response=>response.json()).then(response=>{
        console.log(response);
        let salesAdmin = JSON.parse(response[1]);
        let clientAdmin = JSON.parse(response[3]);
        let performanceAdmin = JSON.parse(response[5]);
        let salesAdminId = JSON.parse(response[0]);
        let clientAdminId = JSON.parse(response[2]);
        let performanceAdminId = JSON.parse(response[4]);


        for(i=0;i<salesAdmin.length;i++){
            document.getElementById("client-sales-admin").innerHTML+="<option value='"+salesAdminId[i]+"'>"+salesAdmin[i]+"</option>";
        }
        for(i=0;i<clientAdmin.length;i++){
            document.getElementById("client-client-service-admin").innerHTML+="<option value='"+clientAdminId[i]+"'>"+clientAdmin[i]+"</option>";
        }
        for(i=0;i<performanceAdmin.length;i++){
            document.getElementById("client-performance-admin").innerHTML+="<option value='"+performanceAdminId[i]+"'>"+performanceAdmin[i]+"</option>";
        }
    })
}



let getClientsLink = "../admin-includes/get-clients.php";
let newUpdtForm = document.getElementById("new-update-form");
let editUpdtFormLink="../admin-includes/edit-update.php";

let sendUpdtFormLink = "../admin-includes/send-update.php";
function fetchClients(){
    startLoading();
    clients=[];
    fetch(getClientsLink).then(response => response.json()).then(response => {
        
        console.log(response);
        document.getElementById("client-table-body").innerHTML ="";
        // let clients=[];

        if(response.length<1){
            failPopUp("Momentan nu exista clienti..");
        }
        else{
            for(i=0;i<response.length;i++){
                clients.push(response[i]);
                // document.getElementById("client-table-body").innerHTML+="<tr> <td>"+i+"</td> <td>"+response[i].name+"</td> <td>"+response[i].company+"</td> <td><a href='mailto: "+response[i].email+"'>"+response[i].email+"</a></td> <td><a href='tel: "+response[i].telefon+"'>"+response[i].telefon+"</a> </td> <td> <div class='crm-action-box-btns'> <a class='crm-btn' style='background-color: #3daad6;' href='/admin/crm/clients/client/?id="+response[i].id+"' title='Fisa client'> <i class='fa-solid fa-eye'></i> </a> <a class='crm-btn' style='background-color: #8a1b7a;' href='/admin/media-plan/?client="+response[i].id+"' title='Media plan'> <i class='fa-solid fa-photo-film'></i> </a> <a class='crm-btn' style='background-color: #969fb9;' href='/admin/crm/proforme/?id="+response[i].id+"' title='Proforme'> <i class='fa-solid fa-receipt'></i> </a> <a class='crm-btn' style='background-color: #3daad6;' href='/admin/crm/invoices/?id="+response[i].id+"' title='Facturi'> <i class='fa-solid fa-file-invoice-dollar'></i> </a> <a class='crm-btn' style='background-color: #dea336;' href='/admin/crm/clients/client/modifica/?id="+response[i].id+"' title='Modifica client'> <i class='fa-solid fa-pen-to-square'></i> </a> <div class='crm-btn' style='background-color: #d94e47;' onclick='' title='Sterge client'> <i class='fa-solid fa-trash-can'></i> </div> </div> </td> </tr>";
            }
        }
        renderTable(clients);
        stopLoading();
    });
}

function renderTable(clientList){
    document.getElementById("client-table-body").innerHTML="";


    if(clientList.length>0){
        document.getElementById("client-table-body").innerHTML="";
        for(i=0;i<clientList.length;i++){

            let viewClientFileBtn;
            let viewMediaPlanBtn;
            let viewInvoiceBtn;
            let viewProformaBtn;
            let editClientAccBtn;
            let deleteClientAccBtn;


            if(viewClientFile){
                viewClientFileBtn="<a class='crm-btn' style='background-color: #3daad6;' href='/admin/crm/clients/client/?id="+clientList[i].id+"' title='Fisa client'> <i class='fa-solid fa-eye'></i> </a>";
            }
            else{
                viewClientFileBtn="";

            }
            if(viewMediaPlan){
                viewMediaPlanBtn="<a class='crm-btn' style='background-color: #8a1b7a;' href='/admin/media-plan/?client="+clientList[i].id+"' title='Media plan'> <i class='fa-solid fa-photo-film'></i> </a>";
            }
            else{
                viewMediaPlanBtn="";
                
            }
            if(viewInvoice){
                viewInvoiceBtn="<a class='crm-btn' style='background-color: #3daad6;' href='/admin/crm/invoices/?id="+clientList[i].id+"' title='Facturi'> <i class='fa-solid fa-file-invoice-dollar'></i> </a>";
            }
            else{
                viewInvoiceBtn="";
                
            }
            if(viewProforma){
                viewProformaBtn="<a class='crm-btn' style='background-color: #969fb9;' href='/admin/crm/proforme/?id="+clientList[i].id+"' title='Proforme'> <i class='fa-solid fa-receipt'></i> </a>";
            }
            else{
                viewProformaBtn="";
            }


            if(editClientAcc){
                editClientAccBtn="<a class='crm-btn' style='background-color: #dea336;' href='/admin/crm/clients/client/modifica/?id="+clientList[i].id+"' title='Modifica client'> <i class='fa-solid fa-pen-to-square'></i> </a>";
            }else{
                editClientAccBtn="";
            }
            if(deleteClientAcc){
                deleteClientAccBtn="<div class='crm-btn' style='background-color: #d94e47;' onclick='deleteClient(\""+clientList[i].id+"\")' title='Sterge client'> <i class='fa-solid fa-trash-can'></i> </div>";
            }else{
                deleteClientAccBtn="";
            }



            document.getElementById("client-table-body").innerHTML+="<tr> <td>"+(i+1)+"</td> <td>"+clientList[i].nume+"</td> <td>"+clientList[i].companie+"</td>  <td> <div class='crm-action-box-btns'> "+viewClientFileBtn+" "+viewMediaPlanBtn+" "+viewProformaBtn+" "+viewInvoiceBtn+" "+editClientAccBtn+" "+deleteClientAccBtn+" </div> </td> </tr>";

            // <td><a href='mailto: "+clientList[i].email+"'>"+clientList[i].email+"</a></td> <td><a href='tel: "+clientList[i].telefon+"'>"+clientList[i].telefon+"</a> </td>
        }
    }
    else{
        document.getElementById("client-table-body").innerHTML ="";
        failPopUp("Nu exista potriviri!");
    }
}


function addNewContactPerson(){
    // document.querySelectorAll(".new-client-person");
    let personId = Math.floor(Math.random()*90000) + 10000;
    let index = document.querySelectorAll(".new-client-person").length+1;

    let element = document.createElement("div");
    element.classList.add("new-client-person");
    element.id="person"+personId;
    element.innerHTML=' <div style="display: flex;"> <h4>Persoana de contact '+index+'</h4> <i onclick="deleteContactPerson(\'person'+personId+'\')" class="fa-solid fa-trash-can"></i> </div> <div class="form-row-wrap"> <div class="input-container"> <input type="text" name="person-id[]" hidden value="'+personId+'"> <label>Nume</label> <input required type="text" name="person-nume-'+personId+'" id="new-person-nume" placeholder="Introdu nume"> </div> <div class="input-container"> <label>Prenume</label> <input type="text" name="person-prenume-'+personId+'" id="new-person-prenume" placeholder="Introdu prenume"> </div> <div class="input-container"> <label>Functie</label> <input type="text" name="person-functie-'+personId+'" id="new-person-functie" placeholder="Introdu functie"> </div> </div> </div> <div class="form-row-wrap"> <div class="input-container"> <label>Email</label> <input type="email" name="person-email-'+personId+'" id="new-person-email" placeholder="Introdu email"> </div> <div class="input-container"> <label>Telefon</label> <input type="text" name="person-telefon-'+personId+'" id="new-person-telefon" placeholder="Introdu telefon"> </div> <div class="input-container"> <div> <input type="checkbox" style="width: max-content;" name="new-person-decident-'+personId+'" id="new-person-decident"> <label >Este decident?</label> </div> </div>';

    document.getElementById("new-client-contact-person").appendChild(element);
}

function deleteContactPerson(personId){
    document.getElementById("new-client-contact-person").removeChild(document.getElementById(personId));
}


function addNewEmailAdress(){
    // document.querySelectorAll(".new-client-person");
    let emailId = Math.floor(Math.random()*90000) + 10000;
    let index = document.querySelectorAll(".new-client-email").length+1;

    let element = document.createElement("div");
    element.classList.add("new-client-email");
    element.id="email"+emailId;
    element.innerHTML='<div style="display: flex;"> <h4>Email '+index+'</h4> <i onclick="deleteEmailAdress(\'email'+emailId+'\')" class="fa-solid fa-trash-can"></i> </div> <input type="text" name="email-id[]" hidden value="'+emailId+'"> <div class="form-row-wrap"> <div class="input-container"> <label>Adresa de email</label> <input type="email" name="new-email-'+emailId+'" id="new-email" placeholder="Introdu adresa de email" required> </div> <div class="input-container"> <div> <input type="checkbox" name="new-billing-email-'+emailId+'" id="new-billing-email" placeholder="Mail de facturare" style="width: max-content;"> <label for="">Mail de facutare</label> </div> </div> </div>';

    document.getElementById("new-client-email-adress").appendChild(element);
}

function deleteEmailAdress(emailId){
    document.getElementById("new-client-email-adress").removeChild(document.getElementById(emailId));
}



function openNewClient(){
    let modal=document.getElementById('modal-new-client');
    document.body.style.overflow="hidden";
    modal.style.display="block";
    setTimeout(()=>{
        modal.style.opacity="1";
    },50);

}

function closeNewClient(){
    let modal=document.getElementById('modal-new-client');
    document.body.style.overflow="auto";
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
    },300);
}

let createClientAccForm = document.getElementById("create-client-account-form");
let newClientAccLink = "/admin/admin-includes/new-client-account.php";
// let checkAccLink = "/admin/admin-includes/check-account.php";


createClientAccForm.addEventListener("submit", e => {
    e.preventDefault();
    startLoading();

    const data = new FormData();

    for (const p of new FormData(createClientAccForm)) {
        data.append(p[0], p[1]);
    }

    // fetch(checkAccLink, {
    //     method: "POST",
    //     body: data
    // }).then(response => response.json()).then(response => {
    //     console.log(response);
    //     if (response.status === "fail") {
    //         failPopUp(response.error);
    //     }
    //     else {
            fetch(newClientAccLink, {
                method: "POST",
                body: data
            }).then(response => response.json()).then(response => {
                if (response.status === "success") {
                    console.log("success");
                    createClientAccForm.reset();
                    successPopUp("Clientul a fost adaugat cu succes!");
                    fetchClients();
                }
                else {
                    console.log("fail",response);
                    failPopUp(response.fail);
                }
                stopLoading();
            })
    //     }
    // })


});
function generatePassword(x) {
    let r = (Math.random() + 11).toString(36).substring(2);
    if (x === 1) {
        document.getElementById("new-account-client-password").value = r;
    }
    if (x === 2) {
        document.getElementById("new-account-password").value = r;
    }
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


// function searchByName(e){
//     let clientByName=[];
//     let searchInputName = e.target.value;
//     for(i=0;i<clients.length;i++){
//         if(clients[i].name.toLowerCase().includes(searchInputName.toLowerCase()) || clients[i].name.includes(searchInputName)){
//             clientByName.push(clients[i]);
//         }
//     }
//     renderTable(clientByName);
// }

// function searchByCompany(e){
//     let clientByCompany=[];
//     let searchInputCompany = e.target.value;
//     for(i=0;i<clients.length;i++){
//         if(clients[i].company.toLowerCase().includes(searchInputCompany.toLowerCase()) || clients[i].company.includes(searchInputCompany)){
//             clientByCompany.push(clients[i]);
//         }
//     }
//     renderTable(clientByCompany);
// }

function filterTable(){
    let name = document.getElementById("name-filter-search").value;
    let company = document.getElementById("company-filter-search").value;
    let status = document.getElementById("status-filter-search").value;
    console.log(status);

    console.log("merge");
    let clientsFiltered1 = [];
    let clientsFiltered2 = [];
    let clientsFiltered = [];
    for(i=0;i<clients.length;i++){
        if(clients[i].nume.toLowerCase().includes(name.toLowerCase())){
            clientsFiltered1.push(clients[i]);
        }
    }
    for(i=0;i<clientsFiltered1.length;i++){
        if(clientsFiltered1[i].companie.toLowerCase().includes(company.toLowerCase())){
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



function deleteClient(client){
    startLoading();
    if(confirm("Sigur doresti sa stergi acest client?")){
        fetch("/admin/admin-includes/delete-client.php?client="+client).then(response=>response.json()).then(response=>{
            if(response.status==="success"){
                successPopUp("Clientul a fost sters cu succes.");
                fetchClients();
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