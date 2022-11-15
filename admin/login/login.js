let loginForm = document.getElementById("login-form");

fetch("../../includes/session.php").then(response => response.text()).then(response => {
    console.log(response);
    if (response.status==="loggedIn") {
        if(response.tip==="admin"){
            window.location.href = "/admin/";
        }
        else if(response.tip==="client"){
            window.location.href = "/user/";
        }
    }
})

loginForm.addEventListener("submit",e=>{
    e.preventDefault();

    const data = new FormData();

    for(const p of new FormData(loginForm)){
        data.append(p[0],p[1]);
    }

    fetch("/admin/login/includes/login.php",{
        method: "POST",
        body: data
    }).then(response=>response.json()).then(response=>{
        console.log(response);

        if(response.status==="success"){
            window.location.href = "/admin/";
        }
        else{
            failPopUp(response.error);
        }
    })
})


let forgotPassForm = document.getElementById("forgot-passowrd-form");

forgotPassForm.addEventListener("submit",e=>{
    e.preventDefault();

    const data = new FormData();

    for(const p of new FormData(forgotPassForm)){
        data.append(p[0],p[1]);
        console.log(p[0],p[1]);
    }

    fetch("/admin/login/includes/forgot-pass.php",{
        method: "POST",
        body: data
    }).then(response=>response.json()).then(response=>{
        if(response.status==="success"){
            showChangePass();
            successPopUp("Codul de confirmare a fost trimis cu succes.");
        }
        else{
            failPopUp(response.error);
        }
    })
})


let changePassForm = document.getElementById("change-passowrd-form");
changePassForm.addEventListener("submit",e=>{
    e.preventDefault();
    const data = new FormData();

    for(const p of new FormData(changePassForm)){
        data.append(p[0],p[1]);
        // console.log(p[0],p[1]);
    }

    fetch("/admin/login/includes/reset-pass.php",{
        method: "POST",
        body: data
    }).then(response=>response.json()).then(response=>{
        if(response.status==="success"){
            showLogin();
            successPopUp("Parola a fost modificată cu succes.");
        }
        else{
            failPopUp(response.error);
        }
    })
})






function showLogin(){
    document.getElementById("login-section").style.marginLeft="0";
}

function showForgotPass(){
    document.getElementById("login-section").style.marginLeft="-105%";
}
function showChangePass(){
    document.getElementById("login-section").style.marginLeft="-210%";
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