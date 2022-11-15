var Calendar = new Date();

var day_of_week = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");
var month_of_year = new Array("January","February","March","April","May","June","July","August","September","October","November","December");

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

let platformSelector = document.getElementById("platformSelector-user");

platformSelector.addEventListener("change",e=>{
  e.preventDefault();
  buildCalendar(actual_year,actual_month,actual_month_first_day);
})


function buildCalendar(year,month,first_day_name){
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

  getSchedules(platformSelector.value);
  stopLoading();
}

function prevMonth(){
    if(actual_month-1>=0){
      actual_month--;
      actual_month_first_day = actualMonthFirstDay(actual_month,actual_year);
      buildCalendar(actual_year,actual_month,actual_month_first_day);
    }
    else{
      actual_month=11;
      actual_year--;
      actual_month_first_day = actualMonthFirstDay(actual_month,actual_year);
      buildCalendar(actual_year,actual_month,actual_month_first_day);
    }
}
  
function nextMonth(){
  if(actual_month+1<=11){
    actual_month++;
    actual_month_first_day = actualMonthFirstDay(actual_month,actual_year);
    buildCalendar(actual_year,actual_month,actual_month_first_day);
  }
  else{
    actual_month=0;
    actual_year++;
    actual_month_first_day = actualMonthFirstDay(actual_month,actual_year);
    buildCalendar(actual_year,actual_month,actual_month_first_day);
  }
}





buildCalendar(actual_year,actual_month,actual_month_first_day);
function getSchedules(platform){
  let getSchedulesLink
  if(platform==="all"){
    getSchedulesLink="/user/user-includes/get-schedule.php";
  }
  else{
    getSchedulesLink="/user/user-includes/get-schedule.php?platform="+platform;
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
      // console.log(response[i].date);
      if(document.getElementById(response[i].date)){
        document.getElementById(response[i].date).innerHTML+="<div onclick='viewSchedule(\""+response[i].scheduleUnicId+"\",event)' class='scheduleBox "+tmpStatus+"'><div class='scheduleBox-top'><div class='scheduleBox-top-left' style='background-image:url(\"/user/media-plan/"+response[i].file+"\")'></div><div class='scheduleBox-top-right'><input onclick='checkBoxMP(event)' type='checkbox' class='calendar-checkbox' name='"+response[i].scheduleUnicId+"'></input><div class='scheduleBox-top-right-platforms'>"+tmpPlatform+"</div></div></div><div class='scheduleBox-bottom'><h3>"+response[i].title+"</h3><p>"+response[i].text+"</p></div></div>";  
      }
      
    }
    
    
  });

}

function closeViewScheduleModal(){
    let viewScheduleModal=document.getElementById("modal-view-schedule");
    viewScheduleModal.style.opacity="0";
    setTimeout(()=>{
      viewScheduleModal.style.display="none";
    },300);
  }
function viewSchedule(id,e){
    e.stopPropagation();
    denyForm.reset();
    document.getElementById("scheduleId-deny").value = id;
    
  
    let viewScheduleLink="../user-includes/view-schedule.php?scheduleId="+id;
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
    document.getElementById("download-schedule-btn").href="/user/media-plan/"+response[0].file;
      
    if(response[0].file.includes(".png") || response[0].file.includes(".jpg") || response[0].file.includes(".jpeg") || response[0].file.includes(".gif")){
      document.getElementById("view-schedule-file").innerHTML="<img class='preview-img' src=\"/user/media-plan/"+response[0].file+"\">";
    }
    else if(response[0].file.includes(".mp4") || response[0].file.includes(".webm")){
      document.getElementById("view-schedule-file").innerHTML="<video class='preview-video' controls><source src=\"/user/media-plan/"+response[0].file+"\"></video>";
    }
    else{
      // document.getElementById('view-schedule-content').innerHTML="<div class='btns-box'><div><i onclick='editSchedule(\""+id+"\",\""+clientId+"\")' class='fas fa-edit'></i><i onclick='deleteSchedule(\""+id+"\",\""+clientId+"\")' class='fas fa-trash-alt'></i></div><i onclick='closeViewScheduleModal()' class='fas fa-times'></i></div><h3>"+title+"</h3><p>"+text+"</p><p>"+date+"</p><p>"+time+"</p><p>"+comments+"</p>";
    }
  
    document.getElementById("view-schedule-title").innerText="Post title - "+response[0].title;
    document.getElementById("view-schedule-date").innerText="Posting date - "+response[0].date +" "+response[0].time;
    document.getElementById("view-schedule-text").innerHTML=""+response[0].text.replaceAll("<br>","\n");


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
      document.getElementById("view-schedule-platforms").innerHTML+="<i class='fa-brands fa-snapchat'></i>";
      document.getElementById("edit-snapchat").setAttribute("checked","");
    }
    if(response[0].platforms.includes("youtube")){
      document.getElementById("view-schedule-platforms").innerHTML+="<i class='fab fa-youtube'></i>";
      document.getElementById("edit-youtube").setAttribute("checked","");
    }


    document.getElementById("comment-schedule-id").value=id;

    document.getElementById("schedule-comments-list").innerHTML="";

    if(response.length>1){
      for(i=1;i<response.length;i++){
        if(response[i].from === "admin"){
          let element = document.createElement("div");
          element.classList.add("admin-comment");
          element.innerHTML="<div style='display: flex;flex-direction: row;justify-content: space-between;'><h3>"+response[i].author+"</h3><div></div></div><span>"+response[i].date+"</span><p>"+response[i].message+"</p>";
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
    }
     
    });
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
  

  function openNewScheduleOnDate(e,date){
    document.getElementById('new-date').value=date;
    newSchedule();
  }

let newScheduleForm=document.getElementById("new-schedule-form");
let scheduleLink = "/user/user-includes/send-schedule.php";

newScheduleForm.addEventListener("submit",e=>{
  startLoading();
    e.preventDefault();
    console.log("submit");  
    const data = new FormData();
    for (const p of new FormData(newScheduleForm)){
        data.append(p[0],p[1]);
    }
    console.log("submit");  

    fetch(scheduleLink,{
        method:"POST",
        body:data
    }).then(response=>response.text()).then(response=>{
      console.log("submit3");
      console.log(response);
        if(response==="success"){
          buildCalendar(actual_year,actual_month,actual_month_first_day);
          closeNewSchedule();
          successPopUp("New schedule created!");
          // newScheduleForm.reset();
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
        if(response.includes("fail")){
          failPopUp(response);
        }
      stopLoading();
    })
});

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

function aproveMP(){
    aproveLink="../user-includes/aprove-schedule.php?scheduleId="+document.getElementById("scheduleId-deny").value;
    fetch(aproveLink).then(response=>response.text()).then(response=>{
      console.log(response);
        if(response==="success"){
            buildCalendar(actual_year,actual_month,actual_month_first_day);
            closeViewScheduleModal();
            successPopUp("Schedule aproved!");
        }
        else{
            closeViewScheduleModal();
            failPopUp("Already aproved!");
        }
    })
}

function openDenyForm(){
    successPopUp("Write in comments section what should be improved.");
    document.getElementById("comment-schedule-message").focus();
    fetch(denyFormLink+"?id="+document.getElementById("comment-schedule-id").value).then(response=>response.text()).then(response=>{buildCalendar(actual_year,actual_month,actual_month_first_day);})
    
    
}
// function closeDenyForm(){
//     document.getElementById("modal-deny-form").style.opacity="0";
//     setTimeout(()=>{
//         document.getElementById("modal-deny-form").style.display="none";
//     },300);
// }

let denyForm = document.getElementById("deny-form");
let denyFormLink = "../user-includes/deny-form.php";
// denyForm.addEventListener("submit",e=>{
//     e.preventDefault();
//     const data = new FormData();
//     for(const p of new FormData(denyForm)){
//       data.append(p[0],p[1]);
//     }
//     fetch(denyFormLink,{
//       method: "POST",
//       body: data
//     }).then(response=>response.text()).then(response=>{
      
//       if(response==="success"){
//         closeDenyForm();
//         closeViewScheduleModal();
//         buildCalendar(actual_year,actual_month,actual_month_first_day);
//         successPopUp("Schedule denied successfully!");
//       }
//       if(response.includes("fail")){
//         console.log(response);
//         failPopUp(response);
//       }
//     })
// })


  
 

  
function checkBoxMP(e){
  e.stopPropagation();
}

let calendarForm = document.getElementById("calendar-all-form");
calendarForm.addEventListener("submit",e=>{
  e.preventDefault();
  
  const data = new FormData();
  for(const p of new FormData(calendarForm)){
    data.append(p[0],p[1]);
    console.log(p[0],p[1]);
  }

  fetch("/user/user-includes/all-calendar.php",{
    method: "POST",
    body:data
  }).then(response=>response.json()).then(response=>{
    console.log(response);
    if(response.status==="success"){
      buildCalendar(actual_year,actual_month,actual_month_first_day);
      successPopUp("All schedules aproved successfully!");
    }
    else{
      console.log(response.error);
    }
  })
})


function toggleSelectAll(){
  let checkboxes = document.querySelectorAll(".calendar-checkbox");
  for(i=0;i<checkboxes.length;i++){
    checkboxes[i].checked = true;
  }
  
}
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
  // let scheduleClient=document.getElementById("comment-schedule-client").value;

  const data = new FormData();
  for(const p of new FormData(addScheduleCommentForm)){
    data.append(p[0],p[1]);
  }
  fetch("/user/user-includes/add-schedule-new-comment.php",{method:"POST",body:data}).then(response=>response.json()).then(response=>{
    console.log(response);
    if(response.status==="success"){
      addScheduleCommentForm.reset();
      let element = document.createElement("div");
      element.classList.add("client-comment");
      document.getElementById("comment-schedule-id").value=scheduleId;
      // document.getElementById("comment-schedule-client").value=scheduleClient;
      element.innerHTML="<div style='display: flex;flex-direction: row;justify-content: space-between;'><h3>"+response.name+"</h3><div></div></div><span>"+response.date+"</span><p>"+response.message+"</p>";
      element.id=response.commentId;
      document.getElementById("schedule-comments-list").appendChild(element);
      document.getElementById("schedule-comments-list").scrollTop=document.getElementById("schedule-comments-list").scrollHeight;


    }
  })
})