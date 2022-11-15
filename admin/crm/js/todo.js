let day=["Duminica","Luni","Marti","Miercuri","Joi","Vineri","Sambata"];
let month=["Ianuarie","Februarie","Martie","Aprilie","Mai","Iunie","Iulie","August","Septembrie","Octombrie","Noiembrie","Decembrie"];

let tmpClientId;
document.getElementById("actual-date").innerHTML=day[(new Date()).getDay()]+", "+(new Date()).getDate()+" "+month[(new Date()).getMonth()]+" "+(new Date()).getFullYear();
document.getElementById("actual-date-all").innerHTML=day[(new Date()).getDay()]+", "+(new Date()).getDate()+" "+month[(new Date()).getMonth()]+" "+(new Date()).getFullYear();


fetchTodoTodayList();
fetchTodoPastList();


function fetchTodoTodayList(){
    fetch("/admin/crm/includes/get-todo-today.php").then(response=>response.json()).then(response=>{
        console.log(response);
        document.getElementById("crm-todo-today-list").innerHTML="";
        if(response[0].role==="admin"){
            document.getElementById("client-file-table-all").style.display="none";
            document.getElementById("client-file-table-personal").style.display="block";
            for(i=1;i<response.length;i++){
                document.getElementById("crm-todo-today-list").innerHTML+="<tr><td>"+response[i].clientId+"</td><td>"+response[i].actiune+"</td><td>"+response[i].telMail+"</td><td>"+response[i].observatii+"</td><td><div></div class='crm-action-box-btns'><div class='crm-btn' style='background-color:#6baa41;' onclick='completeAction(\""+response[i].id+"\",\""+response[i].adminId+"\",\""+response[i].client+"\")' title='Marcheaza completa'><i class='fa-solid fa-check'></i></div></td></tr>";
            }
        }
        else{
            document.getElementById("client-file-table-all").style.display="block";
            document.getElementById("client-file-table-personal").style.display="none";
            for(i=1;i<response.length;i++){
                document.getElementById("crm-todo-today-list-all").innerHTML+="<tr><td>"+response[i].admin+"</td><td>"+response[i].clientId+"</td><td>"+response[i].actiune+"</td><td>"+response[i].telMail+"</td><td>"+response[i].observatii+"</td><td><div class='crm-action-box-btns'><div onclick='completeAction(\""+response[i].id+"\",\""+response[i].adminId+"\",\""+response[i].client+"\")' class='crm-btn' style='background-color:#6baa41' title='Marcheaza completa'><i class='fa-solid fa-check'></i></div></div></td></tr>";
            }
        }
        
    })
}

function fetchTodoPastList(){
    fetch("/admin/crm/includes/get-todo-past.php").then(response=>response.json()).then(response=>{
        console.log(response);
        document.getElementById("crm-todo-past-list").innerHTML="";
        if(response[0].role==="admin"){
            document.getElementById("client-file-table-all").style.display="none";
            document.getElementById("client-file-table-personal").style.display="block";
            for(i=1;i<response.length;i++){
                document.getElementById("crm-todo-past-list").innerHTML+="<tr><td>"+response[i].clientId+"</td><td>"+response[i].data+"</td><td>"+response[i].ora+"</td><td>"+response[i].actiune+"</td><td>"+response[i].telMail+"</td><td>"+response[i].observatii+"</td><td><div></div class='crm-action-box-btns'><div class='crm-btn' style='background-color:#6baa41;' onclick='completeAction(\""+response[i].id+"\",\""+response[i].adminId+"\",\""+response[i].client+"\")' title='Marcheaza completa'><i class='fa-solid fa-check'></i></div></td></tr>";
            }
        }
        else{
            document.getElementById("client-file-table-all").style.display="block";
            document.getElementById("client-file-table-personal").style.display="none";
            for(i=1;i<response.length;i++){
                document.getElementById("crm-todo-past-list-all").innerHTML+="<tr><td>"+response[i].admin+"</td><td>"+response[i].clientId+"</td><td>"+response[i].data+"</td><td>"+response[i].ora+"</td><td>"+response[i].actiune+"</td><td>"+response[i].telMail+"</td><td>"+response[i].observatii+"</td><td><div></div class='crm-action-box-btns'><div onclick='completeAction(\""+response[i].id+"\",\""+response[i].adminId+"\",\""+response[i].client+"\")' class='crm-btn' style='background-color:#6baa41' title='Marcheaza completa'><i class='fa-solid fa-check'></i></div><div></div></td></tr>";
            }
        }
        
    })
}



function completeAction(id,adminId,clientId){
    let modal=document.getElementById('modal-complete-action');
    document.getElementById("complete-action-id").value=id;
    document.getElementById("complete-action-admin").value=adminId;
    document.getElementById("complete-client-id").value=clientId;
    tmpClientId=clientId;
    modal.style.display="flex";
    setTimeout(()=>{
        modal.style.opacity="1";
    },50);
}
function closeCompleteAction(){
    let modal=document.getElementById('modal-complete-action');
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
    },300);
}
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

let rezultat = document.getElementById("new-rezultat");
rezultat.addEventListener("change",e=>{
    e.preventDefault();
    if(rezultat.value==="2"){
        showFutureActionInput();
        document.getElementById("future-action-yes").checked = true;
    }
})



document.getElementById("future-action-tip").addEventListener("change",e=>{
    e.preventDefault();
    if(document.getElementById("future-action-tip").value==="1" || document.getElementById("future-action-tip").value==="2" || document.getElementById("future-action-tip").value==="3"){
        showFutureActionPhoneInput();
    }
    else{
        showFutureActionMailInput();
    }
})


function fetchEmails(){
    console.log(tmpClientId);
    fetch("/admin/crm/includes/get-client-file-emails.php?id="+tmpClientId).then(response=>response.json()).then(response=>{

        console.log(response);
    
        document.getElementById("future-action-email").innerHTML="<option value='' disabled selected>Email</option>"
        for(i=0;i<response.length;i++){
            let billingEmail;
            console.log(response[i].billingEmail);
    
            
            document.getElementById("future-action-email").innerHTML+="<option value='"+response[i].email+"'>"+response[i].email+"</option>";
        }

    })
}

function showFutureActionPhoneInput(){
    document.getElementById("future-action-phone-input").style.display="block";
    document.getElementById("future-action-email-input").style.display="none";
}

function showFutureActionMailInput(){
    document.getElementById("future-action-phone-input").style.display="none";
    fetchEmails();
    document.getElementById("future-action-email-input").style.display="block";
}

let completeActionForm = document.getElementById("crm-complete-action-form");
completeActionForm.addEventListener("submit", e=>{
    e.preventDefault();

    const data= new FormData();

    for (const p of new FormData(completeActionForm)){
        data.append(p[0],p[1]);
    }

    fetch("/admin/crm/includes/complete-action.php",{
        method: "POST",
        body: data
    }).then(response=>response.json()).then(response=>{
        console.log(response);

        if(response.status==="success"){
            fetchTodoTodayList();
            fetchTodoPastList();    
            closeCompleteAction();
            completeActionForm.reset();
            
        }
        else{
            console.log(response.error);
        }
    })
})