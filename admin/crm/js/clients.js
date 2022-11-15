let colors=["#FBACBE","#BEDCFE","#D3EFBD","#BCD8B7","#F4FDAF","#D4B483","#E4DFDA","#48A9A6"];

fetch("/admin/crm/includes/get-all-clients.php?status=1").then(response=>response.json()).then(response=>{
    console.log(response);
    let actualDate = new Date();
    document.getElementById("crm-clients-container").innerHTML="";
    for(i=0;i<response.length;i++){
        console.log(response[i].unicId);
        let randomColor = Math.floor(Math.random() * colors.length);
        console.log(randomColor);
        let logo= "";
        if(response[i].logo!=""){
            logo = "/clients-resources/"+response[i].unicId+"/logo.png?"+actualDate.getTime();
        }
        else{
            logo = "/resources/img/placeholder.png";
        }

        document.getElementById("crm-clients-container").innerHTML+="<div class='crm-client-box' style='background-color:"+colors[randomColor]+"'><div class='crm-client-box-left'><div><img style='max-height:100px;max-width:100px;' src='"+logo+"'></div><div style='margin-left:15px;'><h3>"+response[i].numeClient+"</h3><p>"+response[i].firma+"</p></div></div><div class='crm-client-box-right'><a href='/admin/crm/clients/client/?id="+response[i].unicId+"' title='View client file' style='text-decoration:none'><div class='crm-btn' style='background-color:#3daad6'><i class='fas fa-eye'></i></div<</a></div></div>";
    }
    
})