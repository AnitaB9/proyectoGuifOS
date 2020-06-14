let themeMenu = document.getElementsByClassName("menu_dropdown")[0];
let body = document.getElementsByTagName("body") [0];
let logoDark = document.getElementById("dark_logo");
let logoLight = document.getElementById("light_logo");
let botones = document.getElementsByClassName("btn");
let misGuifos = document.getElementsByClassName("mis-guifos") [0];
let theme = document.getElementsByClassName("theme");
let crearBtn = document.getElementById("Crear");
let divMisGuifos = document.getElementsByClassName ("misGuifos")[0];
let misGuifosBody = document.getElementsByClassName ("misGuifosBody")[0];

function onLoad () {

    traerMisGuifos();
    
    if (localStorage.contador){
        localStorage.contador = Number(localStorage.contador)+1;
    }else {
        localStorage.setItem("contador",1);
    }
    let bienvenida = document.getElementById("principal");
    bienvenida.innerHTML = `
    <p>¡Bienvenidos/as a Guifos.com! ——————Donde los gifs están.////// Número de visitas: ${localStorage.contador}</p>`

    if (localStorage.getItem("dark") == "true") {

    body.className = "dark-fondo";
    logoDark.style.display = "block";
    logoLight.style.display = "none";
    return;
    } 

}

//-------------------Botones--------------------//
crearBtn.addEventListener('click', () => {
    window.location.assign('./crearGif.html');
  });

misGuifos.addEventListener('click', () => {
    window.location.assign('./misGuifos.html');
  });

  function mostrarMenu() {
    if (themeMenu.style.display =="") {
        themeMenu.style.display ="flex"
    } else if (themeMenu.style.display == "flex") {
        themeMenu.style.display = "";
    }
}

logoDark.addEventListener('click', () => {
    window.location.assign('./index.html');
  });
  
  logoLight.addEventListener('click', () => {
    window.location.assign('./index.html');
  });
  

//-------- temas-------------//

function darkTheme(){

    body.classList = "dark-fondo";

    logoDark.style.display = "block";
    logoLight.style.display = "none";
    localStorage.setItem("dark",true);
}     
           
function lightTheme () {

    body.classList = "light-fondo";
    logoDark.style.display = "none";
    logoLight.style.display = "block";
    localStorage.setItem("dark",false);
}

onLoad ()

//------------------Traer Gifs------------/

function traerMisGuifos() {
  
  
    Object.keys(localStorage).forEach((key) => {
        if (key != 'dark' && key != 'contenedor') {
          misGuifosBody.innerHTML+= `
                <div class="misGuifosContent">
                    <img src="https://media.giphy.com/media/${localStorage.getItem(key)}/giphy.gif" class="misGifImg" alt="">
                </div>`;  
        }
    });
  }