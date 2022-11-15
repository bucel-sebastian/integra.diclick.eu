
fetch("/includes/session.php").then(response => response.json()).then(response => {
    if (response.status==="loggedIn") {
        if(response.tip==="admin"){
            window.location.href = "/admin/";
        }
        else if(response.tip==="client"){
            window.location.href = "/user/";
        }
    }
})