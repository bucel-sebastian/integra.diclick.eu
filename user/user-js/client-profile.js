
let profileData;
let clientProfileLink = "/user/user-includes/client-profile.php";
let passwordMatch = 1;

let editProfileForm = document.getElementById("edit-profile-form");
let editProfileLink = "/user/user-includes/client-edit-profile.php";

resetProfile();

function resetProfile() {
    fetch(clientProfileLink).then(response => response.json()).then(response => {
        
        console.log(response);

        document.getElementById("profile-name").innerHTML = response.name;
        document.getElementById("profile-unicId").innerHTML = response.unicId;
        document.getElementById("profile-username").innerHTML = response.username;
        if(response.image!=""){
            document.getElementById("profile-img").src = "/user/profile/img/"+response.image;
            document.getElementById("edit-profile-prev-img").src= "/user/profile/img/"+response.image;
        }
        else{
            document.getElementById("profile-img").src = "/user/profile/img/placeholder.png";
        }
        
        document.getElementById("profile-funct").innerHTML = response.function;
        document.getElementById("profile-email").innerHTML = response.email;
        // document.getElementById("profile-email").src = "mailto: ";
        document.getElementById("profile-company").innerHTML = response.company;
        document.getElementById("profile-phone").innerHTML = response.phone;
        // document.getElementById("profile-phone").src = "tel: ";
        document.getElementById("edit-client-name").value = response.name;
        document.getElementById("edit-client-funct").value = response.function;
        document.getElementById("edit-client-email").value = response.email;
        document.getElementById("edit-client-company").value = response.company;
        document.getElementById("edit-client-phone").value = response.phone;
        document.getElementById("edit-client-username").value = response.username;
        document.getElementById("edit-client-unicId").value = response.unicId;


      
        
    });
}



// document.getElementById("edit-client-img").addEventListener("change", () => {
//     const [imgPrev] = document.getElementById("edit-client-img").files;
//     if (imgPrev) {
//         document.getElementById("edit-profile-prev-img").src = URL.createObjectURL(imgPrev);
//     }
// });

document.getElementById("edit-client-password").addEventListener("change", () => {
    if (document.getElementById("edit-client-password").value != "") {
        document.getElementById("edit-client-password").setAttribute("required", "");
        document.getElementById("edit-client-password-re").setAttribute("required", "");
    }
    else {
        document.getElementById("edit-client-password").removeAttribute("required", "");
        document.getElementById("edit-client-password-re").removeAttribute("required", "");
        document.getElementById("edit-client-password-re").value = "";
    }

    if (document.getElementById("edit-client-password-re").value != "") {
        passwordMatch = 0;
    }
    else if (document.getElementById("edit-client-password").value != document.getElementById("edit-client-password-re").value) {
        passwordMatch = 0;
    }
    if (document.getElementById("edit-client-password").value === document.getElementById("edit-client-password-re").value) {
        passwordMatch = 1;
    }
});

document.getElementById("edit-client-password-re").addEventListener("change", () => {
    if (document.getElementById("edit-client-password").value != document.getElementById("edit-client-password-re").value) {
        passwordMatch = 0;
    }
    else {
        passwordMatch = 1;
    }
});

editProfileForm.addEventListener("submit", e => {
    e.preventDefault();
    if (passwordMatch === 1) {
        const data = new FormData();

        for (const p of new FormData(editProfileForm)) {
            data.append(p[0], p[1]);
        }

        fetch(editProfileLink, {
            method: "POST", body: data
        }).then(responseEdit => responseEdit.json()).then(responseEdit => {
            if (responseEdit.status === "success") {
                successPopUp();
                setTimeout(() => {
                    resetProfile(); 
                }, 100);
                
            }
            else {
                console.log(responseEdit);
                failPopUp(responseEdit.error);
            }
        })
    }
    else {
        failPopUp("Passwords doesn't match!");
    }



});

function successPopUp() {

    document.getElementById("success-popup").style.display = "block";
    setTimeout(() => {
        document.getElementById("success-popup").style.opacity = "1";
    }, 100);
}

function failPopUp(err) {
    if (err === "used") {
        document.getElementById("error").innerHTML = "This username already exist!";
    }
    else {
        document.getElementById("error").innerHTML = "Try again later!";
    }
    document.getElementById("fail-popup").style.display = "block";
    setTimeout(() => {
        document.getElementById("fail-popup").style.opacity = "1";
    }, 100);
}
let toggleEdit = 0;
function toggleEditProfile() {
    if (toggleEdit === 1) {
        document.getElementById("edit-profile-container").style.transform = "translateY(100%)";
        toggleEdit = 0;
    }
    else {
        document.getElementById("edit-profile-container").style.transform = "translate(0)";
        toggleEdit = 1;
    }

}

let photoChooser = document.getElementById("edit-client-img");

photoChooser.addEventListener("change", e=>{
    e.preventDefault();

    document.getElementById("edit-profile-prev-img").src= URL.createObjectURL(photoChooser.files[0]);
})