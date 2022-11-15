const url = new URL (document.URL);
const param = new URLSearchParams(url.search);
let clientId = param.get("id");

let actionList=[];
let filterActionList = [];

// startLoading();

fetch("/admin/crm/includes/get-all-client-actions.php?id="+clientId).then(response=>response.json()).then(response=>{
    console.log(response);

    actionList = response;

    renderTable(actionList);
    for(i=0;i<response.length;i++){
    }

})

function renderTable(list){
    document.getElementById("action-list").innerHTML="";
    for(i=0;i<list.length;i++){
        document.getElementById("action-list").innerHTML+="<tr> <td>"+list[i].data+"</td> <td>"+list[i].timp+"</td> <td>"+list[i].actiune+"</td> <td>"+list[i].concluzie+"</td> <td>"+list[i].observatiiConcluzie+"</td> <td></td> </tr>";
    }
}

function filter(){
    filterActionList=[];
    let date = document.getElementById("date-filter").value;
    for(i=0;i<actionList.length;i++){
        console.log(new Date(date),new Date(actionList[i].data));
        if(new Date(date).getFullYear()===new Date(actionList[i].data).getFullYear() &&new Date(date).getMonth()===new Date(actionList[i].data).getMonth() && new Date(date).getDay()===new Date(actionList[i].data).getDay() ){
            console.log(new Date(date),new Date(actionList[i].data));
            filterActionList.push(actionList[i]);
        }
    }
    renderTable(filterActionList);
}