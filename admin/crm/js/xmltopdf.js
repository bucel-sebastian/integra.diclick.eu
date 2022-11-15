let xmlList = [];
fetchXmls();

function fetchXmls(){
    fetch("/admin/crm/includes/get-xml.php").then(response=>response.json()).then(response=>{
        xmlList=[];
        for(i=0;i<response.length;i++){
            xmlList.push(response[i]);
        }

        renderTable(xmlList);
    })
}

function renderTable(list){
    document.getElementById("xmlList").innerHTML="";
    for(i=0;i<list.length;i++){
        console.log(list[i]);

        tmpObj= JSON.parse(list[i].xmlData);

        console.log(tmpObj);
        




        document.getElementById("xmlList").innerHTML+="<tr><td>"+(i+1)+"</td><td>"+tmpObj[0].RegistrationName+"</td><td>"+tmpObj[0].IssueDate+"</td><td>"+list[i].data+"</td><td><div class='crm-action-box-btns'><a href='/clients-resources/intern/"+list[i].file+"' title='Vezi factura' class='crm-btn' style='background-color:#3daad6' target='_blank'> <i class='fa-solid fa-eye'></i></a><div title='Sterge factura' style='background-color:#d94e47' class='crm-btn' onclick='deleteXml(\""+list[i].invoiceId+"\")'><i class='fa-solid fa-trash-can'></i></div></div></td></tr>";
    }
}

function deleteXml(id){
    if(confirm("Sigur dorești să ștergi această factura?")){
        fetch("/admin/crm/includes/delete-xml.php?id="+id).then(response=>response.json()).then(response=>{
            if(response.status==="success"){
                fetchXmls();
                successPopUp("Factura a fost ștearsă cu succes.");
            }
            else{
                failPopUp(response.error);
            }
        })
    }
    
}


let xmlToPdfForm = document.getElementById("xmf-file-form");
xmlToPdfForm.addEventListener("submit",e=>{
    e.preventDefault();
    xmlFile = document.getElementById("xmlfile").files[0];
    console.log(xmlFile);

    xmlFileSrc = URL.createObjectURL(xmlFile);
    console.log(xmlFileSrc);
    fetch(xmlFileSrc).then(response=>response.text()).then(response=>{

        parser = new DOMParser();
        xmlDoc = parser.parseFromString(response,"text/xml");

        console.log("dupa xml",xmlDoc);

        x = xmlDoc.getElementsByTagName("cbc:IssueDate")[0];
        y = x.childNodes[0];
        z = y.nodeValue;
        // DueDate = xmlDoc.getElementsByTagName("cbc:DueDate")[0].childNodes[0],
        // TaxCurrencyCode = xmlDoc.getElementsByTagName("cbc:TaxCurrencyCode")[0].childNodes[0],
        // let IssueDate,TaxCurrencyCode,DocumentCurrencyCode,DueDate,aName,aStreetName,aAdditionalStreetName,aCityName,aPostalZone,aCountrySubentity,aCompanyID,aRegistrationName,aCompanyIDJ,bName,bStreetName,bCityName,bPostalZone,bCompanyID,bRegistrationName,bCompanyIDJ;
        let aSide = new Object();
        let bSide = new Object();
        try {
            if(xmlDoc.getElementsByTagName("cbc:ID")[0].childNodes[0]){
                aSide.InvoiceId = xmlDoc.getElementsByTagName("cbc:ID")[0].childNodes[0].nodeValue;
            }
            else{
                aSide.InvoiceId = "";
            }
        } catch (error) {
            console.log(error);
        }
        try {
            if(xmlDoc.getElementsByTagName("cbc:IssueDate")[0].childNodes[0]){
                aSide.IssueDate = xmlDoc.getElementsByTagName("cbc:IssueDate")[0].childNodes[0].nodeValue;
            }
            else{
                aSide.IssueDate="";
            }
        } catch (error) {  
            console.log(error);
        }

        try {
            if(xmlDoc.getElementsByTagName("cbc:DocumentCurrencyCode")[0]){
                aSide.DocumentCurrencyCode = xmlDoc.getElementsByTagName("cbc:DocumentCurrencyCode")[0].childNodes[0].nodeValue;
            }
            else{
                aSide.DocumentCurrencyCode="";
            }
        } catch (error) {  
            console.log(error);
        }

        try {
            if(xmlDoc.getElementsByTagName("cbc:DueDate")[0]){
                aSide.DueDate = xmlDoc.getElementsByTagName("cbc:DueDate")[0].childNodes[0].nodeValue;
            }
            else{
                aSide.DueDate="";
            }
        } catch (error) {  
            console.log(error);
        }

        try {
            if(xmlDoc.getElementsByTagName("cbc:TaxCurrencyCode")[0]){
                aSide.TaxCurrencyCode = xmlDoc.getElementsByTagName("cbc:TaxCurrencyCode")[0].childNodes[0].nodeValue;
            }
            else{
                aSide.TaxCurrencyCode="";
            }
        } catch (error) {  
            console.log(error);
        }

        try {
            if(xmlDoc.getElementsByTagName("cac:AccountingSupplierParty")[0].getElementsByTagName("cbc:Name")[0]){
                aSide.Name = xmlDoc.getElementsByTagName("cac:AccountingSupplierParty")[0].getElementsByTagName("cbc:Name")[0].childNodes[0].nodeValue;
            }
            else{
                aSide.Name="";
            }
        } catch (error) {  
            console.log(error);
        }

        try {
            if(xmlDoc.getElementsByTagName("cac:AccountingSupplierParty")[0].getElementsByTagName("cbc:StreetName")[0]){
                aSide.StreetName = xmlDoc.getElementsByTagName("cac:AccountingSupplierParty")[0].getElementsByTagName("cbc:StreetName")[0].childNodes[0].nodeValue;
            }
            else{
                aSide.StreetName="";
            }
        } catch (error) {  
            console.log(error);
        }
        
        try {
            if(xmlDoc.getElementsByTagName("cac:AccountingSupplierParty")[0].getElementsByTagName("cbc:AdditionalStreetName")[0]){
                aSide.AdditionalStreetName = xmlDoc.getElementsByTagName("cac:AccountingSupplierParty")[0].getElementsByTagName("cbc:AdditionalStreetName")[0].childNodes[0].nodeValue;
            }
            else{
                aSide.AdditionalStreetName="";
            }
        } catch (error) {  
            console.log(error);
        }

        try {
            if(xmlDoc.getElementsByTagName("cac:AccountingSupplierParty")[0].getElementsByTagName("cbc:CityName")[0]){
                aSide.CityName = xmlDoc.getElementsByTagName("cac:AccountingSupplierParty")[0].getElementsByTagName("cbc:CityName")[0].childNodes[0].nodeValue;
            }
            else{
                aSide.CityName="";
            }
        } catch (error) {  
            console.log(error);
        }

        try {
            if(xmlDoc.getElementsByTagName("cac:AccountingSupplierParty")[0].getElementsByTagName("cbc:PostalZone")[0]){
                aSide.PostalZone = xmlDoc.getElementsByTagName("cac:AccountingSupplierParty")[0].getElementsByTagName("cbc:PostalZone")[0].childNodes[0].nodeValue;
            }
            else{
                aSide.PostalZone="";
            }
        } catch (error) {  
            console.log(error);
        }

        try {
            if(xmlDoc.getElementsByTagName("cac:AccountingSupplierParty")[0].getElementsByTagName("cbc:CountrySubentity")[0]){
                aSide.CountrySubentity = xmlDoc.getElementsByTagName("cac:AccountingSupplierParty")[0].getElementsByTagName("cbc:CountrySubentity")[0].childNodes[0].nodeValue;
            }
            else{
                aSide.CountrySubentity="";
            }
        } catch (error) {  
            console.log(error);
        }

        try {
            if(xmlDoc.getElementsByTagName("cac:AccountingSupplierParty")[0].getElementsByTagName("cac:PartyTaxScheme")[0].getElementsByTagName("cbc:CompanyID")[0]){
                aSide.CompanyID = xmlDoc.getElementsByTagName("cac:AccountingSupplierParty")[0].getElementsByTagName("cac:PartyTaxScheme")[0].getElementsByTagName("cbc:CompanyID")[0].childNodes[0].nodeValue;
            }
            else{
                aSide.CompanyID="";
            }
        } catch (error) {  
            console.log(error);
        }


        try {
            if(xmlDoc.getElementsByTagName("cac:AccountingSupplierParty")[0].getElementsByTagName("cbc:RegistrationName")[0]){
                aSide.RegistrationName = xmlDoc.getElementsByTagName("cac:AccountingSupplierParty")[0].getElementsByTagName("cbc:RegistrationName")[0].childNodes[0].nodeValue;
            }
            else{
                aSide.RegistrationName="";
            }
        } catch (error) {  
            console.log(error);
        }

        try {
            if(xmlDoc.getElementsByTagName("cac:AccountingSupplierParty")[0].getElementsByTagName("cac:PartyLegalEntity")[0].getElementsByTagName("cbc:CompanyID")[0]){
                aSide.CompanyIDJ = xmlDoc.getElementsByTagName("cac:AccountingSupplierParty")[0].getElementsByTagName("cac:PartyLegalEntity")[0].getElementsByTagName("cbc:CompanyID")[0].childNodes[0].nodeValue;
            }
            else{
                aSide.CompanyIDJ="";
            }
        } catch (error) {  
            console.log(error);
        }

        try {
            if(xmlDoc.getElementsByTagName("cac:AccountingCustomerParty")[0].getElementsByTagName("cbc:Name")[0]){
                bSide.Name = xmlDoc.getElementsByTagName("cac:AccountingCustomerParty")[0].getElementsByTagName("cbc:Name")[0].childNodes[0].nodeValue;
            }
            else{
                bSide.Name="";
            }
        } catch (error) {  
            console.log(error);
        }


        try {
            if(xmlDoc.getElementsByTagName("cac:AccountingCustomerParty")[0].getElementsByTagName("cbc:StreetName")[0]){
                bSide.StreetName = xmlDoc.getElementsByTagName("cac:AccountingCustomerParty")[0].getElementsByTagName("cbc:StreetName")[0].childNodes[0].nodeValue;
            }
            else{
                bSide.StreetName="";
            }
        } catch (error) {  
            console.log(error);
        }


        try {
            if(xmlDoc.getElementsByTagName("cac:AccountingCustomerParty")[0].getElementsByTagName("cbc:CityName")[0]){
                bSide.CityName = xmlDoc.getElementsByTagName("cac:AccountingCustomerParty")[0].getElementsByTagName("cbc:CityName")[0].childNodes[0].nodeValue;
            }
            else{
                bSide.CityName="";
            }
        } catch (error) {  
            console.log(error);
        }

        try {
            if(xmlDoc.getElementsByTagName("cac:AccountingCustomerParty")[0].getElementsByTagName("cbc:AdditionalStreetName")[0]){
                bSide.AdditionalStreetName = xmlDoc.getElementsByTagName("cac:AccountingCustomerParty")[0].getElementsByTagName("cbc:AdditionalStreetName")[0].childNodes[0].nodeValue;
            }
            else{
                bSide.AdditionalStreetName="";
            }
        } catch (error) {  
            console.log(error);
        }

        try {
            if(xmlDoc.getElementsByTagName("cac:AccountingCustomerParty")[0].getElementsByTagName("cbc:PostalZone")[0]){
                bSide.PostalZone = xmlDoc.getElementsByTagName("cac:AccountingCustomerParty")[0].getElementsByTagName("cbc:PostalZone")[0].childNodes[0].nodeValue;
            }
            else{
                bSide.PostalZone="";
            }
        } catch (error) {  
            console.log(error);
        }

        try {
            if(xmlDoc.getElementsByTagName("cac:AccountingCustomerParty")[0].getElementsByTagName("cbc:CompanyID")[0]){
                bSide.CompanyID = xmlDoc.getElementsByTagName("cac:AccountingCustomerParty")[0].getElementsByTagName("cbc:CompanyID")[0].childNodes[0].nodeValue;
            }
            else{
                bSide.CompanyID="";
            }
        } catch (error) {  
            console.log(error);
        }

        try {
            if(xmlDoc.getElementsByTagName("cac:AccountingCustomerParty")[0].getElementsByTagName("cbc:RegistrationName")[0]){
                bSide.RegistrationName = xmlDoc.getElementsByTagName("cac:AccountingCustomerParty")[0].getElementsByTagName("cbc:RegistrationName")[0].childNodes[0].nodeValue;
            }
            else{
                bSide.RegistrationName="";
            }
    
        } catch (error) {  
            console.log(error);
        }

        try {
            if(xmlDoc.getElementsByTagName("cac:AccountingCustomerParty")[0].getElementsByTagName("cac:PartyLegalEntity")[0].getElementsByTagName("cbc:CompanyID")[0]){
                bSide.CompanyIDJ = xmlDoc.getElementsByTagName("cac:AccountingCustomerParty")[0].getElementsByTagName("cac:PartyLegalEntity")[0].getElementsByTagName("cbc:CompanyID")[0].childNodes[0].nodeValue;
            }
            else{
                bSide.CompanyIDJ="";
            }
        } catch (error) {  
            console.log(error);
        }

    

        aSideJson = JSON.stringify(aSide);
        bSideJson = JSON.stringify(bSide);

        aSideJson = JSON.parse(aSideJson);
        bSideJson = JSON.parse(bSideJson);

        console.log(aSideJson);
        console.log(bSideJson);


        let products = [];

        let productLines = xmlDoc.getElementsByTagName("cac:InvoiceLine");
        for(i=0;i<productLines.length;i++){
            // console.log(productLines[i]);
            let tmpProduct = new Object();
        
            tmpProduct.id = productLines[i].getElementsByTagName("cbc:ID")[0].childNodes[0].nodeValue;
            tmpProduct.quantity = productLines[i].getElementsByTagName("cbc:InvoicedQuantity")[0].childNodes[0].nodeValue;
            tmpProduct.price = productLines[i].getElementsByTagName("cbc:PriceAmount")[0].childNodes[0].nodeValue;
            tmpProduct.name = productLines[i].getElementsByTagName("cbc:Name")[0].childNodes[0].nodeValue;
            if(productLines[i].getElementsByTagName("cbc:Description")[0]){
                tmpProduct.desc = productLines[i].getElementsByTagName("cbc:Description")[0].childNodes[0].nodeValue;
            }
            
            tmpProduct.tva = productLines[i].getElementsByTagName("cac:ClassifiedTaxCategory")[0].getElementsByTagName("cbc:Percent")[0].childNodes[0].nodeValue;

            tmpStringProduct = JSON.stringify(tmpProduct);
            tmpParseProduct = JSON.parse(tmpStringProduct);

            products.push(tmpParseProduct);
            // console.log(tmpParseProduct);
        }

        products = JSON.stringify(products);
        productsJson = JSON.parse(products);
        // console.log(JSON.parse(products));

        let xmlData = [];
        xmlData.push(aSideJson);
        xmlData.push(bSideJson);
        xmlData.push(productsJson);
        xmlDataJson = JSON.stringify(xmlData);
        console.log(JSON.parse(xmlDataJson));
        xmlDataJson = JSON.parse(xmlDataJson);

        postData = new FormData();
        postData.append("xmlData",JSON.stringify(xmlDataJson));
        
        fetch("/admin/crm/includes/xmltopdf.php",{
            method:"POST",
            body:postData
        }).then(response=>response.json()).then(response=>{
            console.log(response);

            if(response.status==="success"){

            }
            else{
                failPopUp(response.error);
                if(response.file){
                    window.open("/clients-resources/intern/"+response.file,'_blank').focus();
                }
            }

            fetchXmls();


            let aSideData = xmlDataJson[0];
            let bSideData = xmlDataJson[1];

            document.getElementById("aSide").innerHTML="<p>"+aSideData.RegistrationName+"<br>Nr. Reg. Comertului: "+aSideData.CompanyIDJ+"<br>Cod fiscal: "+aSideData.CompanyID+"<br>Adresa: "+aSideData.StreetName+" "+aSideData.AdditionalStreetName+", "+aSideData.CityName+"<br></p>";
            document.getElementById("bSide").innerHTML="<p>"+bSideData.RegistrationName+"<br>Nr. Reg. Comertului: "+bSideData.CompanyIDJ+"<br>Cod fiscal: "+bSideData.CompanyID+"<br>Adresa: "+bSideData.StreetName+" "+bSideData.AdditionalStreetName+", "+bSideData.CityName+"<br></p>";
            document.getElementById("invoiceData").innerHTML="<p>Data facturii: "+aSideData.IssueDate+"<br>Numar factura: "+aSideData.InvoiceId+"<br></p>";

            let productList = xmlDataJson[2];
            console.log(productList);
            document.getElementById("productList").innerHTML="";
            let sum = 0;
            for(i=0;i<productList.length;i++){
                console.log(productList[i]);
                document.getElementById("productList").innerHTML+="<tr> <td > "+productList[i].id+" </td> <td> "+productList[i].name+" </td> <td> "+productList[i].price+" </td> <td> "+productList[i].quantity+" </td> <td> "+((parseFloat(productList[i].price)*parseFloat(productList[i].tva))/100)+" </td> <td> "+(((parseFloat(productList[i].price)*parseFloat(productList[i].tva))/100)+parseFloat(productList[i].price))*parseFloat(productList[i].quantity)+" </td> </tr>";

                // console.log((((parseFloat(productList[i].price)*parseFloat(productList[i].tva))/100)+parseFloat(productList[i].price))*parseFloat(productList[i].quantity));
                // console.log((((productList[i].price*productList[i].tva)/100)+productList[i].price)*productList[i].quantity);
                sum+=(((parseFloat(productList[i].price)*parseFloat(productList[i].tva))/100)+parseFloat(productList[i].price))*parseFloat(productList[i].quantity);
            }
            document.getElementById("totalSum").innerHTML="<p>Total de plată: "+sum+"</p>"
        })
        // console.log(products);

        // console.log(productLines);

        // console.log(IssueDate,DueDate,DocumentCurrencyCode,TaxCurrencyCode,aName,aStreetName,aAdditionalStreetName,aCityName,aPostalZone,aCountrySubentity,aCompanyID,aRegistrationName,aCompanyIDJ);
        // console.log(bName,bStreetName,bCityName,bPostalZone,bCompanyID,bRegistrationName,bCompanyIDJ);
    });
});


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
