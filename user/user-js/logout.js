
let logoutLink = "/user/user-includes/logout.php";

function logoutFunction() {
    fetch(logoutLink).then(response => response.text()).then(response => { console.log(response); window.location.replace("/"); })
}