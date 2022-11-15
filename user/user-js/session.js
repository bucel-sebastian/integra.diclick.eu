
fetch("/includes/session.php").then(response => response.json()).then(response => {
    console.log(response);
    if (response.status==="loggedIn") {
        if(response.tip==="admin"){
            window.location.href = "/admin/";
            
        }
        else if(response.tip==="client"){
        }
    }
    else{
        window.location.href = "/";
    }
})