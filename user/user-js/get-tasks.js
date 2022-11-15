let getProjectsLink = "../user-includes/get-projects.php";
let getTasksLink = "../user-includes/get-tasks.php";
let newTaskLink ="../user-includes/send-tasks.php";
let projectSelector = document.getElementById("projectSelector-client");

let newProjectLink = "../user-includes/new-project.php";

let getTaskCommentsLink = "../user-includes/get-task-comments.php";
let getUserNameLink = "../user-includes/get-user-name.php";
let sendTaskCommentLink = "../user-includes/send-task-comment.php";


fetch(getProjectsLink).then(response=>response.text()).then(response=>{
    projectSelector.innerHTML="";
    projectSelector.innerHTML+="<option value='All'>All</option>";
    let param=0;
    let projectName="";
    let projectUnicId="";
    
    for(i=0;i<response.length;i++){
        
        if(response[i]==="\n"){
            projectSelector.innerHTML+="<option value='"+projectUnicId+"'>"+projectName+"</option>";
            param=0;
            projectName="";
            projectUnicId="";
        }
        else{
            if(response[i]==="÷"){
                param++;
            }
            else{
                if(param===0){
                    projectName+=response[i];
                }
                if(param===1){
                    projectUnicId+=response[i];
                }
            }
        }
    }
});

projectSelector.addEventListener("change",()=>{
    if(projectSelector.value==="All"){
        document.getElementById("new-task-button-client").style.transform="translateX(-250px)";
        //document.getElementById("edit-project-button-client").style.transform="translateX(-250px)";
        getProjectTasks(projectSelector.value);
    }
    else{
        document.getElementById("new-task-button-client").style.transform="translateX(0)";
        //document.getElementById("edit-project-button-client").style.transform="translateX(0)";
        getProjectTasks(projectSelector.value);
    }
})

function getProjectTasks(projectId){
    let getTasksLink = "../user-includes/get-tasks.php";
    getTasksLink += "?projectId="+projectId;
    let taskContent= document.getElementById("view-task-content");
    taskContent.innerHTML="";
  
    fetch(getTasksLink).then(response=>response.text()).then(response=>{
      if(response === "None"){
        taskContent.innerHTML=response;
      }
      else{
        taskContent.innerHTML=response;
      }
    })
  }

  function newTask(){
    document.getElementById("modal-new-task").style.display="flex";
    document.getElementById("new-task-projectId").value=projectSelector.value;
    setTimeout(()=>{
      document.getElementById("modal-new-task").style.opacity="1";
    },50);
  }
  function closeNewTask(){
    document.getElementById("modal-new-task").style.opacity="0";
    setTimeout(()=>{
      document.getElementById("modal-new-task").style.display="none";
    },300);
  }

  let newTaskForm= document.getElementById("new-task-form");

newTaskForm.addEventListener("submit",e=>{
  e.preventDefault();

  const data = new FormData();

  inpFile=document.getElementById("new-file");
  for (i = 0; i < document.getElementById("new-file").files.length; i++) {
    data.append('file[' + i + ']', inpFile.files[i]);
  }
  for(const p of new FormData(newTaskForm)){
    data.append(p[0],p[1]); 
  }
  fetch(newTaskLink,{
    method:"POST",
    body:data
  }).then(response=>response.text()).then(response=>{
    console.log(response);
    if(response==="success"){
      successPopUp("Task created successfully!");
      getProjectTasks(projectSelector.value);
      closeNewTask();
      resetNewTask();
    }
    else{
      failPopUp(response);
    }
  })
});



function successPopUp(message) {

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

  function resetNewTask(){
    document.getElementById("new-task-title").value="";
    document.getElementById("new-task-text").value="";
    document.getElementById("new-task-date").value="";
    let icons = document.querySelectorAll("input[name=icon]");
    icons.forEach(icon =>{
      icon.checked=false;
    })
  }

  function openComments(taskId,projectId){
    document.getElementById("modal-comments-task").style.display="flex";
    setTimeout(()=>{
      document.getElementById("modal-comments-task").style.opacity="1";
    },50);
    document.getElementById("comments-container").innerHTML="";
  
    document.getElementById("new-comment-task-id").value=taskId;
    document.getElementById("new-comment-task-projectId").value=projectId;
  
    getTaskCommentsLink+="?projectId="+projectId+"&taskId="+taskId;
    
    fetch(getTaskCommentsLink).then(response=>response.text()).then(response=>{
      console.log(response);
      let message=0;
      let param=0;
      let comName = new Array("");
      let comUserId=new Array("");
      let comDate = new Array("");
      let comText = new Array("");
      for(i=0;i<response.length;i++){
        
        if(response[i]==="\n" && param===4){
          console.log(comDate[message],comName[message],comText[message])
          console.log('newline',response.length ,message,param);
          message++;
          param=0;
          console.log('newline',response.length ,message,param,i);
          comUserId[message]="";
          comName[message]="";
          comDate[message]="";
          comText[message]="";
        }
        else if(response[i]==="÷"){
          param++;
        }
        else{
          if(param===0){
            comUserId[message]+=response[i];
          }
          if(param===1){
            comName[message]+=response[i];
          }
          if(param===2){
            comDate[message]+=response[i];
          }
          if(param===3){
            comText[message]+=response[i];
          }
        }
      }
      for(i=0;i<message;i++){
        console.log(comName[i],comText[i],comDate[i]);
        if(comUserId[i].includes("owner") || comUserId[i].includes("admin")){
          document.getElementById("comments-container").innerHTML+="<div class='message-container-left'><div class='message-buble message-reciver'><h3>"+comName[i]+"</h3><h5>"+comDate[i]+"</h5><p>"+comText[i]+"</p></div></div>";
        }
        else{
          document.getElementById("comments-container").innerHTML+="<div class='message-container-right'><div class='message-buble message-sender'><h3>"+comName[i]+"</h3><h5>"+comDate[i]+"</h5><p>"+comText[i]+"</p></div></div>";
        }
      }
  
    })
  }
  
  let newCommentForm = document.getElementById("new-comment-form");
  newCommentForm.addEventListener("submit",e=>{
    e.preventDefault();
  
    const data = new FormData();
    for(const p of new FormData(newCommentForm)){
      data.append(p[0],p[1]);
    }
    fetch(sendTaskCommentLink,{
      method:"POST",
      body:data
    }).then(response=>response.text()).then(response=>{
      console.log(response);
      if(response==="success"){
        openComments(document.getElementById("new-comment-task-id").value,document.getElementById("new-comment-task-projectId").value);
        document.getElementById("new-comment-task-text").value="";
      }
      else{
        failPopUp(response);
      }
    })
  })
  
  function closeComments(){
    document.getElementById("modal-comments-task").style.opacity="0";
    setTimeout(()=>{
      document.getElementById("modal-comments-task").style.display="none";
      ocument.getElementById("comments-container").innerHTML="";
      document.getElementById("new-comment-task-text").value="";
    },300);
    
  }

  function newProject(){
    document.getElementById("modal-new-project").style.display="flex";
    setTimeout(()=>{
      document.getElementById("modal-new-project").style.opacity="1";
    },50);
  }
  
  function closeNewProject(){
    document.getElementById("modal-new-project").style.opacity="0";
    setTimeout(()=>{
      document.getElementById("modal-new-project").style.display="none";
    },300);
  }

  function resetNewProject(){
    document.getElementById("new-project-title").value="";
    document.getElementById("new-project-text").value="";
    document.getElementById("new-date").value="";
  }
  

  let newProjectForm= document.getElementById("new-project-form");

  newProjectForm.addEventListener("submit",e=>{
    e.preventDefault();
  
    const data = new FormData();
    for(const p of new FormData(newProjectForm)){
      data.append(p[0],p[1]);
    }
    fetch(newProjectLink,{
      method:"POST",
      body:data
    }).then(response=>response.text()).then(response=>{
      console.log(response);
      if(response==="success"){
        successPopUp("Project created successfully!");
        closeNewProject();
        refetchProjects();
        resetNewProject();
      }
      else{
        failPopUp(response);
      }
    })
  });

  function refetchProjects(){
    fetch(getProjectsLink).then(response=>response.text()).then(response=>{
      projectSelector.innerHTML="";
      projectSelector.innerHTML+="<option value='All'>All</option>";
      let param=0;
      let projectName="";
      let projectUnicId="";
      
      for(i=0;i<response.length;i++){
          
          if(response[i]==="\n"){
              projectSelector.innerHTML+="<option value='"+projectUnicId+"'>"+projectName+"</option>";
              param=0;
              projectName="";
              projectUnicId="";
          }
          else{
              if(response[i]==="÷"){
                  param++;
              }
              else{
                  if(param===0){
                      projectName+=response[i];
                  }
                  if(param===1){
                      projectUnicId+=response[i];
                  }
              }
          }
      }
  });
  }