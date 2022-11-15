var Calendar = new Date();

let clientSelector = document.getElementById("client-selector");
let clientsList = [];
let filteredClientList = [];
let clientAles;
fetchClients();

var day_of_week = new Array("Duminica", "Luni", "Marti", "Miercuri", "Joi", "Vineri", "Sambata");
var month_of_year = new Array("Ianuarie","Februarie","Martie","Aprilie","Mai","Iunie","Iulie","August","Septembrie","Octombrie","Noiembrie","Decembrie");

var actual_year= Calendar.getFullYear();
var actual_day_name= day_of_week[Calendar.getDay()];
var actual_day = Calendar.getDate();
var actual_month=Calendar.getMonth();
var actual_month_name = month_of_year[Calendar.getMonth()];
var actual_month_first_day = actualMonthFirstDay(actual_month,actual_year);


function actualMonthFirstDay(month,year){
  return new Date(year,month,1).getDay();
}
var actual_month_first_day = actualMonthFirstDay(actual_month,actual_year);

function daysInMonth(month,year){
  return new Date(year,month,0).getDate();
}





function fetchClients(){
  fetch("/admin/admin-includes/get-clients-selector.php").then(response=>response.json()).then(response=>{
      clientsList=response;
      console.log(clientsList);


      renderClientList(clientsList);
  })
}

function renderClientList(list){
  console.log("merge?");
  let clientListDiv = document.getElementById("clients-list");
  clientListDiv.innerHTML="";
  let element = document.createElement("div");
      element.dataset.clientId = 'none';
      element.classList.add("client-selector-value");
      element.setAttribute("onclick","setClient('none','Selectează un client')");
      element.innerHTML= 'none';
      clientListDiv.appendChild(element);

  for(i=0;i<list.length;i++){
      let element = document.createElement("div");
      element.dataset.clientId = list[i].clientId;
      element.classList.add("client-selector-value");
      element.setAttribute("onclick","setClient('"+list[i].clientId+"','"+list[i].name+"')");
      element.innerHTML=list[i].name;
      clientListDiv.appendChild(element);
  }   
}

function openChangeClient(){
  document.getElementById("client-selector-container").style.display="block";
  document.getElementById("client-selector").setAttribute("onclick","closeChangeClient()");
}

function closeChangeClient(){
  document.getElementById("client-selector-container").style.display="none";
  document.getElementById("client-selector").setAttribute("onclick","openChangeClient()");
  document.getElementById("search-client-input").value = "";
  renderClientList(clientsList);
}


// if(clientSelector.value==="None"){
//   document.getElementById("calendarBtns").style.display="none";
//   document.getElementById("calendar-home-made").style.display="none";
//   document.getElementById("new-schedule-button").style.transform='translateX(-255px)';
//   document.getElementById("platformSelector").style.transform='translateX(-100%)';
//   document.getElementById("platformSelector").style.borderRadius="5px";
//   document.getElementById("clientSelector").style.borderRadius="5px";
 
// }
// else{
//   document.getElementById("calendarBtns").style.display="flex";
//   document.getElementById("calendar-home-made").style.display="block";
//   document.getElementById("new-schedule-button").style.transform='translateX(0)';
//   document.getElementById("platformSelector").style.transform='translateX(0)';
//   document.getElementById("platformSelector").style.borderRadius="0";
//   document.getElementById("clientSelector").style.borderRadius="5px 0 0 5px ";

//   document.getElementById("new-clientId").value=clientSelector.value;
//   buildCalendar(actual_year,actual_month,actual_month_first_day,clientSelector.value);
// }


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
  

  
  closeChangeClient();
}

function searchClient(e){
  filteredClientList=[];
  if(e.target.value!=""){
      for(i=0;i<clientsList.length;i++){
          if(clientsList[i].name.toLowerCase().includes(e.target.value.toLowerCase())){
              filteredClientList.push(clientsList[i]);
          }
      }
      renderClientList(filteredClientList);
  }
  else{
      renderClientList(clientsList);
  }
  
}

clientSelector.addEventListener("change",e=>{
  e.preventDefault();
})



function buildCalendar(year,month,first_day_name,client){
  startLoading();
  let out="";
  let days_in_month=daysInMonth(month+1,year);
  
  let week;
  let week_end=8;
  if(first_day_name===1){
    out+="<tr>";
    week=1;
    for(j=1;j<week;j++){
      out+="<td class='inactive-day'></td>";
    }
  }
  else if(first_day_name===2){
    out+="<tr>";
    week=2;
    for(j=1;j<week;j++){
      out+="<td class='inactive-day'></td>";
    }
  }
  else if(first_day_name===3){
    out+="<tr>";
    week=3;
    for(j=1;j<week;j++){
      out+="<td class='inactive-day'></td>";
    }
  }
  else if(first_day_name===4){
    out+="<tr>";
    week=4;
    for(j=1;j<week;j++){
      out+="<td class='inactive-day'></td>";
    }
  }
  else if(first_day_name===5){
    out+="<tr>";
    week=5;
    for(j=1;j<week;j++){
      out+="<td class='inactive-day'></td>";
    }
  }
  else if(first_day_name===6){
    out+="<tr>";
    week=6;
    for(j=1;j<week;j++){
      out+="<td class='inactive-day'></td>";
    }
  }
  else if(first_day_name===0){
    out+="<tr>";
    week=7;
    for(j=1;j<week;j++){
      out+="<td class='inactive-day'></td>";
    }
  }
  for(i=1;i<=days_in_month;i++){
    if(week===week_end){
      if(i<10){
        if(month+1<10){
          out+="</tr><tr><td><div class='cell-container'><div class='day-container'>"+i+"</div><div class='events-container' onclick='openNewScheduleOnDate(event,\""+year+"-0"+(month+1)+"-0"+i+"\")' id='"+year+"-0"+(month+1)+"-0"+i+"'></div></div></td>";
        }
        else{
          out+="</tr><tr><td><div class='cell-container'><div class='day-container'>"+i+"</div><div class='events-container' onclick='openNewScheduleOnDate(event,\""+year+"-"+(month+1)+"-0"+i+"\")' id='"+year+"-"+(month+1)+"-0"+i+"'></div></div></td>";
        }
      }
      else{
        if(month+1<10){
          out+="</tr><tr><td><div class='cell-container'><div class='day-container'>"+i+"</div><div class='events-container' onclick='openNewScheduleOnDate(event,\""+year+"-0"+(month+1)+"-"+i+"\")' id='"+year+"-0"+(month+1)+"-"+i+"'></div></div></td>";
        }
        else{
          out+="</tr><tr><td><div class='cell-container'><div class='day-container'>"+i+"</div><div class='events-container' onclick='openNewScheduleOnDate(event,\""+year+"-"+(month+1)+"-"+i+"\")' id='"+year+"-"+(month+1)+"-"+i+"'></div></div></td>";
        }
        
      }
      week++;
      week_end+=7;
    }
    else{
      if(i<10){
        if(month+1<10){
          out+="<td><div class='cell-container'><div class='day-container'>"+i+"</div><div class='events-container' onclick='openNewScheduleOnDate(event,\""+year+"-0"+(month+1)+"-0"+i+"\")' id='"+year+"-0"+(month+1)+"-0"+i+"'></div></div></td>";
        }
        else{
          out+="<td><div class='cell-container'><div class='day-container'>"+i+"</div><div class='events-container' onclick='openNewScheduleOnDate(event,\""+year+"-"+(month+1)+"-0"+i+"\")' id='"+year+"-"+(month+1)+"-0"+i+"'></div></div></td>";
        }
      }
      else if(month+1<10){
        out+="<td><div class='cell-container'><div class='day-container'>"+i+"</div><div class='events-container' onclick='openNewScheduleOnDate(event,\""+year+"-0"+(month+1)+"-"+i+"\")' id='"+year+"-0"+(month+1)+"-"+i+"'></div></div></td>";
      }
      else{
        out+="<td><div class='cell-container'><div class='day-container'>"+i+"</div><div class='events-container' onclick='openNewScheduleOnDate(event,\""+year+"-"+(month+1)+"-"+i+"\")' id='"+year+"-"+(month+1)+"-"+i+"'></div></div></td>";
      }
      week++;
    }
  }
  if(week%7===0){
  }
  else{
    week_to_add=week_end%week;
    for(i=0;i<week_to_add;i++){
      out+="<td class='inactive-day'></td>";
    }
  }
  out+="</tr>";
  document.getElementById("tbody").innerHTML=out;
  document.getElementById('month').innerHTML=month_of_year[month];
  document.getElementById('year').innerHTML=year;

  getSchedules(client,platformSelector.value);
  stopLoading();
}

function prevMonth(){
  if(actual_month-1>=0){
    actual_month--;
    actual_month_first_day = actualMonthFirstDay(actual_month,actual_year);
    buildCalendar(actual_year,actual_month,actual_month_first_day,clientAles);
  }
  else{
    actual_month=11;
    actual_year--;
    actual_month_first_day = actualMonthFirstDay(actual_month,actual_year);
    buildCalendar(actual_year,actual_month,actual_month_first_day,clientAles);
  }
}

function nextMonth(){
  if(actual_month+1<=11){
    actual_month++;
    actual_month_first_day = actualMonthFirstDay(actual_month,actual_year);
    buildCalendar(actual_year,actual_month,actual_month_first_day,clientAles);
  }
  else{
    actual_month=0;
    actual_year++;
    actual_month_first_day = actualMonthFirstDay(actual_month,actual_year);
    buildCalendar(actual_year,actual_month,actual_month_first_day,clientAles);
  }
}



function closeViewScheduleModal(){
  let viewScheduleModal=document.getElementById("modal-view-schedule");
  if(document.getElementById("preview-schedule-video")){
    document.getElementById("preview-schedule-video").pause();
  }
  viewScheduleModal.style.opacity="0";
  setTimeout(()=>{
    viewScheduleModal.style.display="none";
  },300);
}

function deleteSchedule(id,clientId){
  let deleteScheduleLink="../admin-includes/delete-schedule.php?scheduleId="+id+"&clientId="+clientId;
  let del=confirm("Are you sure?");
  if(del){
    fetch(deleteScheduleLink).then(response=>response.text()).then(response=>{
      if(response==="success"){
        
        closeViewScheduleModal();
        buildCalendar(actual_year,actual_month,actual_month_first_day,clientId);
        successPopUp("Programarea a fost eliminata cu succes");
      }
      else{
        failPopUp(response);
        console.log(response);
      }
    });
  }
}

function newSchedule(){
  let newScheduleModal=document.getElementById('modal-new-schedule');
  newScheduleModal.style.display="flex";
  setTimeout(()=>{
    newScheduleModal.style.opacity="1";
  },50);
}

function closeNewSchedule(){
  let newScheduleModal=document.getElementById('modal-new-schedule');
  newScheduleModal.style.opacity="0";
  setTimeout(()=>{
    newScheduleModal.style.display="none";
  },300);
}

function editSchedule(){
  let editScheduleModal=document.getElementById('modal-edit-schedule');
  editScheduleModal.style.display="flex";
  setTimeout(()=>{
    editScheduleModal.style.opacity="1";
  },50);
}
function closeEditSchedule(){
  let editScheduleModal=document.getElementById('modal-edit-schedule');
  editScheduleModal.style.opacity="0";
  setTimeout(()=>{
    editScheduleModal.style.display="none";
  },300);
}

function checkBoxMP(e){
  e.stopPropagation();
}

function viewSchedule(id,clientId,e){
  e.stopPropagation();
  let editScheduleForm = document.getElementById("edit-schedule-form");
  editScheduleForm.reset();

  let viewScheduleLink="/admin/admin-includes/view-schedule.php?scheduleId="+id+"&clientId="+clientId;
  let viewScheduleModal=document.getElementById("modal-view-schedule");
  viewScheduleModal.style.display="flex";

  document.getElementById("view-schedule-platforms").innerHTML="";
  document.getElementById("edit-facebook").removeAttribute("checked");
  document.getElementById("edit-instagram").removeAttribute("checked");
  document.getElementById("edit-pinterest").removeAttribute("checked");
  document.getElementById("edit-twitter").removeAttribute("checked");
  document.getElementById("edit-linkedin").removeAttribute("checked");
  document.getElementById("edit-tiktok").removeAttribute("checked");
  document.getElementById("edit-snapchat").removeAttribute("checked");
  document.getElementById("edit-youtube").removeAttribute("checked");


  
  setTimeout(()=>{
    viewScheduleModal.style.opacity="1";
  },50);
  fetch(viewScheduleLink).then(response=>response.json()).then(response=>{

    console.log(response);
    document.getElementById("edit-schedule-btn").setAttribute('onclick','editSchedule("'+id+'","'+clientId+'")');
    document.getElementById("delete-schedule-btn").setAttribute('onclick','deleteSchedule("'+id+'","'+clientId+'")');
    document.getElementById("download-schedule-btn").href="/user/media-plan/"+response[0].file;
    let actualDate = new Date().getHours() + new Date().getMinutes() + new Date().getSeconds();

    if(response[0].file.includes(".png") || response[0].file.includes(".jpg") || response[0].file.includes(".jpeg") || response[0].file.includes(".gif")){
      document.getElementById("view-schedule-file").innerHTML="<img class='preview-img' src=\"/user/media-plan/"+response[0].file+"?"+actualDate+"\">";
    }
    else if(response[0].file.includes(".mp4") || response[0].file.includes(".webm")){
      document.getElementById("view-schedule-file").innerHTML="<video class='preview-video' id='preview-schedule-video' controls><source src=\"/user/media-plan/"+response[0].file+"\"></video>";
    }
    else{
      // document.getElementById('view-schedule-content').innerHTML="<div class='btns-box'><div><i onclick='editSchedule(\""+id+"\",\""+clientId+"\")' class='fas fa-edit'></i><i onclick='deleteSchedule(\""+id+"\",\""+clientId+"\")' class='fas fa-trash-alt'></i></div><i onclick='closeViewScheduleModal()' class='fas fa-times'></i></div><h3>"+title+"</h3><p>"+text+"</p><p>"+date+"</p><p>"+time+"</p><p>"+comments+"</p>";
    }

    document.getElementById("schedule-comments-list").scrollTop=document.getElementById("schedule-comments-list").offsetHeight;
    document.getElementById("comment-schedule-id").value=id;
    document.getElementById("comment-schedule-client").value=clientId;
  
    document.getElementById("view-schedule-title").innerText=response[0].title;
    document.getElementById("view-schedule-date").innerText=response[0].date +" "+response[0].time;
    document.getElementById("view-schedule-text").innerText=response[0].text.replaceAll("<br>","\n");


    if(response[0].platforms.includes("facebook")){
      document.getElementById("view-schedule-platforms").innerHTML+="<i class='fab fa-facebook-square'></i>";
      document.getElementById("edit-facebook").setAttribute("checked","");
    }
    if(response[0].platforms.includes("instagram")){
      document.getElementById("view-schedule-platforms").innerHTML+="<i class='fab fa-instagram-square'></i>";
      document.getElementById("edit-instagram").setAttribute("checked","");

    }
    if(response[0].platforms.includes("pinterest")){
      document.getElementById("view-schedule-platforms").innerHTML+="<i class='fab fa-pinterest-square'></i>";
      document.getElementById("edit-pinterest").setAttribute("checked","");

    }
    if(response[0].platforms.includes("twitter")){
      document.getElementById("view-schedule-platforms").innerHTML+="<i class='fab fa-twitter-square'></i>";
      document.getElementById("edit-twitter").setAttribute("checked","");

    }
    if(response[0].platforms.includes("linkedin")){
      document.getElementById("view-schedule-platforms").innerHTML+="<i class='fab fa-linkedin'></i>";
      document.getElementById("edit-linkedin").setAttribute("checked","");

    }
    if(response[0].platforms.includes("tiktok")){
      document.getElementById("view-schedule-platforms").innerHTML+="<i class='fab fa-tiktok'></i>";
      document.getElementById("edit-tiktok").setAttribute("checked","");

    }
    if(response[0].platforms.includes("snapchat")){
      document.getElementById("view-schedule-platforms").innerHTML+="<i class='fab fa-snapchat-square'></i>";
      document.getElementById("edit-snapchat").setAttribute("checked","");
    }
    if(response[0].platforms.includes("youtube")){
      document.getElementById("view-schedule-platforms").innerHTML+="<i class='fab fa-youtube'></i>";
      document.getElementById("edit-youtube").setAttribute("checked","");
    }
  
    document.getElementById("edit-scheduleId").value=id;
    document.getElementById("edit-clientId").value=clientId;
    document.getElementById("edit-title").value=response[0].title;
    document.getElementById("edit-text").value=response[0].text.replaceAll("<br>","\n");
    document.getElementById("edit-date").value=response[0].date;
    document.getElementById("edit-time").value=response[0].time;
    
    if(response[0].file.includes(".png") || response[0].file.includes(".jpg") || response[0].file.includes(".jpeg") || response[0].file.includes(".gif")){
        let actualDate = new Date().getHours() + new Date().getMinutes() + new Date().getSeconds();
        document.getElementById("preview-file-edit").innerHTML="<img class='edit-preview-img' src=\"/user/media-plan/"+response[0].file+"?"+actualDate+"\">";
    }
    else if(response[0].file.includes(".mp4") || response[0].file.includes(".webm")){
      document.getElementById("preview-file-edit").innerHTML="<video class='edit-preview-video' controls><source src=\"/user/media-plan/"+response[0].file+"\"></video>";
    }



    document.getElementById("schedule-comments-list").innerHTML="";
    for(i=1;i<response.length;i++){
      if(response[i].from === "admin"){
        let element = document.createElement("div");
        element.classList.add("admin-comment");
        element.innerHTML="<div style='display: flex;flex-direction: row;justify-content: space-between;'><h3>"+response[i].author+"</h3><i class='fa-solid fa-trash-can' onclick='deleteScheduleComment(\""+response[i].id+"\")'></i></div><span>"+response[i].date+"</span><p>"+response[i].message+"</p>";
        element.id=response[i].id;
        document.getElementById("schedule-comments-list").appendChild(element);
        document.getElementById("schedule-comments-list").scrollTop=document.getElementById("schedule-comments-list").scrollHeight;

      }
      else{
        let element = document.createElement("div");
        element.classList.add("client-comment");
        element.innerHTML="<div><h3>"+response[i].author+"</h3><div></div></div><span>"+response[i].date+"</span><p>"+response[i].message+"</p>";
        element.id=response[i].id;
        document.getElementById("schedule-comments-list").appendChild(element);
        document.getElementById("schedule-comments-list").scrollTop=document.getElementById("schedule-comments-list").scrollHeight;
      }

    }
  })
}



let platformSelector = document.getElementById("platformSelector");
let newScheduleForm=document.getElementById("new-schedule-form");
let scheduleLink = "../admin-includes/send-schedule.php";

newScheduleForm.addEventListener("submit",e=>{
    startLoading();
    e.preventDefault();
    
    const data = new FormData();
    for (const p of new FormData(newScheduleForm)){
        data.append(p[0],p[1]);
    }
    
    fetch(scheduleLink,{
        method:"POST",
        body:data
    }).then(response=>response.text()).then(response=>{
      console.log(response);
        if(response==="success"){
          buildCalendar(actual_year,actual_month,actual_month_first_day,clientAles);
          closeNewSchedule();
          successPopUp("Programarea a fost adaugata cu succes!");
          // newScheduleForm.reset();
          document.getElementById("preview-file").innerHTML="";
          document.getElementById("new-file-mp").value="";
          document.getElementById("new-text").value="";
          document.getElementById("new-time").value="";
          document.getElementById("new-date").value="";
          document.getElementById("new-title").value="";
          document.getElementById("new-facebook").checked=false;
          document.getElementById("new-instagram").checked=false;
          document.getElementById("new-pinterest").checked=false;
          document.getElementById("new-twitter").checked=false;
          document.getElementById("new-linkedin").checked=false;
          document.getElementById("new-tiktok").checked=false;
          document.getElementById("new-snapchat").checked=false;
          document.getElementById("new-youtube").checked=false;

        }
        if(response.includes("fail")){
          failPopUp(response);
        }
        stopLoading();
    })
});

let editScheduleForm=document.getElementById("edit-schedule-form");
let editScheduleLink = "/admin/admin-includes/edit-schedule.php";

editScheduleForm.addEventListener("submit",e=>{
  e.preventDefault();
  const data = new FormData();
  for(const p of new FormData(editScheduleForm)){
    data.append(p[0],p[1]);
  }
  fetch(editScheduleLink,{
    method: "POST",
    body: data
  }).then(response=>response.text()).then(response=>{
    
    if(response==="success"){
      closeEditSchedule();
      closeViewScheduleModal();
      buildCalendar(actual_year,actual_month,actual_month_first_day,clientAles);
      successPopUp("Programarea a fost modificata cu succes!");
    }
    if(response.includes("fail")){
      console.log(response);
      failPopUp(response);
    }
  })
})




// clientSelector.addEventListener("change",()=>{
//   if(clientSelector.value==="None"){
//     document.getElementById("calendarBtns").style.display="none";
//     document.getElementById("calendar-home-made").style.display="none";
//     document.getElementById("new-schedule-button").style.transform='translateX(-255px)';
//     document.getElementById("platformSelector").style.transform='translateX(-100%)';
//     document.getElementById("platformSelector").style.borderRadius="5px";
//     document.getElementById("clientSelector").style.borderRadius="5px";
   
//   }
//   else{
//     document.getElementById("calendarBtns").style.display="flex";
//     document.getElementById("calendar-home-made").style.display="block";
//     document.getElementById("new-schedule-button").style.transform='translateX(0)';
//     document.getElementById("platformSelector").style.transform='translateX(0)';
//     document.getElementById("platformSelector").style.borderRadius="0";
//     document.getElementById("clientSelector").style.borderRadius="5px 0 0 5px ";

//     document.getElementById("new-clientId").value=clientSelector.value;
//     buildCalendar(actual_year,actual_month,actual_month_first_day,clientSelector.value);
//   }
  
// });





document.getElementById("edit-file-mp").addEventListener("change",()=>{
  const[file]= document.getElementById("edit-file-mp").files;
  if(file){
    if (file.name.includes(".png") || file.name.includes(".jpg") || file.name.includes(".jpeg") || file.name.includes(".gif")){
      document.getElementById("preview-file-edit").innerHTML="<img src='"+URL.createObjectURL(file)+"' class='edit-preview-img'>";
    }
    if (file.name.includes(".mp4") || file.name.includes(".webm")){
      document.getElementById("preview-file-edit").innerHTML="<video class='edit-preview-video' controls><source src='"+URL.createObjectURL(file)+"'></video>";
    }
  }
  
});
document.getElementById("new-file-mp").addEventListener("change",e=>{
  e.preventDefault();
  const[file]= document.getElementById("new-file-mp").files;
  if(file){
    if (file.name.includes(".png") || file.name.includes(".jpg") || file.name.includes(".jpeg") || file.name.includes(".gif")){
      document.getElementById("preview-file").innerHTML="<img src='"+URL.createObjectURL(file)+"' class='edit-preview-img'>";
    }
    if (file.name.includes(".mp4") || file.name.includes(".webm")){
      document.getElementById("preview-file").innerHTML="<video class='edit-preview-video' controls><source src='"+URL.createObjectURL(file)+"'></video>";
    }
  }  
});

function openLoader(){
  document.getElementById("page-loader").style.display="flex";
  setTimeout(()=>{
    document.getElementById("page-loader").style.opacity="1";
  },50);
}
function closeLoader(){
  
  document.getElementById("page-loader").style.opacity="0";
  setTimeout(()=>{
    document.getElementById("page-loader").style.display="none";
  },300);
}

function openNewScheduleOnDate(e,date){
  e.preventDefault();
  document.getElementById('new-date').value=date;
  newSchedule();
}

function resetNewSchedule(){
  document.getElementById("preview-file").innerHTML="";
  document.getElementById("new-file").value="";
  document.getElementById("new-text").value="";
  document.getElementById("new-time").value="";
  document.getElementById("new-date").value="";
  document.getElementById("new-title").value="";
  document.getElementById("new-facebook").checked=false;
  document.getElementById("new-instagram").checked=false;
  document.getElementById("new-pinterest").checked=false;
  document.getElementById("new-twitter").checked=false;
  document.getElementById("new-linkedin").checked=false;
  document.getElementById("new-tiktok").checked=false;
  document.getElementById("new-snapchat").checked=false;
  document.getElementById("new-youtube").checked=false;
}


platformSelector.addEventListener("change", e=>{
  e.preventDefault();
  // if(platformSelector.value==="all"){
  //   getSchedules(clientSelector.value,"all");
  // }
  // else{
  //   getSchedules(clientSelector.value,platformSelector.value);
  // }
  buildCalendar(actual_year,actual_month,actual_month_first_day,clientAles);
})




function getSchedules(cliendId,platform){
  let getSchedulesLink;
  if(platform==="all"){
    getSchedulesLink="/admin/admin-includes/get-schedule.php?clientId="+cliendId;
  }
  else{
    getSchedulesLink="/admin/admin-includes/get-schedule.php?clientId="+cliendId+"&platform="+platform;
  }
  
  
 
  fetch(getSchedulesLink).then(response=>response.json()).then(response =>{
    console.log(response);
    response=response[0];
    for(i=1;i<response.length;i++){
      let tmpStatus;
      if(response[i].status==="1"){
        tmpStatus="normalStatus";
      }
      if(response[i].status==="2"){
        tmpStatus="needChangesStatus";
      }
      if(response[i].status==="3"){
        tmpStatus="editedStatus";
      }
      if(response[i].status==="4"){
        tmpStatus="aprovedStatus";
      }
      if(response[i].status==="5"){
        tmpStatus="postedByClient";
      }

      let tmpPlatform;
      if(platformSelector.value==="all"){
        tmpPlatform ="";
        if(response[i].platforms.includes("facebook")){
          tmpPlatform+='<i class="fab fa-facebook"></i>';
        }
        if(response[i].platforms.includes("instagram")){
          tmpPlatform+='<i class="fab fa-instagram"></i>';
        }
        if(response[i].platforms.includes("pinterest")){
          tmpPlatform+='<i class="fab fa-pinterest"></i>';
        }
        if(response[i].platforms.includes("twitter")){
          tmpPlatform+='<i class="fab fa-twitter"></i>';
        }
        if(response[i].platforms.includes("linkedin")){
          tmpPlatform+='<i class="fab fa-linkedin"></i>';
        }
        if(response[i].platforms.includes("tiktok")){
          tmpPlatform+='<i class="fab fa-tiktok"></i>';
        }
        if(response[i].platforms.includes("snapchat")){
          tmpPlatform+='<i class="fab fa-snapchat"></i>';
        }
        if(response[i].platforms.includes("youtube")){
          tmpPlatform+='<i class="fab fa-youtube"></i>';
        }
      }
      else{
        tmpPlatform='<i class="fab fa-'+platformSelector.value+'"></i>'
      }
      let mpThumbnail;
      if(response[i].file.includes(".mp4") || response[i].file.includes(".webm") || response[i].file.includes(".mov") || response[i].file.includes(".avi")){
        mpThumbnail = "/resources/img/video-tbn.png";
      }
      else{
        mpThumbnail = "/user/media-plan/"+response[i].file;
      }
      if(document.getElementById(response[i].date)){
        let actualDate = new Date().getHours() + new Date().getMinutes() + new Date().getSeconds();
        document.getElementById(response[i].date).innerHTML+="<div onclick='viewSchedule(\""+response[i].scheduleUnicId+"\",\""+clientAles+"\",event)' class='scheduleBox "+tmpStatus+"'><div class='scheduleBox-top'><div class='scheduleBox-top-left' style='background-image:url(\""+mpThumbnail+"?"+actualDate+"\")'></div><div class='scheduleBox-top-right'><div class='scheduleBox-top-right-platforms'>"+tmpPlatform+"</div></div></div><div class='scheduleBox-bottom'><h3>"+response[i].title+"</h3><p>"+response[i].text+"</p></div></div>";

      }
    }

    //<input onclick='checkBoxMP(event)' type='checkbox' name='"+response[i].scheduleUnicId+"'></input>

    // for(i=0;i<line;i++){
    //   if(document.getElementById(date[i])){
    //     if(scheduleStatus[i]==="1"){
    //       document.getElementById(date[i]).innerHTML+="<div class='normalStatus scheduleBox' onclick='viewSchedule(\""+scheduleId[i]+"\",\""+cliendId+"\")'>"+title[i]+time[i]+"</div>";
    //     }
    //     if(scheduleStatus[i]==="2"){
    //       document.getElementById(date[i]).innerHTML+="<div class='needChangesStatus scheduleBox' onclick='viewSchedule(\""+scheduleId[i]+"\",\""+cliendId+"\")'>"+title[i]+time[i]+"</div>";
    //     }
    //     if(scheduleStatus[i]==="3"){
    //       document.getElementById(date[i]).innerHTML+="<div class='editedStatus scheduleBox' onclick='viewSchedule(\""+scheduleId[i]+"\",\""+cliendId+"\")'>"+title[i]+time[i]+"</div>";
    //     }
    //     if(scheduleStatus[i]==="4"){
    //       document.getElementById(date[i]).innerHTML+="<div class='aprovedStatus scheduleBox' onclick='viewSchedule(\""+scheduleId[i]+"\",\""+cliendId+"\")'>"+title[i]+time[i]+"</div>";
    //     }
    //     if(scheduleStatus[i]==="5"){
    //       document.getElementById(date[i]).innerHTML+="<div class='postedByClient scheduleBox' onclick='viewSchedule(\""+scheduleId[i]+"\",\""+cliendId+"\")'>"+title[i]+time[i]+"</div>";
    //     }
    //     // document.getElementById(date[i]).innerHTML+="<div class onclick='viewSchedule(\""+scheduleId[i]+"\")'>"+title[i]+time[i]+"</div>";
    //   }
      
    
    
  });
  
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


let addScheduleCommentForm = document.getElementById("add-schedule-new-comment");
addScheduleCommentForm.addEventListener("submit",e=>{
  e.preventDefault();

  let scheduleId=document.getElementById("comment-schedule-id").value;
  let scheduleClient=document.getElementById("comment-schedule-client").value;

  const data = new FormData();
  for(const p of new FormData(addScheduleCommentForm)){
    data.append(p[0],p[1]);
  }
  fetch("/admin/admin-includes/add-schedule-new-comment.php",{method:"POST",body:data}).then(response=>response.json()).then(response=>{
    console.log(response);
    if(response.status==="success"){
      addScheduleCommentForm.reset();
      let element = document.createElement("div");
      element.classList.add("admin-comment");
      document.getElementById("comment-schedule-id").value=scheduleId;
      document.getElementById("comment-schedule-client").value=scheduleClient;
      element.innerHTML="<div style='display: flex;flex-direction: row;justify-content: space-between;'><h3>"+response.name+"</h3><i class='fa-solid fa-trash-can' onclick='deleteScheduleComment(\""+response.commentId+"\")'></i></div><span>"+response.date+"</span><p>"+response.message+"</p>";
      element.id=response.commentId;
      document.getElementById("schedule-comments-list").appendChild(element);
      document.getElementById("schedule-comments-list").scrollTop=document.getElementById("schedule-comments-list").scrollHeight;


    }
  })
})
