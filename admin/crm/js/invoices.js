let viewProforma=false;
let sendProforma=false;
let generateProforma=false;
let generateInvoice=false;

const url = new URL (document.URL);
const param = new URLSearchParams(url.search);
let clientId = param.get("id");


let clients;
let selectedClient;
let cart = [];

let proforme=[];
let filtreProformaList=[];

fetch("/admin/admin-includes/role-check.php").then(response=>response.json()).then(response=>{
    for(i=0;i<response.length;i++){
        if(response[i]==="crm aprove invoices"){
            aproveInvoice=true;
        }
        if(response[i]==="crm view invoices"){
            viewInvoice=true;
        }
        if(response[i]==="crm generate invoices"){
            generateInvoice=true;
        }
        if(response[i]==="crm send invoices"){
            sendInvoice=true;
        }
        
    }
    if(!generateInvoice){
        document.getElementById("crm-new-proforma-btn").remove();
    }
    fetchProforme();
})

function newProforma(){
    
    document.getElementById("products-list").innerHTML="";
    document.getElementById("crm-generate-proforma").reset();
    fetchClients();
    let modal=document.getElementById('modal-new-proforma');
    document.body.style.overflow="hidden";
    modal.style.display="block";
    setTimeout(()=>{
        modal.style.opacity="1";
    },50);
    setTp();

}

function closeNewProforma(){
    let modal=document.getElementById('modal-new-proforma');
    document.body.style.overflow="auto";
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
        cart=[];
    },300);
}


let emitorSelector = document.getElementById("new-proforma-emitator");
let clientSelector= document.getElementById("new-proforma-client");

function fetchClients(){
    fetch("/admin/crm/includes/proforma-get-client.php").then(response=>response.json()).then(response=>{
        console.log(response);
        clients=response;
        document.getElementById("new-proforma-client").innerHTML="<option value='' selected disabled>Client</option>"
        for(i=1;i<clients.length;i++){
            document.getElementById("new-proforma-client").innerHTML+="<option value='"+clients[i].unicId+"'>"+clients[i].numeClient+"</option>";
        }
    })
}

function fetchInvoiceNumber(){
    fetch("/admin/crm/includes/proforma-get-invoice-number.php?emitor="+emitorSelector.value).then(response=>response.json()).then(response=>{
        let invoiceNumber;
        let today=response.invoiceDate;
        console.log(response);
        if(response.invoiceNumber.length===1){
            invoiceNumber="00"+response.invoiceNumber;
        }
        else if(response.invoiceNumber.length===2){
            invoiceNumber="0"+response.invoiceNumber;

        }
        else{
            invoiceNumber=response.invoiceNumber;
        }

        if(emitorSelector.value==="1"){
            today=today.replace(/-/g,".");
            document.getElementById("new-proforma-invoice-number").value="PRF "+today+"."+invoiceNumber;
        }
        else if(emitorSelector.value==="2"){
            today=today.replace(/-/g,"");
            document.getElementById("new-proforma-invoice-number").value="SMP PRF "+today+"."+invoiceNumber;
        }

    })
}

emitorSelector.addEventListener("change",e=>{
    e.preventDefault();
    fetchInvoiceNumber();
})

clientSelector.addEventListener("change",e=>{
    e.preventDefault();
    console.log(clientSelector.value);

    for(i=1;i<clients.length;i++){
        if(clientSelector.value===clients[i].unicId){
            selectedClient=clients[i];
        }
    }
    console.log(selectedClient);


})



function openNewProducts(){
    newProductsContainer = document.getElementById("new-product-container");
    newProductsContainer.style.display="flex";
    
}




let valInput;
let tvaInput;
let pretInput;
let cantInput;
let numeInput;
let umInput;
let vatInput=document.getElementById("new-proforma-vat");

vatInput.addEventListener("change",e=>{
    e.preventDefault();
    let tva = parseFloat(vatInput.value);
    for(i=0;i<tvaInput.length;i++){
        tvaInput[i].value=(parseFloat(valInput[i].value)*tva/100);
        cart[i].um=umInput[i].value;
        cart[i].nume=numeInput[i].value;
        cart[i].pretUnitar=pretInput[i].value;
        cart[i].cantitate=cantInput[i].value;
        cart[i].tva=tvaInput[i].value;
        cart[i].valFaraTva=valInput[i].value;
    }
    calculateTotalWTva();
    calculateTotalTva();
    calculateTotal();
})

function fetchClasses(){
    valInput=document.querySelectorAll(".product-val");
    tvaInput=document.querySelectorAll(".product-tva");
    pretInput=document.querySelectorAll(".product-price");
    cantInput=document.querySelectorAll(".product-cant");
    numeInput=document.querySelectorAll(".product-name");
    umInput=document.querySelectorAll(".product-um");
    // nrCrtInput=document.querySelectorAll(".nr-crt-product");
}

function cantChange(index){
    valInput[index].value=cantInput[index].value*pretInput[index].value;
    let tva = parseFloat(vatInput.value);
    tvaInput[index].value=(parseFloat(valInput[index].value)*tva/100);
    cart[index].cantitate=cantInput[index].value;
    cart[index].tva=tvaInput[index].value;
    cart[index].valFaraTva=valInput[index].value;
    calculateTotalWTva();
    calculateTotalTva();
    calculateTotal();
}

function priceChange(index){
    valInput[index].value=cantInput[index].value*pretInput[index].value;
    let tva = parseFloat(vatInput.value);
    tvaInput[index].value=(parseFloat(valInput[index].value)*tva/100);
    cart[index].pretUnitar=pretInput[index].value;
    cart[index].tva=tvaInput[index].value;
    cart[index].valFaraTva=valInput[index].value;
    calculateTotalWTva();
    calculateTotalTva();
    calculateTotal();
}
function nameChange(index){
    console.log(numeInput[index].value);
    cart[index].nume=numeInput[index].value;
}

function updatePer1(index,e){
    cart[index].per1=e.target.value;
}

function updatePer2(index,e){
    cart[index].per2=e.target.value;
}

function updateNrAnexa(index,e){
    cart[index].nr=e.target.value;
}

function updateContrDate(index,e){
    cart[index].data=e.target.value;
}

function umChange(index){
    cart[index].um=umInput[index].value;
}

function calculateTotalWTva(){
    let sum=0;
    for(i=0;i<cart.length;i++){
        sum+=parseFloat(cart[i].valFaraTva);
    }
    document.getElementById("total-fara-tva").value=sum;
}

function calculateTotalTva(){
    let sum=0;
    for(i=0;i<cart.length;i++){
        sum+=parseFloat(cart[i].tva);
    }
    document.getElementById("total-tva").value=sum.toFixed(2);
}
function calculateTotal(){
    let sum;
    sum = parseFloat(document.getElementById("total-fara-tva").value)+parseFloat(document.getElementById("total-tva").value);
    document.getElementById("total-de-plata").value=sum;
}

function addProduct(x,event){
    event.preventDefault();
    let tva = parseFloat(vatInput.value);
    if(x===0){
        let productIndex=cart.length;
        let product = {
            "nume":"",
            "um":"",
            "cantitate":"",
            "pretUnitar":"",
            "valFaraTva":"",
            "tva":"",
            "tipProdus":"0"
        }
        cart.push(product);
        let element = document.createElement("tr");
        element.dataset.index=productIndex;
        element.innerHTML="<td><div onclick='removeProduct(\""+productIndex+"\")'><i class='fa-solid fa-xmark'></i></div></td><td>"+(productIndex+1)+"</td><td style='text-align:left'><textarea required name='product-name[]' class='product-name' onchange='nameChange(\""+productIndex+"\")'></textarea></td><td><input required type='text' name='product-um[]' class='product-um' oninput='umChange(\""+productIndex+"\")'></td><td><input required type='number' min='0' name='product-cant[]' class='product-cant' oninput='cantChange(\""+productIndex+"\")'></td><td><input required type='text' name='product-price[]' class='product-price'  oninput='priceChange(\""+productIndex+"\")'></td><td><input type='text' onchange='calculateTotalWTva()' name='product-val[]' class='product-val crm-readonly-input' readonly></td><td><input type='text' name='product-tva[]' onchange='calculateTotalTva()' class='product-tva crm-readonly-input' readonly></td>";
        document.getElementById("products-list").appendChild(element);    }
    else if(x===1){
        let productIndex=cart.length;
        let productTva= ((399*tva)/100);
        let product = {
            "nume":"Pachet START-UP perioada [per1]-[per2] conform Anexa nr. [nr] la contractul dintre parti din data de [data]",
            "um":"buc",
            "cantitate":"1",
            "pretUnitar":"399",
            "valFaraTva":"399",
            "tva":productTva,
            "tipProdus":"1",
            "per1":"",
            "per2":"",
            "nr":"",
            "data":""
        }
        cart.push(product);
        let element = document.createElement("tr");
        element.dataset.index=productIndex;
        element.innerHTML="<td><div onclick='removeProduct(\""+productIndex+"\")'><i class='fa-solid fa-xmark'></i></div></td><td>"+(productIndex+1)+"</td><td style='text-align:left'><textarea hidden required name='product-name[]' class='product-name'>Pachet START-UP perioada [per1]-[per2] conform Anexa nr. [nr] la contractul dintre parti din data de [data]</textarea><span>Pachet START-UP perioada <input type='date' onchange='updatePer1(\""+productIndex+"\",event)' required>-<input type='date' onchange='updatePer2(\""+productIndex+"\",event)' required> conform Anexa nr. <input type='number' onchange='updateNrAnexa(\""+productIndex+"\",event)' min='1' required> la contractul dintre parti din data de <input onchange='updateContrDate(\""+productIndex+"\",event)' type='date' required></span></td><td><input type='text' name='product-um[]' required value='buc' class='product-um' oninput='umChange(\""+productIndex+"\")' required></td><td><input type='number' min='0' required name='product-cant[]' value='1' class='product-cant' oninput='cantChange(\""+productIndex+"\")'></td><td><input type='text' required name='product-price[]' value='399' class='product-price'  oninput='priceChange(\""+productIndex+"\")'></td><td><input type='text' name='product-val[]' value='399' class='product-val crm-readonly-input' readonly></td><td><input type='text' name='product-tva[]' value='"+productTva+"' class='product-tva crm-readonly-input' readonly></td>";
        document.getElementById("products-list").appendChild(element);
        
    }
    else if(x===2){
        let productIndex=cart.length;
        let productTva= ((1199*tva)/100);
        let product = {
            "nume":"Pachet OPTIM perioada [per1]-[per2] conform Anexa nr. [nr] la contractul dintre parti din data de [data]",
            "um":"buc",
            "cantitate":"1",
            "pretUnitar":"1199",
            "valFaraTva":"1199",
            "tva":productTva,
            "tipProdus":"2",
            "per1":"",
            "per2":"",
            "nr":"",
            "data":""
        }
        cart.push(product);
        let element = document.createElement("tr");
        element.dataset.index=productIndex;
        element.innerHTML="<td><div onclick='removeProduct(\""+productIndex+"\")'><i class='fa-solid fa-xmark'></i></div></td><td>"+(productIndex+1)+"</td><td style='text-align:left'><textarea hidden required name='product-name[]' class='product-name'>Pachet OPTIM perioada [per1]-[per2] conform Anexa nr. [nr] la contractul dintre parti din data de [data]</textarea><span>Pachet OPTIM perioada <input type='date' onchange='updatePer1(\""+productIndex+"\",event)' required>-<input type='date' onchange='updatePer2(\""+productIndex+"\",event)' required> conform Anexa nr. <input type='number' onchange='updateNrAnexa(\""+productIndex+"\",event)' min='1' required> la contractul dintre parti din data de <input onchange='updateContrDate(\""+productIndex+"\",event)' type='date' required></span></td><td><input type='text' name='product-um[]' required value='buc' class='product-um' oninput='umChange(\""+productIndex+"\")'></td><td><input type='number' min='0' required name='product-cant[]' value='1' class='product-cant' oninput='cantChange(\""+productIndex+"\")'></td><td><input type='text' required name='product-price[]' value='1199' class='product-price'  oninput='priceChange(\""+productIndex+"\")'></td><td><input type='text' name='product-val[]' value='1199' class='product-val crm-readonly-input' readonly></td><td><input type='text' name='product-tva[]' value='"+productTva+"' class='product-tva crm-readonly-input' readonly></td>";
        document.getElementById("products-list").appendChild(element);
    }
    else if(x===3){
        let productIndex=cart.length;
        let productTva= ((1599*tva)/100);
        let product = {
            "nume":"Pachet ADVANCED perioada [per1]-[per2] conform Anexa nr. [nr] la contractul dintre parti din data de [data]",
            "um":"buc",
            "cantitate":"1",
            "pretUnitar":"1599",
            "valFaraTva":"1599",
            "tva":productTva,
            "tipProdus":"3",
            "per1":"",
            "per2":"",
            "nr":"",
            "data":""
        }
        cart.push(product);
        let element = document.createElement("tr");
        element.dataset.index=productIndex;
        element.innerHTML="<td><div onclick='removeProduct(\""+productIndex+"\")'><i class='fa-solid fa-xmark'></i></div></td><td>"+(productIndex+1)+"</td><td style='text-align:left'><textarea hidden required name='product-name[]' class='product-name'>Pachet ADVANCED perioada [per1]-[per2] conform Anexa nr. [nr] la contractul dintre parti din data de [data]</textarea><span>Pachet ADVANCED perioada <input type='date' onchange='updatePer1(\""+productIndex+"\",event)' required>-<input type='date' onchange='updatePer2(\""+productIndex+"\",event)' required> conform Anexa nr. <input type='number' onchange='updateNrAnexa(\""+productIndex+"\",event)' min='1' required> la contractul dintre parti din data de <input onchange='updateContrDate(\""+productIndex+"\",event)' type='date' required></span></td><td><input type='text' name='product-um[]' required value='buc' class='product-um' oninput='umChange(\""+productIndex+"\")'></td><td><input type='number' min='0' name='product-cant[]' value='1' class='product-cant' required oninput='cantChange(\""+productIndex+"\")'></td><td><input required type='text' name='product-price[]' value='1599' class='product-price'  oninput='priceChange(\""+productIndex+"\")'></td><td><input type='text' name='product-val[]' value='1599' class='product-val crm-readonly-input' readonly></td><td><input type='text' name='product-tva[]' value='"+productTva+"' class='product-tva crm-readonly-input' readonly></td>";
        document.getElementById("products-list").appendChild(element);
    }
    calculateTotalWTva();
    calculateTotalTva();
    calculateTotal();
    fetchClasses();
}

function removeProduct(index){
    cart.splice(index,1);
    calculateTotalWTva();
    calculateTotalTva();
    calculateTotal();
    console.log(cart);
    renderTable();
    fetchClasses();

}

function renderTable(){
    document.getElementById("products-list").innerHTML="";
    for(i=0;i<cart.length;i++){
        console.log(cart[i]);
        if(cart[i].tipProdus==="0"){
            let element = document.createElement("tr");
            element.dataset.index=i;
            element.innerHTML="<td><div onclick='removeProduct(\""+i+"\")'><i class='fa-solid fa-xmark'></i></div></td><td>"+(i+1)+"</td><td><textarea name='product-name[]' required  class='product-name' onchange='nameChange(\""+i+"\")'>"+cart[i].nume+"</textarea></td><td><input type='text' value='"+cart[i].um+"' required name='product-um[]' class='product-um' onchange='umChange(\""+i+"\")'></td><td><input type='number' required  value='"+cart[i].cantitate+"' min='0' name='product-cant[]' class='product-cant' onchange='cantChange(\""+i+"\")'></td><td><input type='text' required  value='"+cart[i].pretUnitar+"' name='product-price[]' class='product-price'  onchange='priceChange(\""+i+"\")'></td><td><input type='text'  value='"+cart[i].valFaraTva+"' name='product-val[]' class='product-val crm-readonly-input' readonly></td><td><input type='text' value='"+cart[i].tva+"' name='product-tva[]' class='product-tva crm-readonly-input' readonly></td>";
            document.getElementById("products-list").appendChild(element);
        }
        else if(cart[i].tipProdus==="1"){
            let element = document.createElement("tr");
            element.dataset.index=i;
            element.innerHTML="<td><div onclick='removeProduct(\""+i+"\")'><i class='fa-solid fa-xmark'></i></div></td><td>"+(i+1)+"</td><td style='text-align:left'><textarea hidden required name='product-name[]' class='product-name'>"+cart[i].nume+"</textarea><span>Pachet START-UP perioada <input type='date' required value='"+cart[i].per1+"' onchange='updatePer1(\""+i+"\",event)'>-<input type='date' onchange='updatePer2(\""+i+"\",event)' value='"+cart[i].per2+"' required> conform Anexa nr. <input type='number' onchange='updateNrAnexa(\""+i+"\",event)' min='1' required value='"+cart[i].nr+"'> la contractul dintre parti din data de <input onchange='updateContrDate(\""+i+"\",event)' type='date' required value='"+cart[i].data+"'></span></td><td><input type='text' value='"+cart[i].um+"' name='product-um[]' class='product-um' onchange='umChange(\""+i+"\")'></td><td><input type='number' value='"+cart[i].cantitate+"' min='0' name='product-cant[]' class='product-cant' onchange='cantChange(\""+i+"\")'></td><td><input type='text'  value='"+cart[i].pretUnitar+"' name='product-price[]' class='product-price'  onchange='priceChange(\""+i+"\")'></td><td><input type='text'  value='"+cart[i].valFaraTva+"' name='product-val[]' class='product-val crm-readonly-input' readonly></td><td><input type='text' value='"+cart[i].tva+"' name='product-tva[]' class='product-tva crm-readonly-input' readonly></td>";
            document.getElementById("products-list").appendChild(element);
        }
        else if(cart[i].tipProdus==="2"){
            let element = document.createElement("tr");
            element.dataset.index=i;
            element.innerHTML="<td><div onclick='removeProduct(\""+i+"\")'><i class='fa-solid fa-xmark'></i></div></td><td>"+(i+1)+"</td><td style='text-align:left'><textarea hidden required name='product-name[]' class='product-name'>"+cart[i].nume+"</textarea><span>Pachet OPTIM perioada <input type='date' value='"+cart[i].per1+"' onchange='updatePer1(\""+i+"\",event)' required >-<input type='date' onchange='updatePer2(\""+i+"\",event)' value='"+cart[i].per2+"' required > conform Anexa nr. <input type='number' onchange='updateNrAnexa(\""+i+"\",event)' min='1' required value='"+cart[i].nr+"'> la contractul dintre parti din data de <input onchange='updateContrDate(\""+i+"\",event)' type='date' required value='"+cart[i].data+"'></span></td><td><input type='text' value='"+cart[i].um+"' name='product-um[]' class='product-um' onchange='umChange(\""+i+"\")'></td><td><input type='number' value='"+cart[i].cantitate+"' min='0' name='product-cant[]' class='product-cant' onchange='cantChange(\""+i+"\")'></td><td><input type='text'  value='"+cart[i].pretUnitar+"' name='product-price[]' class='product-price'  onchange='priceChange(\""+i+"\")'></td><td><input type='text'  value='"+cart[i].valFaraTva+"' name='product-val[]' class='product-val crm-readonly-input' readonly></td><td><input type='text' value='"+cart[i].tva+"' name='product-tva[]' class='product-tva crm-readonly-input' readonly></td>";
            document.getElementById("products-list").appendChild(element);
        }
        else if(cart[i].tipProdus==="3"){
            let element = document.createElement("tr");
            element.dataset.index=i;
            element.innerHTML="<td><div onclick='removeProduct(\""+i+"\")'><i class='fa-solid fa-xmark'></i></div></td><td>"+(i+1)+"</td><td style='text-align:left'><textarea hidden required name='product-name[]' class='product-name'>"+cart[i].nume+"</textarea><span>Pachet ADVANCED perioada <input type='date' required value='"+cart[i].per1+"' onchange='updatePer1(\""+i+"\",event)'>-<input type='date' required onchange='updatePer2(\""+i+"\",event)' value='"+cart[i].per2+"'> conform Anexa nr. <input type='number' onchange='updateNrAnexa(\""+i+"\",event)' min='1' required value='"+cart[i].nr+"'> la contractul dintre parti din data de <input onchange='updateContrDate(\""+i+"\",event)' type='date' required value='"+cart[i].data+"'></span></td><td><input type='text' value='"+cart[i].um+"' name='product-um[]' class='product-um' onchange='umChange(\""+i+"\")'></td><td><input type='number' value='"+cart[i].cantitate+"' min='0' name='product-cant[]' class='product-cant' onchange='cantChange(\""+i+"\")'></td><td><input type='text'  value='"+cart[i].pretUnitar+"' name='product-price[]' class='product-price'  onchange='priceChange(\""+i+"\")'></td><td><input type='text'  value='"+cart[i].valFaraTva+"' name='product-val[]' class='product-val crm-readonly-input' readonly></td><td><input type='text' value='"+cart[i].tva+"' name='product-tva[]' class='product-tva crm-readonly-input' readonly></td>";
            document.getElementById("products-list").appendChild(element);
        }
        
    }
}



function setTp(){
    let today=new Date();
    let year= today.getFullYear();
    let month = today.getMonth();
    let daysInMonth = new Date(year,month+1,0);
    let day = daysInMonth.getDay();
    let date = daysInMonth.getDate();
    let goodTp = 0;
    while(goodTp===0){
        if(day===1 || day===2 || day===3 || day===4){
            goodTp=1;
        }
        else{
            date--;
            day = new Date(year,month,date).getDay();
        }
    }
    if(date<=1){
        date="0"+date;
        }
        if(month<=9){
            month="0"+(month+1);
        }
        else{
            month=month+1;
        }
    document.getElementById("new-proforma-tp").value=year+"-"+month+"-"+date;
    
}

let proformaGen = document.getElementById("crm-generate-proforma");
proformaGen.addEventListener("submit",e=>{
    startLoading();
    e.preventDefault();
    let clientId= document.getElementById("new-proforma-client").value;

    document.getElementById("send-proforma-clientId").value=clientId;
    let invoiceNumber = document.getElementById("new-proforma-invoice-number").value;
    
    document.getElementById("send-proforma-number").value = document.getElementById("new-proforma-invoice-number").value;
    if(cart.length===0){
        alert("Nu au fost introduse produsele!");
        return;
    }
    for(i=0;i<cart.length;i++){

        if(cart[i].tipProdus!="0"){

            let tmpNume = cart[i].nume;
            tmpNume = tmpNume.replace("[per1]",cart[i].per1);
            tmpNume = tmpNume.replace("[per2]",cart[i].per2);
            tmpNume = tmpNume.replace("[nr]",cart[i].nr);
            tmpNume = tmpNume.replace("[data]",cart[i].data);
            cart[i].nume=tmpNume;
            numeInput[i].innerHTML=cart[i].nume;
            console.log(numeInput[i]);
            console.log(cart[i].nume);
        }
    }
    
    const data = new FormData();

    for (const p of new FormData(proformaGen)){
        data.append(p[0],p[1]);
    }

    console.log(data);
    
    fetch("/admin/crm/includes/invoice-generator.php",{
        method: "POST",
        body: data
    }).then(response=>response.json()).then(response=>{
        console.log(response);
        if(response.status==="success"){
            successPopUp("Proforma a fost generata cu succes!");
            proformaGen.reset();
            cart=[];
            renderTable();
            setTp();
            openSendProforma();
            window.open("/clients-resources/"+clientId+"/invoices/"+invoiceNumber+".pdf",'_blank');
        }
        else{
            failPopUp(response.error);
        }
        stopLoading();

    })
})




function openMailProforma(){
    closeSendProforma();
    document.getElementById("send-mail-proforma-clientId").value=document.getElementById("send-proforma-clientId").value;
    document.getElementById("send-mail-proforma-number").value=document.getElementById("send-proforma-number").value;
    let modal=document.getElementById('modal-send-mail-proforma');
    // document.body.style.overflow="hidden";
    modal.style.display="block";
    setTimeout(()=>{
        modal.style.opacity="1";
    },50);
}
function closeMailProforma(){
    let modal=document.getElementById('modal-send-mail-proforma');
    // document.body.style.overflow="auto";
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
        cart=[];
    },300);
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




function fetchProforme(){
    startLoading();
    proforme=[];
    document.getElementById("proforme-table-list").innerHTML="";

    if(clientId){
        fetch("/admin/crm/includes/get-invoices.php?id="+clientId).then(response=>response.json()).then(response=>{
            console.log(response);
            proforme=response;
        
            
            // for(i=0;i<response.length;i++){
            //     proforme.push(response[i]);
            //     let viewProformaBtn;
            //     let sendProformaBtn;
            //     let generateInvoiceBtn;
            //     if(viewProforma){
            //         viewProformaBtn="<a href='/clients-resources/"+response[i].clientId+"/invoices/"+response[i].prefixNumber+" "+response[i].nrFactura+".pdf' title='Vezi Factura' class='crm-btn' style='background-color:#3daad6' target='_blank'> <i class='fa-solid fa-eye'></i> </a> <a href='/clients-resources/"+response[i].clientId+"/invoices/"+response[i].file+".pdf' title='Descarca Factura' class='crm-btn' download style='background-color:#6baa41'> <i class='fa-solid fa-download'></i> </a>";
            //     }
            //     else{
            //         viewProformaBtn="";
            //     }
            //     if(sendProforma){
            //         sendProformaBtn="<div title='Trimite Factura' style='background-color:#dea336' class='crm-btn' onclick='openSendInvoice(\""+response[i].clientId+"\",\""+response[i].nrFactura+"\")'><i class='fa-solid fa-envelope'></i></div>";
            //     }
            //     else{
            //         sendProformaBtn="";
            //     }
                
                
            //     document.getElementById("proforme-table-list").innerHTML+="<tr> <td>"+response[i].dataEmitere+"</td> <td>"+response[i].emitor+"</td> <td>"+response[i].client+"</td> <td>"+response[i].file+"</td><td>"+response[i].valTotala+"</td> <td>"+response[i].status+"</td><td> <div class='crm-action-box-btns'>"+viewProformaBtn+" "+sendProformaBtn+"  </div> </td> </tr>";
                
            // }

            renderProformeTable(proforme);
            
            stopLoading();
        })
    }
    else{
        fetch("/admin/crm/includes/get-invoices.php").then(response=>response.json()).then(response=>{
            console.log(response);
    
        document.getElementById("proforme-table-list").innerHTML="";
            
            
            for(i=0;i<response.length;i++){
                proforme.push(response[i]);
                let viewProformaBtn;
                let sendProformaBtn;
                let generateInvoiceBtn;
                if(viewProforma){
                    viewProformaBtn="<a href='/clients-resources/"+response[i].clientId+"/invoices/"+response[i].file+".pdf' title='Vezi Factura' class='crm-btn' style='background-color:#3daad6' target='_blank'> <i class='fa-solid fa-eye'></i> </a> <a href='/clients-resources/"+response[i].clientId+"/invoices/"+response[i].file+".pdf' title='Descarca Factura' class='crm-btn' download style='background-color:#6baa41'> <i class='fa-solid fa-download'></i> </a>";
                }
                else{
                    viewProformaBtn="";
                }
                if(sendProforma){
                    sendProformaBtn="<div title='Trimite Factura' style='background-color:#dea336' class='crm-btn' onclick='openSendInvoice(\""+response[i].clientId+"\",\""+response[i].nrFactura+"\")'><i class='fa-solid fa-envelope'></i></div>";
                }
                else{
                    sendProformaBtn="";
                }
                
                
                document.getElementById("proforme-table-list").innerHTML+="<tr> <td>"+response[i].dataEmitere+"</td> <td>"+response[i].emitor+"</td> <td>"+response[i].client+"</td> <td>"+response[i].prefixNumber+" "+response[i].nrFactura+"</td><td>"+response[i].valTotala+"</td> <td>"+response[i].status+"</td><td> <div class='crm-action-box-btns'>"+viewProformaBtn+" "+sendProformaBtn+"  </div> </td> </tr>";
                
            }
            renderProformeTable(proforme);

            stopLoading();
        })
    }

    
}


function openSendInvoice(clientInvoice,invoiceNumber){

    document.getElementById("send-mail-invoice-clientId").value=clientInvoice;
    document.getElementById("send-mail-invoice-number").value=invoiceNumber;
    let modal=document.getElementById('modal-send-mail-invoice');
    document.getElementById("invoice-mail-wishes").value="Va multumim pentru colaborare!";
    document.body.style.overflow="hidden";
    modal.style.display="flex";
    setTimeout(()=>{
        modal.style.opacity="1";
    },50);
}

function closeSendInvoice(){
    let modal=document.getElementById('modal-send-mail-invoice');
    document.body.style.overflow="auto";
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
        cart=[];
    },300);
}

// function openMailInvoice(){
//     closeSendInvoice();

//     document.getElementById("send-mail-invoice-clientId").value=document.getElementById("send-invoice-clientId").value;
//     document.getElementById("send-mail-invoice-number").value=document.getElementById("send-invoice-number").value;
//     let modal=document.getElementById('modal-send-mail-invoice');
//     document.body.style.overflow="hidden";
//     modal.style.display="flex";
//     setTimeout(()=>{
//         modal.style.opacity="1";
//     },50);
    
// }

// function closeMailInvoice(){
//     let modal=document.getElementById('modal-send-mail-invoice');
//     document.body.style.overflow="auto";
//     modal.style.opacity="0";
//     setTimeout(()=>{
//         modal.style.display="none";
//         cart=[];
//     },300);
// }

let sendInvoiceForm = document.getElementById("crm-send-invoice");
sendInvoiceForm.addEventListener("submit",e=>{
    e.preventDefault();
    startLoading();

    const data = new FormData();

    for(const p of new FormData(sendInvoiceForm)){
        data.append(p[0],p[1]);
    }

    fetch("/admin/crm/includes/send-invoice.php",{
        method:"POST",
        body:data
    }).then(response=>response.json()).then(response=>{
        console.log(response);
        if(response.status==="success"){
            successPopUp("Factura a fost trimisa cu succes.");
            closeSendInvoice();
        }
        else{
            failPopUp(response.error);
        }
        stopLoading();
    })
})

function filterTable(){
    let emitor = document.getElementById("emitor-filter").value;
    let client = document.getElementById("client-filter").value;
    let nrProforma = document.getElementById("number-filter").value;
    let date = document.getElementById("date-filter").value;

    let filterTable =[];
    let filterTable2 =[];
    let filterTable3 =[];
    let filterTable4 =[];

    // console.log(proforme);
    // console.log(emitor,client,nrProforma,date);

    if(emitor!="all"){
        if(emitor==="1"){
            emitor = "S.C D+I Activation Agency SRL";
        }
        else{
            emitor = "SC Social Marketing Platform SRL";
        }
        for(i=0;i<proforme.length;i++){
            if(proforme[i].emitor === emitor){
                filterTable.push(proforme[i]);
            }
        }
    }
    else{
        filterTable=proforme;
    }
    // console.log(filterTable);
    
    for(i=0;i<filterTable.length;i++){
        if(filterTable[i].client.toLowerCase().includes(client.toLowerCase())){
            filterTable2.push(filterTable[i]);
        }
    }

    // console.log(filterTable2);

    for(i=0;i<filterTable2.length;i++){
        if(filterTable2[i].nrFactura.toLowerCase().includes(nrProforma.toLowerCase())){
            filterTable3.push(filterTable2[i]);
        }
    }
    // console.log(filterTable3);
    


    if(date!=""){
        let dateConvert = new Date(date);
        for(i=0;i<filterTable3.length;i++){
            console.log(dateConvert.getMonth(),new Date(filterTable3[i].dataEmitere).getMonth())
            if(dateConvert.getMonth()===new Date(filterTable3[i].dataEmitere).getMonth()){
                filterTable4.push(filterTable3[i]);
            }
        }
    }
    else{
        filterTable4=filterTable3;
    }
    // console.log(filterTable4);

    renderProformeTable(filterTable4);

}

function renderProformeTable(proformeList){

    document.getElementById("proforme-table-list").innerHTML="";

    console.log("start render");

    // let limitMin=(page-1)*25;
    // let limitMax;
    // if(limitMin+25<proformeList.length){
    //     limitMax=limitMin+25;
    // }
    // else{
    //     limitMax=proformeList.length;
    // }
    // for(i=limitMin;i<limitMax;i++){
    for(i=0;i<proformeList.length;i++){
        let viewInvoiceBtn;
        let sendInvoiceBtn;
        let editInvoiceBtn;
        let deleteInvoiceBtn;
        let aproveInvoiceBtn;
        let generateInvoiceBtn;


        let monthsInv = ["01","02","03","04","05","06","07","08","09","10","11","12"];

        console.log(proformeList[i]);
        console.log(proformeList[i].produse);
        let produse = JSON.parse(proformeList[i].produse);
        console.log(produse);
        let anexa;

        if(produse[0].tip==="0"){
            if(produse[0].nume.toLowerCase().includes("anexa")){
                console.log(produse[0].nume.toLowerCase().indexOf('anexa'));
                if(!isNaN(produse[0].nume[produse[0].nume.toLowerCase().indexOf('anexa')+7])){
                    anexa = "Anexa "+produse[0].nume[produse[0].nume.toLowerCase().indexOf('anexa')+6];
                }
                else{
                    anexa="";
                }

            }
            else{
                anexa="";
            }
        }
        else{
            anexa = "Anexa "+produse[0].nr;
        }


        

        let emitorAlias;
        if(proformeList[i].emitor==="S.C D+I Activation Agency SRL"){
            emitorAlias="D+i";
        }
        else{
            emitorAlias="SMP";
        }
        let invoiceDatefull = new Date(proformeList[i].dataEmitere);
        let invoiceDate = String(invoiceDatefull.getFullYear()).slice(-2)+""+(monthsInv[invoiceDatefull.getMonth()]);

        if(proformeList[i].status === "0"){
            rowBackground = 'red-background';

            invoiceStatus = "Refuzată";

            if(aproveInvoice){
                aproveInvoiceBtn = "<button class='small-rectang-btn green-btn' title='Aprobă factura' onclick='openAproveInvoice(\""+proformeList[i].clientId+"\",\""+proformeList[i].nrFactura+"\",\""+proformeList[i].file+"\")'><i class='fa-solid fa-check'></i></button>";
            }
            else{
                aproveInvoiceBtn="";
            }

            if(viewInvoice){
                viewInvoiceBtn="<a href='/clients-resources/"+proformeList[i].clientId+"/invoices/"+proformeList[i].file+"' title='Vezi proforma' class='crm-btn' style='background-color:#3daad6' target='_blank'> <i class='fa-solid fa-eye'></i> </a>";
            }
            else{
                viewInvoiceBtn="";
            }
            sendInvoiceBtn="";
        }
        else if(proformeList[i].status === "1"){
            rowBackground = 'yellow-background';

            invoiceStatus = "În așteptare";

            if(aproveInvoice){
                aproveInvoiceBtn = "<button class='small-rectang-btn green-btn' title='Aprobă factura' onclick='openAproveInvoice(\""+proformeList[i].clientId+"\",\""+proformeList[i].nrFactura+"\",\""+proformeList[i].file+"\")'><i class='fa-solid fa-check'></i></button>";
            }
            else{
                aproveInvoiceBtn="";
            }

            if(viewInvoice){
                viewInvoiceBtn="<a href='/clients-resources/"+proformeList[i].clientId+"/invoices/"+proformeList[i].file+"' title='Vezi proforma' class='crm-btn' style='background-color:#3daad6' target='_blank'> <i class='fa-solid fa-eye'></i> </a>";
            }
            else{
                viewInvoiceBtn="";
            }
            sendInvoiceBtn="";
        }
        else if(proformeList[i].status === "2"){
            rowBackground = 'green-background-1';

            invoiceStatus = "Aprobată";

            aproveInvoiceBtn="";

            if(viewInvoice){
                viewInvoiceBtn="<a href='/clients-resources/"+proformeList[i].clientId+"/invoices/"+proformeList[i].file+"' title='Vezi proforma' class='crm-btn' style='background-color:#3daad6' target='_blank'> <i class='fa-solid fa-eye'></i> </a> <a href='/clients-resources/"+proformeList[i].clientId+"/invoices/"+proformeList[i].file+"' title='Descarca proforma' class='crm-btn' download='"+emitorAlias+" factura "+proformeList[i].prefixNumber+" "+proformeList[i].nrFactura+" "+proformeList[i].client+" "+anexa+" "+invoiceDate+".pdf' style='background-color:#6baa41'> <i class='fa-solid fa-download'></i> </a>";
            }
            else{
                viewInvoiceBtn="";
            }
            if(sendInvoice){
                sendInvoiceBtn = "<button title='Trimite factura' style='background-color:#dea336' class='crm-btn' onclick='openSendProformaQuick(\""+proformeList[i].clientId+"\",\""+proformeList[i].file+"\")'><i class='fa-solid fa-envelope'></i></button>";
            }
            else{
                sendInvoiceBtn="";
            }
        }
        else if(proformeList[i].status === "3"){
            rowBackground = 'green-background-2';

            invoiceStatus = "Trimisă către client";

            if(viewInvoice){
                viewInvoiceBtn="<a href='/clients-resources/"+proformeList[i].clientId+"/invoices/"+proformeList[i].file+"' title='Vezi proforma' class='crm-btn' style='background-color:#3daad6' target='_blank'> <i class='fa-solid fa-eye'></i> </a> <a href='/clients-resources/"+proformeList[i].clientId+"/invoices/"+proformeList[i].file+"' title='Descarca proforma' class='crm-btn' download='"+emitorAlias+" factura "+proformeList[i].prefixNumber+" "+proformeList[i].nrFactura+" "+proformeList[i].client+" "+anexa+" "+invoiceDate+".pdf' style='background-color:#6baa41'> <i class='fa-solid fa-download'></i> </a>";
            }
            else{
                viewInvoiceBtn="";
            }
            if(sendInvoice){
                sendInvoiceBtn = "<button title='Trimite factura' style='background-color:#dea336' class='crm-btn' onclick='openSendProformaQuick(\""+proformeList[i].clientId+"\",\""+proformeList[i].file+"\")'><i class='fa-solid fa-envelope'></i></button>";
            }
            else{
                sendInvoiceBtn="";
            }
        }
        else if(proformeList[i].status === "4"){
            rowBackground = 'green-background-3';

            invoiceStatus = "Achitată";

            if(viewInvoice){
                viewInvoiceBtn="<a href='/clients-resources/"+proformeList[i].clientId+"/invoices/"+proformeList[i].file+"' title='Vezi proforma' class='crm-btn' style='background-color:#3daad6' target='_blank'> <i class='fa-solid fa-eye'></i> </a> <a href='/clients-resources/"+proformeList[i].clientId+"/invoices/"+proformeList[i].file+"' title='Descarca proforma' class='crm-btn' download='"+emitorAlias+" factura "+proformeList[i].prefixNumber+" "+proformeList[i].nrFactura+" "+proformeList[i].client+" "+anexa+" "+invoiceDate+".pdf' style='background-color:#6baa41'> <i class='fa-solid fa-download'></i> </a>";
            }
            else{
                viewInvoiceBtn="";
            }
            if(sendInvoice){
                sendInvoiceBtn = "<button title='Trimite factura' style='background-color:#dea336' class='crm-btn' onclick='openSendProformaQuick(\""+proformeList[i].clientId+"\",\""+proformeList[i].file+"\")'><i class='fa-solid fa-envelope'></i></button>";
            }
            else{
                sendInvoiceBtn="";
            }
        }

        document.getElementById("proforme-table-list").innerHTML+="<tr class='"+rowBackground+"'> <td>"+proformeList[i].dataEmitere+"</td> <td>"+proformeList[i].emitor+"</td> <td>"+proformeList[i].client+"</td> <td>"+proformeList[i].prefixNumber+" "+proformeList[i].nrFactura+"</td><td>"+proformeList[i].valTotala+"</td> <td>"+invoiceStatus+"</td> <td> <div class='crm-action-box-btns'>"+viewInvoiceBtn+" "+sendInvoiceBtn+" "+aproveInvoiceBtn+" </div> </td> </tr>";
    }
}

function setContract(){
    document.getElementById("contract-iframe-view").style.display="block";
    document.getElementById("anexa-iframe-view").style.display="none";
}
function setAnexa(){
    document.getElementById("anexa-iframe-view").style.display="block";
    document.getElementById("contract-iframe-view").style.display="none";
}

function openAproveInvoice(client,proformNumber,file){

    document.getElementById("aprove-invoice-clientId").value=client;
    document.getElementById("aprove-invoice-number").value=proformNumber;

    document.getElementById("invoice-iframe-view").src="/clients-resources/"+client+"/invoices/"+file;



    fetch("/admin/crm/includes/get-contract-info.php?client="+client+"&invoice="+proformNumber).then(response=>response.json()).then(response=>{
        response=response[0];
        if(response.contractFile!=""){
            document.getElementById("contract-iframe-view").src="/clients-resources/"+client+"/contracts/"+response.contractFile;
        }
        else{
            document.getElementById("contract-iframe-view").src="/error/file-not-found.html";
        }
    });
    fetch("/admin/crm/includes/get-anexa-info.php?client="+client).then(response=>response.json()).then(response=>{
        console.log(response);

        response = response[0];

        if(response.contractFile != ""){
            document.getElementById("anexa-iframe-view").src = "/clients-resources/"+client+"/contracts/"+response.contractFile;
        }
        else{
            document.getElementById("anexa-iframe-view").src="/error/file-not-found.html";
        }
    })

    let modal=document.getElementById('modal-aprove-invoice');
    document.body.style.overflow="hidden";
    modal.style.display="block";
    setTimeout(()=>{
        modal.style.opacity="1";
    },50);
    
}


function denyProforma(){
    let client = document.getElementById("aprove-proforma-clientId").value;
    let proforma = document.getElementById("aprove-proforma-number").value;

    fetch("/admin/crm/includes/deny-proform.php?client="+client+"&proform="+proforma).then(response=>response.json()).then(response=>{
        console.log(response);
    })
}



let aproveProformaFrom = document.getElementById('crm-aprove-invoice-form');
aproveProformaFrom.addEventListener("submit",e=>{
    e.preventDefault();

    let client = document.getElementById("aprove-invoice-clientId").value;
    let proforma = document.getElementById("aprove-invoice-number").value;

    fetch("/admin/crm/includes/aprove-invoice.php?client="+client+"&invoice="+proforma).then(response=>response.json()).then(response=>{
        if(response.status==="success"){
            successPopUp("Factura a fost aprobata cu succes.");
            closeAproveInvoice();
            fetchProforme();
        }
        else{
            failPopUp(response.error);
        }
    })
})

function closeAproveInvoice(){
    let modal=document.getElementById('modal-aprove-invoice');
    document.body.style.overflow="auto";
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
    },300);
}

function openSendProformaQuick(client,proformaNumber){
    document.getElementById("send-mail-proforma-clientId-quick").value=client;
    document.getElementById("send-mail-proforma-number-quick").value=proformaNumber;
    // document.getElementById("proforma-mail-wishes-1").value="Va multumim pentru colaborare!";
    // document.getElementById("proforma-mail-wishes-2").value="Va multumim pentru colaborare!";
    let modal=document.getElementById('modal-send-mail-proforma-quick');
    document.body.style.overflow="hidden";
    modal.style.display="block";
    setTimeout(()=>{
        modal.style.opacity="1";
    },50);  
}

function closeMailProformaQuick(){
    let modal=document.getElementById('modal-send-mail-proforma-quick');
    document.body.style.overflow="auto";
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
        cart=[];
    },300);
}

let sendProformaQuickForm = document.getElementById("crm-send-proforma-quick");
sendProformaQuickForm.addEventListener("submit",e=>{
    e.preventDefault();

    startLoading();

    const data = new FormData();

    for(const p of new FormData(sendProformaQuickForm)){
        data.append(p[0],p[1]);
    }

    fetch("/admin/crm/includes/send-invoice.php",{
        method:"POST",
        body:data
    }).then(response=>response.json()).then(response=>{
        if(response.status==="success"){
            successPopUp("Proforma a fost trimisa cu succes.");
            closeMailProformaQuick();
        }
        else{
            failPopUp(response.error);
        }
        stopLoading();
    })
})

