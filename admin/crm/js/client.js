const url = new URL (document.URL);
const param = new URLSearchParams(url.search);
let clientId = param.get("id");
document.getElementById("view-all-actions-link").href="/admin/crm/clients/client/actiuni/?id="+clientId;
document.getElementById("crm-edit-btn").href="/admin/crm/clients/client/modifica/?id="+clientId;
document.getElementById("client-proforms-link").href="/admin/crm/proforme/?id="+clientId;
document.getElementById("client-invoices-link").href="/admin/crm/invoices/?id="+clientId;
document.getElementById("client-new-proform-link").href="/admin/crm/proforme/?id="+clientId+"&new=true";


let contractsAcordionHeight=0;
let emailsAcordionHeight=0;
let websitesAcordionHeight=0;
let personsAcordionHeight=0;
let actionsAcordionHeight=0;
let scAccountsAcordionHeight=0;
let objectivesAcordionHeight=0;
let settingsAcordionHeight=0;
let mediaplanAcordionHeight=0;
let bugetAcordionHeight=0;
let creatieAcordionHeight=0;
let clientContract="";

console.log(clientId);
startLoading();
fetchClientFile();
fetchContracts();
fetchAnexe();
fetchEmails();
fetchWebsites();
fetchPersons();
fetchActions();
fetchSmAccounts();
fetchObjectives();
fetchSettings();
fetchMediaplan();
fetchBuget();
fetchCreatie();
fetchUsers();

// fetchProduse();

stopLoading();



// function fetchProduse(){



// }

function fetchContracts(){
    fetch("/admin/crm/includes/get-client-contract.php?client="+clientId).then(response=>response.json()).then(response=>{
        console.log("Contract",response);
        if(response.length!=0){
            document.getElementById("new-contract-btn").style.display="none";
            document.getElementById("edit-contract-btn").style.display="flex";

            response=response[0];
            console.log("Contractul",response);
            document.getElementById("crm-client-file-contracts").innerHTML='<iframe src="/clients-resources/'+clientId+'/contracts/'+response.contractFile+'" frameborder="0"></iframe>';

            clientContract = 'https://integra.diclick.eu/'+'clients-resources/'+clientId+'/contracts/'+response.contractFile;

        }
        else{
            document.getElementById("new-contract-btn").style.display="flex";
            document.getElementById("edit-contract-btn").style.display="none";
        }
        contractsAcordionHeight=document.getElementById("client-contracts-acordion").offsetHeight;
        document.getElementById("client-contracts-acordion").style.height="0px";
    });

    // fetch("/admin/crm/includes/get-client-contracts.php?client="+clientId).then(response=>response.json()).then(response=>{
    //     console.log(response);
    //     document.getElementById("crm-contracts").innerHTML="";
    //     for(i=0;i<response.length;i++){
    //         let tip;
    //         if(response[i].tip==="1"){
    //             tip="Contract cadru";
    //         }
    //         else if(response[i].tip==="2"){
    //             tip = "Anexa";
    //         }
    //         else{
    //             tip = "";
    //         }
    //         document.getElementById("crm-contracts").innerHTML+="<tr> <td>"+response[i].perStart+"</td> <td>"+response[i].perSfarsit+"</td><td>"+tip+"</td> <td> <div class='crm-action-box-btns'> <button class='small-rectang-btn blue-btn' onclick='viewFullContract(\""+response[i].unicId+"\",\""+response[i].contractFile+"\")'> <i class='fa-solid fa-eye'></i> </button> <button class='small-rectang-btn yellow-btn' onclick='editContract(\""+response[i].unicId+"\")'> <i class='fa-solid fa-pen-to-square'></i> </button> <button class='small-rectang-btn red-btn' onclick='deleteContract(\""+response[i].unicId+"\")'> <i class='fa-solid fa-trash-can'></i> </button> </div> </td> </tr>"
    //     }
    // });
    
}


function openNewContract(){
    let modal=document.getElementById('modal-new-contract');
    document.body.style.overflow="hidden";
    modal.style.display="block";

    setTimeout(()=>{
        modal.style.opacity="1";
    },50);
}

function closeNewContract(){
    let modal=document.getElementById('modal-new-contract');
    document.body.style.overflow="auto";
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
    },300);
}

let newContractForm = document.getElementById("crm-new-contract");
newContractForm.addEventListener("submit",e=>{
    e.preventDefault();
    startLoading();

    const data = new FormData();

    for(const p of new FormData(newContractForm)){
        data.append(p[0],p[1]);
    }
    data.append("client",clientId);

    fetch("/admin/crm/includes/new-client-contract.php",{
        method: "POST",
        body: data
    }).then(response=>response.json()).then(response=>{
        console.log(response);

        if(response.status==="success"){
            successPopUp("Contractul a fost adaugat cu succes.");
            newAnexaForm.reset();
            fetchContracts();
            closeNewContract();
        }
        else{
            failPopUp(response.error);
        }
        stopLoading();
    })

});


function openEditContract(){
    let modal=document.getElementById('modal-edit-contract');
    document.body.style.overflow="hidden";
    modal.style.display="block";

    setTimeout(()=>{
        modal.style.opacity="1";
    },50);
}

function closeEditContract(){
    let modal=document.getElementById('modal-edit-contract');
    document.body.style.overflow="auto";
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
    },300);
}

let editContractForm = document.getElementById("crm-edit-contract");
editContractForm.addEventListener("submit",e=>{
    e.preventDefault();
    startLoading();

    const data = new FormData();

    for(const p of new FormData(editContractForm)){
        data.append(p[0],p[1]);
    }
    data.append("client",clientId);

    fetch("/admin/crm/includes/edit-client-contract.php",{
        method: "POST",
        body: data
    }).then(response=>response.json()).then(response=>{
        console.log(response);

        if(response.status==="success"){
            successPopUp("Contractul a fost modificat cu succes.");
            editContractForm.reset();
            fetchContracts();
            closeEditContract();
        }
        else{
            failPopUp(response.error);
        }
        stopLoading();
    })
})

function fetchAnexe(){
    fetch("/admin/crm/includes/get-anexe.php?client="+clientId).then(response=>response.json()).then(response=>{
        console.log("Anexe",response);
        document.getElementById("crm-anexe").innerHTML=""
        for(i=0;i<response.length;i++){

            if(i===0){
                document.getElementById("crm-client-file-anexe").innerHTML='<iframe src="/clients-resources/'+clientId+'/contracts/'+response[i].contractFile+'" frameborder="0"></iframe>';
            }



            document.getElementById("crm-anexe").innerHTML+="<tr> <td>"+response[i].perStart+"</td> <td>"+response[i].perSfarsit+"</td> <td> <div class='crm-action-box-btns'> <button class='small-rectang-btn blue-btn' onclick='viewFullAnexa(\""+response[i].unicId+"\",\""+response[i].contractFile+"\")'> <i class='fa-solid fa-eye'></i> </button> <button class='small-rectang-btn yellow-btn' onclick='editAnexa(\""+response[i].unicId+"\")'> <i class='fa-solid fa-pen-to-square'></i> </button> <button class='small-rectang-btn red-btn' onclick='deleteAnexa(\""+response[i].unicId+"\")'> <i class='fa-solid fa-trash-can'></i> </button> </div> </td> </tr>"
        }

        contractsAcordionHeight=document.getElementById("client-anexe-acordion").offsetHeight;
        document.getElementById("client-anexe-acordion").style.height="0px";
    })
}




function fetchUsers(){
    fetch("/admin/crm/includes/get-client-file-users.php?id="+clientId).then(response=>response.json()).then(response=>{
        console.log("useri",response);

        document.getElementById("crm-client-file-users").innerHTML="";
        document.getElementById("crm-user-accounts").innerHTML = "";

        for(i=0;i<response.length;i++){
            document.getElementById("crm-client-file-users").innerHTML+="<tr><td>"+response[i].nume+"</td><td>"+response[i].username+"</td><td>"+response[i].email+"</td><td>"+response[i].lastLogin+"</td></tr>";
            document.getElementById("crm-user-accounts").innerHTML += "<tr><td>"+response[i].nume+"</td><td></td><td></td><td></td><td></td><td></td></tr>";
        }
        usersAcordionHeight=document.getElementById("client-users-acordion").offsetHeight;
        document.getElementById("client-users-acordion").style.height="0px";

    })
}

function fetchActions(){
    fetch("/admin/crm/includes/get-client-file-actions.php?id="+clientId).then(response=>response.json()).then(response=>{
        console.log(response);
        document.getElementById("action-table-body").innerHTML="";
        for(i=1;i<response.length;i++){
            document.getElementById("action-table-body").innerHTML+="<tr><td>"+response[i].data+"</td><td>"+response[i].timp+"</td><td>"+response[i].actiune+"</td><td>"+response[i].concluzie+"</td><td>"+response[i].observatiiConcluzie+"</td><td>"+response[i].status+"</td></tr>";
        }
        actionsAcordionHeight=document.getElementById("client-actions-acordion").offsetHeight;
        document.getElementById("client-actions-acordion").style.height="0px";
    })
}




function fetchClientFile(){
    fetch("/admin/crm/includes/get-client-file-basic.php?id="+clientId).then(response=>response.json()).then(response=>{
        console.log(response);
        document.getElementById("crm-client-file-client-name").innerHTML= response.numeClient;
        document.getElementById("crm-client-file-firma").innerHTML= response.firma;
        document.getElementById("crm-client-file-cod-fiscal").innerHTML= response.codFiscal;
        document.getElementById("crm-client-file-adresa-fact").innerHTML=response.adresaFact;
        document.getElementById("crm-client-file-nr-reg-com").innerHTML=response.nrRegCom;

        if(response.logo!=""){
            document.getElementById("crm-client-file-logo").src="/clients-resources/"+clientId+"/logo.png?"+new Date().getFullYear()+ new Date().getMonth()+new Date().getDate()+new Date().getTime();
        }
        
        let clientStatus;
        if(response.status==="0"){
            clientStatus = "Closed";
        }
        else if(response.status==="1"){
            clientStatus = "Client";
        }
        else if(response.status==="2"){
            clientStatus = "Prospect"; 
        }
        else if(response.status==="3"){
            clientStatus = "Cold lead"; 
        }
        else if(response.status==="4"){
            clientStatus = "Hot lead";
        }
        else if(response.status==="5"){
            clientStatus = "Oferta trimisa";
        }
        else if(response.status==="6"){
            clientStatus = "Contract trimis";
        }
        
        document.getElementById("crm-client-file-status").innerHTML="Status - "+clientStatus;
        document.getElementById("crm-client-file-categorie").innerHTML="Categorie - "+response.categorie;
        document.getElementById("crm-client-file-service-admin").innerHTML="Client service<br>"+response.clientService;
        document.getElementById("crm-client-file-sales-admin").innerHTML="Sales<br>"+response.salesAdmin;
        document.getElementById("crm-client-file-performance-admin").innerHTML="Performance Marketing<br>"+response.performanceAdmin;
        document.getElementById("crm-client-file-sursa").innerHTML="<a href='"+response.urlSursa+"' target='_blank'>"+response.sursa+"</a>";


    })
}
function fetchEmails(){
    fetch("/admin/crm/includes/get-client-file-emails.php?id="+clientId).then(response=>response.json()).then(response=>{
        document.getElementById("client-emails-acordion").style.height="auto";
        console.log(response);
        document.getElementById("crm-client-file-emails").innerHTML="";
        document.getElementById("crm-email-adresses").innerHTML="";
        document.getElementById("future-action-email").innerHTML="<option value='' disabled selected>Email</option>"
        for(i=0;i<response.length;i++){
            let billingEmail;
            console.log(response[i].billingEmail);
            if(response[i].billingEmail==="1"){
                billingEmail="Da";
            }
            else{
                billingEmail="Nu";
            }
            document.getElementById("crm-client-file-emails").innerHTML+="<tr><td><a href='mailto: "+response[i].email+"'>"+response[i].email+"</a></td><td>"+billingEmail+"</td></tr>";

            document.getElementById("crm-email-adresses").innerHTML+="<tr><td><a href='mailto: "+response[i].email+"'>"+response[i].email+"</a></td><td>"+billingEmail+"</td><td><div class='crm-action-box-btns'><div onclick='editEmail(\""+response[i].id+"\",\""+clientId+"\")' class='crm-btn' style='background-color:#dea336' title='Modifica email'><i class='fas fa-edit'></i></div><div onclick='deleteEmail(\""+response[i].id+"\",\""+clientId+"\")' class='crm-btn' style='background-color:#d94e47' title='Sterge email'><i class='fas fa-trash-alt'></i></div></div></td></tr>";
            // document.getElementById("crm-client-file-emails").innerHTML+="<div class='crm-client-file-email-box'>"+billingEmail+"<a href='mailto: "+response[i].email+"'>"+response[i].email+"</a></div>";
            // document.getElementById("crm-email-adresses").innerHTML+="<div class='crm-email-box'><span>"+billingEmail+""+response[i].email+"</span><div class='crm-action-box-btns'><div onclick='editEmail(\""+response[i].id+"\",\""+clientId+"\")' class='crm-btn' style='background-color:#dea336' title='Modifica email'><i class='fas fa-edit'></i></div><div onclick='deleteEmail(\""+response[i].id+"\",\""+clientId+"\")' class='crm-btn' style='background-color:#d94e47' title='Sterge email'><i class='fas fa-trash-alt'></i></div></div></div>";
            document.getElementById("future-action-email").innerHTML+="<option value='"+response[i].email+"'>"+response[i].email+"</option>";
        }
        emailsAcordionHeight=document.getElementById("client-emails-acordion").offsetHeight;
        document.getElementById("client-emails-acordion").style.height="0px";
    })
}

function fetchWebsites(){
    fetch("/admin/crm/includes/get-client-file-websites.php?id="+clientId).then(response=>response.json()).then(response=>{
        document.getElementById("client-websites-acordion").style.height="auto";

        console.log(response);
        document.getElementById("crm-client-file-websites").innerHTML="";
        document.getElementById("crm-websites").innerHTML="";
        for(i=0;i<response.length;i++){
            let websiteDomeniu;
            let websiteTip;

            document.getElementById("crm-client-file-websites").innerHTML+="<tr><td>"+response[i].websiteNume+"</td><td><a href='"+response[i].websiteUrl+"'>"+response[i].websiteUrl+"</a></td><td>"+websiteTip+"</td><td>"+websiteDomeniu+"</td><td><a href='"+response[i].websiteAdminUrl+"'>"+response[i].websiteAdminUrl+"</a></td></tr>";
            document.getElementById("crm-websites").innerHTML+="<tr><td>"+response[i].websiteNume+"</td><td><a href='"+response[i].websiteUrl+"'>"+response[i].websiteUrl+"</a></td><td>"+websiteTip+"</td><td>"+websiteDomeniu+"</td><td><a href='"+response[i].websiteAdminUrl+"'>"+response[i].websiteAdminUrl+"</a></td><td>"+response[i].websiteAdminUser+"</td><td>"+response[i].websiteAdminPass+"</td><td><div class='crm-action-box-btns'><div onclick='viewWebsiteInfo(\""+response[i].id+"\",\""+clientId+"\")' title='Vezi informatii website' class='crm-btn' style='background-color:#3daad6'><i class='fas fa-eye'></i></div><div onclick='editWebsite(\""+response[i].id+"\",\""+clientId+"\")' class='crm-btn' title='Modifica website' style='background-color:#dea336'><i class='fas fa-edit'></i></div><div onclick='deleteWebsite(\""+response[i].id+"\",\""+clientId+"\")' class='crm-btn' title='Sterge website' style='background-color:#d94e47'><i class='fas fa-trash-alt'></i></div></div></td></tr>";


            // document.getElementById("crm-client-file-websites").innerHTML+="<div class='crm-client-file-website-box'><a href='"+response[i].websiteUrl+"'>"+response[i].websiteNume+"</a></div>";
            // document.getElementById("crm-websites").innerHTML+="<div class='crm-website-box'><div><span>"+response[i].websiteNume+"</span></div><div class='crm-action-box-btns'><div onclick='viewWebsiteInfo(\""+response[i].id+"\",\""+clientId+"\")' title='Vezi informatii website' class='crm-btn' style='background-color:#3daad6'><i class='fas fa-eye'></i></div><div onclick='editWebsite(\""+response[i].id+"\",\""+clientId+"\")' class='crm-btn' title='Modifica website' style='background-color:#dea336'><i class='fas fa-edit'></i></div><div onclick='deleteWebsite(\""+response[i].id+"\",\""+clientId+"\")' class='crm-btn' title='Sterge website' style='background-color:#d94e47'><i class='fas fa-trash-alt'></i></div></div></div>";
        }
        websitesAcordionHeight=document.getElementById("client-websites-acordion").offsetHeight;
        document.getElementById("client-websites-acordion").style.height="0px";
    })
    
}

function fetchPersons(){
    fetch("/admin/crm/includes/get-client-file-persons.php?id="+clientId).then(response=>response.json()).then(response=>{
        document.getElementById("client-persons-acordion").style.height="auto";

        console.log(response);

        document.getElementById("crm-client-file-pers").innerHTML="";
        document.getElementById("crm-persons").innerHTML="";
        for(i=0;i<response.length;i++){
            let esteDecident;
            if(response[i].esteDecident==="1"){
                esteDecident="Da";
            }
            else{
                esteDecident="Nu";
            }
            document.getElementById("crm-client-file-pers").innerHTML+="<tr><td>"+response[i].nume+" "+response[i].prenume+"</td><td>"+response[i].functie+"</td><td>"+esteDecident+"</td><td>"+response[i].personalitate+"</td><td><a href='mailto: "+response[i].email+"'>"+response[i].email+"</a></td><td><a href='tel: "+response[i].telefon+"'>"+response[i].telefon+"</a></td></tr>";

            document.getElementById("crm-persons").innerHTML+="<tr><td>"+response[i].nume+" "+response[i].prenume+"</td><td>"+response[i].functie+"</td><td>"+esteDecident+"</td><td>"+response[i].personalitate+"</td><td><a href='mailto: "+response[i].email+"'>"+response[i].email+"</a></td><td><a href='tel: "+response[i].telefon+"'>"+response[i].telefon+"</a></td><td><div class='crm-action-box-btns'><div onclick='editPerson(\""+response[i].id+"\",\""+clientId+"\")' title='Modifica persoana' class='crm-btn' style='background-color:#dea336'><i class='fas fa-edit'></i></div><div title='Sterge persoana' onclick='deletePerson(\""+response[i].id+"\",\""+clientId+"\")' class='crm-btn' style='background-color:#d94e47'><i class='fas fa-trash-alt'></i></div></div></td></tr>";
    
            // document.getElementById("crm-persons").innerHTML+="<div class='crm-person-box'>"+response[i].prenume+" "+response[i].nume+"<div class='crm-action-box-btns'><div onclick='editPerson(\""+response[i].id+"\",\""+clientId+"\")' title='Modifica persoana' class='crm-btn' style='background-color:#dea336'><i class='fas fa-edit'></i></div><div title='Sterge persoana' onclick='deletePerson(\""+response[i].id+"\",\""+clientId+"\")' class='crm-btn' style='background-color:#d94e47'><i class='fas fa-trash-alt'></i></div></div></div>";
        }
        personsAcordionHeight=document.getElementById("client-persons-acordion").offsetHeight;
        document.getElementById("client-persons-acordion").style.height="0px";
    })
    
}

function fetchSmAccounts(){
    fetch("/admin/crm/includes/get-client-sm-accounts.php?id="+clientId).then(response=>response.json()).then(response=>{
        document.getElementById("client-sm-accounts-acordion").style.height="auto";

        console.log(response);

        document.getElementById("crm-client-file-sm-accounts").innerHTML="";
        document.getElementById("crm-conturi-sm").innerHTML="";
        for(i=0;i<response.length;i++){
            let retea;
            let comentarii = response[i].comentarii;
            if(response[i].retea==="facebook"){
                retea = '<i class="fa-brands fa-facebook"></i>&nbsp;Facebook';
            }
            else if(response[i].retea==="instagram"){
                retea = '<i class="fa-brands fa-instagram"></i>&nbsp;Instagram';

            }
            else if(response[i].retea==="pinterest"){
                retea = '<i class="fa-brands fa-pinterest"></i></i>&nbsp;Pinterest';

            }
            else if(response[i].retea==="twitter"){
                retea = '<i class="fa-brands fa-twitter"></i>&nbsp;Twitter';

            }
            else if(response[i].retea==="linkedin"){
                retea = '<i class="fa-brands fa-linkedin"></i>&nbsp;Linkedin';

            }
            else if(response[i].retea==="tiktok"){
                retea = '<i class="fa-brands fa-tiktok"></i>&nbsp;TikTok';

            }
            else if(response[i].retea==="snapchat"){
                retea = '<i class="fa-brands fa-snapchat"></i>&nbsp;Snapchat';

            }
            else if(response[i].retea==="youtube"){
                retea = '<i class="fa-brands fa-youtube"></i>&nbsp;Youtube';

            }
            document.getElementById("crm-conturi-sm").innerHTML+="<tr> <td>"+retea+"</td> <td>"+response[i].nume+"</td> <td><a href='"+response[i].link+"'>"+response[i].link+"</a></td> <td>"+response[i].username+"</td> <td>"+response[i].password+"</td><td style='text-align:left'>"+comentarii+"</td> <td> <div class='crm-action-box-btns'> <div class='crm-btn' title='Modifica cont' style='background-color:#dea336' onclick='editSmAccount(\""+response[i].id+"\",\""+response[i].clientId+"\")'> <i class='fas fa-edit' aria-hidden='true'></i> </div> <div class='crm-btn' title='Sterge cont' style='background-color:#d94e47' onclick='deleteSmAccount(\""+response[i].id+"\",\""+response[i].clientId+"\")'> <i class='fas fa-trash-alt' aria-hidden='true'></i> </div> </div> </td> </tr>";
            document.getElementById("crm-client-file-sm-accounts").innerHTML+="<tr> <td>"+retea+"</td> <td><a href='"+response[i].link+"'>"+response[i].nume+"</a></td> </tr>";
        }
        scAccountsAcordionHeight=document.getElementById("client-sm-accounts-acordion").offsetHeight;
        document.getElementById("client-sm-accounts-acordion").style.height="0px";

    })
}

function fetchObjectives(){
    fetch("/admin/crm/includes/get-client-objectives.php?id="+clientId).then(response=>response.json()).then(response=>{
        document.getElementById("client-objectives-acordion").style.height="auto";

        console.log(response);

        document.getElementById("crm-client-file-objectives-right").innerHTML="";
        document.getElementById("crm-period-objectives").innerHTML="";
        document.getElementById("crm-general-objectives").innerHTML="";
        document.getElementById("crm-client-file-objectives-left").innerHTML="";
        if(response.status && response.status==="no-result"){
            document.getElementById("crm-general-objectives").innerHTML="<tr><td>Client</td><td></td><td rowspan='5'></td></tr> <tr><td>Social media</td><td></td></tr> <tr><td>Performance</td><td></td></tr> <tr><td>Marketing</td><td></td></tr> <tr><td>Dezvoltare online</td><td></td></tr>";
        }
        else{
            document.getElementById("crm-general-objectives").innerHTML="<tr><td>Client</td><td>"+response[0].clientObj+"</td><td rowspan='5'>"+response[0].comentarii+"</td></tr> <tr><td>Social media</td><td>"+response[0].socialObj+"</td></tr> <tr><td>Performance</td><td>"+response[0].performanceObj+"</td></tr> <tr><td>Marketing</td><td>"+response[0].marketingObj+"</td></tr> <tr><td>Dezvoltare online</td><td>"+response[0].dezvoltareOnlineObj+"</td></tr>";

            document.getElementById("crm-client-file-objectives-left").innerHTML="<h3>Client</h3><p>"+response[0].clientObj+"</p><br><h3>Social media</h3><p>"+response[0].socialObj+"</p><br><h3>Performance</h3><p>"+response[0].performanceObj+"</p><br><h3>Marketing</h3><p>"+response[0].marketingObj+"</p><br><h3>Dezvoltare online</h3><p>"+response[0].dezvoltareOnlineObj+"</p><br>";
        }

        let index=0;
        for(i=1;i<response.length;i++){
            if(!response[i].status){
                if(index===0){
                    document.getElementById("crm-client-file-objectives-right").innerHTML+="<h2>"+response[i].perStart+" - "+response[i].perSfarsit+"<h2><br><h3>Social media</h3><p>"+response[i].socialObj+"</p><br><h3>Performance</h3><p>"+response[i].performanceObj+"</p><br><h3>Marketing</h3><p>"+response[i].marketingObj+"</p><br><h3>Dezvoltare online</h3><p>"+response[i].dezvoltareOnlineObj+"</p><br><br>";
                    index++;
                }
                else if(index===1){
                    document.getElementById("crm-client-file-objectives-right").innerHTML+="<h2>"+response[i].perStart+" - "+response[i].perSfarsit+"<h2><br><h3>Social media</h3><p>"+response[i].socialObj+"</p><br><h3>Performance</h3><p>"+response[i].performanceObj+"</p><br><h3>Marketing</h3><p>"+response[i].marketingObj+"</p><br><h3>Dezvoltare online</h3><p>"+response[i].dezvoltareOnlineObj+"</p><br>";
                    index++;
                }
                document.getElementById("crm-period-objectives").innerHTML+="<tr> <td rowspan='4'> <p style='width: max-content;'>"+response[i].perStart+"<br>-<br>"+response[i].perSfarsit+"</p> </td> <td>Social media</td> <td>"+response[i].socialObj+"</td> <td rowspan='4'>"+response[i].comentarii+"</td> <td rowspan='4'> <div> <div class='crm-btn' style='background-color:#dea336' onclick='editObjective(\""+response[i].id+"\",\""+response[i].clientId+"\")'> <i class='fa-solid fa-pen-to-square'></i> </div> <div class='crm-btn' style='background-color:#d94e47' onclick='deleteObjective(\""+response[i].id+"\",\""+response[i].clientId+"\")'> <i class='fa-solid fa-trash-can'></i> </div> </div> </td> </tr> <tr> <td>Performance</td> <td>"+response[i].performanceObj+"</td> </tr> <tr> <td>Marketing</td> <td>"+response[i].marketingObj+"</td> </tr> <tr> <td>Dezvoltare online</td> <td>"+response[i].dezvoltareOnlineObj+"</td> </tr>";
            }
            
        }


        objectivesAcordionHeight=document.getElementById("client-objectives-acordion").offsetHeight;
        document.getElementById("client-objectives-acordion").style.height="0px";

    })
}

function fetchSettings(){
    fetch("/admin/crm/includes/get-client-settings.php?id="+clientId).then(response=>response.json()).then(response=>{
        let settingTypeArray = ["Cod tracking", "Cont social media","Ads account", "Catalog","Commerce account"];
        console.log(response);
        document.getElementById("crm-client-file-settings").innerHTML="";
        document.getElementById("crm-settings").innerHTML="";
        for(i=0;i<response.length;i++){
            if(response[i].subRetea!=""){
                settingRetea=response[i].retea+" - "+response[i].subRetea;
            }
            else{
                settingRetea=response[i].retea;
            }
            let settingType = settingTypeArray[response[i].tip-1];
            document.getElementById("crm-settings").innerHTML+="<tr> <td style='text-transform:capitalize'>"+settingRetea+"</td> <td>"+settingType+"</td> <td>"+response[i].cod+"</td> <td>"+response[i].comentarii+"</td> <td> <div class='crm-action-box-btns'> <div onclick='editSetting(\""+response[i].id+"\",\""+response[i].clientId+"\")' class='crm-btn' style='background-color:#dea336'> <i class='fa-solid fa-pen-to-square'></i> </div> <div onclick='deleteSetting(\""+response[i].id+"\",\""+response[i].clientId+"\")' class='crm-btn' style='background-color:#d94e47'> <i class='fa-solid fa-trash-can'></i> </div> </div> </td> </tr>";

            document.getElementById("crm-client-file-settings").innerHTML+="<tr><td style='text-transform:capitalize'>"+settingRetea+"</td><td>"+settingType+"</td></tr>";
        }

        settingsAcordionHeight=document.getElementById("client-settings-acordion").offsetHeight;
        document.getElementById("client-settings-acordion").style.height="0px";

    })
}

function fetchMediaplan(){
    fetch("/admin/crm/includes/get-client-mediaplan.php?id="+clientId).then(response=>response.json()).then(response=>{
        console.log(response);
        document.getElementById("crm-mediaplan").innerHTML="";
        for(i=0;i<12;i++){
            document.getElementById("crm-client-file-mediaplan-"+i).innerHTML="";
        }

        document.getElementById("crm-mediaplan").innerHTML="";
        // document.getElementById("crm-client-file-mediaplan").innerHTML="";

        let maxMonth=11;
        for(i=0;i<response.length;i++){
            let outputRows=[];
            if(new Date(response[i].perStart).getFullYear()===new Date().getFullYear()){
            
                let month = new Date(response[i].perStart).getMonth();
                
                console.log(response[i].retea);
                let reteaJson = response[i].retea;
    
                let retea = JSON.parse(reteaJson);
    
                
                for(j=0;j<retea.length;j++){
                    let frecventaArray = retea[j].frecventa;
                    let luniClass="",martiClass="",miercuriClass="",joiClass="",vineriClass="",sambataClass="",duminicaClass="";
                    for(k=0;k<frecventaArray.length;k++){
                        if(frecventaArray[k]==="0"){
                            luniClass="crm-mediaplan-frecventa-selected";
                        }
                        else if(frecventaArray[k]==="1"){
                            martiClass="crm-mediaplan-frecventa-selected";
                        }
                        else if(frecventaArray[k]==="2"){
                            miercuriClass="crm-mediaplan-frecventa-selected";
                        }
                        else if(frecventaArray[k]==="3"){
                            joiClass="crm-mediaplan-frecventa-selected";
                        }
                        else if(frecventaArray[k]==="4"){
                            vineriClass="crm-mediaplan-frecventa-selected";
                        }
                        else if(frecventaArray[k]==="5"){
                            sambataClass="crm-mediaplan-frecventa-selected";
                        }
                        else if(frecventaArray[k]==="6"){
                            duminicaClass="crm-mediaplan-frecventa-selected";
                        }
                    }
    
        
                    
                    frecventa="<tr> <td> "+retea[j].retea+" </td> <td> "+retea[j].tipContent+" </td> <td> <div class='crm-mediaplan-frecventa'> <span class='"+luniClass+"'>L</span> <span class='"+martiClass+"'>M</span> <span class='"+miercuriClass+"'>M</span> <span class='"+joiClass+"'>J</span> <span class='"+vineriClass+"'>V</span> <span class='"+sambataClass+"'>S</span> <span class='"+duminicaClass+"'>D</span> </div> </td> </tr>";
    
                    for(k=month;k<12;k++){
                        console.log(maxMonth,k);
                        if(k<maxMonth){
                            document.getElementById("crm-client-file-mediaplan-"+k).innerHTML+=frecventa;
                        }
                        
                    }
                    
                    
                }
                maxMonth=month;
            
            }
            let reteaJson = response[i].retea;
    
            let retea = JSON.parse(reteaJson);
            
            for(j=0;j<retea.length;j++){
                let frecventaArray = retea[j].frecventa;
                let luniClass="",martiClass="",miercuriClass="",joiClass="",vineriClass="",sambataClass="",duminicaClass="";
                for(k=0;k<frecventaArray.length;k++){
                    if(frecventaArray[k]==="0"){
                        luniClass="crm-mediaplan-frecventa-selected";
                    }
                    else if(frecventaArray[k]==="1"){
                        martiClass="crm-mediaplan-frecventa-selected";
                    }
                    else if(frecventaArray[k]==="2"){
                        miercuriClass="crm-mediaplan-frecventa-selected";
                    }
                    else if(frecventaArray[k]==="3"){
                        joiClass="crm-mediaplan-frecventa-selected";
                    }
                    else if(frecventaArray[k]==="4"){
                        vineriClass="crm-mediaplan-frecventa-selected";
                    }
                    else if(frecventaArray[k]==="5"){
                        sambataClass="crm-mediaplan-frecventa-selected";
                    }
                    else if(frecventaArray[k]==="6"){
                        duminicaClass="crm-mediaplan-frecventa-selected";
                    }
                }

                outputRows.push({"retea":retea[j].retea,"tipContent":retea[j].tipContent,"frecventa":"<div class='crm-mediaplan-frecventa'> <span class='"+luniClass+"'>L</span> <span class='"+martiClass+"'>M</span> <span class='"+miercuriClass+"'>M</span> <span class='"+joiClass+"'>J</span> <span class='"+vineriClass+"'>V</span> <span class='"+sambataClass+"'>S</span> <span class='"+duminicaClass+"'>D</span> </div>"});
                
                // outputRows.push("<tr> <td> "+retea[j].retea+" </td> <td> "+retea[j].tipContent+" </td> <td> <div class='crm-mediaplan-frecventa'> <span class='"+luniClass+"'>L</span> <span class='"+martiClass+"'>M</span> <span class='"+miercuriClass+"'>M</span> <span class='"+joiClass+"'>J</span> <span class='"+vineriClass+"'>V</span> <span class='"+sambataClass+"'>S</span> <span class='"+duminicaClass+"'>D</span> </div> </td> </tr>");

                
                
                
            }
            
            for(j=0;j<outputRows.length;j++){
                if(j===0){
                    document.getElementById("crm-mediaplan").innerHTML+="<tr><td> "+outputRows[j].retea+"</td><td> "+outputRows[j].tipContent+"</td><td>  "+outputRows[j].frecventa+"</td></td> <td rowspan='"+(k-1)+"'> "+response[i].perStart+" </td> <td rowspan='"+(k-1)+"'> "+response[i].perSfarsit+" </td> <td rowspan='"+(k-1)+"'> "+response[i].comentarii+" </td> <td rowspan='"+(k-1)+"'> <div class='crm-action-box-btns'> <div class='crm-btn' style='background-color:#dea336' onclick='editMediaplan(\""+response[i].id+"\",\""+response[i].clientId+"\")'> <i class='fa-solid fa-pen-to-square'></i> </div> <div class='crm-btn' style='background-color:#d94e47' onclick='deleteMediaplan(\""+response[i].id+"\",\""+response[i].clientId+"\")'> <i class='fa-solid fa-trash-can'></i> </div> </div> </td> </tr>";
                }
                else{
                    document.getElementById("crm-mediaplan").innerHTML+="<tr><td> "+outputRows[j].retea+"</td><td> "+outputRows[j].tipContent+"</td><td>  "+outputRows[j].frecventa+"</td></tr>";
                }
            }


            
            


            // document.getElementById("crm-mediaplan").innerHTML+="<tr> <td style='text-transform:capitalize'>"+response[i].retea+"</td> <td>"+response[i].tipContent+"</td> <td>"+frecventa+"<br>"+frecventaZile+" zile / saptamana</td> <td>"+response[i].perStart+"</td> <td>"+response[i].perSfarsit+"</td> <td>"+response[i].comentarii+"</td> <td> <div class='crm-action-box-btns'> <div class='crm-btn' style='background-color:#dea336' onclick='editMediaplan(\""+response[i].id+"\",\""+response[i].clientId+"\")'> <i class='fa-solid fa-pen-to-square'></i> </div> <div class='crm-btn' style='background-color:#d94e47' onclick='deleteMediaplan(\""+response[i].id+"\",\""+response[i].clientId+"\")'> <i class='fa-solid fa-trash-can'></i> </div> </div> </td> </tr>";

            // document.getElementById("crm-client-file-mediaplan").innerHTML+="<tr> <td style='text-transform:capitalize'>"+response[i].retea+"</td> <td>"+response[i].tipContent+"</td> <td>"+frecventa+"<br>"+frecventaZile+" zile / saptamana</td> </tr>";
        }

        mediaplanAcordionHeight=document.getElementById("client-mediaplan-acordion").offsetHeight;
        console.log(mediaplanAcordionHeight);
        document.getElementById("client-mediaplan-acordion").style.height="0px";

    })
}

function fetchBuget(){
    document.getElementById("crm-buget").innerHTML="";
    document.getElementById("crm-client-file-buget").innerHTML="";
    fetch("/admin/crm/includes/get-client-buget.php?id="+clientId).then(response=>response.json()).then(response=>{
        
        console.log(response);
        // console.log(JSON.parse(response[1].retele));
        for(i=1;i<response.length;i++){
            let retele = JSON.parse(response[i].retele);
            console.log(retele,);
            if(new Date(response[i].perioadaStart) < new Date() && new Date(response[i].perioadaSfarsit) > new Date()){
                // let retelePerioada = "";
                let firstRow=1;
                for(j=0;j<retele.length;j++){
                    if(firstRow!=0){
                        document.getElementById("crm-client-file-buget").innerHTML+="<tr style='text-transform:capitalize'><td>"+retele[j].retea+"</td><td>"+retele[j].buget+"</td><td rowspan='"+retele.length+"'>"+response[i].bugetTotal+"</td></tr>";
                        firstRow=0;
                    }
                    else{
                        document.getElementById("crm-client-file-buget").innerHTML+="<tr style='text-transform:capitalize'><td>"+retele[j].retea+"</td><td>"+retele[j].buget+"</td></tr>";

                    }
                }
            }
            isFirstRow=1;
            let tip="";

            if(response[i].tip==="1"){
                tip="Split client";
            }
            else{
                tip="Split diclick";
            }
            for(j=0;j<retele.length;j++){
                if(isFirstRow!=0){
                    
                    document.getElementById("crm-buget").innerHTML+="<tr><td rowspan='"+retele.length+"'>"+response[i].perioadaStart+"<br>-<br>"+response[i].perioadaSfarsit+"</td><td rowspan='"+retele.length+"'>"+tip+"</td><td rowspan='"+retele.length+"'>"+response[i].bugetTotal+"</td><td style='text-transform:capitalize'>"+retele[j].retea+"</td><td>"+retele[j].buget+"</td><td rowspan='"+retele.length+"'>"+response[i].comentarii+"</td><td rowspan='"+retele.length+"'><div class='crm-action-box-btns'> <div onclick='editBuget(\""+response[i].id+"\",\""+response[i].clientId+"\")' class='crm-btn' style='background-color:#dea336'> <i class='fa-solid fa-pen-to-square'></i> </div> <div onclick='deleteBuget(\""+response[i].id+"\",\""+response[i].clientId+"\")' class='crm-btn' style='background-color:#d94e47'> <i class='fa-solid fa-trash-can'></i> </div> </div></td></tr>";
                    isFirstRow=0;
                }
                else{
                    document.getElementById("crm-buget").innerHTML+="<tr><td style='text-transform:capitalize'>"+retele[j].retea+"</td><td>"+retele[j].buget+"</td></tr>";
                }
            }
            

        }

        bugetAcordionHeight=document.getElementById("client-buget-acordion").offsetHeight;
        document.getElementById("client-buget-acordion").style.height="0px";
        document.getElementById("acordion-arrow-buget").style.transform="rotate(0deg)";


    })
}

function fetchCreatie(){
    fetch("/admin/crm/includes/get-client-creatie.php?id="+clientId).then(response=>response.json()).then(response=>{
        document.getElementById("crm-creatie").innerHTML="";
        console.log(response);

        for(i=1;i<response.length;i++){
            let produseCreatie="";
            let produseObj = JSON.parse(response[i].produse);
            console.log(produseObj);
            for(j=0;j<produseObj.length;j++){
                produseCreatie+=produseObj[j].denumire+" - "+produseObj[j].cantitate+"<br>";
            }
            if(new Date(response[i].perStart) < new Date() && new Date(response[i].perSfarsit) > new Date()){
                document.getElementById("crm-client-file-creatie").innerHTML="<tr><td>"+response[i].perStart+"<br>-<br>"+response[i].perSfarsit+"</td><td>"+response[i].pachet+"</td><td>"+produseCreatie+"</td></tr>";
            }

            document.getElementById("crm-creatie").innerHTML+="<tr><td>"+response[i].perStart+"<br>-<br>"+response[i].perSfarsit+"</td><td>"+response[i].pachet+"</td><td>"+produseCreatie+"</td><td>"+response[i].comentarii+"</td><td><div class='crm-action-box-btns'><div onclick='editCreatie(\""+response[i].id+"\",\""+response[i].clientId+"\")' class='crm-btn' style='background-color:#dea336'><i class='fa-solid fa-pen-to-square'></i></div><div onclick='deleteCreatie(\""+response[i].id+"\",\""+response[i].clientId+"\")' class='crm-btn' style='background-color:#d94e47'><i class='fa-solid fa-trash-can'></i></div></div></td></tr>";

            

        }

        creatieAcordionHeight=document.getElementById("client-creatie-acordion").offsetHeight;
        document.getElementById("client-creatie-acordion").style.height="0px";

    })
}


function openViewAnexe(){
    let modal=document.getElementById('modal-anexe');
    document.body.style.overflow="hidden";
    modal.style.display="block";

    setTimeout(()=>{
        modal.style.opacity="1";
    },50);
}

function closeViewAnexa(){
    let modal=document.getElementById('modal-anexe');
    document.body.style.overflow="auto";
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
    },300);
}

function newAnexa(){
    let modal=document.getElementById('modal-new-anexa');
    document.body.style.overflow="hidden";
    modal.style.display="block";

    setTimeout(()=>{
        modal.style.opacity="1";
    },50);
}
function closeNewAnexa(){
    let modal=document.getElementById('modal-new-anexa');
    document.body.style.overflow="auto";
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
    },300);
}

let newAnexaForm = document.getElementById("crm-new-anexa");
newAnexaForm.addEventListener("submit",e=>{
    e.preventDefault();
    startLoading();

    const data = new FormData();

    for(const p of new FormData(newAnexaForm)){
        data.append(p[0],p[1]);
    }
    data.append("client",clientId);

    fetch("/admin/crm/includes/new-client-anexa.php",{
        method: "POST",
        body: data
    }).then(response=>response.json()).then(response=>{
        console.log(response);

        if(response.status==="success"){
            successPopUp("Anexa a fost adaugata cu succes.");
            newAnexaForm.reset();
            fetchAnexe();
            closeNewAnexa();
        }
        else{
            failPopUp(response.error);
        }
        stopLoading();
    })

})

function viewFullAnexa(contract,file){
    window.open("/clients-resources/"+clientId+"/contracts/"+file,'_blank').focus;
}

function deleteAnexa(contract){
    if(confirm("Sigur doresti sa stergi acest contract?")){
        startLoading();
        fetch("/admin/crm/includes/delete-client-contract.php?client="+clientId+"&id="+contract).then(response=>response.json()).then(response=>{
            if(response.status==="success"){
                successPopUp("Contractul a fost sters cu succes.");
                fetchContracts();
            }
            else{
                failPopUp(response.error);
            }
            stopLoading();
        })
    }   
}

function editAnexa(contract){
    fetch("/admin/crm/includes/get-contract-info.php?client="+clientId+"&id="+contract).then(response=>response.json()).then(response=>{
        console.log(response);

        document.getElementById("edit-contract-start").value=response[0].perStart;
        document.getElementById("edit-contract-sfarsit").value=response[0].perSfarsit;
        document.getElementById("edit-contract-observatii").value=response[0].observatii;
        if(response[0].tip==="1"){
            document.getElementById("edit-contract-tip-cadru").checked=true;
        }
        else{
            document.getElementById("edit-contract-tip-anexa").checked=true;

        }

    })
    let modal=document.getElementById('modal-edit-contract');
    document.body.style.overflow="hidden";
    modal.style.display="block";

    setTimeout(()=>{
        modal.style.opacity="1";
    },50);
}

function closeEditContract(){
    let modal=document.getElementById('modal-edit-contract');
    document.body.style.overflow="auto";
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
    },300);
}



function openEditEmails(){
    let modal=document.getElementById('modal-edit-email-adresses');
    document.body.style.overflow="hidden";
    modal.style.display="block";
    setTimeout(()=>{
        modal.style.opacity="1";
    },50);
    
  }
  
function closeEditEmailAdresses(){
    let modal=document.getElementById('modal-edit-email-adresses');
    document.body.style.overflow="auto";
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
    },300);
  }
function newEmailAdress(){
    let modal=document.getElementById('modal-new-email-adress');
    modal.style.display="flex";
    setTimeout(()=>{
        modal.style.opacity="1";
    },50);
}
function closeNewEmailAdress(){
    let modal=document.getElementById('modal-new-email-adress');
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
    },300);
  }

let newEmailForm = document.getElementById("crm-new-email-form");
newEmailForm.addEventListener("submit",e=>{
    e.preventDefault();
    const data = new FormData();
    data.append("clientId",clientId);
    for(const p of new FormData(newEmailForm)){
        data.append(p[0],p[1]);
    }
    fetch("/admin/crm/includes/new-client-email.php",{
        method: "POST",
        body: data
    }).then(response=>response.json()).then(response=>{
        console.log(response);
        if(response.status==="success"){
            fetchEmails();
            closeNewEmailAdress();
            newEmailForm.reset();
            successPopUp("Adresa de email a fost adaugata cu succes");
        }
        else{
            failPopUp(response.error);
            console.log(response.error);
        }
    })
})

let editEmailForm = document.getElementById("crm-edit-email-form");
editEmailForm.addEventListener("submit",e=>{
    e.preventDefault();
    const data= new FormData();

    for(const p of new FormData(editEmailForm)){
        data.append(p[0],p[1]);
    }
    fetch("/admin/crm/includes/edit-client-email.php",{
        method: "POST",
        body: data
    }).then(response=>response.json()).then(response=>{
        console.log(response);
        if(response.status==="success"){
            fetchEmails();
            closeEditEmailAdress();
            editEmailForm.reset();
            successPopUp("Adresa de email a fost modificata cu succes");
        }
        else{
            console.log(response.error);
            failPopUp(response.error);
        }
    })
})

function deleteEmail(id,idC){
    console.log(id,idC);
    fetch("/admin/crm/includes/delete-client-email.php?id="+id+"&clientId="+idC).then(response=>response.json()).then(response=>{
        console.log(response);
        if(response.status==="success"){
            fetchEmails();
            successPopUp("Adresa de email a fost eliminata cu succes");
        }
        else{
            console.log(response.error);
            failPopUp(response.error);
        }
    })
}

function editEmail(id,idC){
    fetch("/admin/crm/includes/get-email-info.php?id="+id+"&clientId="+idC).then(response=>response.json()).then(response=>{
        document.getElementById("edit-email-id").value=id;
        document.getElementById("edit-email-clientId").value=idC;
        document.getElementById("edit-email").value=response.email;
        if(response.billingEmail==="1"){
            document.getElementById("edit-billing-email").setAttribute("checked","");
        }
        else{
            document.getElementById("edit-billing-email").removeAttribute("checked");
        }
        
    })
    let modal=document.getElementById('modal-edit-email-adress');
    modal.style.display="flex";
    setTimeout(()=>{
        modal.style.opacity="1";
    },50);
  }
  function closeEditEmailAdress(){
    let modal=document.getElementById('modal-edit-email-adress');
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
    },300);
  }




function openEditWebsites(){
    let modal=document.getElementById('modal-edit-websites');
    document.body.style.overflow="hidden";
    modal.style.display="block";
    setTimeout(()=>{
        modal.style.opacity="1";
    },50);
    
  }
  
function closeEditWebsites(){
    let modal=document.getElementById('modal-edit-websites');
    document.body.style.overflow="auto";
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
    },300);
  }

  function deleteWebsite(id,idC){
    console.log(id,idC);
    fetch("/admin/crm/includes/delete-client-website.php?id="+id+"&clientId="+idC).then(response=>response.json()).then(response=>{
        console.log(response);
        if(response.status==="success"){
            fetchWebsites();
            closeViewWebsite();
            successPopUp("Website eliminat cu succes");
        }
        else{
            console.log(response.error);
            failPopUp(response.error);
        }
    })
  }

  function viewWebsiteInfo(id,idC){
    fetch("/admin/crm/includes/get-website-info.php?id="+id+"&clientId="+idC).then(response=>response.json()).then(response=>{
        document.getElementById("view-website-name").innerText=response.websiteNume;
        document.getElementById("view-website-url").innerText=response.websiteUrl;
        document.getElementById("view-website-url").href=response.websiteUrl;
        document.getElementById("view-website-tip").innerText=response.websiteTip;
        document.getElementById("view-website-domeniu").innerText=response.domeniu;
        document.getElementById("view-website-url-admin").innerText=response.websiteUrlAdmin;
        document.getElementById("view-website-admin-username").innerText=response.websiteAdminUser;
        document.getElementById("view-website-admin-password").innerText=response.websiteAdminPass;
    })
    document.getElementById("edit-website-btn").setAttribute("onclick","editWebsite(\""+id+"\",\""+idC+"\")");
    document.getElementById("delete-website-btn").setAttribute("onclick","deleteWebsite(\""+id+"\",\""+idC+"\")")
    let modal=document.getElementById('modal-view-website');
    modal.style.display="flex";
    setTimeout(()=>{
        modal.style.opacity="1";
    },50);
  }
  function closeViewWebsite(){
    document.getElementById("edit-website-btn").setAttribute("onclick","");
    let modal=document.getElementById('modal-view-website');
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
    },300);

  }

  function editWebsite(id,idC){
    fetch("/admin/crm/includes/get-website-info.php?id="+id+"&clientId="+idC).then(response=>response.json()).then(response=>{
        document.getElementById("edit-website-id").value=id;
        document.getElementById("edit-website-clientId").value=idC;
        document.getElementById("edit-website-name").value=response.websiteNume;
        document.getElementById("edit-website-url").value=response.websiteUrl;
        document.getElementById("edit-website-tip").value=response.websiteTip;
        document.getElementById("edit-website-domeniu").value=response.domeniu;
        document.getElementById("edit-website-url-admin").value=response.websiteUrlAdmin;
        document.getElementById("edit-website-admin-username").value=response.websiteAdminUser;
        document.getElementById("edit-website-admin-password").value=response.websiteAdminPass;
    })
    document.getElementById("edit-website-btn").setAttribute("onclick","editWebsite(\""+id+"\",\""+idC+"\")");
    let modal=document.getElementById('modal-edit-website');
    modal.style.display="flex";
    setTimeout(()=>{
        modal.style.opacity="1";
    },50);
  }
  function closeEditWebsite(){
    let modal=document.getElementById('modal-edit-website');
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
    },300);
  }


let editWebsiteForm = document.getElementById("edit-website-form");
editWebsiteForm.addEventListener("submit",e=>{
    e.preventDefault();

    const data = new FormData();
    for(const p of new FormData(editWebsiteForm)){
        data.append(p[0],p[1]);
    }
    fetch("/admin/crm/includes/edit-client-website.php",{
        method: "POST",
        body: data
    }).then(response=>response.json()).then(response=>{
        console.log(response);
        if(response.status==="success"){
            closeEditWebsite();
            fetchWebsites();
            successPopUp("Website modificat cu succes!");
        }
        else{
            failPopUp(response.error);
        }
    })
})

function newWebsite(){
    newWebsiteForm.reset();

    document.getElementById("new-website-clientId").value=clientId;
    let modal=document.getElementById('modal-new-website');
    modal.style.display="flex";
    setTimeout(()=>{
        modal.style.opacity="1";
    },50);
}

function closeNewWebsite(){
    let modal=document.getElementById('modal-new-website');
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
    },300);
    document.getElementById("new-website-form").reset();
}

let newWebsiteForm = document.getElementById("new-website-form");

newWebsiteForm.addEventListener("submit",e=>{
    e.preventDefault();

    const data = new FormData();

    for (const p of new FormData(newWebsiteForm)){
        data.append(p[0],p[1]);
    }

    fetch("/admin/crm/includes/new-client-website.php",{
        method: "POST",
        body: data
    }).then(response=>response.json()).then(response=>{
        if(response.status==="success"){
            fetchWebsites();
            closeNewWebsite();
            newWebsiteForm.reset();
            successPopUp("Website adaugat cu succes");
        }
        else{
            failPopUp(response.error);
            console.log(response.error);
        }
    })

})





  function openEditPers(){

    let modal=document.getElementById('modal-edit-persons');
    document.body.style.overflow="hidden";
    modal.style.display="block";
    setTimeout(()=>{
        modal.style.opacity="1";
    },50);
  }

  function closeEditPersons(){
    let modal=document.getElementById('modal-edit-persons');
    document.body.style.overflow="auto";
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
    },300);
  }

let newPersonForm= document.getElementById("crm-new-person-form");

newPersonForm.addEventListener("submit",e=>{
    e.preventDefault();

    const data = new FormData();

      for(const p of new FormData(newPersonForm)){
          data.append(p[0],p[1]);
      }

      fetch("/admin/crm/includes/new-client-person.php",{
          method: "POST",
          body: data
      }).then(response=>response.json()).then(response=>{
            console.log(response);
            if(response.status==="success"){
                closeNewPerson();
                fetchPersons();
                successPopUp("Persoana de conctact adaugata cu succes");
            }
            else{
                failPopUp(response.error);
                console.log(response.error);
            }
      })
})

  function newPerson(){
    newPersonForm.reset();
    document.getElementById("new-person-clientId").value=clientId;
    let modal=document.getElementById('modal-new-person');
    modal.style.display="flex";
    setTimeout(()=>{
        modal.style.opacity="1";
    },50);
  }
  function closeNewPerson(){
    let modal=document.getElementById('modal-new-person');
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
    },300);
  }

  function editPerson(id,idC){
    fetch("/admin/crm/includes/get-person-info.php?id="+id+"&clientId="+idC).then(response=>response.json()).then(response=>{
        document.getElementById("edit-person-id").value=id;
        document.getElementById("edit-person-clientId").value=idC;
        document.getElementById("edit-person-nume").value=response.nume;
        document.getElementById("edit-person-prenume").value=response.prenume;
        if(response.esteDecident==="1"){
            document.getElementById("edit-person-decident").setAttribute("checked","");
        }
        else{
            document.getElementById("edit-person-decident").removeAttribute("checked");
        }
        document.getElementById("edit-person-functie").value=response.functie;
        document.getElementById("edit-person-email").value=response.email;
        document.getElementById("edit-person-telefon").value=response.telefon;
    })
    
    let modal=document.getElementById('modal-edit-person');
    modal.style.display="flex";
    setTimeout(()=>{
        modal.style.opacity="1";
    },50);
  }

  function closeEditPerson(){
    let modal=document.getElementById('modal-edit-person');
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
    },300);
  }

  let editPersonForm = document.getElementById("crm-edit-person-form");
  editPersonForm.addEventListener("submit",e=>{
      e.preventDefault();

      const data = new FormData();

      for(const p of new FormData(editPersonForm)){
          data.append(p[0],p[1]);
      }

      fetch("/admin/crm/includes/edit-client-person.php",{
          method: "POST",
          body: data
      }).then(response=>response.json()).then(response=>{
            console.log(response);
            if(response.status==="success"){
                closeEditPerson();
                fetchPersons();
                successPopUp("Persoana de contact a fost modificata cu succes");
            }
            else{
                failPopUp(response.error);
                console.log(response.error);
            }
      })
  })

  function deletePerson(id,idC){
    console.log(id,idC);
    fetch("/admin/crm/includes/delete-client-person.php?id="+id+"&clientId="+idC).then(response=>response.json()).then(response=>{
        console.log(response);
        if(response.status==="success"){
            fetchPersons();
            successPopUp("Persoana de contact a fost eliminata cu succes");
        }
        else{
            failPopUp(response.error);
            console.log(response.error);
        }
    })
  }

function newAction(){
    newActionForm.reset();
    document.getElementById('new-action-clientId').value=clientId;
    let modal=document.getElementById('modal-new-action');
    modal.style.display="flex";
    setTimeout(()=>{
        modal.style.opacity="1";
    },50);
}

function closeNewAction(){
    let modal=document.getElementById('modal-new-action');
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
    },300);
}

let resultSelector = document.getElementById("new-rezultat");
resultSelector.addEventListener("change",e=>{
    e.preventDefault();
    if(e.target.value === "2"){
        showFutureActionInput();
        document.getElementById("future-action-yes").checked=true;
    }
})

let futureActionRadio = document.querySelectorAll(".future-action-radio");

futureActionRadio.forEach(button => {
    button.onclick= ()=>{
        if(button.checked){
            if(button.value==="1"){
                showFutureActionInput();
            }
            else{
                hideFutureActionInput();
            }
        }
    }
});

function showFutureActionInput(){
    console.log("da");
    document.getElementById("future-action-inputs").style.display="flex";
}

function hideFutureActionInput(){
    console.log("nu");
    document.getElementById("future-action-inputs").style.display="none";
}

document.getElementById("future-action-tip").addEventListener("change",e=>{
    e.preventDefault();
    if(document.getElementById("future-action-tip").value==="1" || document.getElementById("future-action-tip").value==="2" || document.getElementById("future-action-tip").value==="3"){
        showFutureActionPhoneInput();
    }
    else{
        showFutureActionMailInput();
    }
})

function showFutureActionPhoneInput(){
    document.getElementById("future-action-phone-input").style.display="block";
    document.getElementById("future-action-email-input").style.display="none";
}

function showFutureActionMailInput(){
    document.getElementById("future-action-phone-input").style.display="none";
    document.getElementById("future-action-email-input").style.display="block";
}

let newActionForm = document.getElementById("crm-new-action-form");
newActionForm.addEventListener("submit",e=>{
    e.preventDefault();

    const data = new FormData();
    data.append('clientId',clientId);
    for(const p of new FormData(newActionForm)){
        data.append(p[0],p[1]);
    }

    fetch("/admin/crm/includes/new-action.php",{
        method: "POST",
        body: data
    }).then(response=>response.json()).then(response=>{
        console.log(response);
        if(response.status==="success"){
            closeNewAction();
            fetchActions();
            hideFutureActionInput();
            newActionForm.reset();
            successPopUp("Actiunea a fost salvata cu succes!")
        }
        else{
            failPopUp(response.error);
            console.log(response.error);
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



function openSmAccounts(){
    let modal=document.getElementById('modal-conturi-sm');
    document.body.style.overflow="hidden";
    modal.style.display="block";
    setTimeout(()=>{
        modal.style.opacity="1";
    },50);
}


function closeConturiSm(){
    let modal=document.getElementById('modal-conturi-sm');
    document.body.style.overflow="auto";
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
    },300);
}

function newSmAccount(){
    let modal=document.getElementById('modal-add-sm-account');
    modal.style.display="block";
    setTimeout(()=>{
        modal.style.opacity="1";
    },50);
}

function closeNewSmAccount(){
    let modal=document.getElementById('modal-add-sm-account');
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
    },300);
}

document.getElementById("crm-add-sm-account").addEventListener("submit",e=>{
    e.preventDefault();
    startLoading();
    const data= new FormData();
    data.append("clientId",clientId);
    for(const p of new FormData(document.getElementById("crm-add-sm-account"))){
        data.append(p[0],p[1]);
    }
    fetch("/admin/crm/includes/add-client-sm-account.php",{
        method:"POST",
        body: data
    }).then(response=>response.json()).then(response=>{
        console.log(response);
        if(response.status==="success"){
            successPopUp("Contul de social media a fost adaugat cu succes.");
            fetchSmAccounts();
            document.getElementById("crm-add-sm-account").reset();
            closeNewSmAccount();
        }
        else{
            failPopUp(response.error);
        }
        stopLoading();
    })
})

function deleteSmAccount(id,client){
    startLoading();
    fetch("/admin/crm/includes/delete-sm-account.php?id="+id+"&client="+client).then(response=>response.json()).then(response=>{
        if(response.status==="success"){
            successPopUp("Contul de social media a fost sters cu succes");
            fetchSmAccounts();
        }
        else{
            failPopUp(response.error);
        }
        stopLoading();
    })
}

function editSmAccount(id,client){
    document.getElementById("edit-sm-account-id").value=id;
    document.getElementById("edit-sm-account-clientId").value=client;
    fetch("/admin/crm/includes/get-sm-account-info.php?id="+id+"&clientId="+client).then(response=>response.json()).then(response=>{
        console.log(response);
        document.getElementById("edit-sm-account-retea").value=response.retea;
        document.getElementById("edit-sm-account-nume").value=response.nume;
        document.getElementById("edit-sm-account-link").value=response.link;
        let comentarii = response.comentarii.replaceAll("<br>","\n");
        if(response.personalAccount==="1"){
            document.getElementById("edit-sm-account-personal").checked=true;   
        }else{
            document.getElementById("edit-sm-account-personal").checked=false;

        }
        document.getElementById("edit-sm-account-username").value=response.loginUser;
        document.getElementById("edit-sm-account-password").value=response.loginPass;
        document.getElementById("edit-sm-account-comm").value=comentarii;

    })
    let modal=document.getElementById('modal-edit-sm-account');
    modal.style.display="block";
    setTimeout(()=>{
        modal.style.opacity="1";
    },50);
}

function closeEditSmAccount(){
    let modal=document.getElementById('modal-edit-sm-account');
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
    },300);
}
let editSmAccountForm = document.getElementById("crm-edit-sm-account");
editSmAccountForm.addEventListener("submit",e=>{
    e.preventDefault();
    startLoading();

    const data = new FormData();

    for(const p of new FormData(editSmAccountForm)){
        data.append(p[0],p[1]);
    }
    fetch("/admin/crm/includes/edit-client-sm-account.php",{
        method:"POST",
        body: data
    }).then(response=>response.json()).then(response=>{
        console.log(response);
        if(response.status==="success"){
            successPopUp("Contul de social media a fost modificat cu succes.");
            fetchSmAccounts();
            closeEditSmAccount();
        }
        else{
            failPopUp(response.error);
        }
        stopLoading();
    })
})





function openObjectives(){
    let modal=document.getElementById('modal-objectives');
    document.body.style.overflow="hidden";
    modal.style.display="block";
    setTimeout(()=>{
        modal.style.opacity="1";
    },50);
}


function closeObjectives(){
    let modal=document.getElementById('modal-objectives');
    document.body.style.overflow="auto";
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
    },300);
}

function newObjective(){
    let modal=document.getElementById('modal-add-objective');
    modal.style.display="block";
    setTimeout(()=>{
        modal.style.opacity="1";
    },50);
}

function closeNewObjective(){
    let modal=document.getElementById('modal-add-objective');
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
    },300);
}
let newObjectiveForm = document.getElementById("crm-add-objective");
newObjectiveForm.addEventListener("submit",e=>{
    e.preventDefault();
    startLoading();
    const data= new FormData();
    data.append("clientId",clientId);
    for(const p of new FormData(newObjectiveForm)){
        data.append(p[0],p[1]);
    }
    fetch("/admin/crm/includes/add-client-objective.php",{
        method:"POST",
        body: data
    }).then(response=>response.json()).then(response=>{
        console.log(response);
        if(response.status==="success"){
            successPopUp("Obiectivul a fost adaugat cu succes.");
            fetchObjectives();
            newObjectiveForm.reset();
            closeNewObjective();
        }
        else{
            failPopUp(response.error);
        }
        stopLoading();
    })
})

function editObjective(id,client){
    document.getElementById("edit-objective-id").value=id;
    document.getElementById("edit-objective-clientId").value=client;
    fetch("/admin/crm/includes/get-objective-info.php?id="+id+"&clientId="+client).then(response=>response.json()).then(response=>{
        console.log(response);
        document.getElementById("edit-objective-start-date").value=response.perStart;
        document.getElementById("edit-objective-end-date").value=response.perSfarsit;
        document.getElementById("edit-objective-socialmedia-per").value=response.socialObj.replaceAll("<br>","\n");
        document.getElementById("edit-objective-client-per").value=response.clientObj.replaceAll("<br>","\n");
        document.getElementById("edit-objective-performance-per").value=response.performanceObj.replaceAll("<br>","\n");
        document.getElementById("edit-objective-marketing-per").value=response.marketingObj.replaceAll("<br>","\n");
        document.getElementById("edit-objective-dezvoltare-online-per").value=response.dezvoltareOnlineObj.replaceAll("<br>","\n");
        let comentarii = response.comentarii.replaceAll("<br>","\n");
        
        
        document.getElementById("edit-objective-comm-per").value=comentarii;

    })
    let modal=document.getElementById('modal-edit-objective');
    modal.style.display="block";
    setTimeout(()=>{
        modal.style.opacity="1";
    },50);
}

function closeEditObjective(){
    let modal=document.getElementById('modal-edit-objective');
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
    },300);
}


let editObjectiveForm = document.getElementById("crm-edit-objective");
editObjectiveForm.addEventListener("submit",e=>{
    e.preventDefault();
    startLoading();

    const data = new FormData();

    for(const p of new FormData(editObjectiveForm)){
        data.append(p[0],p[1]);
    }
    fetch("/admin/crm/includes/edit-client-objective.php",{
        method:"POST",
        body: data
    }).then(response=>response.json()).then(response=>{
        console.log(response);
        if(response.status==="success"){
            successPopUp("Obiectivul a fost modificat cu succes.");
            editObjectiveForm.reset();
            fetchObjectives();
            closeEditObjective();
        }
        else{
            failPopUp(response.error);
        }
        stopLoading();
    })
});

function deleteObjective(id,client){
    fetch("/admin/crm/includes/delete-client-objective.php?id="+id+"&client="+client).then(response=>response.json()).then(response=>{
        console.log(response);
        if(response.status==="success"){
            successPopUp("Obiectivul a fost sters cu succes");
            fetchObjectives();
        }
        else{
            failPopUp(response.error);
        }
    })
}

function editGeneralObjectives(){
    
    document.getElementById("edit-general-objective-clientId").value=clientId;
    fetch("/admin/crm/includes/get-general-objective.php?clientId="+clientId).then(response=>response.json()).then(response=>{
        console.log(response);
        if(!response.status && response.status!="no-result"){
            document.getElementById("edit-objective-client").value=response.clientObj;
            document.getElementById("edit-objective-socialmedia").value=response.socialObj;
            document.getElementById("edit-objective-performance").value=response.performanceObj;
            document.getElementById("edit-objective-marketing").value=response.marketingObj;
            document.getElementById("edit-objective-dezvoltare-online").value=response.dezvoltareOnlineObj;
            document.getElementById("edit-objective-comm").value=response.comentarii;
        }

    })
    let modal=document.getElementById('modal-edit-general-objective');
    modal.style.display="block";
    setTimeout(()=>{
        modal.style.opacity="1";
    },50);
}

function closeEditGeneralObjective(){
    let modal=document.getElementById('modal-edit-general-objective');
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
    },300);
}

let editGeneralObjectiveForm = document.getElementById("crm-edit-general-objective");
editGeneralObjectiveForm.addEventListener("submit",e=>{
    e.preventDefault();
    startLoading();

    const data = new FormData();
    data.append("clientId",clientId);
    for(const p of new FormData(editGeneralObjectiveForm)){
        data.append(p[0],p[1]);
    }
    fetch("/admin/crm/includes/edit-client-general-objective.php",{
        method:"POST",
        body: data
    }).then(response=>response.json()).then(response=>{
        console.log(response);
        if(response.status==="success"){
            successPopUp("Obiectivul general a fost modificat cu succes.");
            editGeneralObjectiveForm.reset();
            fetchObjectives();
            closeEditGeneralObjective();
        }
        else{
            failPopUp(response.error);
        }
        stopLoading();
    })
})



function openSettings(){
    let modal=document.getElementById('modal-settings');
    document.body.style.overflow="hidden";
    modal.style.display="block";
    setTimeout(()=>{
        modal.style.opacity="1";
    },50);
}

function closeSettings(){
    let modal=document.getElementById('modal-settings');
    document.body.style.overflow="auto";
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
    },300);
}

function newSettings(){
    let modal=document.getElementById('modal-add-settings');
    modal.style.display="block";
    setTimeout(()=>{
        modal.style.opacity="1";
    },50);
}

let settingTypeSelector = document.getElementById("add-setting-tip");
settingTypeSelector.addEventListener("change",e=>{
    if(e.target.value==="2"){
        document.getElementById("settings-new-account").style.display="block";
        document.getElementById("settings-new-code").style.display="none";

    }
    else{
        document.getElementById("settings-new-account").style.display="none";
        document.getElementById("settings-new-code").style.display="block";

    }
})

let settingReteaSelector = document.getElementById("add-setting-retea").addEventListener("change",e=>{
    if(e.target.value==="google"){
        document.getElementById("setting-google-platforms").style.display="block";
    }
    else{
        document.getElementById("setting-google-platforms").style.display="none";
    }
})

function closeNewSettings(){
    let modal=document.getElementById('modal-add-settings');
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
    },300);
}

let addSettingsForm = document.getElementById("crm-add-settings");
addSettingsForm.addEventListener("submit",e=>{
    e.preventDefault();
    startLoading();

    const data = new FormData();
    data.append("clientId",clientId);

    for(const p of new FormData(addSettingsForm)){
        data.append(p[0],p[1]);
    }
    fetch("/admin/crm/includes/add-client-setting.php",{
        method: "POST",
        body:data
    }).then(response=>response.json()).then(response=>{
        console.log(response);
        if(response.status==="success"){
            successPopUp("Setarea a fost adaugata cu scucces.");
            addSettingsForm.reset();
            fetchSettings();
            closeNewSettings();
        }
        else{
            failPopUp(response.error);
        }
        stopLoading();
    })
})

function deleteSetting(id,client){
    startLoading();
    fetch("/admin/crm/includes/delete-client-setting.php?id="+id+"&client="+client).then(response=>response.json()).then(response=>{
        if(response.status==="success"){
            successPopUp("Setarea a fost stearsa cu succes.");
            fetchSettings();
        }
        else{
            failPopUp(response.error);
        }
        stopLoading();
    })
}

function editSetting(id,client){
    document.getElementById("edit-setting-id").value=id;
    document.getElementById("edit-setting-clientId").value=client;
    fetch("/admin/crm/includes/get-setting-info.php?id="+id+"&clientId="+client).then(response=>response.json()).then(response=>{
        console.log(response);
        
        document.getElementById("edit-settings-id").value=response.cod;
        document.getElementById("edit-settings-owner").value=response.ownership;
        document.getElementById("edit-setting-sub-retea").value=response.subRetea;
        document.getElementById("edit-setting-retea").value=response.retea;
        document.getElementById("edit-setting-tip").value=response.tip;

        if(response.retea==="google"){
            document.getElementById("edit-setting-google-platforms").style.display="block";
        }
        else{
            document.getElementById("edit-setting-google-platforms").style.display="none";
        }

        let comentarii = response.comentarii.replaceAll("<br>","\n");
        
        
        document.getElementById("edit-setting-comm").value=comentarii;

    })
    let modal=document.getElementById('modal-edit-settings');
    modal.style.display="block";
    setTimeout(()=>{
        modal.style.opacity="1";
    },50);
}
let editSettingReteaSelector = document.getElementById("edit-setting-retea");
editSettingReteaSelector.addEventListener("change",e=>{
    if(e.target.value==="google"){
        document.getElementById("edit-setting-google-platforms").style.display="block";
    }
    else{
        document.getElementById("edit-setting-google-platforms").style.display="none";
    }
})
function closeEditSetting(){
    let modal=document.getElementById('modal-edit-settings');
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
    },300);
}
let editSettingForm = document.getElementById("crm-edit-setting");
editSettingForm.addEventListener("submit",e=>{
    e.preventDefault();
    startLoading();

    const data = new FormData();

    for(const p of new FormData(editSettingForm)){
        data.append(p[0],p[1]);
    }
    fetch("/admin/crm/includes/edit-client-setting.php",{
        method:"POST",
        body: data
    }).then(response=>response.json()).then(response=>{
        console.log(response);
        if(response.status==="success"){
            successPopUp("Setarea a fost modificata cu succes.");
            fetchSettings();
            closeEditSetting();

        }
        else{
            failPopUp(response.error);
        }
        stopLoading();
    })
})







function openMediaplan(){
    let modal=document.getElementById('modal-mediaplan');
    document.body.style.overflow="hidden";
    modal.style.display="block";
    setTimeout(()=>{
        modal.style.opacity="1";
    },50);
}

function closeMediaplan(){
    let modal=document.getElementById('modal-mediaplan');
    document.body.style.overflow="auto";
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
    },300);
}

function newMediaplan(){
    let modal=document.getElementById('modal-add-mediaplan');
    modal.style.display="block";
    setTimeout(()=>{
        modal.style.opacity="1";
    },50);
}

function closeNewMediaplan(){
    let modal=document.getElementById('modal-add-mediaplan');
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
    },300);
}

function addMediaplanNewRetea(){
    let elId=Math.floor(Math.random()*90000) + 10000;
    let el = document.createElement('div');
    el.id = "mediaplan-retea-"+elId;
    el.classList.add("mediaplan-retea");
    el.innerHTML = "<div class='input-container'><i class='fa-solid fa-trash-can' onclick='deleteMpRetea(\""+elId+"\")'></i><input hidden name='retea-id[]' value='"+elId+"'><label for=''>Retea</label><select onchange='mpContentOptions(\""+elId+"\",event)' name='add-mediaplan-retea-"+elId+"' required> <option value='' disabled selected>Alege retea</option> <option value='facebook'>Facebook</option> <option value='instagram'>Instagram</option> <option value='pinterest'>Pinterest</option> <option value='twitter'>Twitter</option> <option value='linkedin'>Linkedin</option> <option value='tiktok'>TikTok</option> <option value='snapchat'>Snapchat</option> <option value='youtube'>Youtube</option> <option value='reddit'>Reddit</option> </select></div> <div class='input-container'><label for=''>Tip content</label><select name='add-mediaplan-tip-"+elId+"' id='add-mediaplan-tip-"+elId+"' style='text-transform:capitalize'> <option value='' selected disabled>Tip content</option> </select></div> <div class='input-container'><label for=''>Frecventa (saptamanal)</label> <div id='week-day-picker'> <span onclick='checkWeekDay(\"0\",\""+elId+"\",event)' class='week-day-btn-0'>L</span> <span onclick='checkWeekDay(\"1\",\""+elId+"\",event)' class='week-day-btn-1'>M</span> <span onclick='checkWeekDay(\"2\",\""+elId+"\",event)' class=' week-day-btn-2'>M</span> <span onclick='checkWeekDay(\"3\",\""+elId+"\",event)' class='week-day-btn-3'>J</span> <span onclick='checkWeekDay(\"4\",\""+elId+"\",event)' class='week-day-btn-4'>V</span> <span onclick='checkWeekDay(\"5\",\""+elId+"\",event)' class='week-day-btn-5'>S</span> <span onclick='checkWeekDay(\"6\",\""+elId+"\",event)' class='week-day-btn-6'>D</span> </div> <div style='display: flex;'> <input type='text' name='week-days-"+elId+"' hidden required class='week-days'> <input type='checkbox' class='week-day-checkbox' name='week-day-0' hidden> <input type='checkbox' class='week-day-checkbox' name='week-day-1' hidden> <input type='checkbox' class='week-day-checkbox' name=' week-day-2' hidden> <input type='checkbox' class='week-day-checkbox' name='week-day-3' hidden> <input type='checkbox' class='week-day-checkbox' name='week-day-4' hidden> <input type='checkbox' class='week-day-checkbox' name='week-day-5' hidden> <input type='checkbox' class='week-day-checkbox' name='week-day-6' hidden> </div> </div> </div>";
    document.getElementById("mediaplan-retele").appendChild(el);

}

function deleteMpRetea(id){
    if(document.getElementById("mediaplan-retea-"+id)){
        document.getElementById("mediaplan-retea-"+id).remove();
    }
    else{
        document.getElementById("edit-mediaplan-retea-"+id).remove();
    }
}

function checkWeekDay(day, id, e){

    let idDiv =document.getElementById("mediaplan-retea-"+id);

    let checkboxes = idDiv.getElementsByClassName("week-day-checkbox");
    checkboxes[day].click();
    let weekDays = idDiv.getElementsByClassName("week-days");
    let weekDaysInput;
    if(weekDays[0].value===""){
        weekDaysInput = [];
    }
    else{
        weekDaysInput = JSON.parse(weekDays[0].value);
    }
    if(checkboxes[day].checked === true){
        e.target.classList.add("week-day-selected");
        weekDaysInput.push(day);
    }
    else{
        e.target.classList.remove("week-day-selected");
        weekDaysInput.pop(day);
    }

    
    if(weekDaysInput.length<1){
        weekDays[0].value="";
    }
    else{
        weekDays[0].value=JSON.stringify(weekDaysInput);
    }
    console.log(weekDaysInput);

}

function checkEditWeekDay(x){
    document.getElementById("edit-week-day-"+x).click();
    if(document.getElementById("edit-week-day-"+x).checked===true){
        document.getElementById("edit-week-day-btn-"+x).classList.add("week-day-selected");
    }
    else{
        document.getElementById("edit-week-day-btn-"+x).classList.remove("week-day-selected");

    }
}
let fbContent = ["postare","story","postare video"];
let instaContent = ["postare","story","postare video","reels"];
let pinContent = ["postare","pin","rich pin"];
let twContent = ["link post","blog post","image post","video post","retweet"];
let ldinContent = ["blog post","text only","image post"];
let tiktokContent = ["video post"];
let snapContent = ["story","snap"];
let ytContent = ["video post"];
let reddContent = ["text post","image post","video post","link post"];



function mpContentOptions(id, e){
    if(e.target.value==="facebook"){
        document.getElementById("add-mediaplan-tip-"+id).innerHTML="<option value='' selected disabled>Tip content</option>";
        let smArray =fbContent;
        for(i=0;i<smArray.length;i++){
            document.getElementById("add-mediaplan-tip-"+id).innerHTML+="<option value='"+smArray[i]+"'>"+smArray[i]+"</option>";
        }
    }
    else if(e.target.value==="instagram"){
        document.getElementById("add-mediaplan-tip-"+id).innerHTML="<option value='' selected disabled>Tip content</option>";
        let smArray =instaContent;
        for(i=0;i<smArray.length;i++){
            document.getElementById("add-mediaplan-tip-"+id).innerHTML+="<option value='"+smArray[i]+"'>"+smArray[i]+"</option>";
        }
    }
    else if(e.target.value==="pinterest"){
        document.getElementById("add-mediaplan-tip-"+id).innerHTML="<option value='' selected disabled>Tip content</option>";
        let smArray =pinContent;
        for(i=0;i<smArray.length;i++){
            document.getElementById("add-mediaplan-tip-"+id).innerHTML+="<option value='"+smArray[i]+"'>"+smArray[i]+"</option>";
        }
    }
    else if(e.target.value==="twitter"){
        document.getElementById("add-mediaplan-tip-"+id).innerHTML="<option value='' selected disabled>Tip content</option>";
        let smArray =twContent;
        for(i=0;i<smArray.length;i++){
            document.getElementById("add-mediaplan-tip-"+id).innerHTML+="<option value='"+smArray[i]+"'>"+smArray[i]+"</option>";
        }
    }

    else if(e.target.value==="linkedin"){
        document.getElementById("add-mediaplan-tip-"+id).innerHTML="<option value='' selected disabled>Tip content</option>";
        let smArray =ldinContent;
        for(i=0;i<smArray.length;i++){
            document.getElementById("add-mediaplan-tip-"+id).innerHTML+="<option value='"+smArray[i]+"'>"+smArray[i]+"</option>";
        }
    }
    else if(e.target.value==="tiktok"){
        document.getElementById("add-mediaplan-tip-"+id).innerHTML="<option value='' selected disabled>Tip content</option>";
        let smArray =tiktokContent;
        for(i=0;i<smArray.length;i++){
            document.getElementById("add-mediaplan-tip-"+id).innerHTML+="<option value='"+smArray[i]+"'>"+smArray[i]+"</option>";
        }
    }
    else if(e.target.value==="snapchat"){
        document.getElementById("add-mediaplan-tip-"+id).innerHTML="<option value='' selected disabled>Tip content</option>";
        let smArray =snapContent;
        for(i=0;i<smArray.length;i++){
            document.getElementById("add-mediaplan-tip-"+id).innerHTML+="<option value='"+smArray[i]+"'>"+smArray[i]+"</option>";
        }
    }
    else if(e.target.value==="youtube"){
        document.getElementById("add-mediaplan-tip-"+id).innerHTML="<option value='' selected disabled>Tip content</option>";
        let smArray =ytContent;
        for(i=0;i<smArray.length;i++){
            document.getElementById("add-mediaplan-tip-"+id).innerHTML+="<option value='"+smArray[i]+"'>"+smArray[i]+"</option>";
        }
    }
    else if(e.target.value==="reddit"){
        document.getElementById("add-mediaplan-tip-"+id).innerHTML="<option value='' selected disabled>Tip content</option>";
        let smArray =reddContent;
        for(i=0;i<smArray.length;i++){
            document.getElementById("add-mediaplan-tip-"+id).innerHTML+="<option value='"+smArray[i]+"'>"+smArray[i]+"</option>";
        }
    }
}

// let addMediaplanReteaSelector=document.getElementById("add-mediaplan-retea");
// addMediaplanReteaSelector.addEventListener("change",e=>{
//     if(e.target.value==="facebook"){
//         document.getElementById("add-mediaplan-tip").innerHTML="<option value='' selected disabled>Tip content</option>";
//         let smArray =fbContent;
//         for(i=0;i<smArray.length;i++){
//             document.getElementById("add-mediaplan-tip").innerHTML+="<option value='"+smArray[i]+"'>"+smArray[i]+"</option>";
//         }
//     }
//     else if(e.target.value==="instagram"){
//         document.getElementById("add-mediaplan-tip").innerHTML="<option value='' selected disabled>Tip content</option>";
//         let smArray =instaContent;
//         for(i=0;i<smArray.length;i++){
//             document.getElementById("add-mediaplan-tip").innerHTML+="<option value='"+smArray[i]+"'>"+smArray[i]+"</option>";
//         }
//     }
//     else if(e.target.value==="pinterest"){
//         document.getElementById("add-mediaplan-tip").innerHTML="<option value='' selected disabled>Tip content</option>";
//         let smArray =pinContent;
//         for(i=0;i<smArray.length;i++){
//             document.getElementById("add-mediaplan-tip").innerHTML+="<option value='"+smArray[i]+"'>"+smArray[i]+"</option>";
//         }
//     }
//     else if(e.target.value==="twitter"){
//         document.getElementById("add-mediaplan-tip").innerHTML="<option value='' selected disabled>Tip content</option>";
//         let smArray =twContent;
//         for(i=0;i<smArray.length;i++){
//             document.getElementById("add-mediaplan-tip").innerHTML+="<option value='"+smArray[i]+"'>"+smArray[i]+"</option>";
//         }
//     }

//     else if(e.target.value==="linkedin"){
//         document.getElementById("add-mediaplan-tip").innerHTML="<option value='' selected disabled>Tip content</option>";
//         let smArray =ldinContent;
//         for(i=0;i<smArray.length;i++){
//             document.getElementById("add-mediaplan-tip").innerHTML+="<option value='"+smArray[i]+"'>"+smArray[i]+"</option>";
//         }
//     }
//     else if(e.target.value==="tiktok"){
//         document.getElementById("add-mediaplan-tip").innerHTML="<option value='' selected disabled>Tip content</option>";
//         let smArray =tiktokContent;
//         for(i=0;i<smArray.length;i++){
//             document.getElementById("add-mediaplan-tip").innerHTML+="<option value='"+smArray[i]+"'>"+smArray[i]+"</option>";
//         }
//     }
//     else if(e.target.value==="snapchat"){
//         document.getElementById("add-mediaplan-tip").innerHTML="<option value='' selected disabled>Tip content</option>";
//         let smArray =snapContent;
//         for(i=0;i<smArray.length;i++){
//             document.getElementById("add-mediaplan-tip").innerHTML+="<option value='"+smArray[i]+"'>"+smArray[i]+"</option>";
//         }
//     }
//     else if(e.target.value==="youtube"){
//         document.getElementById("add-mediaplan-tip").innerHTML="<option value='' selected disabled>Tip content</option>";
//         let smArray =ytContent;
//         for(i=0;i<smArray.length;i++){
//             document.getElementById("add-mediaplan-tip").innerHTML+="<option value='"+smArray[i]+"'>"+smArray[i]+"</option>";
//         }
//     }
//     else if(e.target.value==="reddit"){
//         document.getElementById("add-mediaplan-tip").innerHTML="<option value='' selected disabled>Tip content</option>";
//         let smArray =reddContent;
//         for(i=0;i<smArray.length;i++){
//             document.getElementById("add-mediaplan-tip").innerHTML+="<option value='"+smArray[i]+"'>"+smArray[i]+"</option>";
//         }
//     }
// })

document.getElementById("edit-mediaplan-retea").addEventListener("change",e=>{
    if(e.target.value==="facebook"){
        document.getElementById("edit-mediaplan-tip").innerHTML="<option value='' selected disabled>Tip content</option>";
        let smArray =fbContent;
        for(i=0;i<smArray.length;i++){
            document.getElementById("edit-mediaplan-tip").innerHTML+="<option value='"+smArray[i]+"'>"+smArray[i]+"</option>";
        }
    }
    else if(e.target.value==="instagram"){
        document.getElementById("edit-mediaplan-tip").innerHTML="<option value='' selected disabled>Tip content</option>";
        let smArray =instaContent;
        for(i=0;i<smArray.length;i++){
            document.getElementById("edit-mediaplan-tip").innerHTML+="<option value='"+smArray[i]+"'>"+smArray[i]+"</option>";
        }
    }
    else if(e.target.value==="pinterest"){
        document.getElementById("edit-mediaplan-tip").innerHTML="<option value='' selected disabled>Tip content</option>";
        let smArray =pinContent;
        for(i=0;i<smArray.length;i++){
            document.getElementById("edit-mediaplan-tip").innerHTML+="<option value='"+smArray[i]+"'>"+smArray[i]+"</option>";
        }
    }
    else if(e.target.value==="twitter"){
        document.getElementById("edit-mediaplan-tip").innerHTML="<option value='' selected disabled>Tip content</option>";
        let smArray =twContent;
        for(i=0;i<smArray.length;i++){
            document.getElementById("edit-mediaplan-tip").innerHTML+="<option value='"+smArray[i]+"'>"+smArray[i]+"</option>";
        }
    }

    else if(e.target.value==="linkedin"){
        document.getElementById("edit-mediaplan-tip").innerHTML="<option value='' selected disabled>Tip content</option>";
        let smArray =ldinContent;
        for(i=0;i<smArray.length;i++){
            document.getElementById("edit-mediaplan-tip").innerHTML+="<option value='"+smArray[i]+"'>"+smArray[i]+"</option>";
        }
    }
    else if(e.target.value==="tiktok"){
        document.getElementById("edit-mediaplan-tip").innerHTML="<option value='' selected disabled>Tip content</option>";
        let smArray =tiktokContent;
        for(i=0;i<smArray.length;i++){
            document.getElementById("edit-mediaplan-tip").innerHTML+="<option value='"+smArray[i]+"'>"+smArray[i]+"</option>";
        }
    }
    else if(e.target.value==="snapchat"){
        document.getElementById("edit-mediaplan-tip").innerHTML="<option value='' selected disabled>Tip content</option>";
        let smArray =snapContent;
        for(i=0;i<smArray.length;i++){
            document.getElementById("edit-mediaplan-tip").innerHTML+="<option value='"+smArray[i]+"'>"+smArray[i]+"</option>";
        }
    }
    else if(e.target.value==="youtube"){
        document.getElementById("edit-mediaplan-tip").innerHTML="<option value='' selected disabled>Tip content</option>";
        let smArray =ytContent;
        for(i=0;i<smArray.length;i++){
            document.getElementById("edit-mediaplan-tip").innerHTML+="<option value='"+smArray[i]+"'>"+smArray[i]+"</option>";
        }
    }
    else if(e.target.value==="reddit"){
        document.getElementById("edit-mediaplan-tip").innerHTML="<option value='' selected disabled>Tip content</option>";
        let smArray =reddContent;
        for(i=0;i<smArray.length;i++){
            document.getElementById("edit-mediaplan-tip").innerHTML+="<option value='"+smArray[i]+"'>"+smArray[i]+"</option>";
        }
    }
})

let addMediaplanForm=document.getElementById("crm-add-mediaplan");
addMediaplanForm.addEventListener("submit",e=>{
    e.preventDefault();
    startLoading();

    const data = new FormData();
    data.append("client",clientId);
    for(const p of new FormData(addMediaplanForm)){
        data.append(p[0],p[1]);
    }

    fetch("/admin/crm/includes/add-client-mediaplan.php",{
        method:"POST",
        body: data
    }).then(response=>response.json()).then(response=>{
        console.log(response);

        if(response.status==="success"){
            successPopUp("Media plan-ul a fost adaugat cu succes.");

            addMediaplanForm.reset();
            closeNewMediaplan();
            fetchMediaplan();

        }
        else{
            failPopUp(response.error);
        }
        stopLoading();
    })

})

let addMediaplanStartMonth = document.getElementById("add-mediaplan-startmonth");
addMediaplanStartMonth.addEventListener("input",e=>{
    console.log(e.target.value);
})

function deleteMediaplan(id,client){
    startLoading();

    fetch("/admin/crm/includes/delete-client-mediaplan.php?id="+id+"&client="+client).then(response=>response.json()).then(response=>{
        if(response.status==="success"){
            successPopUp("Media plan-ul a fost sters cu succes.");
            fetchMediaplan();
        }
        else{
            failPopUp(response.error);
        }
        stopLoading();
    })
}

function editMediaplan(id,client){
    document.getElementById("edit-mediaplan-id").value=id;
    document.getElementById("edit-mediaplan-clientId").value=client;
    fetch("/admin/crm/includes/get-mediaplan-info.php?id="+id+"&clientId="+client).then(response=>response.json()).then(response=>{
        console.log(response);
        
        document.getElementById("edit-mediaplan-retea").value=response.retea;
        
            if(response.retea==="facebook"){
                document.getElementById("edit-mediaplan-tip").innerHTML="<option value='' selected disabled>Tip content</option>";
                let smArray =fbContent;
                for(i=0;i<smArray.length;i++){
                    document.getElementById("edit-mediaplan-tip").innerHTML+="<option value='"+smArray[i]+"'>"+smArray[i]+"</option>";
                }
            }
            else if(response.retea==="instagram"){
                document.getElementById("edit-mediaplan-tip").innerHTML="<option value='' selected disabled>Tip content</option>";
                let smArray =instaContent;
                for(i=0;i<smArray.length;i++){
                    document.getElementById("edit-mediaplan-tip").innerHTML+="<option value='"+smArray[i]+"'>"+smArray[i]+"</option>";
                }
            }
            else if(response.retea==="pinterest"){
                document.getElementById("edit-mediaplan-tip").innerHTML="<option value='' selected disabled>Tip content</option>";
                let smArray =pinContent;
                for(i=0;i<smArray.length;i++){
                    document.getElementById("edit-mediaplan-tip").innerHTML+="<option value='"+smArray[i]+"'>"+smArray[i]+"</option>";
                }
            }
            else if(response.retea==="twitter"){
                document.getElementById("edit-mediaplan-tip").innerHTML="<option value='' selected disabled>Tip content</option>";
                let smArray =twContent;
                for(i=0;i<smArray.length;i++){
                    document.getElementById("edit-mediaplan-tip").innerHTML+="<option value='"+smArray[i]+"'>"+smArray[i]+"</option>";
                }
            }
        
            else if(response.retea==="linkedin"){
                document.getElementById("edit-mediaplan-tip").innerHTML="<option value='' selected disabled>Tip content</option>";
                let smArray =ldinContent;
                for(i=0;i<smArray.length;i++){
                    document.getElementById("edit-mediaplan-tip").innerHTML+="<option value='"+smArray[i]+"'>"+smArray[i]+"</option>";
                }
            }
            else if(response.retea==="tiktok"){
                document.getElementById("edit-mediaplan-tip").innerHTML="<option value='' selected disabled>Tip content</option>";
                let smArray =tiktokContent;
                for(i=0;i<smArray.length;i++){
                    document.getElementById("edit-mediaplan-tip").innerHTML+="<option value='"+smArray[i]+"'>"+smArray[i]+"</option>";
                }
            }
            else if(response.retea==="snapchat"){
                document.getElementById("edit-mediaplan-tip").innerHTML="<option value='' selected disabled>Tip content</option>";
                let smArray =snapContent;
                for(i=0;i<smArray.length;i++){
                    document.getElementById("edit-mediaplan-tip").innerHTML+="<option value='"+smArray[i]+"'>"+smArray[i]+"</option>";
                }
            }
            else if(response.retea==="youtube"){
                document.getElementById("edit-mediaplan-tip").innerHTML="<option value='' selected disabled>Tip content</option>";
                let smArray =ytContent;
                for(i=0;i<smArray.length;i++){
                    document.getElementById("edit-mediaplan-tip").innerHTML+="<option value='"+smArray[i]+"'>"+smArray[i]+"</option>";
                }
            }
            else if(response.retea==="reddit"){
                document.getElementById("edit-mediaplan-tip").innerHTML="<option value='' selected disabled>Tip content</option>";
                let smArray =reddContent;
                for(i=0;i<smArray.length;i++){
                    document.getElementById("edit-mediaplan-tip").innerHTML+="<option value='"+smArray[i]+"'>"+smArray[i]+"</option>";
                }
            }
        
        document.getElementById("edit-mediaplan-tip").value=response.tipContent;
        document.getElementById("edit-mediaplan-perstart").value=response.perStart;
        document.getElementById("edit-mediaplan-persfarsit").value=response.perSfarsit;

        let frecventaArray = response.frecventa;

        for(i=0;i<7;i++){
            document.getElementById("edit-week-day-"+i).checked=false;
            document.getElementById("edit-week-day-btn-"+i).classList.remove("week-day-selected");
        }

        for(i=0;i<frecventaArray.length;i++){
            if(frecventaArray[i]==="luni"){
                checkEditWeekDay(0);
            }
            else if(frecventaArray[i]==="marti"){
                checkEditWeekDay(1);
            }
            else if(frecventaArray[i]==="miercuri"){
                checkEditWeekDay(2);
            }
            else if(frecventaArray[i]==="joi"){
                checkEditWeekDay(3);
            }
            else if(frecventaArray[i]==="vineri"){
                checkEditWeekDay(4);
            }
            else if(frecventaArray[i]==="sambata"){
                checkEditWeekDay(5);
            }
            else if(frecventaArray[i]==="duminica"){
                checkEditWeekDay(6);
            }
        }

        let comentarii = response.comentarii.replaceAll("<br>","\n");
        
        
        document.getElementById("edit-mediaplan-comm").value=comentarii;

    })
    let modal=document.getElementById('modal-edit-mediaplan');
    modal.style.display="block";
    setTimeout(()=>{
        modal.style.opacity="1";
    },50);
}

function closeEditMediaplan(){
    let modal=document.getElementById('modal-edit-mediaplan');
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
    },300);
}

let editMediaplanForm = document.getElementById("crm-edit-mediaplan");
editMediaplanForm.addEventListener("submit",e=>{
    e.preventDefault();
    startLoading();

    const data = new FormData();
    for(const p of new FormData(editMediaplanForm)){
        data.append(p[0],p[1]);
    }

    fetch("/admin/crm/includes/edit-client-mediaplan.php",{
        method:"POST",
        body:data
    }).then(response=>response.json()).then(response=>{
        if(response.status==="success"){
            successPopUp("Media plan-ul a fost modificat cu succes.");
            fetchMediaplan();
            closeEditMediaplan();
        }
        else{
            failPopUp(response.error);
        }
        stopLoading();
    })
})


function openBuget(){
    let modal=document.getElementById('modal-buget');
    modal.style.display="block";
    setTimeout(()=>{
        modal.style.opacity="1";
    },50);

}

function closeBuget(){
    let modal=document.getElementById('modal-buget');
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
    },300);
}


function newBuget(){
    let modal=document.getElementById('modal-add-buget');
    modal.style.display="block";
    setTimeout(()=>{
        modal.style.opacity="1";
    },50);
}

function closeNewBuget(){
    let modal=document.getElementById('modal-add-buget');
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
    },300);
}

function addBugetNewRetea(){
    let elId=Math.floor(Math.random()*90000) + 10000;
    let element = document.createElement("div");
    element.classList.add("add-buget-retea");
    element.id="add-buget-retea-"+elId;
    element.innerHTML="<div><i onclick='deleteDugetRetea(\""+elId+"\")' class='fa-solid fa-trash-can'></i> </div> <div class='input-container'> <label>Retea</label> <select required name='add-buget-retea[]' class='add-buget-retea' onchange='checkIsEqual(event)'> <option value='' disabled selected>Alege reteaua</option> <option value='facebook'>Facebook</option> <option value='instagram'>Instagram</option> <option value='google'>Google</option> <option value='pinterest'>Pinterest</option> <option value='twitter'>Twitter</option> <option value='linkedin'>Linkedin</option> <option value='tiktok'>TikTok</option> <option value='snapchat'>Snapchat</option> <option value='youtube'>Youtube</option> <option value='reddit'>Reddit</option> </select> </div> <div class='input-container'> <label>Buget pe zi</label> <input oninput='checkOverbuget(event)' name='add-buget-pe-zi[]' type='number' class='add-buget-pe-zi' required></input> </div>";
    document.getElementById("add-buget-retele").appendChild(element);
}

let addNewBugetForm = document.getElementById("crm-add-buget");
addNewBugetForm.addEventListener("submit",e=>{
    e.preventDefault();

    startLoading();
    const data = new FormData();
    data.append("clientId",clientId);
    data.append("buget-pe-zi",document.getElementById("add-buget-total-divizat").innerHTML);
    for(const p of new FormData(addNewBugetForm)){
        data.append(p[0],p[1]);
    }

    fetch("/admin/crm/includes/new-client-buget.php",{
        method:"POST",
        body: data
    }).then(response=>response.json()).then(response=>{
        console.log(response);
        if(response.status==="success"){
            fetchBuget();
            closeNewBuget();
            successPopUp("Bugetul a fost adaugat cu succes.");
        }
        else{
            failPopUp(response.error);
        }
        stopLoading();

    })
})

function deleteDugetRetea(id){
    if(document.getElementById("add-buget-retea-"+id)){
        document.getElementById("add-buget-retea-"+id).remove();
    }
    else{
        document.getElementById("edit-buget-retea-"+id).remove();
    }
}

function checkOverbuget(e){
    let sum=0;
    let allInputs = document.querySelectorAll(".add-buget-pe-zi");
    for(i=0;i<allInputs.length;i++){
        sum+= allInputs[i].value*31;
    }
    if(sum>document.getElementById("add-buget-total").value){
        console.log("over buget");
        for(i=0;i<allInputs.length;i++){
            allInputs[i].style.border="1px solid red";
        }
    }
    else{
        for(i=0;i<allInputs.length;i++){
            allInputs[i].style.border="";   
        }
    }
}
function checkIsEqual(e){
    let allInputs = document.querySelectorAll(".add-buget-retea");
    for(i=0;i<allInputs.length;i++){
        if(e.target!=allInputs[i]){
            if(e.target.value===allInputs[i].value){
                console.log("2 la fel");
                e.target.style.border="1px solid red";
                allInputs[i].style.border="1px solid red";
                document.getElementById("add-buget-submit").setAttribute("disabled","");
                return;
            }
            else{
                document.getElementById("add-buget-submit").removeAttribute("disabled");
                e.target.style.border="";
                allInputs[i].style.border="";

            }
        }
    }
}

function editBuget(id, client){
    fetch("/admin/crm/includes/get-buget-info.php?id="+id+"&client="+client).then(response=>response.json()).then(response=>{
        console.log(response);
        let retele = JSON.parse(response.retele);

        document.getElementById("edit-buget-id").value = id;
        document.getElementById("edit-buget-tip").value = response.tip;
        document.getElementById("edit-buget-perstart").value = response.perioadaStart;
        document.getElementById("edit-buget-persfarsit").value = response.perioadaSfarsit;
        document.getElementById("edit-buget-total").value = response.bugetTotal;
        let comentarii = response.comentarii.replaceAll("<br>","\n");
        document.getElementById("edit-buget-comm").value = comentarii;
        document.getElementById("edit-buget-total-divizat").innerHTML=Math.floor(response.bugetTotal/31);
        document.getElementById("edit-buget-retele").innerHTML="";

        for(i=0;i<retele.length;i++){
            console.log(retele[i]);
            console.log(retele[i].retea,retele[i].buget);
            let elId=Math.floor(Math.random()*90000) + 10000;
            let element = document.createElement("div");
            element.classList.add("add-buget-retea");
            element.id="edit-buget-retea-"+elId;
            element.innerHTML="<div><i onclick='deleteDugetRetea(\""+elId+"\")' class='fa-solid fa-trash-can'></i> </div> <div class='input-container'> <label>Retea</label> <select required name='edit-buget-retea[]' id='edit-buget-retea-selector-"+elId+"' class='edit-buget-retea' onchange='checkIsEqual(event)'> <option value='' disabled>Alege reteaua</option> <option value='facebook'>Facebook</option> <option value='instagram'>Instagram</option> <option value='google'>Google</option> <option value='pinterest'>Pinterest</option> <option value='twitter'>Twitter</option> <option value='linkedin'>Linkedin</option> <option value='tiktok'>TikTok</option> <option value='snapchat'>Snapchat</option> <option value='youtube'>Youtube</option> <option value='reddit'>Reddit</option> </select> </div> <div class='input-container'> <label>Buget pe zi</label> <input oninput='checkOverbuget(event)' value='"+retele[i].buget+"' name='edit-buget-pe-zi[]' type='number' class='edit-buget-pe-zi' required></input> </div>";
            document.getElementById("edit-buget-retele").appendChild(element);
            
            document.getElementById("edit-buget-retea-selector-"+elId).value = retele[i].retea;            
        }

        let modal=document.getElementById('modal-edit-buget');
        modal.style.display="block";
        setTimeout(()=>{
            modal.style.opacity="1";
        },50);
    })

}


function closeEditBuget(){
    let modal=document.getElementById('modal-edit-buget');
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
    },300);
}

let editBugetForm = document.getElementById("crm-edit-buget");
editBugetForm.addEventListener("submit",e=>{
    e.preventDefault();

    startLoading();
    const data = new FormData();
    data.append("clientId",clientId);
    data.append("buget-pe-zi",document.getElementById("edit-buget-total-divizat").innerHTML);
    for(const p of new FormData(editBugetForm)){
        data.append(p[0],p[1]);
    }

    fetch("/admin/crm/includes/edit-client-buget.php",{
        method:"POST",
        body: data
    }).then(response=>response.json()).then(response=>{
        console.log(response);
        if(response.status==="success"){
            fetchBuget();
            closeEditBuget();
            successPopUp("Bugetul a fost modificat cu succes.");
        }
        else{
            failPopUp(response.error);
        }
        stopLoading();

    })
})

function editBugetNewRetea(){
    let elId=Math.floor(Math.random()*90000) + 10000;
    let element = document.createElement("div");
    element.classList.add("add-buget-retea");
    element.id="edit-buget-retea-"+elId;
    element.innerHTML="<div><i onclick='deleteDugetRetea(\""+elId+"\")' class='fa-solid fa-trash-can'></i> </div> <div class='input-container'> <label>Retea</label> <select required name='edit-buget-retea[]' class='edit-buget-retea' onchange='checkIsEqual(event)'> <option value='' disabled selected>Alege reteaua</option> <option value='facebook'>Facebook</option> <option value='instagram'>Instagram</option> <option value='google'>Google</option> <option value='pinterest'>Pinterest</option> <option value='twitter'>Twitter</option> <option value='linkedin'>Linkedin</option> <option value='tiktok'>TikTok</option> <option value='snapchat'>Snapchat</option> <option value='youtube'>Youtube</option> <option value='reddit'>Reddit</option> </select> </div> <div class='input-container'> <label>Buget pe zi</label> <input oninput='checkOverbuget(event)' name='edit-buget-pe-zi[]' type='number' class='edit-buget-pe-zi' required></input> </div>";
    document.getElementById("edit-buget-retele").appendChild(element);
}

function checkOverbuget(e){
    let sum=0;
    let allInputs = document.querySelectorAll(".edit-buget-pe-zi");
    for(i=0;i<allInputs.length;i++){
        sum+= allInputs[i].value*31;
    }
    if(sum>document.getElementById("edit-buget-total").value){
        console.log("over buget");
        for(i=0;i<allInputs.length;i++){
            allInputs[i].style.border="1px solid red";
        }
    }
    else{
        for(i=0;i<allInputs.length;i++){
            allInputs[i].style.border="";   
        }
    }
}

function deleteBuget(id,client){
    startLoading();
    fetch("/admin/crm/includes/delete-client-buget.php?id="+id+"&client="+client).then(response=>response.json()).then(response=>{
        console.log(response);
        if(response.status==="success"){
            successPopUp("Bugetul a fost sters cu succes.");
            fetchBuget();
        }
        else{
            failPopUp(response.error);
        }
        stopLoading();
    })

}


document.getElementById("edit-buget-total").addEventListener("input",e=>{
    let inputPerZi=document.querySelectorAll(".edit-buget-pe-zi");
    let bugetPerZi = e.target.value/31;

    console.log(Math.floor(bugetPerZi));
    document.getElementById("edit-buget-total-divizat").innerHTML=Math.floor(bugetPerZi);
})

document.getElementById("add-buget-total").addEventListener("input",e=>{
    let inputPerZi=document.querySelectorAll(".add-buget-pe-zi");
    let bugetPerZi = e.target.value/31;

    console.log(Math.floor(bugetPerZi));
    document.getElementById("add-buget-total-divizat").innerHTML=Math.floor(bugetPerZi);
})

let addBugetReteaClass,addBugetPeZiClass;


function openCreatie(){
    let modal=document.getElementById('modal-creatie');
    modal.style.display="block";
    setTimeout(()=>{
        modal.style.opacity="1";
    },50);

}

function closeCreatie(){
    let modal=document.getElementById('modal-creatie');
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
    },300);
}

function newCreatie(){
    let modal=document.getElementById('modal-add-creatie');
    modal.style.display="block";
    setTimeout(()=>{
        modal.style.opacity="1";
    },50);
}

function closeNewCreatie(){
    let modal=document.getElementById('modal-add-creatie');
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
    },300);
}

function addCreatieNewProdus(){
    let elId=Math.floor(Math.random()*90000) + 10000;
    let element = document.createElement("div");
    element.classList.add("add-creatie-produs");
    element.id="add-creatie-produs-"+elId;
    element.innerHTML="<div><i onclick='deleteCreatieProdus(\""+elId+"\")' class='fa-solid fa-trash-can'></i></div><div class='input-container'><label>Denumire produs</label><input type='text' name='add-creatie-produs[]' class='add-creatie-produs' required></div><div class='input-container'><label>Cantitate</label><input type='number' name='add-creatie-cantitate[]' class='add-creatie-cantitate' required></div>";
    document.getElementById("add-creatie-produse").appendChild(element);
}

function deleteCreatieProdus(id){
    if(document.getElementById("add-creatie-produs-"+id)){
        document.getElementById("add-creatie-produs-"+id).remove();
    }
    else{
        document.getElementById("edit-creatie-produs-"+id).remove();
    }
}

let addCreatieForm = document.getElementById("crm-add-creatie");
addCreatieForm.addEventListener("submit",e=>{
    e.preventDefault();
    startLoading();

    const data = new FormData();

    data.append("clientId",clientId);
    for(const p of new FormData(addCreatieForm)){
        data.append(p[0],p[1]);
    }

    fetch("/admin/crm/includes/new-client-creatie.php",{
        method: "POST",
        body: data
    }).then(response=>response.json()).then(response=>{
        console.log(response);
        if(response.status==="success"){
            fetchCreatie();
            successPopUp("Perioada a fost adaugata cu succes.");
            closeNewCreatie();
        }
        else{
            failPopUp(response.error);
        }
        stopLoading();
    })


})

function editCreatie(id,client){
    document.getElementById("edit-creatie-produse").innerHTML="";
    fetch("/admin/crm/includes/get-creatie-info.php?id="+id+"&client="+client).then(response=>response.json()).then(response=>{

        console.log(response);

        let products = JSON.parse(response.produse);

        console.log(products);

        document.getElementById("edit-creatie-id").value=response.id;
        document.getElementById("edit-creatie-clientId").value=response.clientId;

        document.getElementById("edit-creatie-perStart").value = response.perioadaStart;
        document.getElementById("edit-creatie-perSfarsit").value = response.perioadaSfarsit;
        document.getElementById("edit-creatie-pachet").value = response.pachet;
        let comentarii = response.comentarii.replaceAll("<br>","\n");
        document.getElementById("edit-creatie-comm").value=comentarii;

        for(i=0;i<products.length;i++){
            let elId=Math.floor(Math.random()*90000) + 10000;
            let element = document.createElement("div");
            element.classList.add("edit-creatie-produs");
            element.id="edit-creatie-produs-"+elId;
            element.innerHTML="<div><i onclick='deleteCreatieProdus(\""+elId+"\")' class='fa-solid fa-trash-can'></i></div><div class='input-container'><label>Denumire produs</label><input type='text' name='edit-creatie-produs[]' id='edit-creatie-denumire-"+elId+"' class='edit-creatie-produs' required></div><div class='input-container'><label>Cantitate</label><input type='number' name='edit-creatie-cantitate[]' id='edit-creatie-cantitate-"+elId+"' class='edit-creatie-cantitate' required></div>";
            document.getElementById("edit-creatie-produse").appendChild(element);

            document.getElementById("edit-creatie-denumire-"+elId).value=products[i].denumire;
            document.getElementById("edit-creatie-cantitate-"+elId).value=products[i].cantitate;
        }
        

        let modal=document.getElementById('modal-edit-creatie');
        modal.style.display="block";
        setTimeout(()=>{
            modal.style.opacity="1";
        },50);

    })

}


function closeEditCreatie(){
    let modal=document.getElementById('modal-edit-creatie');
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
    },300);
}

function editCreatieNewProdus(){
    let elId=Math.floor(Math.random()*90000) + 10000;
    let element = document.createElement("div");
    element.classList.add("edit-creatie-produs");
    element.id="edit-creatie-produs-"+elId;
    element.innerHTML="<div><i onclick='deleteCreatieProdus(\""+elId+"\")' class='fa-solid fa-trash-can'></i></div><div class='input-container'><label>Denumire produs</label><input type='text' name='edit-creatie-produs[]' class='edit-creatie-produs' required></div><div class='input-container'><label>Cantitate</label><input type='number' name='edit-creatie-cantitate[]' class='edit-creatie-cantitate' required></div>";
    document.getElementById("edit-creatie-produse").appendChild(element);
}

let editCreatieForm = document.getElementById("crm-edit-creatie");
editCreatieForm.addEventListener("submit",e=>{
    e.preventDefault();
    startLoading();
    const data = new FormData();
    for(const p of new FormData(editCreatieForm)){
        data.append(p[0],p[1]);
    }

    fetch("/admin/crm/includes/edit-client-creatie.php",{
        method:"POST",
        body:data
    }).then(response=>response.json()).then(response=>{
        console.log(response);
        if(response.status==="success"){
            successPopUp("Perioada a fost modificata cu succes.");
            closeEditCreatie();
            fetchCreatie();
        }
        else{
            failPopUp(response.error);
        }
        stopLoading();
    })
})



function openUserAccounts(){
    let modal=document.getElementById('modal-user-accounts');
    modal.style.display="block";
    setTimeout(()=>{
        modal.style.opacity="1";
    },50);
}


function closeUserAccounts(){
    let modal=document.getElementById('modal-user-accounts');
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
    },300);
}

function newUserAccount(){
    let modal=document.getElementById('modal-new-user-account');
    modal.style.display="block";
    setTimeout(()=>{
        modal.style.opacity="1";
    },50);
}

function closeNewUserAccount(){
    let modal=document.getElementById('modal-new-user-account');
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
    },300);
}

let newUserForm = document.getElementById("new-user-account-form");
newUserForm.addEventListener("submit",e=>{
    e.preventDefault();
    startLoading();

    const data = new FormData();

    data.append("company",clientId);
    for(const p of new FormData(newUserForm)){
        data.append(p[0],p[1]);
    }

    fetch("/admin/crm/includes/new-client-user.php",{
        method: "POST",
        body: data
    }).then(response=>response.json()).then(response=>{
        console.log(response);
        if(response.status==="success"){
            fetchUsers();
            successPopUp("Utilizatorul a fost adaugat cu succes.");
            closeNewUserAccount();
        }
        else{
            failPopUp(response.error);
        }
        stopLoading();
    })
})




function toggleClientEmails(){
    let acordion= document.getElementById("client-emails-acordion");
    let acordionArrow= document.getElementById("acordion-arrow-emails");
    if(acordion.style.height==="0px"){
        acordion.style.height=emailsAcordionHeight+"px";
        acordionArrow.style.transform="rotate(180deg)";
    }
    else{
        acordion.style.height="0px";
        acordionArrow.style.transform="rotate(0deg)";
    }
}

function toggleClientWebsites(){
    let acordion= document.getElementById("client-websites-acordion");
    let acordionArrow= document.getElementById("acordion-arrow-websites");
    if(acordion.style.height==="0px"){
        acordion.style.height=websitesAcordionHeight+"px";
        acordionArrow.style.transform="rotate(180deg)";
    }
    else{
        acordion.style.height="0px";
        acordionArrow.style.transform="rotate(0deg)";

    }
}

function toggleClientPersons(){
    let acordion= document.getElementById("client-persons-acordion");
    let acordionArrow= document.getElementById("acordion-arrow-persons");
    if(acordion.style.height==="0px"){
        acordion.style.height=personsAcordionHeight+"px";
        acordionArrow.style.transform="rotate(180deg)";
    }
    else{
        acordion.style.height="0px";
        acordionArrow.style.transform="rotate(0deg)";

    }
}

function toggleClientActions(){
    let acordion= document.getElementById("client-actions-acordion");
    let acordionArrow= document.getElementById("acordion-arrow-actions");
    if(acordion.style.height==="0px"){
        acordion.style.height=actionsAcordionHeight+"px"; 
        acordionArrow.style.transform="rotate(180deg)";
    }
    else{
        acordion.style.height="0px";
        acordionArrow.style.transform="rotate(0deg)";

    }
}

function toggleClientSmAccounts(){
    let acordion= document.getElementById("client-sm-accounts-acordion");
    let acordionArrow= document.getElementById("acordion-arrow-sm-accounts");
    if(acordion.style.height==="0px"){
        acordion.style.height=scAccountsAcordionHeight+"px";
        acordionArrow.style.transform="rotate(180deg)";
    }
    else{
        acordion.style.height="0px";
        acordionArrow.style.transform="rotate(0deg)";

    }
}

function toggleClientObjectives(){
    let acordion= document.getElementById("client-objectives-acordion");
    let acordionArrow= document.getElementById("acordion-arrow-objectives");
    if(acordion.style.height==="0px"){
        acordion.style.height=objectivesAcordionHeight+"px";
        acordionArrow.style.transform="rotate(180deg)";
    }
    else{
        acordion.style.height="0px";
        acordionArrow.style.transform="rotate(0deg)";

    }
}



function toggleClientSettings(){
    let acordion= document.getElementById("client-settings-acordion");
    let acordionArrow= document.getElementById("acordion-arrow-settings");
    if(acordion.style.height==="0px"){
        acordion.style.height=settingsAcordionHeight+"px";
        acordionArrow.style.transform="rotate(180deg)";
    }
    else{
        acordion.style.height="0px";
        acordionArrow.style.transform="rotate(0deg)";

    }
}

function toggleClientMediaplan(){
    let acordion= document.getElementById("client-mediaplan-acordion");
    let acordionArrow= document.getElementById("acordion-arrow-mediaplan");
    if(acordion.style.height==="0px"){
        acordion.style.height=mediaplanAcordionHeight+"px";
        acordionArrow.style.transform="rotate(180deg)";
        setTimeout(() => {
            acordion.style.height="max-content";
        }, 300);
    }
    else{
        acordion.style.height=mediaplanAcordionHeight+"px";
        setTimeout(() => {
            acordion.style.height="0px";
            
        }, 50);
        acordionArrow.style.transform="rotate(0deg)";
    }
}

function toggleClientBuget(){
    let acordion= document.getElementById("client-buget-acordion");
    let acordionArrow= document.getElementById("acordion-arrow-buget");
    if(acordion.style.height==="0px"){
        acordion.style.height=bugetAcordionHeight+"px";
        acordionArrow.style.transform="rotate(180deg)";
    }
    else{
        acordion.style.height="0px";
        acordionArrow.style.transform="rotate(0deg)";
    }
}

function toggleClientCreatie(){
    let acordion= document.getElementById("client-creatie-acordion");
    let acordionArrow= document.getElementById("acordion-arrow-creatie");
    if(acordion.style.height==="0px"){
        acordion.style.height=creatieAcordionHeight+"px";
        acordionArrow.style.transform="rotate(180deg)";
    }
    else{
        acordion.style.height="0px";
        acordionArrow.style.transform="rotate(0deg)";

    }
}

function toggleClientUserAccounts(){
    let acordion= document.getElementById("client-users-acordion");
    let acordionArrow= document.getElementById("acordion-arrow-users");
    if(acordion.style.height==="0px"){
        acordion.style.height=usersAcordionHeight+"px";
        acordionArrow.style.transform="rotate(180deg)";
    }
    else{
        acordion.style.height="0px";
        acordionArrow.style.transform="rotate(0deg)";

    }
}


let months=["ian","feb","mar","apr","mai","iun","iul","aug","sep","oct","nov","dec"];

for(index=0;index<months.length;index++){
    document.getElementById("client-mediaplan-acordion-"+months[index]).style.height="0px";
    document.getElementById("client-mediaplan-acordion-"+months[index]).style.overflow="hidden";
    console.log(document.getElementById("client-mediaplan-acordion-"+months[index]).style.height);
}
function toggleMediaplanMonthAcordion(x){
    let months=["ian","feb","mar","apr","mai","iun","iul","aug","sep","oct","nov","dec"];
    if(document.getElementById("client-mediaplan-acordion-"+months[x]).style.height==="max-content"){
        document.getElementById("client-mediaplan-acordion-"+months[x]).style.height= "0";
    }
    else{
        document.getElementById("client-mediaplan-acordion-"+months[x]).style.height= "max-content";

    }
}



function openViewContracts(){
    if(clientContract!=''){
        window.open(clientContract,"_blank").focus();
    }
}




function toggleClientContracts(){
    let acordion= document.getElementById("client-contracts-acordion");
    let acordionArrow= document.getElementById("acordion-arrow-contracts");
    if(acordion.style.height==="0px"){
        acordion.style.height=contractsAcordionHeight+"px";
        acordionArrow.style.transform="rotate(180deg)";
    }
    else{
        acordion.style.height="0px";
        acordionArrow.style.transform="rotate(0deg)";

    }
}
function toggleClientAnexe(){
    let acordion= document.getElementById("client-anexe-acordion");
    let acordionArrow= document.getElementById("acordion-arrow-anexe");
    if(acordion.style.height==="0px"){
        acordion.style.height=contractsAcordionHeight+"px";
        acordionArrow.style.transform="rotate(180deg)";
    }
    else{
        acordion.style.height="0px";
        acordionArrow.style.transform="rotate(0deg)";

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



function openChangePersonality(){
    document.getElementById("personality-selector-container").style.display="block";
    document.getElementById("personality-selector").setAttribute("onclick","closeChangePersonality()");
  }
  
  function closeChangePersonality(){
    document.getElementById("personality-selector-container").style.display="none";
    document.getElementById("personality-selector").setAttribute("onclick","openChangePersonality()");
    document.getElementById("search-personality-input").value = "";
    renderClientList(clientsList);
  }
  

  function setClient(client,name){
    startLoading();
    
    reportsList= [];
    if(client==="none"){
      document.getElementById("calendarBtns").style.display="none";
      document.getElementById("calendar-home-made").style.display="none";
      document.getElementById("new-schedule-button").style.transform='translateX(-255px)';
      document.getElementById("platformSelector").style.transform='translateX(-100%)';
      document.getElementById("platformSelector").style.borderRadius="5px";
      document.getElementById("client-selector-box").style.borderRadius="5px";
      stopLoading();
  
      // document.getElementById("clientSelector").style.borderRadius="5px";
    }
    else{
  
      document.getElementById("calendarBtns").style.display="flex";
      document.getElementById("calendar-home-made").style.display="block";
      document.getElementById("new-schedule-button").style.transform='translateX(0)';
      document.getElementById("platformSelector").style.transform='translateX(0)';
      document.getElementById("platformSelector").style.borderRadius="0";
      document.getElementById("client-selector-box").style.borderRadius="5px 0 0 5px";
  
      // document.getElementById("clientSelector").style.borderRadius="5px 0 0 5px ";
  
      document.getElementById("new-clientId").value=client;
      buildCalendar(actual_year,actual_month,actual_month_first_day,client);
      
      stopLoading();
            
      clientAles=client;
    }
    let clientSelector = document.getElementById("client-selector");
    clientSelector.innerHTML=name;
    
  
    
    closeChangePersonality();
  }
  
  function searchPersonality(e){
    filteredPersonalityList=[];
    if(e.target.value!=""){
        for(i=0;i<personalityList.length;i++){
            if(personalityList[i].name.toLowerCase().includes(e.target.value.toLowerCase())){
                filteredPersonalityList.push(personalityList[i]);
            }
        }
        renderClientList(filteredPersonalityList);
    }
    else{
        renderClientList(personalityList);
    }
    
  }
  
personalitySelector.addEventListener("change",e=>{
    e.preventDefault();
  })
  