
let getAccountsLink = "../admin-includes/get-accounts.php";
let deleteAccountLink = "../admin-includes/delete-account.php?unicId=";
let editAccountLink = "../admin-includes/edit-account.php";


function resetPage() {
    fetch(getAccountsLink).then(response => response.text()).then(response => {
        document.getElementById("accounts-table-body").innerHTML = response;
    })
}

fetch(getAccountsLink).then(response => response.text()).then(response => {
    document.getElementById("accounts-table-body").innerHTML = response;
})

function sendEditAccount(unicId) {
    let editAccountInfoLink = "../admin-includes/edit-account.php?unicId=";
    editAccountInfoLink += unicId;
    fetch(editAccountInfoLink, {
        method: "GET"
    }).then(response => response.text()).then(response => {
        if (response === "success") {
            resetPage();
            successPopUp();
        }
        else {
            failPopUp(response);
        }
    })
}

function closeEditModal() {

    document.getElementById("edit-account-modal").style.opacity = "0";
    setTimeout(() => {
        document.getElementById("edit-account-modal").style.display = "none";
    }, 300);
}

function editAccount(unicId) {

    let nameInput = document.getElementById("edit-account-name");
    let usernameInput = document.getElementById("edit-account-username");
    let passwordInput = document.getElementById("edit-account-password");
    let unicIdInput = document.getElementById("edit-account-unicId");
    let functionInput = document.getElementById("edit-account-funct");
    let companyInput = document.getElementById("edit-account-company");
    let mailInput = document.getElementById("edit-account-email");
    let phoneInput = document.getElementById("edit-account-phone");
    let gdsInput = document.getElementById("edit-account-gds");
    let fbdsInput = document.getElementById("edit-account-fbds");

    nameInput.value = "";
    usernameInput.value = "";
    passwordInput.value = "";
    unicIdInput.value = "";
    functionInput.value = "";
    companyInput.value = "";
    mailInput.value = "";
    phoneInput.value = "";
    gdsInput.value = "";
    fbdsInput.value = "";

    let getAccountInfoLink = "../admin-includes/get-account-info.php?unicId=";
    getAccountInfoLink += unicId;
    document.getElementById("edit-account-modal").style.display = "flex";
    setTimeout(() => {
        document.getElementById("edit-account-modal").style.opacity = "1";
    }, 100);
    fetch(getAccountInfoLink, {
        method: "GET"
    }).then(response => response.text()).then(response => {
        let accountData = response;
        let col = 1;
        for (const i in accountData) {
            if (accountData[i] === "\n") {
                col++;
            }
            if (col === 1) {
                usernameInput.value += accountData[i];
            }
            if (col === 2) {
                passwordInput.value += accountData[i];
            }
            if (col === 3) {
                unicIdInput.value += accountData[i];
            }
            if (col === 5) {
                nameInput.value += accountData[i];
            }
            if (col === 6) {
                functionInput.value += accountData[i];
            }
            if (col === 7) {
                companyInput.value += accountData[i];
            }
            if (col === 8) {
                mailInput.value += accountData[i];
            }
            if (col === 9) {
                phoneInput.value += accountData[i];
            }
            if (col === 10) {
                gdsInput.value += accountData[i];
            }
            if (col === 11) {
                fbdsInput.value += accountData[i];
            }

        }
    });
}

function deleteAccount(unicId) {
    let deleteAccountLink = "../admin-includes/delete-account.php?unicId=";
    let del = confirm("Are you sure?");
    deleteAccountLink += unicId;
    
    if (del) {
        fetch(deleteAccountLink).then(response => response.text()).then(response => {
            if (response === "success") {
                resetPage();
                successPopUp();
            }
            else {
                console.log(response);
                failPopUp(response);
            }
        })
    }
}






function successPopUp() {

    document.getElementById("success-popup").style.display = "block";
    
    setTimeout(() => {
        document.getElementById("success-popup").style.opacity = "1";
    }, 100);
    setTimeout(()=>{
      closePopup();
    },5000);
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
    setTimeout(()=>{
      closePopup();
    },5000);
  }
  
  function closePopup() {
    document.getElementById("success-popup").style.opacity = "0";
    document.getElementById("fail-popup").style.opacity = "0";
    setTimeout(() => {
        document.getElementById("success-popup").style.display = "none";
        document.getElementById("fail-popup").style.display = "none";
    }, 500);
  }