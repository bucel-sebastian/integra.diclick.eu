let projectTypes = [];

fetchProjectTypes();

function fetchProjectTypes(){
    fetch("/admin/admin-includes/get-project-types.php").then(response=>response.json()).then(response=>{
        console.log(response);
        projectTypes = response;
        document.getElementById("project-types-table").innerHTML="";





        for(i=0;i<projectTypes.length;i++){

            viewProjectTypeBtn = "<button class='crm-btn blue-btn' onclick='viewProjectType(\""+projectTypes[i].id+"\")' title='Vezi detalii'><i class='fa-solid fa-eye'></i></button>";
            editProjectTypeBtn = "<button class='crm-btn yellow-btn' onclick='editProjectType(\""+projectTypes[i].id+"\")' title='Modifica tipul de proiect'><i class='fa-solid fa-pen-to-square'></i></button>";
            deleteProjectTypeBtn = "<button class='crm-btn red-btn' onclick='deleteProjectType(\""+projectTypes[i].id+"\")' title='Sterge tipul de proiect'><i class='fa-solid fa-trash-can'></i> </button>";


            document.getElementById("project-types-table").innerHTML+="<tr><td>"+projectTypes[i].nume+"</td><td><div class='crm-action-box-btns'> "+viewProjectTypeBtn+" "+editProjectTypeBtn+" "+deleteProjectTypeBtn+" </div></td></tr>";
        }
    })
}



function openNewProjectType(){
    let modal=document.getElementById('modal-new-project-type');
    document.body.style.overflow="hidden";
    modal.style.display="block";
    setTimeout(()=>{
        modal.style.opacity="1";
    },50);
}

function closeNewProjectType(){
    let modal=document.getElementById('modal-new-project-type');
    document.body.style.overflow="auto";
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
    },300);
}



let newProjectTypeForm = document.getElementById("new-project-type-form");
newProjectTypeForm.addEventListener("submit",e=>{
    e.preventDefault();
    
    const data = new FormData(newProjectTypeForm);

    for(const p of new FormData(newProjectTypeForm)){
        data.append(p[0],p[1]);
    }

    fetch("/admin/admin-includes/add-project-type.php",{
        method: "POST",
        body: data
    }).then(response=>response.json()).then(response=>{
        console.log(response);
        if(response.status==='success'){
            fetchProjectTypes();
            closeNewProjectType();
            newProjectTypeForm.reset();
            document.getElementById("project-type-tasks").innerHTML="";
        }
    })
})



function viewProjectType(id){

    let projectType;
    for(i=0;i<projectTypes.length;i++){
        if(id === projectTypes[i].id){
            projectType = projectTypes[i];
        }
    }

    document.getElementById("project-type-title").innerHTML = projectType.nume;
    document.getElementById("project-type-description").innerHTML = projectType.descriere;
    document.getElementById("project-type-title").innerHTML = projectType.nume;

    let modal=document.getElementById('modal-view-project');
    document.body.style.overflow="hidden";
    modal.style.display="block";
    setTimeout(()=>{
        modal.style.opacity="1";
    },50);

}

function closeProjectType(){
    let modal=document.getElementById('modal-view-project');
    document.body.style.overflow="auto";
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
    },300);
}


function deleteProjectType(id){
    if(confirm("Sigur dorești să ștergi acest tip de proiect?")){
        fetch("/admin/admin-includes/delete-project-type.php?id="+id).then(response=>response.json()).then(response=>{
            if(response.status==="success"){
                fetchProjectTypes();

            }
            else{
                
            }
        })
    }
}




function newProjectAddTask(){

    taskId=Math.floor(Math.random()*90000) + 10000;

    let element = document.createElement("div");
    element.id = taskId;
    element.classList.add("new-predefined-task-container");
    element.innerHTML="";

    document.getElementById("new-project-type-tasks").appendChild(element);
}