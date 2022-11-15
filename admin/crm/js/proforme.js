let viewProforma=false;
let sendProforma=false;
let generateProforma=false;
let generateInvoice=false;
let editProforma=false;
let aproveProforma = false;

let emitorValue = "";
let clientValue = "";
let nrProformaValue = "";
let lunaValue = "";

let clients;
let selectedClient;
let cart = [];
let cartEdit=[];
let proforme=[];
let filtreProformaList=[];


let invoiceSeries=[];


const url = new URL (document.URL);
const param = new URLSearchParams(url.search);
let clientId = param.get("id");
let newProformaCall = param.get("new");





fetchClients();
fetch("/admin/admin-includes/role-check.php").then(response=>response.json()).then(response=>{
    for(i=0;i<response.length;i++){
        if(response[i]==="crm view proforms"){
            viewProforma=true;
        }
        if(response[i]==="crm edit proforms"){
            editProforma=true;
        }
        if(response[i]==="crm generate proforms"){
            generateProforma=true;
        }
        if(response[i]==="crm send proforms"){
            sendProforma=true;
        }
        if(response[i]==="crm generate invoices"){
            generateInvoice=true;
        }
        if(response[i]==="crm aprove proforms"){
            aproveProforma=true;
        }
    }
    if(!generateProforma){
        document.getElementById("crm-new-proforma-btn").remove();
    }

        fetchProforme();
        fetchInvoiceSeries();
        if(newProformaCall){
            newProforma();
            document.getElementById("new-proforma-client").value=clientId;
        }

})


function fetchPersoaneDelegate(emitor){
    fetch("/admin/admin-includes/get-delegated-persons.php?emitor="+emitor).then(response=>response.json()).then(response=>{
        console.log(response);
        document.getElementById("new-proforma-pers-delegata").innerHTML="<option value='' disabled>Alege persoana delegata</option>";
        document.getElementById("edit-proforma-pers-delegata").innerHTML="<option value='' disabled>Alege persoana delegata</option>";

        for(i=0;i<response.length;i++){
            if(response[i].implicit===emitor){
                document.getElementById("new-proforma-pers-delegata").innerHTML+="<option selected value='"+response[i].unicId+"'>"+response[i].nume+" "+response[i].prenume+"</option>";
                document.getElementById("edit-proforma-pers-delegata").innerHTML+="<option selected value='"+response[i].unicId+"'>"+response[i].nume+" "+response[i].prenume+"</option>";
            }
            else{
                document.getElementById("edit-proforma-pers-delegata").innerHTML+="<option value='"+response[i].unicId+"'>"+response[i].nume+" "+response[i].prenume+"</option>";
                document.getElementById("new-proforma-pers-delegata").innerHTML+="<option value='"+response[i].unicId+"'>"+response[i].nume+" "+response[i].prenume+"</option>";
            }
        }
    })
}

function fetchInvoiceSeries(){

    fetch("/admin/admin-includes/get-invoice-series.php").then(response=>response.json()).then(response=>{
        console.log(response);
        invoiceSeries=response;
    })

}

function newProforma(){
    
    document.getElementById("products-list").innerHTML="";
    document.getElementById("crm-generate-proforma").reset();
    // fetchClients();
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
let editEmitorSelector = document.getElementById("edit-proforma-emitator");
// let emitorSelector = document.getElementById("new-proforma-emitator");
let clientSelector= document.getElementById("new-proforma-client");

function fetchClients(){
    fetch("/admin/crm/includes/proforma-get-client.php").then(response=>response.json()).then(response=>{
        console.log(response);
        clients=response;

        document.getElementById("gen-invoice-client").innerHTML="<option value='' selected disabled>Client</option>";
        document.getElementById("new-proforma-client").innerHTML="<option value='' selected disabled>Alege client</option>";
        document.getElementById("edit-proforma-client").innerHTML="<option value='' selected disabled>Alege client</option>";
        for(i=0;i<clients.length;i++){
            document.getElementById("new-proforma-client").innerHTML+="<option value='"+clients[i].unicId+"'>"+clients[i].numeClient+"</option>";
            document.getElementById("edit-proforma-client").innerHTML+="<option value='"+clients[i].unicId+"'>"+clients[i].numeClient+"</option>";
            document.getElementById("gen-invoice-client").innerHTML+="<option value='"+clients[i].unicId+"'>"+clients[i].numeClient+"</option>";
        }
    })
}

function fetchInvoiceNumber(){
    fetch("/admin/crm/includes/proforma-get-invoice-number.php?emitor="+emitorSelector.value).then(response=>response.json()).then(response=>{
        let invoiceNumber;
        let today=response.invoiceDate;
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
    fetchPersoaneDelegate(e.target.value);
    fetchInvoiceNumber();
})
editEmitorSelector.addEventListener("change",e=>{
    e.preventDefault();
    fetchPersoaneDelegate(e.target.value);
    fetchInvoiceNumber();
})

clientSelector.addEventListener("change",e=>{
    e.preventDefault();
    // console.log(clientSelector.value);

    for(i=1;i<clients.length;i++){
        if(clientSelector.value===clients[i].unicId){
            selectedClient=clients[i];
        }
    }

    // console.log(selectedClient);


})

let monedaProformaSelector = document.getElementById("gen-proforma-moneda");
monedaProformaSelector.addEventListener("change",e=>{
    console.log("change");
    e.preventDefault();

    if(monedaProformaSelector.value==="EURO-ECHIVALENT"){
        document.getElementById("gen-proforma-curs-euro-container").style.display="block";
        document.getElementById("gen-proforma-curs-euro").setAttribute("required","");
        document.getElementById("total-de-plata-ron-container").innerHTML='<span>Total de plata (RON)</span><input type="text" name="total-de-plata-ron" id="total-de-plata-ron" readonly class="crm-readonly-input" required>';
        calculateTotal();
    }
    else{
        document.getElementById("gen-proforma-curs-euro").removeAttribute("required");
        document.getElementById("gen-proforma-curs-euro-container").style.display="none";
        document.getElementById("total-de-plata-ron-container").innerHTML="";
    }
})

let monedaEditProformaSelector = document.getElementById("edit-proforma-moneda");
monedaEditProformaSelector.addEventListener("change",e=>{
    console.log("change");
    e.preventDefault();

    if(monedaEditProformaSelector.value==="EURO-ECHIVALENT"){
        document.getElementById("edit-proforma-curs-euro-container").style.display="block";
        document.getElementById("edit-proforma-curs-euro").setAttribute("required","");
    }
    else{
        document.getElementById("edit-proforma-curs-euro").removeAttribute("required");
        document.getElementById("edit-proforma-curs-euro-container").style.display="none";

    }
})

// let monedaSelector = document.getElementById("gen-invoice-moneda");
// monedaSelector.addEventListener("change",e=>{
//     e.preventDefault();

//     if(monedaSelector.value==="EURO-ECHIVALENT"){
//         document.getElementById("gen-invoice-curs-euro-container").style.display="block";
//         document.getElementById("gen-invoice-curs-euro").setAttribute("required","");
//     }
//     else{
//         document.getElementById("gen-invoice-curs-euro").removeAttribute("required");
//         document.getElementById("gen-invoice-curs-euro-container").style.display="none";

//     }
// })

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
    // valInput[index].value=cantInput[index].value*pretInput[index].value;
    valInput[index].value=cantInput[index].value*pretInput[index].value;
    let tva = parseFloat(vatInput.value);
    tvaInput[index].value=(Math.round((parseFloat(valInput[index].value)*tva/100) * 100) / 100).toFixed(2);
    cart[index].pretUnitar=pretInput[index].value;
    cart[index].tva=tvaInput[index].value;
    cart[index].valFaraTva=valInput[index].value;
    calculateTotalWTva();
    calculateTotalTva();
    calculateTotal();
}
function nameChange(index){
    console.log(numeInput[index].value);
    let noNl = numeInput[index].value.replaceAll("\n"," ");
    cart[index].nume=noNl;
    numeInput[index].value=noNl;
}

function updatePer1(index,e){
    let date = new Date();
    let per1Date = new Date(e.target.value);
    
    let date1=new Date(date.setMonth(date.getMonth()-12));
    let date2=new Date(date.setMonth(date.getMonth()+24));

    if(per1Date < date1 || per1Date>date2){
        console.log("inafara intervalului.");
        e.target.style.border="1px solid red";
        failPopUp("Perioada selectata este inafra intervalului de +- 12 luni");
        document.getElementById("submit-new-proform-btn").setAttribute("disabled","");
        
    }
    else{
        e.target.style.border="initial";
        cart[index].per1=e.target.value;
        document.getElementById("submit-new-proform-btn").removeAttribute("disabled");

    }
}

function updatePer2(index,e){
    let date = new Date();
    let per2Date = new Date(e.target.value);
    
    let date1=new Date(date.setMonth(date.getMonth()-12));
    let date2=new Date(date.setMonth(date.getMonth()+24));
    if(per2Date<date1||per2Date>date2){
        console.log("inafara intervalului.");
        e.target.style.border="1px solid red";
        e.target.setAttribute("isvalid","false");
        failPopUp("Perioada selectata este inafara intervalului de +- 12 luni");
        document.getElementById("submit-new-proform-btn").setAttribute("disabled","");
    }
    else{
        e.target.style.border="initial";
        cart[index].per2=e.target.value;
        document.getElementById("submit-new-proform-btn").removeAttribute("disabled");

    }
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
    document.getElementById("total-de-plata").value=sum.toFixed(2);

    if(document.getElementById("total-de-plata-ron")){
        let sumEuroToRon = parseFloat(document.getElementById("total-de-plata").value)*parseFloat(document.getElementById("gen-proforma-curs-euro").value);
        document.getElementById("total-de-plata-ron").value = sumEuroToRon.toFixed(2);
    }
}

function addProduct(x,event){
    event.preventDefault();
    let tva = parseFloat(vatInput.value);
    if(x===0){
        let productIndex=cart.length;
        let product = {
            "tip":"0",
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
            "tip":"1",
            "nume":"Pachet START-UP perioada [per1] - [per2] conform Anexa nr. [nr] la contractul dintre parti din data de [data]",
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
        element.innerHTML="<td><div onclick='removeProduct(\""+productIndex+"\")'><i class='fa-solid fa-xmark'></i></div></td><td>"+(productIndex+1)+"</td><td style='text-align:left'><textarea hidden required name='product-name[]' class='product-name'>Pachet START-UP perioada [per1] - [per2] conform Anexa nr. [nr] la contractul dintre parti din data de [data]</textarea><span>Pachet START-UP perioada <input type='date' onchange='updatePer1(\""+productIndex+"\",event)' required>-<input type='date' onchange='updatePer2(\""+productIndex+"\",event)' required> conform Anexa nr. <input type='number' onchange='updateNrAnexa(\""+productIndex+"\",event)' min='1' required> la contractul dintre parti din data de <input onchange='updateContrDate(\""+productIndex+"\",event)' type='date' required></span></td><td><input type='text' name='product-um[]' required value='buc' class='product-um' oninput='umChange(\""+productIndex+"\")' required></td><td><input type='number' min='0' required name='product-cant[]' value='1' class='product-cant' oninput='cantChange(\""+productIndex+"\")'></td><td><input type='text' required name='product-price[]' value='399' class='product-price'  oninput='priceChange(\""+productIndex+"\")'></td><td><input type='text' name='product-val[]' value='399' class='product-val crm-readonly-input' readonly></td><td><input type='text' name='product-tva[]' value='"+productTva+"' class='product-tva crm-readonly-input' readonly></td>";
        document.getElementById("products-list").appendChild(element);
        
    }
    else if(x===2){
        let productIndex=cart.length;
        let productTva= ((1199*tva)/100);
        let product = {
            "tip":"2",
            "nume":"Pachet OPTIM perioada [per1] - [per2] conform Anexa nr. [nr] la contractul dintre parti din data de [data]",
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
        element.innerHTML="<td><div onclick='removeProduct(\""+productIndex+"\")'><i class='fa-solid fa-xmark'></i></div></td><td>"+(productIndex+1)+"</td><td style='text-align:left'><textarea hidden required name='product-name[]' class='product-name'>Pachet OPTIM perioada [per1] - [per2] conform Anexa nr. [nr] la contractul dintre parti din data de [data]</textarea><span>Pachet OPTIM perioada <input type='date' onchange='updatePer1(\""+productIndex+"\",event)' required>-<input type='date' onchange='updatePer2(\""+productIndex+"\",event)' required> conform Anexa nr. <input type='number' onchange='updateNrAnexa(\""+productIndex+"\",event)' min='1' required> la contractul dintre parti din data de <input onchange='updateContrDate(\""+productIndex+"\",event)' type='date' required></span></td><td><input type='text' name='product-um[]' required value='buc' class='product-um' oninput='umChange(\""+productIndex+"\")'></td><td><input type='number' min='0' required name='product-cant[]' value='1' class='product-cant' oninput='cantChange(\""+productIndex+"\")'></td><td><input type='text' required name='product-price[]' value='1199' class='product-price'  oninput='priceChange(\""+productIndex+"\")'></td><td><input type='text' name='product-val[]' value='1199' class='product-val crm-readonly-input' readonly></td><td><input type='text' name='product-tva[]' value='"+productTva+"' class='product-tva crm-readonly-input' readonly></td>";
        document.getElementById("products-list").appendChild(element);
    }
    else if(x===3){
        let productIndex=cart.length;
        let productTva= ((1599*tva)/100);
        let product = {
            "tip":"3",
            "nume":"Pachet ADVANCED perioada [per1] - [per2] conform Anexa nr. [nr] la contractul dintre parti din data de [data]",
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
        element.innerHTML="<td><div onclick='removeProduct(\""+productIndex+"\")'><i class='fa-solid fa-xmark'></i></div></td><td>"+(productIndex+1)+"</td><td style='text-align:left'><textarea hidden required name='product-name[]' class='product-name'>Pachet ADVANCED perioada [per1] - [per2] conform Anexa nr. [nr] la contractul dintre parti din data de [data]</textarea><span>Pachet ADVANCED perioada <input type='date' onchange='updatePer1(\""+productIndex+"\",event)' required>-<input type='date' onchange='updatePer2(\""+productIndex+"\",event)' required> conform Anexa nr. <input type='number' onchange='updateNrAnexa(\""+productIndex+"\",event)' min='1' required> la contractul dintre parti din data de <input onchange='updateContrDate(\""+productIndex+"\",event)' type='date' required></span></td><td><input type='text' name='product-um[]' required value='buc' class='product-um' oninput='umChange(\""+productIndex+"\")'></td><td><input type='number' min='0' name='product-cant[]' value='1' class='product-cant' required oninput='cantChange(\""+productIndex+"\")'></td><td><input required type='text' name='product-price[]' value='1599' class='product-price'  oninput='priceChange(\""+productIndex+"\")'></td><td><input type='text' name='product-val[]' value='1599' class='product-val crm-readonly-input' readonly></td><td><input type='text' name='product-tva[]' value='"+productTva+"' class='product-tva crm-readonly-input' readonly></td>";
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
        stopLoading();

        return;
    }
    const data = new FormData();
    data.append("fullCart",JSON.stringify(cart));
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
    
    
    console.log(cart);
    for (const p of new FormData(proformaGen)){
        data.append(p[0],p[1]);
    }

    console.log(data);
    
    fetch("/admin/crm/includes/proforma-generator.php",{
        method: "POST",
        body: data
    }).then(response=>response.json()).then(response=>{
        console.log(response);
        if(response.status==="success"){
            successPopUp("Proforma a fost generata cu succes!");
            proformaGen.reset();
            cart=[];
            fetchProforme();
            closeNewProforma();
            // renderTable();
            setTp();
            // openSendProforma();
            window.open("/clients-resources/"+clientId+"/proforms/"+invoiceNumber+".pdf",'_blank');
        }
        else{
            failPopUp(response.error);
        }
        stopLoading();

    })
})

function openSendProforma(){
    let modal=document.getElementById('modal-send-proforma');
    // document.body.style.overflow="hidden";
    modal.style.display="flex";
    setTimeout(()=>{
        modal.style.opacity="1";
    },50);
}

function closeSendProforma(){
    let modal=document.getElementById('modal-send-proforma');
    // document.body.style.overflow="auto";
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
        cart=[];
    },300);
}

let sendProformaForm = document.getElementById("crm-send-proforma");
sendProformaForm.addEventListener("submit",e=>{
    e.preventDefault();
    startLoading();
    const data= new FormData();
    
    for(const p of new FormData(sendProformaForm)){
        data.append(p[0],p[1]);
    }

    // let client = document.getElementById("send-mail-proforma-clientId").value;
    // let proformaFile = document.getElementById("send-mail-proforma-number").value;
    fetch("/admin/crm/includes/send-proforma.php",{
        method: "POST",
        body:data
    }).then(response=>response.json()).then(response=>{
        console.log(response);
        if(response.status==="success"){
            successPopUp("Proforma a fost trimisa cu succes");
            closeSendProforma();
        }
        else{
            failPopUp(response.error);
            closeNewProforma();
        }
        stopLoading();
    })
    
});

function openMailProforma(){
    closeSendProforma();
    document.getElementById("send-mail-proforma-clientId").value=document.getElementById("send-proforma-clientId").value;
    document.getElementById("send-mail-proforma-number").value=document.getElementById("send-proforma-number").value;
    document.getElementById("proforma-mail-wishes-1").value="Va multumim pentru colaborare!";
    document.getElementById("proforma-mail-wishes-2").value="Va multumim pentru colaborare!";
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

    if(clientId){
        fetch("/admin/crm/includes/get-proforme.php?id="+clientId).then(response=>response.json()).then(response=>{
            console.log(response);
            
            for(i=0;i<response.length;i++){
                proforme.push(response[i]);
                let viewProformaBtn;
                let sendProformaBtn;
                let editProformaBtn;
                let deleteProformaBtn;
                let generateInvoiceBtn;
                let emitorAlias;
                if(response[i].emitor==="S.C D+I Activation Agency SRL"){
                    emitorAlias="D+i";
                }
                else{
                    emitorAlias="SMP";
                }
                let produse = JSON.parse(response[i].produse);
                // console.log(produse);
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
                let monthsInv = ["01","02","03","04","05","06","07","08","09","10","11","12"];
                let invoiceDatefull = new Date(response[i].dataEmitere);
                let invoiceDate = String(invoiceDatefull.getFullYear()).slice(-2)+""+(monthsInv[invoiceDatefull.getMonth()]);

                if(viewProforma){
                    viewProformaBtn="<a href='/clients-resources/"+response[i].clientId+"/proforms/"+response[i].nrFactura+".pdf' title='Vezi proforma' class='crm-btn' style='background-color:#3daad6' target='_blank'> <i class='fa-solid fa-eye'></i> </a> <a href='/clients-resources/"+response[i].clientId+"/proforms/"+response[i].nrFactura+".pdf' title='Descarca proforma' class='crm-btn' download='"+emitorAlias+" proforma "+response[i].nrFactura+" "+response[i].client+" "+anexa+" "+invoiceDate+".pdf' style='background-color:#6baa41'> <i class='fa-solid fa-download'></i> </a>";
                }
                else{
                    viewProformaBtn="";
                }
                if(sendProforma){
                    sendProformaBtn="<div title='Trimite proforma' style='background-color:#dea336' class='crm-btn' onclick='openSendProformaQuick(\""+response[i].clientId+"\",\""+response[i].nrFactura+"\")'><i class='fa-solid fa-envelope'></i></div>";
                }
                else{
                    sendProformaBtn="";
                }
                if(generateInvoice){
                    if(response[i].invoiceCreated!="1"){
                        generateInvoiceBtn="<div title='Genereaza factura' style='background-color:#8a1b7a' class='crm-btn' onclick='generateInvoiceFunction(\""+response[i].clientId+"\",\""+response[i].nrFactura+"\")'> <i class='fa-solid fa-file-invoice-dollar'></i> </div>";
                    }
                    else{
                        generateInvoiceBtn="";
                    }
                    
                }
                else{
                    generateInvoiceBtn="";
                }
                if(editProforma){
                    if(response[i].invoiceCreated!="1"){
                        editProformaBtn="<div title='Modifica proforma' style='background-color:#d94e47' class='crm-btn' onclick='openEditProforma(\""+response[i].clientId+"\",\""+response[i].nrFactura+"\")'><i class='fa-solid fa-pen-to-square'></i></div>";
                        deleteProformaBtn="<div title='Sterge proforma' style='background-color:#d94e47' class='crm-btn' onclick='deleteProforma(\""+response[i].clientId+"\",\""+response[i].nrFactura+"\")'><i class='fa-solid fa-trash-can'></i></div>"
                    }
                    else{
                        editProformaBtn="";
                        deleteProformaBtn="";
                    }
                }
                else{
                    editProformaBtn="";
                    deleteProformaBtn="";

                }

                let proformaStatus;
                if(response[i].status==="1"){
                    proformaStatus = "În așteptare";
                }
                else if(response[i].status==="2"){
                    proformaStatus = "Aprobată";
                }
                else if(response[i].status==="3"){
                    proformaStatus = "Trimisă către client";
                }
                else if(response[i].status==="4"){
                    proformaStatus = "Factură generată";
                }
                document.getElementById("proforme-table-list").innerHTML+="<tr> <td>"+response[i].dataEmitere+"</td> <td>"+response[i].emitor+"</td> <td>"+response[i].client+"</td> <td>"+response[i].nrFactura+"</td><td>"+response[i].valTotala+"</td><td>"+proformaStatus+"</td> <td><div class='crm-action-box-btns'>"+viewProformaBtn+" "+editProformaBtn+" "+sendProformaBtn+" "+generateInvoiceBtn+" "+deleteProformaBtn+" </div> </td> </tr>";
                
            }
            renderProformeTable(proforme);
            stopLoading();
            // renderProformeTable(proforme,1);
            stopLoading();
        })
    }
    else{
        fetch("/admin/crm/includes/get-proforme.php").then(response=>response.json()).then(response=>{
            console.log(response);
    
    
            for(i=0;i<response.length;i++){
                proforme.push(response[i]);
                let viewProformaBtn;
                let sendProformaBtn;
                let editProformaBtn;
                let deleteProformaBtn;
                let generateInvoiceBtn;

                let monthsInv = ["01","02","03","04","05","06","07","08","09","10","11","12"];

        console.log(response[i]);
        console.log(response[i].produse);
        let produse = JSON.parse(response[i].produse);
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
        if(response[i].emitor==="S.C D+I Activation Agency SRL"){
            emitorAlias="D+i";
        }
        else{
            emitorAlias="SMP";
        }
        let invoiceDatefull = new Date(response[i].dataEmitere);
        let invoiceDate = String(invoiceDatefull.getFullYear()).slice(-2)+""+(monthsInv[invoiceDatefull.getMonth()]);



                if(viewProforma){
                    viewProformaBtn="<a href='/clients-resources/"+response[i].clientId+"/proforms/"+response[i].nrFactura+".pdf' title='Vezi proforma' class='crm-btn' style='background-color:#3daad6' target='_blank'> <i class='fa-solid fa-eye'></i> </a> <a href='/clients-resources/"+response[i].clientId+"/proforms/"+response[i].nrFactura+".pdf' title='Descarca proforma' class='crm-btn' download='"+emitorAlias+" proforma "+response[i].nrFactura+" "+response[i].client+" "+anexa+" "+invoiceDate+".pdf' style='background-color:#6baa41'> <i class='fa-solid fa-download'></i> </a>";
                }
                else{
                    viewProformaBtn="";
                }
                if(sendProforma){
                    sendProformaBtn="<div title='Trimite proforma' style='background-color:#dea336' class='crm-btn' onclick='openSendProformaQuick(\""+response[i].clientId+"\",\""+response[i].nrFactura+"\")'><i class='fa-solid fa-envelope'></i></div>";
                }
                else{
                    sendProformaBtn="";
                }
                if(generateInvoice){
                    if(response[i].invoiceCreated!="1"){
                        generateInvoiceBtn="<div title='Genereaza factura' style='background-color:#8a1b7a' class='crm-btn' onclick='generateInvoiceFunction(\""+response[i].clientId+"\",\""+response[i].nrFactura+"\")'> <i class='fa-solid fa-file-invoice-dollar'></i> </div>";
                    }
                    else{
                        generateInvoiceBtn="";
                    }
                    
                }
                else{
                    generateInvoiceBtn="";
                }
                if(editProforma){
                    if(response[i].invoiceCreated!="1"){
                        editProformaBtn="<div title='Modifica proforma' style='background-color:#d94e47' class='crm-btn' onclick='openEditProforma(\""+response[i].clientId+"\",\""+response[i].nrFactura+"\")'><i class='fa-solid fa-pen-to-square'></i></div>";
                        deleteProformaBtn="<div title='Sterge proforma' style='background-color:#d94e47' class='crm-btn' onclick='deleteProforma(\""+response[i].clientId+"\",\""+response[i].nrFactura+"\")'><i class='fa-solid fa-trash-can'></i></div>"
                    }
                    else{
                        editProformaBtn="";
                        deleteProformaBtn="";
                    }
                }
                else{
                    editProformaBtn="";
                }

                let proformaStatus;
                if(response[i].status==="1"){
                    proformaStatus = "În așteptarea aprobării";
                }
                else if(response[i].status==="2"){
                    proformaStatus = "Aprobată";
                }
                else if(response[i].status==="3"){
                    proformaStatus = "Trimisă către client";
                }
                else if(response[i].status==="4"){
                    proformaStatus = "Factură generată";
                }


                document.getElementById("proforme-table-list").innerHTML+="<tr> <td>"+response[i].dataEmitere+"</td> <td>"+response[i].emitor+"</td> <td>"+response[i].client+"</td> <td>"+response[i].nrFactura+"</td><td>"+response[i].valTotala+"</td> <td>"+proformaStatus+"</td> <td><div class='crm-action-box-btns'>"+viewProformaBtn+" "+editProformaBtn+" "+sendProformaBtn+" "+generateInvoiceBtn+" "+deleteProformaBtn+" </div> </td> </tr>";
                
            }
            renderProformeTable(proforme);
            stopLoading();
        })
    }
    
}

function renderProformeTable(proformeList){
    document.getElementById("proforme-table-list").innerHTML="";

    for(i=0;i<proformeList.length;i++){
        let viewProformaBtn;
        let sendProformaBtn;
        let editProformaBtn;
        let deleteProformaBtn;
        let generateInvoiceBtn;
        let proformaStatus;
        let aproveProformaBtn;

        let rowBackground;


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

        if(proformeList[i].status==="0"){
            rowBackground = 'red-background';

            proformaStatus= "Refuzată";

            if(aproveProforma){
                aproveProformaBtn="<button class='small-rectang-btn green-btn' title='Aprobă profroma' onclick='openAproveProform(\""+proformeList[i].clientId+"\",\""+proformeList[i].nrFactura+"\")'><i class='fa-solid fa-check'></i></button>";
            }
            else{
                aproveProformaBtn="";
            }


            if(viewProforma){
                viewProformaBtn="<a href='/clients-resources/"+proformeList[i].clientId+"/proforms/"+proformeList[i].nrFactura+".pdf' title='Vezi proforma' class='crm-btn' style='background-color:#3daad6' target='_blank'> <i class='fa-solid fa-eye'></i> </a> <a href='/clients-resources/"+proformeList[i].clientId+"/proforms/"+proformeList[i].nrFactura+".pdf' title='Descarca proforma' class='crm-btn' download='"+emitorAlias+" proforma "+proformeList[i].nrFactura+" "+proformeList[i].client+" "+anexa+" "+invoiceDate+".pdf' style='background-color:#6baa41'> <i class='fa-solid fa-download'></i> </a>";
            }
            else{
                viewProformaBtn="";
            }

            if(editProforma){
                if(proformeList[i].invoiceCreated!="1"){
                    editProformaBtn="<div title='Modifica proforma' style='background-color:#d94e47' class='crm-btn' onclick='openEditProforma(\""+proformeList[i].clientId+"\",\""+proformeList[i].nrFactura+"\")'><i class='fa-solid fa-pen-to-square'></i></div>";
                    deleteProformaBtn="<div title='Sterge proforma' style='background-color:#d94e47' class='crm-btn' onclick='deleteProforma(\""+proformeList[i].clientId+"\",\""+proformeList[i].nrFactura+"\")'><i class='fa-solid fa-trash-can'></i></div>"
                }
                else{
                    editProformaBtn="";
                    deleteProformaBtn="";
                }
            }
            else{
                editProformaBtn="";
                deleteProformaBtn="";
            }
            sendProformaBtn="";
            generateInvoiceBtn="";

        }
        else if(proformeList[i].status==="1"){

            rowBackground = 'yellow-background';


            proformaStatus = "În așteptare";


            if(aproveProforma){
                aproveProformaBtn="<button class='small-rectang-btn green-btn' title='Aprobă profroma' onclick='openAproveProform(\""+proformeList[i].clientId+"\",\""+proformeList[i].nrFactura+"\")'><i class='fa-solid fa-check'></i></button>";
            }
            else{
                aproveProformaBtn="";
            }


            if(viewProforma){
                viewProformaBtn="<a href='/clients-resources/"+proformeList[i].clientId+"/proforms/"+proformeList[i].nrFactura+".pdf' title='Vezi proforma' class='crm-btn' style='background-color:#3daad6' target='_blank'> <i class='fa-solid fa-eye'></i> </a> <a href='/clients-resources/"+proformeList[i].clientId+"/proforms/"+proformeList[i].nrFactura+".pdf' title='Descarca proforma' class='crm-btn' download='"+emitorAlias+" proforma "+proformeList[i].nrFactura+" "+proformeList[i].client+" "+anexa+" "+invoiceDate+".pdf' style='background-color:#6baa41'> <i class='fa-solid fa-download'></i> </a>";
            }
            else{
                viewProformaBtn="";
            }

            if(editProforma){
                if(proformeList[i].invoiceCreated!="1"){
                    editProformaBtn="<div title='Modifica proforma' style='background-color:#d94e47' class='crm-btn' onclick='openEditProforma(\""+proformeList[i].clientId+"\",\""+proformeList[i].nrFactura+"\")'><i class='fa-solid fa-pen-to-square'></i></div>";
                    deleteProformaBtn="<div title='Sterge proforma' style='background-color:#d94e47' class='crm-btn' onclick='deleteProforma(\""+proformeList[i].clientId+"\",\""+proformeList[i].nrFactura+"\")'><i class='fa-solid fa-trash-can'></i></div>"
                }
                else{
                    editProformaBtn="";
                    deleteProformaBtn="";
                }
            }
            else{
                editProformaBtn="";
                deleteProformaBtn="";
            }
            sendProformaBtn="";
            generateInvoiceBtn="";
        }
        else if(proformeList[i].status==="2"){
            proformaStatus = "Aprobată";

            rowBackground = 'green-background-1';


            if(viewProforma){
                viewProformaBtn="<a href='/clients-resources/"+proformeList[i].clientId+"/proforms/"+proformeList[i].nrFactura+".pdf' title='Vezi proforma' class='crm-btn' style='background-color:#3daad6' target='_blank'> <i class='fa-solid fa-eye'></i> </a> <a href='/clients-resources/"+proformeList[i].clientId+"/proforms/"+proformeList[i].nrFactura+".pdf' title='Descarca proforma' class='crm-btn' download='"+emitorAlias+" proforma "+proformeList[i].nrFactura+" "+proformeList[i].client+" "+anexa+" "+invoiceDate+".pdf' style='background-color:#6baa41'> <i class='fa-solid fa-download'></i> </a>";
            }
            else{
                viewProformaBtn="";
            }
           
            if(sendProforma){
                sendProformaBtn="<div title='Trimite proforma' style='background-color:#dea336' class='crm-btn' onclick='openSendProformaQuick(\""+proformeList[i].clientId+"\",\""+proformeList[i].nrFactura+"\")'><i class='fa-solid fa-envelope'></i></div>";
            }
            else{
                sendProformaBtn="";
            }
            
            if(editProforma){
                if(proformeList[i].invoiceCreated!="1"){
                    editProformaBtn="<div title='Modifica proforma' style='background-color:#d94e47' class='crm-btn' onclick='openEditProforma(\""+proformeList[i].clientId+"\",\""+proformeList[i].nrFactura+"\")'><i class='fa-solid fa-pen-to-square'></i></div>";
                    deleteProformaBtn="<div title='Sterge proforma' style='background-color:#d94e47' class='crm-btn' onclick='deleteProforma(\""+proformeList[i].clientId+"\",\""+proformeList[i].nrFactura+"\")'><i class='fa-solid fa-trash-can'></i></div>"
                }
                else{
                    editProformaBtn="";
                    deleteProformaBtn="";
                }
            }
            else{
                editProformaBtn="";
                deleteProformaBtn="";

            }
            if(generateInvoice){
                if(proformeList[i].invoiceCreated!="1"){
                    generateInvoiceBtn="<div title='Genereaza factura' style='background-color:#8a1b7a' class='crm-btn' onclick='generateInvoiceFunction(\""+proformeList[i].clientId+"\",\""+proformeList[i].nrFactura+"\")'> <i class='fa-solid fa-file-invoice-dollar'></i> </div>";
                }
                else{
                    generateInvoiceBtn="";
                }
                
            }
            else{
                generateInvoiceBtn="";
            }            aproveProformaBtn="";
        }
        else if(proformeList[i].status==="3"){
            proformaStatus = "Trimisă către client";

            rowBackground = 'green-background-2';


            if(viewProforma){
                viewProformaBtn="<a href='/clients-resources/"+proformeList[i].clientId+"/proforms/"+proformeList[i].nrFactura+".pdf' title='Vezi proforma' class='crm-btn' style='background-color:#3daad6' target='_blank'> <i class='fa-solid fa-eye'></i> </a> <a href='/clients-resources/"+proformeList[i].clientId+"/proforms/"+proformeList[i].nrFactura+".pdf' title='Descarca proforma' class='crm-btn' download='"+emitorAlias+" proforma "+proformeList[i].nrFactura+" "+proformeList[i].client+" "+anexa+" "+invoiceDate+".pdf' style='background-color:#6baa41'> <i class='fa-solid fa-download'></i> </a>";
            }
            else{
                viewProformaBtn="";
            }

            
            if(sendProforma){
                sendProformaBtn="<div title='Trimite proforma' style='background-color:#dea336' class='crm-btn' onclick='openSendProformaQuick(\""+proformeList[i].clientId+"\",\""+proformeList[i].nrFactura+"\")'><i class='fa-solid fa-envelope'></i></div>";
            }
            else{
                sendProformaBtn="";
            }
            
        

            if(generateInvoice){
                if(proformeList[i].invoiceCreated!="1"){
                    generateInvoiceBtn="<div title='Genereaza factura' style='background-color:#8a1b7a' class='crm-btn' onclick='generateInvoiceFunction(\""+proformeList[i].clientId+"\",\""+proformeList[i].nrFactura+"\")'> <i class='fa-solid fa-file-invoice-dollar'></i> </div>";
                }
                else{
                    generateInvoiceBtn="";
                }
                
            }
            else{
                generateInvoiceBtn="";
            }
            editProformaBtn="";
            deleteProformaBtn="";
            aproveProformaBtn="";
        }
        else if(proformeList[i].status==="4"){
            proformaStatus = "Factură generată";

            rowBackground = 'green-background-3';


            if(viewProforma){
                viewProformaBtn="<a href='/clients-resources/"+proformeList[i].clientId+"/proforms/"+proformeList[i].nrFactura+".pdf' title='Vezi proforma' class='crm-btn' style='background-color:#3daad6' target='_blank'> <i class='fa-solid fa-eye'></i> </a> <a href='/clients-resources/"+proformeList[i].clientId+"/proforms/"+proformeList[i].nrFactura+".pdf' title='Descarca proforma' class='crm-btn' download='"+emitorAlias+" proforma "+proformeList[i].nrFactura+" "+proformeList[i].client+" "+anexa+" "+invoiceDate+".pdf' style='background-color:#6baa41'> <i class='fa-solid fa-download'></i> </a>";
            }
            else{
                viewProformaBtn="";
            }
            editProformaBtn="";
            deleteProformaBtn="";
            sendProformaBtn="";
            generateInvoiceBtn="";
            aproveProformaBtn="";
        }



  
        
        
    

        document.getElementById("proforme-table-list").innerHTML+="<tr class='"+rowBackground+"'> <td>"+proformeList[i].dataEmitere+"</td> <td>"+proformeList[i].emitor+"</td> <td>"+proformeList[i].client+"</td> <td>"+proformeList[i].nrFactura+"</td><td>"+proformeList[i].valTotala+"</td><td>"+proformaStatus+"</td> <td><div class='crm-action-box-btns'>"+viewProformaBtn+" "+editProformaBtn+" "+aproveProformaBtn+" "+sendProformaBtn+" "+generateInvoiceBtn+" "+deleteProformaBtn+" </div> </td> </tr>";
        
    }
}


function generateInvoiceFunction(client, proformNumber){
    // fetchClients();
    fetch("/admin/crm/includes/get-proforma-info.php?client="+client+"&proforma="+proformNumber).then(response=>response.json()).then(response=>{
        console.log(response);

        // console.log(JSON.parse(response[1]));
        document.getElementById("gen-invoice-emitator").value=response[0].emitor;
        document.getElementById("gen-invoice-client").value=response[0].client;
        document.getElementById("gen-invoice-vat").value=response[0].vat;
        document.getElementById("gen-invoice-moneda").value=response[0].moneda;

        document.getElementById("gen-invoice-proform-number").value=proformNumber;

        let thisSerieFactura = [];

        for(i=0;i<invoiceSeries.length;i++){
            if(invoiceSeries[i].company===response[0].emitor || invoiceSeries[i].company===""){
                thisSerieFactura.push(invoiceSeries[i]);
            }
        }
        document.getElementById("gen-invoice-invoice-serie").innerHTML="<option value='' disabled selected>Serie</option>";
        for(i=0;i<thisSerieFactura.length;i++){ 
            if(thisSerieFactura[i].selected){
                document.getElementById("gen-invoice-invoice-serie").innerHTML+="<option value='"+thisSerieFactura[i].serie+"' selected>"+thisSerieFactura[i].serie+"</option>";
            }
            else{
                document.getElementById("gen-invoice-invoice-serie").innerHTML+="<option value='"+thisSerieFactura[i].serie+"'>"+thisSerieFactura[i].serie+"</option>";

            }
        }

        fetch("/admin/crm/includes/get-invoice-number.php?serie="+document.getElementById("gen-invoice-invoice-serie").value+"&company="+document.getElementById("gen-invoice-emitator").value).then(newInvoiceNumber=>newInvoiceNumber.json()).then(newInvoiceNumber=>{
            console.log(newInvoiceNumber);
            document.getElementById("gen-invoice-invoice-number").value = newInvoiceNumber.newInvoiceNumber;
        });
        
        document.getElementById("gen-invoice-tp").value = 5;

        document.getElementById("gen-invoice-products-list").innerHTML="";
        document.getElementById("invoice-products").innerHTML="[";

        let invoiceProducts = JSON.parse(response[1]);
        console.log(invoiceProducts);
        // console.log(JSON.parse(invoiceProducts));

        for(i=0;i<invoiceProducts.length;i++){
            let produs = invoiceProducts[i];
            // response[i].nume=response[i].nume.replaceAll(",","[");
            console.log(produs);
            produs.nume=produs.nume.replaceAll("[per1]",produs.per1);
            produs.nume=produs.nume.replaceAll("[per2]",produs.per2);
            produs.nume=produs.nume.replaceAll("[nr]",produs.nr);
            produs.nume=produs.nume.replaceAll("[data]",produs.data);
            // console.log(produs);
            if(i===0){
                document.getElementById("invoice-products").innerHTML+= JSON.stringify(produs);
            }
            else{
                document.getElementById("invoice-products").innerHTML+= ","+JSON.stringify(produs);
            }
            
            document.getElementById("gen-invoice-products-list").innerHTML+="<td></td><td>"+i+"</td><td>"+produs.nume+"</td><td>"+produs.um+"</td><td>"+produs.cantitate+"</td><td>"+produs.pretUnitar+"</td><td>"+produs.prevalFaraTvatUnitar+"</td><td>"+produs.tva+"</td>";
        }
        document.getElementById("invoice-products").innerHTML+="]";

        document.getElementById("gen-invoice-total-de-plata").value=response[0].totalDePlata;
        document.getElementById("gen-invoice-total-fara-tva").value=response[0].totalFTva;
        document.getElementById("gen-invoice-total-tva").value=response[0].totalTva;
    })

    
    let modal=document.getElementById('modal-generate-invoice');
    document.body.style.overflow="hidden";
    modal.style.display="block";
    setTimeout(()=>{
        modal.style.opacity="1";
    },50);

}

let serieFacturaSelector = document.getElementById("gen-invoice-invoice-serie");
serieFacturaSelector.addEventListener("change",e=>{
    e.preventDefault();

    fetch("/admin/crm/includes/get-invoice-number.php?serie="+serieFacturaSelector.value+"&company="+document.getElementById("gen-invoice-emitator").value).then(newInvoiceNumber=>newInvoiceNumber.json()).then(newInvoiceNumber=>{
        console.log(newInvoiceNumber);
        document.getElementById("gen-invoice-invoice-number").value = newInvoiceNumber.newInvoiceNumber;
    });
})


function closeGenerateInvoice(){
    let modal=document.getElementById('modal-generate-invoice');
    document.body.style.overflow="auto";
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
        cart=[];
    },300);
}

let generateInvoiceForm = document.getElementById("crm-generate-invoice");
generateInvoiceForm.addEventListener("submit",e=>{
    e.preventDefault();
    startLoading();

    const data = new FormData();

    data.append("gen-invoice-emitator-value", document.getElementById("gen-invoice-emitator").value);
    data.append("gen-invoice-client-value", document.getElementById("gen-invoice-client").value);

    let emitent = document.getElementById("gen-invoice-emitator").value;
    let serie = document.getElementById("gen-invoice-invoice-serie").value;

    for(const p of new FormData(generateInvoiceForm)){
        data.append(p[0],p[1]);
    }
    let clientInvoice=document.getElementById("gen-invoice-client").value;
    let invoiceNumber=document.getElementById("gen-invoice-invoice-number").value;

    fetch("/admin/crm/includes/invoice-generator.php",{
        method: "POST",
        body: data
    }).then(response=>response.json()).then(response=>{
        console.log(response);
        if(response.status==="success"){
            successPopUp("Factura a fost generata cu succes!");
            closeGenerateInvoice();
            generateInvoiceForm.reset();
            renderTable();
            // openSendInvoice(clientInvoice,invoiceNumber);
            
            window.open("/clients-resources/"+clientInvoice+"/invoices/"+response.file,'_blank');
            

            fetchProforme();
            
        }
        else{
            failPopUp(response.error);
        }
        stopLoading();
    });
})

function openSendInvoice(clientInvoice,invoiceNumber){

    document.getElementById("send-invoice-clientId").value=clientInvoice;
    document.getElementById("send-invoice-number").value=invoiceNumber;
    let modal=document.getElementById('modal-send-invoice');
    document.body.style.overflow="hidden";
    modal.style.display="flex";
    setTimeout(()=>{
        modal.style.opacity="1";
    },50);
}

function closeSendInvoice(){
    let modal=document.getElementById('modal-send-invoice');
    document.body.style.overflow="auto";
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
        cart=[];
    },300);
}

function openMailInvoice(){
    closeSendInvoice();

    document.getElementById("send-mail-invoice-clientId").value=document.getElementById("send-invoice-clientId").value;
    document.getElementById("send-mail-invoice-number").value=document.getElementById("send-invoice-number").value;
    let modal=document.getElementById('modal-send-mail-invoice');
    document.getElementById("invoice-mail-wishes").value="Va multumim pentru colaborare!";
    
    document.body.style.overflow="hidden";
    modal.style.display="flex";
    setTimeout(()=>{
        modal.style.opacity="1";
    },50);
    
}

function closeMailInvoice(){
    let modal=document.getElementById('modal-send-mail-invoice');
    document.body.style.overflow="auto";
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
        cart=[];
    },300);
}

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
            closeMailInvoice();
        }
        else{
            failPopUp(response.error);
        }
        stopLoading();
    })
})


function openSendProformaQuick(client,proformaNumber){
    document.getElementById("send-mail-proforma-clientId-quick").value=client;
    document.getElementById("send-mail-proforma-number-quick").value=proformaNumber;
    document.getElementById("proforma-mail-wishes-1").value="Va multumim pentru colaborare!";
    document.getElementById("proforma-mail-wishes-2").value="Va multumim pentru colaborare!";
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

    fetch("/admin/crm/includes/send-proforma.php",{
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


function openEditProforma(client,proforma){
    fetchProformaInfo(client,proforma);
    let modal=document.getElementById('modal-edit-proforma');
    document.body.style.overflow="hidden";
    modal.style.display="block";
    setTimeout(()=>{
        modal.style.opacity="1";
    },50);  
}

function closeEditProforma(){
    let modal=document.getElementById('modal-edit-proforma');
    document.body.style.overflow="auto";
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
    },300);
}

function fetchProformaInfo(client,proforma){
    cartEdit=[];
    console.log(client,proforma);
    fetch("/admin/crm/includes/get-proforma-info.php?client="+client+"&proforma="+proforma).then(response=>response.json()).then(response=>{
        console.log(response);
        document.getElementById("edit-proforma-emitator").value=response[0].emitor;
        document.getElementById("edit-proforma-client").value=response[0].client;
        document.getElementById("edit-proforma-invoice-number").value=response[0].invoiceNumber;
        document.getElementById("edit-proforma-tp").value=response[0].tp;
        document.getElementById("new-proforma-vat").value=response[0].vat;
        fetchPersoaneDelegate(response[0].emitor);
        document.getElementById("edit-proforma-pers-delegata").value = response[0].persDelegata;

        document.getElementById("edit-proforma-moneda").value = response[0].moneda;

        if(response[0].moneda==="EURO-ECHIVALENT"){
            document.getElementById("edit-proforma-curs-euro-container").style.display="block";
            document.getElementById("edit-proforma-curs-euro").setAttribute("required","");
        }
        else{
            document.getElementById("edit-proforma-curs-euro").removeAttribute("required");
            document.getElementById("edit-proforma-curs-euro-container").style.display="none";
    
        }

        document.getElementById("products-list-edit").innerHTML="";
        // response[1]=JSON.parse(response[1]);
        // console.log(response[1]);
        let edtiProductsList = JSON.parse(response[1]);
        // console.log(edtiProductsList);

        for(i=0;i<edtiProductsList.length;i++){
            // console.log(edtiProductsList);
            // response[i]=response[i][0];
            // console.log(edtiProductsList[i]);

            if(edtiProductsList[i].tip==="0"){
                let product = {
                    "tip":"0",
                    "nume":edtiProductsList[i].nume.replaceAll("<br>","\n"),
                    "um":edtiProductsList[i].um,
                    "cantitate":edtiProductsList[i].cantitate,
                    "pretUnitar":edtiProductsList[i].pretUnitar,
                    "valFaraTva":edtiProductsList[i].prevalFaraTvatUnitar,
                    "tva":edtiProductsList[i].tva,
                    "tipProdus":"0"
                }
                cartEdit.push(product);
            }
            else if(edtiProductsList[i].tip==="1"){
                let product = {
                    "tip":"1",
                    "nume":"Pachet START-UP perioada [per1] - [per2] conform Anexa nr. [nr] la contractul dintre parti din data de [data]",
                    "um":edtiProductsList[i].um,
                    "cantitate":edtiProductsList[i].cantitate,
                    "pretUnitar":edtiProductsList[i].pretUnitar,
                    "valFaraTva":edtiProductsList[i].prevalFaraTvatUnitar,
                    "tva":edtiProductsList[i].tva,
                    "tipProdus":"1",
                    "per1":edtiProductsList[i].per1,
                    "per2":edtiProductsList[i].per2,
                    "nr":edtiProductsList[i].nr,
                    "data":edtiProductsList[i].data
                }
                cartEdit.push(product);
            }
            else if(edtiProductsList[i].tip==="2"){
                let product = {
                    "tip":"2",
                    "nume":"Pachet OPTIM perioada [per1] - [per2] conform Anexa nr. [nr] la contractul dintre parti din data de [data]",
                    "um":edtiProductsList[i].um,
                    "cantitate":edtiProductsList[i].cantitate,
                    "pretUnitar":edtiProductsList[i].pretUnitar,
                    "valFaraTva":edtiProductsList[i].prevalFaraTvatUnitar,
                    "tva":edtiProductsList[i].tva,
                    "tipProdus":"2",
                    "per1":edtiProductsList[i].per1,
                    "per2":edtiProductsList[i].per2,
                    "nr":edtiProductsList[i].nr,
                    "data":edtiProductsList[i].data
                }
                cartEdit.push(product);
            }
            else if(edtiProductsList[i].tip==="3"){
                let product = {
                    "tip":"3",
                    "nume":"Pachet ADVANCED perioada [per1] - [per2] conform Anexa nr. [nr] la contractul dintre parti din data de [data]",
                    "um":edtiProductsList[i].um,
                    "cantitate":edtiProductsList[i].cantitate,
                    "pretUnitar":edtiProductsList[i].pretUnitar,
                    "valFaraTva":edtiProductsList[i].prevalFaraTvatUnitar,
                    "tva":edtiProductsList[i].tva,
                    "tipProdus":"3",
                    "per1":edtiProductsList[i].per1,
                    "per2":edtiProductsList[i].per2,
                    "nr":edtiProductsList[i].nr,
                    "data":edtiProductsList[i].data
                }
                cartEdit.push(product);
            }
        }
        console.log(cartEdit);  
        renderTableEdit();
    })
}


function renderTableEdit(){
    document.getElementById("products-list-edit").innerHTML="";
    
    for(i=0;i<cartEdit.length;i++){
        console.log(cartEdit[i]);

        if(cartEdit[i].tipProdus==="0"){
            let element = document.createElement("tr");
            element.dataset.index=i;
            element.innerHTML="<td><div onclick='removeProductEdit(\""+i+"\")'><i class='fa-solid fa-xmark'></i></div></td><td>"+(i+1)+"</td><td><textarea name='product-name[]' required  class='product-name-edit' onchange='nameChangeEdit(\""+i+"\")'>"+cartEdit[i].nume+"</textarea></td><td><input type='text' value='"+cartEdit[i].um+"' required name='product-um[]' class='product-um-edit' onchange='umChangeEdit(\""+i+"\")'></td><td><input type='number' required  value='"+cartEdit[i].cantitate+"' min='0' name='product-cant[]' class='product-cant-edit' onchange='cantChangeEdit(\""+i+"\")'></td><td><input type='text' required  value='"+cartEdit[i].pretUnitar+"' name='product-price[]' class='product-price-edit'  onchange='priceChangeEdit(\""+i+"\")'></td><td><input type='text'  value='"+cartEdit[i].valFaraTva+"' name='product-val[]' class='product-val-edit crm-readonly-input' readonly></td><td><input type='text' value='"+cartEdit[i].tva+"' name='product-tva[]' class='product-tva-edit crm-readonly-input' readonly></td>";
            document.getElementById("products-list-edit").appendChild(element);
        }
        else if(cartEdit[i].tipProdus==="1"){
            let element = document.createElement("tr");
            element.dataset.index=i;
            element.innerHTML="<td><div onclick='removeProductEdit(\""+i+"\")'><i class='fa-solid fa-xmark'></i></div></td><td>"+(i+1)+"</td><td style='text-align:left'><textarea hidden required name='product-name[]' class='product-name-edit'>"+cartEdit[i].nume+"</textarea><span>Pachet ADVANCED perioada <input type='date' required value='"+cartEdit[i].per1+"' onchange='updatePer1Edit(\""+i+"\",event)'>-<input type='date' required onchange='updatePer2Edit(\""+i+"\",event)' value='"+cartEdit[i].per2+"'> conform Anexa nr. <input type='number' onchange='updateNrAnexaEdit(\""+i+"\",event)' min='1' required value='"+cartEdit[i].nr+"'> la contractul dintre parti din data de <input onchange='updateContrDateEdit(\""+i+"\",event)' type='date' required value='"+cartEdit[i].data+"'></span></td><td><input type='text' value='"+cartEdit[i].um+"' name='product-um[]' class='product-um-edit' onchange='umChangeEdit(\""+i+"\")'></td><td><input type='number' value='"+cartEdit[i].cantitate+"' min='0' name='product-cant[]' class='product-cant-edit' onchange='cantChangeEdit(\""+i+"\")'></td><td><input type='text'  value='"+cartEdit[i].pretUnitar+"' name='product-price[]' class='product-price-edit'  onchange='priceChangeEdit(\""+i+"\")'></td><td><input type='text'  value='"+cartEdit[i].valFaraTva+"' name='product-val[]' class='product-val-edit crm-readonly-input' readonly></td><td><input type='text' value='"+cartEdit[i].tva+"' name='product-tva[]' class='product-tva-edit crm-readonly-input' readonly></td>";
            document.getElementById("products-list-edit").appendChild(element);
        }
        else if(cartEdit[i].tipProdus==="2"){
            let element = document.createElement("tr");
            element.dataset.index=i;
            element.innerHTML="<td><div onclick='removeProductEdit(\""+i+"\")'><i class='fa-solid fa-xmark'></i></div></td><td>"+(i+1)+"</td><td style='text-align:left'><textarea hidden required name='product-name[]' class='product-name-edit'>"+cartEdit[i].nume+"</textarea><span>Pachet ADVANCED perioada <input type='date' required value='"+cartEdit[i].per1+"' onchange='updatePer1Edit(\""+i+"\",event)'>-<input type='date' required onchange='updatePer2Edit(\""+i+"\",event)' value='"+cartEdit[i].per2+"'> conform Anexa nr. <input type='number' onchange='updateNrAnexaEdit(\""+i+"\",event)' min='1' required value='"+cartEdit[i].nr+"'> la contractul dintre parti din data de <input onchange='updateContrDateEdit(\""+i+"\",event)' type='date' required value='"+cartEdit[i].data+"'></span></td><td><input type='text' value='"+cartEdit[i].um+"' name='product-um[]' class='product-um-edit' onchange='umChangeEdit(\""+i+"\")'></td><td><input type='number' value='"+cartEdit[i].cantitate+"' min='0' name='product-cant[]' class='product-cant-edit' onchange='cantChangeEdit(\""+i+"\")'></td><td><input type='text'  value='"+cartEdit[i].pretUnitar+"' name='product-price[]' class='product-price-edit'  onchange='priceChangeEdit(\""+i+"\")'></td><td><input type='text'  value='"+cartEdit[i].valFaraTva+"' name='product-val[]' class='product-val-edit crm-readonly-input' readonly></td><td><input type='text' value='"+cartEdit[i].tva+"' name='product-tva[]' class='product-tva-edit crm-readonly-input' readonly></td>";
            document.getElementById("products-list-edit").appendChild(element);
        }
        else if(cartEdit[i].tipProdus==="3"){
            let element = document.createElement("tr");
            element.dataset.index=i;
            element.innerHTML="<td><div onclick='removeProductEdit(\""+i+"\")'><i class='fa-solid fa-xmark'></i></div></td><td>"+(i+1)+"</td><td style='text-align:left'><textarea hidden required name='product-name[]' class='product-name-edit'>"+cartEdit[i].nume+"</textarea><span>Pachet ADVANCED perioada <input type='date' required value='"+cartEdit[i].per1+"' onchange='updatePer1Edit(\""+i+"\",event)'>-<input type='date' required onchange='updatePer2Edit(\""+i+"\",event)' value='"+cartEdit[i].per2+"'> conform Anexa nr. <input type='number' onchange='updateNrAnexaEdit(\""+i+"\",event)' min='1' required value='"+cartEdit[i].nr+"'> la contractul dintre parti din data de <input onchange='updateContrDateEdit(\""+i+"\",event)' type='date' required value='"+cartEdit[i].data+"'></span></td><td><input type='text' value='"+cartEdit[i].um+"' name='product-um[]' class='product-um-edit' onchange='umChangeEdit(\""+i+"\")'></td><td><input type='number' value='"+cartEdit[i].cantitate+"' min='0' name='product-cant[]' class='product-cant-edit' onchange='cantChangeEdit(\""+i+"\")'></td><td><input type='text'  value='"+cartEdit[i].pretUnitar+"' name='product-price[]' class='product-price-edit'  onchange='priceChangeEdit(\""+i+"\")'></td><td><input type='text'  value='"+cartEdit[i].valFaraTva+"' name='product-val[]' class='product-val-edit crm-readonly-input' readonly></td><td><input type='text' value='"+cartEdit[i].tva+"' name='product-tva[]' class='product-tva-edit crm-readonly-input' readonly></td>";
            document.getElementById("products-list-edit").appendChild(element);
        }
        
        fetchClassesEdit();

        
    }

    calculateTotalWTvaEdit();
    calculateTotalTvaEdit();
    calculateTotalEdit();
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



function openNewProductsEdit(){
    newProductsContainer = document.getElementById("new-product-container-edit");
    newProductsContainer.style.display="flex";
    
}




let valInputEdit;
let tvaInputEdit;
let pretInputEdit;
let cantInputEdit;
let numeInputEdit;
let umInputEdit;
let vatInputEdit=document.getElementById("edit-proforma-vat");

vatInputEdit.addEventListener("change",e=>{
    e.preventDefault();
    let tva = parseFloat(vatInputEdit.value);
    for(i=0;i<tvaInputEdit.length;i++){
        tvaInputEdit[i].value=(parseFloat(valInputEdit[i].value)*tva/100);
        cartEdit[i].um=umInputEdit[i].value;
        cartEdit[i].nume=numeInputEdit[i].value;
        cartEdit[i].pretUnitar=pretInputEdit[i].value;
        cartEdit[i].cantitate=cantInputEdit[i].value;
        cartEdit[i].tva=tvaInputEdit[i].value;
        cartEdit[i].valFaraTva=valInputEdit[i].value;
    }
    calculateTotalWTvaEdit();
    calculateTotalTvaEdit();
    calculateTotalEdit();
})

function fetchClassesEdit(){
    valInputEdit=document.querySelectorAll(".product-val-edit");
    tvaInputEdit=document.querySelectorAll(".product-tva-edit");
    pretInputEdit=document.querySelectorAll(".product-price-edit");
    cantInputEdit=document.querySelectorAll(".product-cant-edit");
    numeInputEdit=document.querySelectorAll(".product-name-edit");
    umInputEdit=document.querySelectorAll(".product-um-edit");
    // nrCrtInput=document.querySelectorAll(".nr-crt-product");
}

function cantChangeEdit(index){
    valInputEdit[index].value=cantInputEdit[index].value*pretInputEdit[index].value;
    let tva = parseFloat(vatInputEdit.value);
    tvaInputEdit[index].value=(parseFloat(valInputEdit[index].value)*tva/100);
    cartEdit[index].cantitate=cantInputEdit[index].value;
    cartEdit[index].tva=tvaInputEdit[index].value;
    cartEdit[index].valFaraTva=valInputEdit[index].value;
    calculateTotalWTvaEdit();
    calculateTotalTvaEdit();
    calculateTotalEdit();
}

function priceChangeEdit(index){
    valInputEdit[index].value=cantInputEdit[index].value*pretInputEdit[index].value;
    let tva = parseFloat(vatInputEdit.value);
    console.log(tvaInputEdit);
    console.log(valInputEdit[index]);
    tvaInputEdit[index].value=(parseFloat(valInputEdit[index].value)*tva/100);
    cartEdit[index].pretUnitar=pretInputEdit[index].value;
    cartEdit[index].tva=tvaInputEdit[index].value;
    cartEdit[index].valFaraTva=valInputEdit[index].value;
    calculateTotalWTvaEdit();
    calculateTotalTvaEdit();
    calculateTotalEdit();
}
function nameChangeEdit(index){
    console.log(numeInputEdit[index].value);
    cartEdit[index].nume=numeInputEdit[index].value;
}

function updatePer1Edit(index,e){
    let date = new Date();
    let per1Date = new Date(e.target.value);
    
    let date1=new Date(date.setMonth(date.getMonth()-12));
    let date2=new Date(date.setMonth(date.getMonth()+24));
    if(per1Date < date1 || per1Date > date2){
        console.log("inafara intervalului.");
        e.target.style.border="1px solid red";
        failPopUp("Perioada selectata este inafra intervalului de +- 12 luni");
        document.getElementById("submit-edit-proform-btn").setAttribute("disabled","");
    }
    else{
        cartEdit[index].per1=e.target.value;
        e.target.style.border="initial";
        document.getElementById("submit-edit-proform-btn").removeAttribute("disabled");
    }

}

function updatePer2Edit(index,e){
    let date = new Date();
    let per2Date = new Date(e.target.value);
    
    let date1=new Date(date.setMonth(date.getMonth()-12));
    let date2=new Date(date.setMonth(date.getMonth()+24));
    if(per2Date < date1 || per2Date > date2){
        console.log("inafara intervalului.");
        e.target.style.border="1px solid red";
        failPopUp("Perioada selectata este inafra intervalului de +- 12 luni");
        document.getElementById("submit-edit-proform-btn").setAttribute("disabled","");
    }
    else{
        cartEdit[index].per2=e.target.value;
        e.target.style.border="initial";
        document.getElementById("submit-edit-proform-btn").removeAttribute("disabled");

    }
}


function updateNrAnexaEdit(index,e){
    cartEdit[index].nr=e.target.value;
}

function updateContrDateEdit(index,e){
    cartEdit[index].data=e.target.value;
}

function umChangeEdit(index){
    cartEdit[index].um=umInputEdit[index].value;
}

function calculateTotalWTvaEdit(){
    let sum=0;
    for(i=0;i<cartEdit.length;i++){
        sum+=parseFloat(cartEdit[i].valFaraTva);
    }
    document.getElementById("total-fara-tva-edit").value=sum;
}

function calculateTotalTvaEdit(){
    let sum=0;
    for(i=0;i<cartEdit.length;i++){
        sum+=parseFloat(cartEdit[i].tva);
    }
    document.getElementById("total-tva-edit").value=sum.toFixed(2);
}
function calculateTotalEdit(){
    let sum;
    sum = parseFloat(document.getElementById("total-fara-tva-edit").value)+parseFloat(document.getElementById("total-tva-edit").value);
    document.getElementById("total-de-plata-edit").value=sum;
}

function addProductEdit(x,event){
    event.preventDefault();
    let tva = parseFloat(vatInput.value);
    if(x===0){
        let productIndex=cartEdit.length;
        let product = {
            "tip":"0",
            "nume":"",
            "um":"",
            "cantitate":"",
            "pretUnitar":"",
            "valFaraTva":"",
            "tva":"",
            "tipProdus":"0"
        }
        cartEdit.push(product);
        let element = document.createElement("tr");
        element.dataset.index=productIndex;
        element.innerHTML="<td><div onclick='removeProductEdit(\""+productIndex+"\")'><i class='fa-solid fa-xmark'></i></div></td><td>"+(productIndex+1)+"</td><td style='text-align:left'><textarea required name='product-name[]' class='product-name-edit' onchange='nameChangeEdit(\""+productIndex+"\")'></textarea></td><td><input required type='text' name='product-um[]' class='product-um-edit' oninput='umChangeEdit(\""+productIndex+"\")'></td><td><input required type='number' min='0' name='product-cant[]' class='product-cant-edit' oninput='cantChangeEdit(\""+productIndex+"\")'></td><td><input required type='text' name='product-price[]' class='product-price-edit'  oninput='priceChangeEdit(\""+productIndex+"\")'></td><td><input type='text' onchange='calculateTotalWTvaEdit()' name='product-val[]' class='product-val-edit crm-readonly-input' readonly></td><td><input type='text' name='product-tva[]' onchange='calculateTotalTvaEdit()' class='product-tva-edit crm-readonly-input' readonly></td>";
        document.getElementById("products-list-edit").appendChild(element);    }
    else if(x===1){
        let productIndex=cartEdit.length;
        let productTva= ((399*tva)/100);
        let product = {
            "tip":"1",
            "nume":"Pachet START-UP perioada [per1] - [per2] conform Anexa nr. [nr] la contractul dintre parti din data de [data]",
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
        cartEdit.push(product);
        let element = document.createElement("tr");
        element.dataset.index=productIndex;
        element.innerHTML="<td><div onclick='removeProductEdit(\""+productIndex+"\")'><i class='fa-solid fa-xmark'></i></div></td><td>"+(productIndex+1)+"</td><td style='text-align:left'><textarea hidden required name='product-name[]' class='product-name-edit'>Pachet START-UP perioada [per1] - [per2] conform Anexa nr. [nr] la contractul dintre parti din data de [data]</textarea><span>Pachet START-UP perioada <input type='date' onchange='updatePer1Edit(\""+productIndex+"\",event)' required>-<input type='date' onchange='updatePer2Edit(\""+productIndex+"\",event)' required> conform Anexa nr. <input type='number' onchange='updateNrAnexaEdit(\""+productIndex+"\",event)' min='1' required> la contractul dintre parti din data de <input onchange='updateContrDateEdit(\""+productIndex+"\",event)' type='date' required></span></td><td><input type='text' name='product-um[]' required value='buc' class='product-um-edit' oninput='umChangeEdit(\""+productIndex+"\")' required></td><td><input type='number' min='0' required name='product-cant[]' value='1' class='product-cant-edit' oninput='cantChangeEdit(\""+productIndex+"\")'></td><td><input type='text' required name='product-price[]' value='399' class='product-price-edit'  oninput='priceChangeEdit(\""+productIndex+"\")'></td><td><input type='text' name='product-val[]' value='399' class='product-val-edit crm-readonly-input' readonly></td><td><input type='text' name='product-tva[]' value='"+productTva+"' class='product-tva-edit crm-readonly-input' readonly></td>";
        document.getElementById("products-list-edit").appendChild(element);
        
    }
    else if(x===2){
        let productIndex=cartEdit.length;
        let productTva= ((1199*tva)/100);
        let product = {
            "tip":"2",
            "nume":"Pachet OPTIM perioada [per1] - [per2] conform Anexa nr. [nr] la contractul dintre parti din data de [data]",
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
        cartEdit.push(product);
        let element = document.createElement("tr");
        element.dataset.index=productIndex;
        element.innerHTML="<td><div onclick='removeProductEdit(\""+productIndex+"\")'><i class='fa-solid fa-xmark'></i></div></td><td>"+(productIndex+1)+"</td><td style='text-align:left'><textarea hidden required name='product-name[]' class='product-name-edit'>Pachet OPTIM perioada [per1] - [per2] conform Anexa nr. [nr] la contractul dintre parti din data de [data]</textarea><span>Pachet OPTIM perioada <input type='date' onchange='updatePer1Edit(\""+productIndex+"\",event)' required>-<input type='date' onchange='updatePer2Edit(\""+productIndex+"\",event)' required> conform Anexa nr. <input type='number' onchange='updateNrAnexaEdit(\""+productIndex+"\",event)' min='1' required> la contractul dintre parti din data de <input onchange='updateContrDateEdit(\""+productIndex+"\",event)' type='date' required></span></td><td><input type='text' name='product-um[]' required value='buc' class='product-um-edit' oninput='umChangeEdit(\""+productIndex+"\")'></td><td><input type='number' min='0' required name='product-cant[]' value='1' class='product-cant-edit' oninput='cantChangeEdit(\""+productIndex+"\")'></td><td><input type='text' required name='product-price[]' value='1199' class='product-price-edit'  oninput='priceChangeEdit(\""+productIndex+"\")'></td><td><input type='text' name='product-val[]' value='1199' class='product-val-edit crm-readonly-input' readonly></td><td><input type='text' name='product-tva[]' value='"+productTva+"' class='product-tva-edit crm-readonly-input' readonly></td>";
        document.getElementById("products-list-edit").appendChild(element);
    }
    else if(x===3){
        let productIndex=cartEdit.length;
        let productTva= ((1599*tva)/100);
        let product = {
            "tip":"3",
            "nume":"Pachet ADVANCED perioada [per1] - [per2] conform Anexa nr. [nr] la contractul dintre parti din data de [data]",
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
        cartEdit.push(product);
        let element = document.createElement("tr");
        element.dataset.index=productIndex;
        element.innerHTML="<td><div onclick='removeProductEdit(\""+productIndex+"\")'><i class='fa-solid fa-xmark'></i></div></td><td>"+(productIndex+1)+"</td><td style='text-align:left'><textarea hidden required name='product-name[]' class='product-name-edit'>Pachet ADVANCED perioada [per1] - [per2] conform Anexa nr. [nr] la contractul dintre parti din data de [data]</textarea><span>Pachet ADVANCED perioada <input type='date' onchange='updatePer1Edit(\""+productIndex+"\",event)' required>-<input type='date' onchange='updatePer2Edit(\""+productIndex+"\",event)' required> conform Anexa nr. <input type='number' onchange='updateNrAnexaEdit(\""+productIndex+"\",event)' min='1' required> la contractul dintre parti din data de <input onchange='updateContrDateEdit(\""+productIndex+"\",event)' type='date' required></span></td><td><input type='text' name='product-um[]' required value='buc' class='product-um-edit' oninput='umChangeEdit(\""+productIndex+"\")'></td><td><input type='number' min='0' name='product-cant[]' value='1' class='product-cant-edit' required oninput='cantChangeEdit(\""+productIndex+"\")'></td><td><input required type='text' name='product-price[]' value='1599' class='product-price-edit'  oninput='priceChangeEdit(\""+productIndex+"\")'></td><td><input type='text' name='product-val[]' value='1599' class='product-val-edit crm-readonly-input' readonly></td><td><input type='text' name='product-tva[]' value='"+productTva+"' class='product-tva-edit crm-readonly-input' readonly></td>";
        document.getElementById("products-list-edit").appendChild(element);
    }
    calculateTotalWTvaEdit();
    calculateTotalTvaEdit();
    calculateTotalEdit();
    fetchClassesEdit();
}

function removeProductEdit(index){
    cartEdit.splice(index,1);
    calculateTotalWTvaEdit();
    calculateTotalTvaEdit();
    calculateTotalEdit();
    console.log(cartEdit);
    renderTableEdit();
    fetchClassesEdit();

}

let editProformaForm = document.getElementById("crm-generate-proforma-edit");
editProformaForm.addEventListener("submit",e=>{
    startLoading();
    e.preventDefault();
    let clientId= document.getElementById("edit-proforma-client").value;

    document.getElementById("send-proforma-clientId").value=clientId;
    let invoiceNumber = document.getElementById("edit-proforma-invoice-number").value;
    
    document.getElementById("send-proforma-number").value = document.getElementById("edit-proforma-invoice-number").value;
    if(cartEdit.length===0){
        alert("Nu au fost introduse produsele!");
        stopLoading();
        return;
       
    }
    const data = new FormData();
    data.append("fullCart",JSON.stringify(cartEdit));
    for(i=0;i<cartEdit.length;i++){

        if(cartEdit[i].tipProdus!="0"){

            let tmpNume = cartEdit[i].nume;
            tmpNume = tmpNume.replace("[per1]",cartEdit[i].per1);
            tmpNume = tmpNume.replace("[per2]",cartEdit[i].per2);
            tmpNume = tmpNume.replace("[nr]",cartEdit[i].nr);
            tmpNume = tmpNume.replace("[data]",cartEdit[i].data);
            cartEdit[i].nume=tmpNume;
            numeInputEdit[i].innerHTML=cartEdit[i].nume;
            console.log(numeInputEdit[i]);
            console.log(cartEdit[i].nume);
        }
    }
    
    
    console.log(cartEdit);
    for (const p of new FormData(editProformaForm)){
        data.append(p[0],p[1]);
    }

    console.log(data);
    
    fetch("/admin/crm/includes/proforma-edit-generator.php",{
        method: "POST",
        body: data
    }).then(response=>response.json()).then(response=>{
        console.log(response);
        if(response.status==="success"){
            successPopUp("Proforma a fost modificata cu succes!");
            editProformaForm.reset();
            cartEdit=[];
            fetchProforme();
            renderTable();
            setTp();
            closeEditProforma();
            window.open("/clients-resources/"+clientId+"/proforms/"+invoiceNumber+".pdf",'_blank');
        }
        else{
            failPopUp(response.error);
        }
        stopLoading();

    })
})

function deleteProforma(client,proforma){
    startLoading();
    if(confirm("Sigur doresti sa stergi aceasta proforma?\n"+proforma)){
        fetch("/admin/crm/includes/delete-proforma.php?client="+client+"&proforma="+proforma).then(response=>response.json()).then(response=>{
            if(response.status="success"){
                successPopUp("Proforma a fost stearsa cu succes.");
                fetchProforme();
            }
            else{
                failPopUp(response.error);
            }
            stopLoading();
        })
    }
    else{
        stopLoading();
    }
    
}

function searchByEmiter(e){
    console.log(e.target.value);

    emitorValue=e.target.value;
    setListByFilters();

}


function filterTable(){
    let emitor = document.getElementById("emitor-filter").value;
    let status = document.getElementById("status-filter").value;
    let client = document.getElementById("client-filter").value;
    let nrProforma = document.getElementById("number-filter").value;
    let date = document.getElementById("date-filter").value;

    let filterTable =[];
    let filterTable1 =[];
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

    if(status!="all"){
        for(i=0;i<filterTable.length;i++){
            if(filterTable[i].status===status){
                filterTable1.push(filterTable[i]);
            }
        }
    }
    else{
        filterTable1=filterTable;
    }
    




    // console.log(filterTable);
    
    for(i=0;i<filterTable1.length;i++){
        if(filterTable1[i].client.toLowerCase().includes(client.toLowerCase())){
            filterTable2.push(filterTable1[i]);
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


function setContract(){
    document.getElementById("contract-iframe-view").style.display="block";
    document.getElementById("anexa-iframe-view").style.display="none";
}
function setAnexa(){
    document.getElementById("anexa-iframe-view").style.display="block";
    document.getElementById("contract-iframe-view").style.display="none";
}



function openAproveProform(client,proformNumber){

    document.getElementById("aprove-proforma-clientId").value=client;
    document.getElementById("aprove-proforma-number").value=proformNumber;

    document.getElementById("proforma-iframe-view").src="/clients-resources/"+client+"/proforms/"+proformNumber+".pdf";



    fetch("/admin/crm/includes/get-contract-info.php?client="+client+"&proforma="+proformNumber).then(response=>response.json()).then(response=>{
        response=response[0];
        if(response.contractFile!=""){
            document.getElementById("contract-iframe-view").src="/clients-resources/"+client+"/contracts/"+response.contractFile;
        }
        else{
            document.getElementById("contract-iframe-view").src="/error/file-not-found.html";
        }

    });

    fetch("/admin/crm/includes/get-anexa-info.php?client="+client).then(response=>response.json()).then(response=>{
        console.log("anexa",response);

        response = response[0];

        if(response.contractFile != ""){
            document.getElementById("anexa-iframe-view").src = "/clients-resources/"+client+"/contracts/"+response.contractFile;
        }
        else{
            document.getElementById("anexa-iframe-view").src="/error/file-not-found.html";
        }
    })

    let modal=document.getElementById('modal-aprove-proforma');
    document.body.style.overflow="hidden";
    modal.style.display="block";
    setTimeout(()=>{
        modal.style.opacity="1";
    },50);

    // if(confirm("Sigur dorești să aprobi această proforma?")){
    //     fetch("/admin/crm/includes/aprove-proform.php?client="+client+"&proform="+proformNumber).then(response=>response.json()).then(response=>{
    //         if(response.status==="success"){
    //             successPopUp("Proforma a fost aprobata cu succes.");
    //             fetchProforme();
    //         }
    //         else{
    //             failPopUp(response.error);
    //         }
    //     })
    // }
    
}


function denyProforma(){
    let client = document.getElementById("aprove-proforma-clientId").value;
    let proforma = document.getElementById("aprove-proforma-number").value;

    fetch("/admin/crm/includes/deny-proform.php?client="+client+"&proform="+proforma).then(response=>response.json()).then(response=>{
        console.log(response);
        if(response.status==="success"){
            successPopUp("Proforma a fost refuzata cu succes.");
            fetchProforme();
            closeAproveProforma();
        }
        else{
            failPopUp(response.error);
            
        }
    })
}



let aproveProformaFrom = document.getElementById('crm-aprove-proforma-form');
aproveProformaFrom.addEventListener("submit",e=>{
    e.preventDefault();

    let client = document.getElementById("aprove-proforma-clientId").value;
    let proforma = document.getElementById("aprove-proforma-number").value;
    fetch("/admin/crm/includes/aprove-proform.php?client="+client+"&proform="+proforma).then(response=>response.json()).then(response=>{
        if(response.status==="success"){
            successPopUp("Proforma a fost aprobata cu succes.");
            closeAproveProforma();
            fetchProforme();
        }
        else{
            failPopUp(response.error);
        }
    })
})

function closeAproveProforma(){
    let modal=document.getElementById('modal-aprove-proforma');
    document.body.style.overflow="auto";
    modal.style.opacity="0";
    setTimeout(()=>{
        modal.style.display="none";
    },300);
}