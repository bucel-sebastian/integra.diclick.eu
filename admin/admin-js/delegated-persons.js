let addDelegatedPerson=false;
let editDelegatedPerson=false;
let deleteDelegatedPerson=false;

let delegatedPersonList = [];

checkRole();

function checkRole(){
    fetch("/admin/admin-includes/role-check.php").then(response=>response.json()).then(response=>{
        console.log(response);
        for(i=0;i<response.length;i++){
            if(response[i]==="add delegated person"){
                addDelegatedPerson=true;
            }
            if(response[i]==="edit delegated person"){
                editDelegatedPerson=true;     
            }
            if(response[i]==="delete delegated person"){
                deleteDelegatedPerson=true;
            }
            
        }
        if(!addDelegatedPerson){
            document.getElementById("add-delegated-person-btn").style.display="none";
            document.getElementById("add-delegated-person-btn").parentNode.removeChild(document.getElementById("add-delegated-person-btn"));
        }
        fetchDelegatedPersons();
    });
}


function fetchDelegatedPersons(){
    delegatedPersonList=[];

    



}