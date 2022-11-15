if (sessionStorage.getItem("menuActiveSession") === null) {
    sessionStorage.setItem("menuActiveSession", 0);
}
fetch("/resources/modules/menu.html").then(response=>response.text()).then(response=>{
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

