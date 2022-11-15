let getNotificationsLink="admin-includes/get-notifications.php";
let delNotificationLink="admin-includes/del-notification.php";

let colors=["#eb4034","#93eb34","#3474eb","#9634eb","#ebba34","#34eb96"];


function fetchNotif(){
    fetch(getNotificationsLink).then(response=>response.json()).then(response=>{
        console.log(response);
        document.getElementById("notification-box").innerHTML="";
        for(i=1;i<response.length;i++){
            console.log(i);
            let randomColor = Math.floor(Math.random() * colors.length);
            console.log(randomColor);
            let randomWidth = Math.floor(Math.random()*200)+500;
            document.getElementById("notification-box").innerHTML+="<div class='notif-container' style='width:"+randomWidth+"px;background-color:"+colors[randomColor]+"'><div class='notif-left'><h3>Client - "+response[i].client+"</h3><span>Notification date - "+response[i].date+"</span><p>"+response[i].text+"</p></div><div class='notif-right'><div class='btns-box' onclick='delNotif("+response[i].id+")'><i class='fas fa-times'></i></div></div></div>";
        }
    })
}
fetchNotif();

function delNotif(notifId){
    delNotificationLink="admin-includes/del-notification.php?id="+notifId;
    fetch(delNotificationLink).then(response=>response.text()).then(response=>{
        console.log(response);
        fetchNotif();
    })
}