const url = new URL (document.URL);
const param = new URLSearchParams(url.search);
let id = param.get("id");
startLoading();
fetchReports();

let reportsList=[];

function fetchReports(){
    document.getElementById("view-reports-content").innerHTML="";
    fetch("/user/user-includes/get-reports.php?id="+id).then(response=>response.json()).then(response=>{
        console.log(response);
        // element.classList.add("report-box");
        document.getElementById("report-name").innerHTML=response.name;
        let element = document.createElement("div");
        element.innerHTML="<iframe src='"+response.link+"' frameborder='0' class='report-iframe'></iframe>";
        element.style.width="100%";
        element.id=response.reportId;
        document.getElementById("view-reports-content").appendChild(element);

        // element.addEventListener("load",e=>{
            stopLoading();
        // })
        
    })
}




function openReport(reportId){
    startLoading();
    for(i=0;i<reportsList.length;i++){
        if(reportsList[i].reportId===reportId){
            document.getElementById("view-report-iframe").src = reportsList[i].link;
        }
    }
    let modal=document.getElementById('modal-view-report');
        document.body.style.overflow="hidden";
        modal.style.display="block";
        setTimeout(()=>{
            modal.style.opacity="1";
        },50);

}


function closeReport(){
    let modal=document.getElementById('modal-view-report');
    document.body.style.overflow="auto";
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
    },300);
    document.getElementById("view-report-iframe").src = "";
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