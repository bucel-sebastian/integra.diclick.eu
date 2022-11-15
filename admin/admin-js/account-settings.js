fetchAdminInfo();
let defaultInput = [];

function openChangeSecurityCode() {
    let modal=document.getElementById("modal-change-security-code");
    document.body.style.overflow="hidden";
    modal.style.display="block";
    setTimeout(()=>{
        modal.style.opacity="1";
    },50);
}


function closeChangeSecurityCode() {
    let modal=document.getElementById('modal-change-security-code');
    document.body.style.overflow="auto";
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
    },300);
}


function sendConfirmationCode() {
    startLoading();
    fetch("/admin/admin-includes/send-securitycode-confirmation-code.php").then(response=>response.json()).then(response=>{
        console.log(response);
        if(response.status==="success"){
            successPopUp("Codul de verificare a fost trimis cu succes.");
        }
        else{
            failPopUp(response.error);
        }
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


let changeSecurityCodeForm= document.getElementById("change-security-code-form");
changeSecurityCodeForm.addEventListener("submit",e=>{
    e.preventDefault();
    startLoading();

    const data=new FormData();
    for(const p of new FormData(changeSecurityCodeForm)){
        data.append(p[0],p[1]);
    }

    fetch("/admin/admin-includes/change-security-code.php",{
        method:"POST",
        body:data
    }).then(response=>response.json()).then(response=>{
        console.log(response);
        if(response.status==="success"){
            successPopUp("Codul de verificare a fost schimbat cu succes.");
            closeChangeSecurityCode();
            changeSecurityCodeForm.reset();
        }
        else{
            failPopUp(response.error);
        }
        stopLoading();
    })
})


function fetchAdminInfo(){
    startLoading();
    fetch("/admin/admin-includes/get-admin-info.php").then(response=>response.json()).then(response=>{
        console.log(response);
        defaultInput=response;
        document.getElementById("admin-name").value=response.name;
        document.getElementById("admin-function").value=response.function;
        document.getElementById("admin-phone").value=response.phone;
        document.getElementById("admin-email").value=response.email;

        document.getElementById("signature-name").innerText=response.name;
        document.getElementById("signature-function").innerText=response.function;
        document.getElementById("signature-phone").innerText=response.phone;
        document.getElementById("signature-mail").innerText=response.email;

    });
    stopLoading();
}


function changeName(e){
    document.getElementById("signature-name").innerText=e.target.value;
    if(e.target.value!=defaultInput.name){
        document.getElementById("reset-name-btn").style.transform="translateX(0)";
    }
    else{
        document.getElementById("reset-name-btn").style.transform="translateX(-20px)";
    }
}

function changeFunction(e){
    document.getElementById("signature-function").innerText=e.target.value;
    if(e.target.value!=defaultInput.name){
        document.getElementById("reset-function-btn").style.transform="translateX(0)";
    }
    else{
        document.getElementById("reset-function-btn").style.transform="translateX(-20px)";
    }
}
function changePhone(e){
    document.getElementById("signature-phone").innerText=e.target.value;
    if(e.target.value!=defaultInput.name){
        document.getElementById("reset-phone-btn").style.transform="translateX(0)";
    }
    else{
        document.getElementById("reset-phone-btn").style.transform="translateX(-20px)";
    }
}
function changeEmail(e){
    document.getElementById("signature-mail").innerText=e.target.value;
    if(e.target.value!=defaultInput.name){
        document.getElementById("reset-email-btn").style.transform="translateX(0)";
    }
    else{
        document.getElementById("reset-email-btn").style.transform="translateX(-20px)";
    }
}

function resetName(){
    document.getElementById("admin-name").value=defaultInput.name;
    document.getElementById("signature-name").innerText=defaultInput.name;
    document.getElementById("reset-name-btn").style.transform="translateX(-20px)";

}

function resetFunction(){
    document.getElementById("admin-function").value=defaultInput.function;
    document.getElementById("signature-function").innerText=defaultInput.function;
    document.getElementById("reset-function-btn").style.transform="translateX(-20px)";


}

function resetPhone(){
    document.getElementById("admin-phone").value=defaultInput.phone;
    document.getElementById("signature-phone").innerText=defaultInput.phone;
    document.getElementById("reset-phone-btn").style.transform="translateX(-20px)";


}

function resetEmail(){
    document.getElementById("admin-email").value=defaultInput.email;
    document.getElementById("signature-mail").innerText=defaultInput.email;
    document.getElementById("reset-email-btn").style.transform="translateX(-20px)";


}


function openForgotSecurityCode(){
    let modal=document.getElementById("modal-forgot-security-code");
    document.body.style.overflow="hidden";
    modal.style.display="block";
    setTimeout(()=>{
        modal.style.opacity="1";
    },50);
}

function closeForgotSecurityCode(){
    let modal=document.getElementById('modal-forgot-security-code');
    document.body.style.overflow="auto";
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
    },300);
}

let forgotSecurityForm= document.getElementById("forgot-security-code-form");
forgotSecurityForm.addEventListener("submit",e=>{
    startLoading();
    e.preventDefault();

    const data = new FormData();

    for(const p of new FormData(forgotSecurityForm)){
        data.append(p[0],p[1]);
    }

    fetch("/admin/admin-includes/forgot-security-code.php",{
        method:"POST",
        body:data
    }).then(response=>response.json()).then(response=>{
        if(response.status==="success"){
            successPopUp("Parola de securitate a fost schimbata cu succes.");
            closeForgotSecurityCode();
            forgotSecurityForm.reset();
        }
        else{
            failPopUp(response.error);
        }
        stopLoading();
    })
})


let basicInfoForm = document.getElementById("basic-info-form");
basicInfoForm.addEventListener("submit",e=>{
    e.preventDefault();
    startLoading();

    const data = new FormData();
    for(const p of new FormData(basicInfoForm)){
        data.append(p[0],p[1]);
    }
    fetch("/admin/admin-includes/edit-account-basic-info.php",{
        method:"POST",
        body:data
    }).then(response=>response.json()).then(response=>{
        console.log(response);
        if(response.status==="success"){
            successPopUp("Informatiile au fost modificate cu succes.");
            fetchAdminInfo();
            defaultInput = [];
        }
        else{
            failPopUp(response.error);
        }
        
        stopLoading();
    })
})

let changePasswordForm = document.getElementById("password-form");
changePasswordForm.addEventListener("submit",e=>{
    e.preventDefault();
    startLoading();

    const data = new FormData();
    for(const p of new FormData(changePasswordForm)){
        data.append(p[0],p[1]);
    }
    fetch("/admin/admin-includes/change-password.php",{
        method:"POST",
        body:data
    }).then(response=>response.json()).then(response=>{
        console.log(response);
        if(response.status==="success"){
            successPopUp("Parola a fost modificata cu succes.");
            changePasswordForm.reset();

        }
        else{
            failPopUp(response.error);
        }
        stopLoading();
    })
})