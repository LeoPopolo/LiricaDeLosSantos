var showOptions = true;
var showAbout = false;
var showSocial = false;
var showInscription = false;
var loading = false;
var btnBack;

window.onload = async function () {
    let about = document.getElementById("option_about");
    let social = document.getElementById("option_social");
    let inscription = document.getElementById("option_inscription");
    let fileButton = document.getElementById("file-button");
    let fileInput = document.getElementById("file-input");
    let sendButton = document.getElementById("send-button");
    let photoTitle = document.getElementById("photo-title");
    
    let image = null;
    
    btnBack = document.getElementById("btn-back");

    about.addEventListener('click', ()=>{
        showOptions = false;
        showAbout = true;
        showSocial = false;
        showInscription = false;
        toggleOptionsDiv();
    });

    social.addEventListener('click', ()=>{
        showOptions = false;
        showAbout = false;
        showSocial = true;
        showInscription = false;
        toggleOptionsDiv();
    });

    inscription.addEventListener('click', ()=>{
        showOptions = false;
        showAbout = false;
        showSocial = false;
        showInscription = true;
        toggleOptionsDiv();
    });

    btnBack.addEventListener('click', ()=>{
        showOptions = true;
        showAbout = false;
        showSocial = false;
        showInscription = false;

        toggleOptionsDiv();
    });

    fileButton.addEventListener('click', ()=>{
        fileInput.click();        
    });

    fileInput.addEventListener('change', async data => {
        image = data.target.files[0];
        photoTitle.innerHTML = data.target.files[0].name;
    });

    sendButton.addEventListener('click', async ()=>{
        if (!loading) {
            await sendData(image);
        }
    });
}

async function sendData(data) {
    let spinner = document.getElementById('spinner');
    let dataOk = false;
    loading = true;

    let body = {
        file: data,
        name: document.getElementById('input-name').value, 
        artisticName: document.getElementById('input-artistic-name').value, 
        church: document.getElementById('input-church').value, 
        leader: document.getElementById('input-leader').value, 
        age: document.getElementById('input-age').value, 
        phone: document.getElementById('input-phone').value, 
        socialNetwork: document.getElementById('input-social').value
    }

    if (!validForm(body)) {
        return;
    }

    spinner.style.display = "inline-block";

    var formData = new FormData();
    formData.append('file', body.file);
    formData.append('name', body.name);
    formData.append('artisticName', body.artisticName);
    formData.append('church', body.church);
    formData.append('leader', body.leader);
    formData.append('age', body.age);
    formData.append('phone', body.phone);
    formData.append('social', body.socialNetwork);

    await fetch('https://lds.onrender.com/api/email', {
        method: "POST",
        body: formData,
    })
    .then(response => response.json())
    .then(() => {
        dataOk = true;
    })
    .catch(error => console.log(error));

    if (dataOk) {
        spinner.style.display = "none";
        alert("Inscripción realizada con éxito");
        showOptions = true;
        showAbout = false;
        showSocial = false;
        showInscription = false;
        loading = false;
        toggleOptionsDiv();
    } else {
        spinner.style.display = "none";
        loading = false;
        alert("Error al enviar el formulario");
    }
}

function validForm(data) {
    if (!data.name || data.name === "" ||
        !data.artisticName || data.artisticName === "" ||
        !data.church || data.church === "" ||
        !data.leader || data.leader === "" ||
        !data.age || data.age === "" ||
        !data.phone || data.phone === "" ||
        !data.socialNetwork || data.socialNetwork === "") {
            
        alert("Falta completar campos necesarios.");
        return false;
    } else if (!data.file) {
        alert("La imagen es obligatoria.");
        return false;
    } else {
        return true;
    }
}

function toggleOptionsDiv() {
    let options = document.getElementById("options");

    if (showOptions) {

        toggleAboutDiv(false);
    
        toggleSocialDiv(false);
    
        toggleInscriptionDiv(false);

        setTimeout(()=>{
            options.style.left = "0";
            btnBack.style.visibility = "hidden";
        }, 300);

    } else {
        options.style.left = "-100vw";

        setTimeout(()=>{
            if (showAbout) {
                toggleAboutDiv(true);
            } else if (showSocial) {
                toggleSocialDiv(true);
            } else if (showInscription) {
                toggleInscriptionDiv(true);
            }
            btnBack.style.visibility = "visible";
        }, 300);

    }

}

function toggleAboutDiv(show) {
    let about = document.getElementById("about");

    if (show) {
        about.style.transitionTimingFunction = "ease-in";
        about.style.left = "0";
    } else {
        about.style.transitionTimingFunction = "ease-out";
        about.style.left = "-100vw";
    }
}

function toggleSocialDiv(show) {
    let social = document.getElementById("social");

    if (show) {
        social.style.transitionTimingFunction = "ease-in";
        social.style.left = "0";
    } else {
        social.style.transitionTimingFunction = "ease-out";
        social.style.left = "-100vw";
    }
}

function toggleInscriptionDiv(show) {
    let inscription = document.getElementById("inscription");

    if (show) {
        inscription.style.transitionTimingFunction = "ease-in";
        inscription.style.left = "0";
    } else {
        inscription.style.transitionTimingFunction = "ease-out";
        inscription.style.left = "-100vw";
    }
}