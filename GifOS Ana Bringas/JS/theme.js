let themeMenu = document.getElementsByClassName("menu_dropdown")[0];
let body = document.getElementsByTagName("body") [0];
let logoDark = document.getElementById("dark_logo");
let logoLight = document.getElementById("light_logo");
let botones = document.getElementsByClassName("btn");
let misGuifos = document.getElementsByClassName("mis-guifos") [0];
let theme = document.getElementsByClassName("theme");
let crearBtn = document.getElementById("Crear");
lupaGrisClara = document.getElementsByClassName('lupa-inactiva-light')[0];
lupaGrisOscura = document.getElementsByClassName("lupa-inactiva-dark")[0];

//------------Botones--------------------
crearBtn.addEventListener('click', () => {
    window.location.assign('./crearGif.html');
  });

misGuifos.addEventListener('click', () => {
    window.location.assign('./misGuifos.html');
  });
//----------- Al inicio-------------------
function onLoad () {
        if (localStorage.getItem("dark") == "true") {

        body.className = "dark-fondo";
        logoDark.style.display = "block";
        logoLight.style.display = "none";
        lupaGrisOscura.style.display = "block";
        lupaGrisClara.style.display ="none";
        return;
        } 

        if (localStorage.contador){
            localStorage.contador = Number(localStorage.contador)+1;
        }else {
            localStorage.setItem("contador",1);
        }
        let bienvenida = document.getElementById("principal");
        bienvenida.innerHTML = `
        <p>¡Bienvenidos/as a Guifos.com! ——————Donde los gifs están.////// Número de visitas: ${localStorage.contador}</p>`
}

function mostrarMenu() {
    if (themeMenu.style.display =="") {
        themeMenu.style.display ="flex"
    } else if (themeMenu.style.display == "flex") {
        themeMenu.style.display = "";
    }
}

//-------- temas-------------//

function darkTheme(){

    body.classList = "dark-fondo";

    logoDark.style.display = "block";
    logoLight.style.display = "none";
    lupaGrisOscura.style.display = "block";
    lupaGrisClara.style.display ="none";
    localStorage.setItem("dark",true);
}     
           
function lightTheme () {

    body.classList = "light-fondo";
    logoDark.style.display = "none";
    logoLight.style.display = "block";
    lupaGrisOscura.style.display = "none";
    lupaGrisClara.style.display ="block";
    localStorage.setItem("dark",false);
}

onLoad ()


  