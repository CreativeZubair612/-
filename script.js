function showMessage(message){
    let box = document.getElementById("customAlert");
    let text = document.getElementById("alertText");

    text.innerText = message;
    box.style.display = "block";

    setTimeout(() => {
        box.style.display = "none";
    }, 3000);
}