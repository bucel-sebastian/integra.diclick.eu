
fetch("/includes/session.php").then(response => response.json()).then(response => {
    console.log(response);
    if (response.status==="loggedIn") {
        if(response.tip==="admin"){
            
        }
        else if(response.tip==="client"){
            window.location.href = "/user/";
        }
    }
    else{
        window.location.href = "/";
    }
})