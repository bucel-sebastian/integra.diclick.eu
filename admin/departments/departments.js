// let addDepartment=false;
// let editDepartment=false;
// let deleteDepartment=false;
// checkRole();

// function checkRole(){
//     fetch("/admin/admin-includes/role-check.php").then(response=>response.json()).then(response=>{
//         console.log(response);
//         for(i=0;i<response.length;i++){
//             if(response[i]==="add department"){
//                 addDepartment=true;
//             }
            
//             if(response[i]==="edit department"){
//                 editDepartment=true;
                
//             }
//             if(response[i]==="delete department"){
//                 deleteDepartment=true;
                
//             }
//         }
//         if(!addDepartment){
//             document.getElementById("add-role-btn").style.display="none";
//             document.getElementById("add-role-btn").parentNode.removeChild(document.getElementById("add-role-btn"));
//         }
//         fetchRoles();
//     });
// }

fetchDepartments();

function fetchDepartments(){

    fetch("/admin/admin-includes/get-departments.php").then(response=>response.json()).then(response=>{
        console.log(response);
        document.getElementById('departments-table').innerHTML="";
        for(i=1;i<response.length;i++){
            document.getElementById('departments-table').innerHTML+='<tr> <td style="text-align: left;text-transform:capitalize">'+response[i].nume+'</td><td>'+response[i].tip+'</td><td style="width:0"> <div class="crm-action-box-btns"> <div class="crm-btn" style="background-color: #dea336;" title="Modifica" onclick=\'editDepartment("'+response[i].id+'")\'> <i class="fa-solid fa-pen-to-square"></i> </div> <div class="crm-btn" style="background-color: #d94e47;" title="Sterge"onclick=\'deleteDepartment("'+response[i].id+'")\'> <i class="fa-solid fa-trash-can"></i> </div> </div> </td> </tr>';

        }
    })
    
}
 

function addDepartment(){
    let modal=document.getElementById('modal-add-department');
    modal.style.display="block";
    setTimeout(()=>{
        modal.style.opacity="1";
    },50);
}

function closeAddDepartment(){
    let modal=document.getElementById('modal-add-department');
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
    },300);
}

let addDepartmentForm = document.getElementById("add-department-form");
addDepartmentForm.addEventListener("submit",e=>{
    e.preventDefault();
    startLoading();
    const data=new FormData();

    for(const p of new FormData(addDepartmentForm)){
        data.append(p[0],p[1]);
    }

    fetch("/admin/admin-includes/add-department.php",{
        method:"POST",
        body:data
    }).then(response=>response.json()).then(response=>{
        if(response.status==="success"){
            successPopUp("Departamentul a fost adaugat cu succes.");
            closeAddDepartment();
            addDepartmentForm.reset();
            fetchDepartments();
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

function deleteDepartment(id){
    
    if(confirm("Sigur doresti sa stergi acest departament?")===true){
        startLoading();
        fetch("/admin/admin-includes/delete-department.php?id="+id).then(response=>response.json()).then(response=>{
            if(response.status==="success"){
                successPopUp("Departamentul a fost sters cu succes.");
                fetchDepartments();
            }
            else{
                failPopUp(response.error);
            }
            stopLoading();
        })
    }
    
}

function editDepartment(id){
    fetch("/admin/admin-includes/get-department.php?id="+id).then(response=>response.json()).then(response=>{
        document.getElementById("edit-nume-departament").value=response.nume;
        document.getElementById("edit-id-department").value=response.id;
        document.getElementById("edit-tip-departament").value=response.tip;

    })
    let modal=document.getElementById('modal-edit-department');
    modal.style.display="block";
    setTimeout(()=>{
        modal.style.opacity="1";
    },50);
}

function closeEditDepartment(){
    let modal=document.getElementById('modal-edit-department');
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
    },300);
}

let editDepartmentForm = document.getElementById("edit-department-form");
editDepartmentForm.addEventListener("submit",e=>{
    e.preventDefault();
    startLoading();

    const data= new FormData();

    for(const p of new FormData(editDepartmentForm)){
        data.append(p[0],p[1]);
    }
    fetch("/admin/admin-includes/edit-department.php",{
        method:"POST",
        body:data
    }).then(response=>response.json()).then(response=>{
        if(response.status==="success"){
            successPopUp("Departamentul a fost modificat cu succes.");
            fetchDepartments();
            closeEditDepartment();
        }
        else{
            failPopUp(response.error);
        }
        stopLoading();
    })
})