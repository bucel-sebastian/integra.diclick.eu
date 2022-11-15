if(!sessionStorage.getItem("research-list-page")){
    sessionStorage.setItem("research-list-page",1);
}
let actualPage = sessionStorage.getItem("research-list-page");


let researchList = [];
let researchFilteredList = [];
fetchResearch();

function fetchResearch(){
    

    fetch("/admin/admin-includes/get-all-research.php").then(response=>response.json()).then(response=>{
        // console.log(response);
        researchList=response;
        // console.log(researchList);
        renderTable(researchList);
    })

    
}



function renderTable(list,page=1){
    document.getElementById("research-table-list").innerHTML="";

    firstIndex = page-1;
    lastIndex = page*10;
    firstIndex=lastIndex-10;
    document.getElementById("firstIndex").innerHTML=firstIndex;
    document.getElementById("lastIndex").innerHTML=lastIndex;
    document.getElementById("totalIndex").innerHTML=list.length;
    document.getElementById("pagination").innerHTML="";

    numOfPages = list.length/10;


    console.log(list);

    

    for(i=firstIndex;i<lastIndex;i++){
        document.getElementById("research-table-list").innerHTML+="<tr><td>"+list[i].denumirePromotie+"</td><td>"+list[i].dataStart+"</td><td>"+list[i].dataSfarsit+"</td><td>"+list[i].companie+"</td><td>"+list[i].brand+"</td><td>"+list[i].tipPromotie+"</td><td>"+list[i].valoarePremii+"</td><td>"+list[i].comentarii+"</td><td>    </td></tr>";
    }

    for(i=1;i<=numOfPages;i++){
        document.getElementById("pagination").innerHTML+="<button onclick='renderTable(researchList,"+i+")'>"+i+"</button>";
    }
}


function addRow(){
    let modal = document.getElementById("new-row-research-modal");
    document.body.style.overflow="hidden";
    modal.style.display="block";
    setTimeout(()=>{
        modal.style.opacity="1";
    },50);

}

function closeAddRow(){
    let modal=document.getElementById('new-row-research-modal');
    document.body.style.overflow="auto";
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
    },300);
}


function openUploadQueue(){
    let modal = document.getElementById("new-file-research-modal");
    document.body.style.overflow="hidden";
    modal.style.display="block";
    setTimeout(()=>{
        modal.style.opacity="1";
    },50);
}

function closeUploadQueue(){
    let modal=document.getElementById('new-file-research-modal');
    document.body.style.overflow="auto";
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
    },300);
}


let addFileQueueForm = document.getElementById("crm-new-file-research");

addFileQueueForm.addEventListener("submit",e=>{
    e.preventDefault();
    let fileCsvInput = document.getElementById("file-promotii-input");

    fetch(URL.createObjectURL(fileCsvInput.files[0])).then(response=>response.text()).then(response=>{
        
        columnIndex=0;
        rowIndex=0;
        let table = new Array();
        let row = new Array();
        for(i=0;i<response.length;i++){
            if(response[i]==="\n"){
                table.push(row);
                row= new Array();
                columnIndex=0;
                rowIndex++;
                row[columnIndex]="";
            }
            else{
                if(response[i]===";"){
                    columnIndex++;
                    row[columnIndex]="";
                }
                else{
                    row[columnIndex]+=response[i];
                }
            }
        }

        console.table(table);
        // let tableJson = JSON.parse(table);
        let tableJsonData = JSON.stringify(table);

        // console.log(tableJson);
        console.log(tableJsonData);

        let data = new FormData();
        data.append("tableJson",tableJsonData);
        fetch("/admin/research/upload-file.php",{
            method:"POST",
            body:data
        }).then(newResponse=>newResponse.text()).then(newResponse=>{
            console.log(newResponse);
        })
    })
})