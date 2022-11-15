var calendar = new Date();


let tasksTodayList = [];
let tasksPastList = [];

let adminSelector = document.getElementById("admin-selector");

var day_of_week = new Array("Duminica", "Luni", "Marti", "Miercuri", "Joi", "Vineri", "Sambata");
var month_of_year = new Array("Ianuarie","Februarie","Martie","Aprilie","Mai","Iunie","Iulie","August","Septembrie","Octombrie","Noiembrie","Decembrie");


var actual_year= calendar.getFullYear();
var actual_day_name= day_of_week[calendar.getDay()];
var actual_day = calendar.getDate();
var actual_month=calendar.getMonth();
var actual_month_name = month_of_year[calendar.getMonth()];
var actual_month_first_day = actualMonthFirstDay(actual_month,actual_year);

console.log(actual_year,actual_day_name,actual_day,actual_month,actual_month_name,actual_month_first_day);
let day = actual_day-1;
console.log(actual_day,day,actual_day_name=day_of_week[new Date(actual_year,actual_month,day).getDay()],daysInMonth(actual_month,actual_year));

function actualMonthFirstDay(month,year){
    return new Date(year,month,1).getDay();
}

function daysInMonth(month,year){
    return new Date(year,month,0).getDate();
}
  

month=actual_month;
year=actual_year;


let now = new Date("2022/04/08");
let onejan = new Date(now.getFullYear(), 0, 1);
let week = Math.ceil((((now.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7);

console.log(week);


// var curr = new Date; // get current date
let first = new Date(); // First day is the day of the month - the day of the week
let last = new Date(); // last day is the first day + 6

console.log(now.getDate(),now.getDay());
// first.setDate()
let firstDate = new Date();
// let lastDate = new Date();
let firstDateLastWeek = new Date();
firstDateLastWeek.setDate(firstDate.getDate()-7);


console.log(firstDate , first, last);

console.log(firstDateLastWeek, first, last);



function prevWeek(){
    
}

function nextWeek(){
    
}






let adminList = [];
let filteredAdminList = [];
fetchAdmins();

function fetchAdmins(){
    fetch("/admin/admin-includes/get-tasks-admins.php").then(response=>response.json()).then(response=>{
        adminList=response;
        console.log(adminList);


        renderAdminList(adminList);
    })
}

function renderAdminList(list){
    let AdminListDiv = document.getElementById("admin-list");
    AdminListDiv.innerHTML="";
    let element = document.createElement("div");
        element.dataset.clientId = 'none';
        element.classList.add("admin-selector-value");
        element.setAttribute("onclick","setAdmin('none','Selectează un client')");
        element.innerHTML= 'none';
        AdminListDiv.appendChild(element);

    for(i=0;i<list.length;i++){
        let element = document.createElement("div");
        element.dataset.adminId = list[i].clientId;
        element.classList.add("admin-selector-value");
        element.setAttribute("onclick","setAdmin('"+list[i].clientId+"','"+list[i].name+"')");
        element.innerHTML=list[i].name;
        AdminListDiv.appendChild(element);
    }   
}

function openChangeAdmin(){
    document.getElementById("admin-selector-container").style.display="block";
    document.getElementById("admin-selector").setAttribute("onclick","closeChangeAdmin()");
}

function closeChangeAdmin(){
    document.getElementById("admin-selector-container").style.display="none";
    document.getElementById("admin-selector").setAttribute("onclick","openChangeAdmin()");
    document.getElementById("search-admin-input").value = "";
    renderAdminList(adminList);
}

function setAdmin(client,name){
    startLoading();
    
    
    let adminSelector = document.getElementById("admin-selector");
    adminSelector.innerHTML=name;
    

    
    closeChangeAdmin();
}


// function fetchTasksToday(){
//     fetch("/admin/admin-includes/get-tasks-today.php").then(response=>response.json()).then(response=>{
//         console.log(response);
//         tasksTodayList=response;
//     })
// }

// function renderTasksToday(list){
//     document.getElementById("task-actual-list").innerHTML="";
//     for(i=0;i<list.length;i++){
//         document.getElementById("task-actual-list").innerHTML+="";
//     }
// }


// function fetchTasksPast(){
//     fetch("/admin/admin-includes/get-tasks-past.php").then(response=>response.json()).then(response=>{
//         console.log(response);
//         tasksPastList=response;
//     })
// }

// function renderTasksPast(list){
//     document.getElementById("task-past-list").innerHTML="";
//     for(i=0;i<list.length;i++){
//         document.getElementById("task-past-list").innerHTML+="<tr></tr>";
//     }
// }










