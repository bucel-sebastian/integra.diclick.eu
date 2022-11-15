let getNotificationsLink="user-includes/get-notifications.php";
let delNotificationLink="user-includes/del-notification.php";

function fetchNotif(){
    fetch(getNotificationsLink).then(response=>response.text()).then(response=>{
        document.getElementById("notification-box").innerHTML=response;
    })
}
fetchNotif();

function delNotif(notifId){
    delNotificationLink="user-includes/del-notification.php?id="+notifId;
    fetch(delNotificationLink).then(response=>response.text()).then(response=>{
        console.log(response);
        fetchNotif();
    })
}