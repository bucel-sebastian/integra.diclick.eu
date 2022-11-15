function closePopup() {
    document.getElementById("success-popup").style.opacity = "0";
    document.getElementById("fail-popup").style.opacity = "0";
    setTimeout(() => {
        document.getElementById("success-popup").style.display = "none";
        document.getElementById("fail-popup").style.display = "none";
    }, 500);
}