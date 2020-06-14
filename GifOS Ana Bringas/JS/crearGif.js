let body = document.getElementsByTagName("body")[0];
let logoDark = document.getElementById("dark_logo");
let logoLight = document.getElementById("light_logo");
let camaraDark =document.getElementById("camaraDark");
let divCrear = document.getElementsByClassName("crearGuifos")[0];
let divGrabar = document.getElementsByClassName("grabarGuifos")[0];
let divVistaPrevia = document.getElementsByClassName("vistaPreviaGuifos")[0];
let btnComenzar = document.getElementById("comenzar");
let btnCancelar = document.getElementById("cancelar");
let btnCancelar1 = document.getElementsByClassName("subiendo-cancelar-boton")[0];
let btnCancelar2 = document.getElementsByClassName("close-img")[0];
let btnCancelar3 = document.getElementsByClassName("close-img2")[0];
let btnCruz = document.getElementsByClassName("close-btn")[0];
let btnCaptura = document.getElementsByClassName("capturar-guifos-botones")[0];
let btnCapturando = document.getElementsByClassName("capturando-btn") [0];
let capturarBtn = document.getElementById("capturar");
let camaraBtn = document.getElementById("camara");
let recordingBtn = document.getElementsByClassName("recording-boton") [0];
let listoBtn = document.getElementsByClassName("capturando-boton") [0];
let btnClose = document.getElementById("close-btn");
let btnRepetir = document.getElementById("repetir");
let tittleGrabar = document.getElementById("tituloEliminar");
let botonVistaSubir = document.getElementById("subir");
let subiendoContenedor = document.getElementsByClassName("contenedor-subiendo-guifos")[0];
let exitoContenedor = document.getElementsByClassName("contenedor-exito-guifos")[0];
let btnCopiar = document.getElementsByClassName("copiar")[0];
let btnDescargar = document.getElementsByClassName("descargar")[0];
let btnListoExito = document.getElementsByClassName("listo")[0];
let divMisGuifos = document.getElementsByClassName ("misGuifos")[0];
let misGuifosBody = document.getElementsByClassName ("misGuifosBody")[0];

ApiKey = "Pv1uU5vLUWR88twySsVZMkoK7mNl9ZLA";


//---------Al empezar -----------//

window.addEventListener('DOMContentLoaded', () => {
  divCrear.style.display = "block";
  divGrabar.style.display = "none";
  divVistaPrevia.style.display = "none";
  divMisGuifos.style.display = "block";
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
      camaraDark.style.display = "block";
      camaraBtn.style.display = "none";
      return;
  }      
});

// --------Comenzar con el gif ------------//
btnComenzar.addEventListener('click',()=> {
  divCrear.style.display = "none";
  divGrabar.style.display = "block";
  divMisGuifos.style.display = "none";
  camaraOn();
});

//-------Para capturar-------//
  
const gif_name = 'gif_' + (Math.random().toString(36).slice(2));
const URL_Upload = 'https://upload.giphy.com/v1/gifs';
const post_body = new FormData();
post_body.append('api_key', ApiKey);

let stream = () => {
  return navigator.mediaDevices.getUserMedia({
    audio:false, 
    video: { width: 830, height: 432 },
  });
};

let video;
let recorder;
let url_gif;
let copy_url_gif;

//--------Activar camara--------//

function camaraOn() {
  video = document.getElementsByClassName('video')[0];
  stream().then((camara) => {
    video.srcObject = camara;
    video.play();
    return video
  });
};

//------- Grabar---------//
function grabar() {
 
  post_body.delete('file');
  video.play();

  navigator.mediaDevices.getUserMedia({
    audio:false, 
    video: { width: 830, height: 432 },
  }).then( (stream) => {

    recorder = RecordRTC( stream, {
      type: 'gif',
    })
    recorder.startRecording();
    recorder.stream = stream;
  })
  
  tittleGrabar.delete;
  tittleGrabar.innerHTML= `<p id="tituloAgregado"><b>Capturando Tu Guifo</b></p>`
}

//--------Frenar grabación-------//

function frenarGrabacion() {

  recorder.stopRecording(() => {
    post_body.append('file', recorder.getBlob(), 'myGif.gif')
  });

  recorder.stream.stop();
  url_gif = URL.createObjectURL(post_body.get('file'));
  

  let contenedorVideo = document.getElementById("videoContenedor");      
  let videoGrabado = document.createElement("img");
  videoGrabado.className = "gifGrabado";
  contenedorVideo.appendChild(videoGrabado);
  videoGrabado.src = url_gif;
}

//---------subir gif------------//
function subirGif() {
  
  fetch(URL_Upload, {
    method: "post",
    body: post_body,
  })
  .then(response => { return response.json() })
  .then((data) => {
  
    if (data['meta'].status == 200) {
      localStorage.setItem(gif_name, data['data'].id);
      
      const imgSubido = document.querySelector('.exito-guifos-contenido img');
      imgSubido.src = URL.createObjectURL(post_body.get('file'));
      copy_url_gif = `https://media.giphy.com/media/${data['data'].id}/giphy.gif`;
  
      subiendoContenedor.style.display = 'none';
      exitoContenedor.style.display = 'block';
  
    }
  })
  .catch((error) => {
    alert(error + '\nHubo un ERROR en la Carga, por favor vuelve a intentarlo!');
  });
}

// ----- COPIAR LINK  -------//

function obtenerLink() {
  let link = document.createElement("input");
  link.setAttribute("value", copy_url_gif);
  document.body.appendChild(link);
  link.select();
  document.execCommand("copy");
  document.body.removeChild(link);
}

//------ Empezar a grabar------//

capturarBtn.addEventListener('click', () => {
  btnCaptura.style.display = 'none';
  btnCapturando.style.display = 'flex';
  grabar();
});

camaraBtn.addEventListener('click', () => {
  btnCaptura.style.display = 'none';
  btnCapturando.style.display = 'flex';
  grabar();
});

//----------Botones parar grabación-------//
  
listoBtn.addEventListener('click', () => {
  divGrabar.style.display = "none";
  divVistaPrevia.style.display = "block";
  frenarGrabacion();
});

recordingBtn.addEventListener('click', () => {
  divGrabar.style.display = "none";
  divVistaPrevia.style.display = "block";
  frenarGrabacion();
});

btnRepetir.addEventListener('click', () => {
  divGrabar.style.display = "block";
  divVistaPrevia.style.display = "none";
  btnCaptura.style.display = 'flex';
  btnCapturando.style.display = 'none';
  gifParaEliminar = document.getElementsByClassName("gifGrabado")[0];
  padre = gifParaEliminar.parentNode;
  padre.removeChild(gifParaEliminar);
  camaraOn();
});

botonVistaSubir.addEventListener('click', () => {
  divVistaPrevia.style.display = 'none';
  subiendoContenedor.style.display = 'block';
  let contenedorGifListo = document.getElementsByClassName("exito-guifos-contenido")[0];      
  let gifListo = document.createElement("img");
  contenedorGifListo.appendChild(gifListo);
  gifListo.src = url_gif;
  subirGif();
});

btnCopiar.addEventListener('click', () => {
  obtenerLink();
  alert('El link fue copiado correctamente')
});

btnDescargar.addEventListener('click', () => {
  btnDescargar.href = url_gif;
  btnDescargar.download = 'gif_subido.gif';
});

btnListoExito.addEventListener('click', () => {
  window.location.assign('./misGuifos.html');
});

//-----------Botones volver a index--------//

logoDark.addEventListener('click', () => {
  window.location.assign('./index.html');
});

logoLight.addEventListener('click', () => {
  window.location.assign('./index.html');
});

btnCancelar.addEventListener('click', () => {
  window.location.assign('./index.html');
});

btnCruz.addEventListener('click', () => {
  window.location.assign('./index.html');
});
btnCancelar1.addEventListener('click', () => {
  window.location.assign('./index.html');
});

btnCancelar2.addEventListener('click', () => {
  window.location.assign('./index.html');
});

btnCancelar3.addEventListener('click', () => {
  window.location.assign('./index.html');
});

//--------------------Traer los Guifs---------------/

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