let setLogoSvg="/user/user-includes/get-client-at.php";

fetch(setLogoSvg).then(response=>response.json()).then(response=>{
    console.log(response);
    
    if(document.getElementById("user-name")){
        document.getElementById("user-name").innerText=response.name;
    }
    if(document.getElementById("user-profile-img")){
        document.getElementById("user-profile-img").src= "/user/profile/img/"+response.image;
    }
});