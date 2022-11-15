
let createAccForm = document.getElementById("create-account-form");

let newAccLink = "/admin/admin-includes/new-account.php";
let checkAccLink = "/admin/admin-includes/check-account.php";


let checkRoleLink = "/admin/admin-includes/check-role.php";
fetch(checkRoleLink).then(response=>response.json()).then(response=>{
    console.log(response);
    if(response.role==="admin"){
        
        document.getElementById("asign-admin-box").innerHTML="<input type='text' value='"+response.id+"' readonly hidden></input>";
    }
    else if(response.role=== "owner"){
        document.getElementById("asign-admin-box").innerHTML="<select name='asign-admin' id='new-account-asign-admin'></select>";
        getAdmins();
    }
})



createAccForm.addEventListener("submit", e => {
    e.preventDefault();

    const data = new URLSearchParams();

    for (const p of new FormData(createAccForm)) {
        data.append(p[0], p[1]);
    }

    fetch(checkAccLink, {
        method: "POST",
        body: data
    }).then(response => response.text()).then(response => {
        console.log(response);
        if (response === "used") {
            failPopUp("used");
        }
        else {
            fetch(newAccLink, {
                method: "POST",
                body: data
            }).then(response => response.text()).then(response => {

                if (response === "success") {
                    console.log("success");
                    successPopUp();
                    createAccForm.reset();
                }
                else {
                    console.log("fail");
                    failPopUp("");
                }
                
            })
        }
    })


})


function getAdmins(){
    let adminSelector = document.getElementById("new-account-asign-admin");
    let getAdminsLink= "../admin-includes/get-admin.php";

    fetch(getAdminsLink).then(response=>response.json()).then(response=>{
        console.log(response);
        adminSelector.innerHTML="<option value='' selected disabled>Client admin</option>";
        
        for(i=1;i<response.length;i++){
            adminSelector.innerHTML+="<option value='"+response[i].id+"'>"+response[i].nume+"</option>";
        }
    })
}



function generatePassword(x) {
    let r = (Math.random() + 11).toString(36).substring(2);
    if (x === 1) {
        document.getElementById("new-account-client-password").value = r;
    }
    if (x === 2) {
        document.getElementById("new-account-password").value = r;
    }
}

function showAccForm() {
    document.getElementById("create-client-account-box").style.transform = "translateX(-100%)";
    document.getElementById("create-account-box").style.transform = "translateX(-100%)";
    
    document.getElementById("switcher-active").style.transform="translatex(100%)";

    document.getElementById("switch2").style.color="#fff";
    document.getElementById("switch1").style.color="#000";
}

function showClientAccForm() {
    document.getElementById("create-client-account-box").style.transform = "translateX(0)";
    document.getElementById("create-account-box").style.transform = "translateX(0)";
    document.getElementById("switcher-active").style.transform="translatex(0)";
    
    document.getElementById("switch1").style.color="#fff";
    document.getElementById("switch2").style.color="#000";
    getAdmins();
}



function successPopUp() {

    document.getElementById("success-popup").style.display = "block";
    
    setTimeout(() => {
        document.getElementById("success-popup").style.opacity = "1";
    }, 100);
    setTimeout(()=>{
      closePopup();
    },5000);
  }
  
  function failPopUp(err) {
    if (err === "used") {
        document.getElementById("error").innerHTML = "This username already exist!";
    }
    else {
        document.getElementById("error").innerHTML = "Try again later!";
    }
    document.getElementById("fail-popup").style.display = "block";
    setTimeout(() => {
        document.getElementById("fail-popup").style.opacity = "1";
    }, 100);
    setTimeout(()=>{
      closePopup();
    },5000);
  }
  
  function closePopup() {
    document.getElementById("success-popup").style.opacity = "0";
    document.getElementById("fail-popup").style.opacity = "0";
    setTimeout(() => {
        document.getElementById("success-popup").style.display = "none";
        document.getElementById("fail-popup").style.display = "none";
    }, 500);
  }

