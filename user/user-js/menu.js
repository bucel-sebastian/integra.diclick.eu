if (sessionStorage.getItem("menuActiveSession") === null) {
    sessionStorage.setItem("menuActiveSession", 0);
}

fetch("/resources/modules/menu-client.html").then(response=>response.text()).then(response=>{
    // console.log(response);
    document.getElementById("menu-container").innerHTML=response
})

function toggleMenu() {

    document.getElementById("menu-wrap").classList.toggle("menu-active");
    document.getElementById("menu-btn").classList.toggle("menu-btn-active");
    document.getElementById("page-wrap").classList.toggle("page-wrap-active-menu");

    if (sessionStorage.getItem("menuActiveSession") === "1") {
        sessionStorage.setItem("menuActiveSession", 0);
    }
    else if (sessionStorage.getItem("menuActiveSession") === "0") {
        sessionStorage.setItem("menuActiveSession", 1);
    }
}

if (sessionStorage.getItem("menuActiveSession") === "1") {
    document.getElementById("menu-wrap").style.transition = "0s";
    document.getElementById("menu-btn").style.transition = "0s";
    document.getElementById("bar1").style.transition = "0s";
    document.getElementById("bar2").style.transition = "0s";
    document.getElementById("bar3").style.transition = "0s";
    document.getElementById("page-wrap").style.transition = "0s";
    document.getElementById("menu-wrap").classList.toggle("menu-active");
    document.getElementById("menu-btn").classList.toggle("menu-btn-active");
    document.getElementById("page-wrap").classList.toggle("page-wrap-active-menu");
    setTimeout(() => {
        document.getElementById("menu-wrap").style.transition = "0.3s";
        document.getElementById("menu-btn").style.transition = "0.3s";
        document.getElementById("page-wrap").style.transition = "0.3s";
        document.getElementById("bar1").style.transition = "0.3s";
        document.getElementById("bar2").style.transition = "0.3s";
        document.getElementById("bar3").style.transition = "0.3s";
    }, 50);
}

function showReportList(){
    document.getElementById("reports-list").innerHTML="";
    fetch("/user/user-includes/get-reports.php").then(response=>response.json()).then(response=>{
        console.log(response);
        for(i=0;i<response.length;i++){
            let element= document.createElement("li");
            element.classList.add("navigation-ul-li");
            element.innerHTML="<a class='navigation-ul-li-a' href='/user/reports/?id="+response[i].reportId+"'><i class='fa-solid fa-minus'></i>&nbsp;"+response[i].name+"</a>";
            document.getElementById("reports-list").appendChild(element);
        }
        document.getElementById("nav-reports-btn").setAttribute("onclick","closeReportList()");
    })
}

function closeReportList(){
    document.getElementById("reports-list").innerHTML="";
    document.getElementById("nav-reports-btn").setAttribute("onclick","showReportList()");

}