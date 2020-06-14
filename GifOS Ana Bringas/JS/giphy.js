const ApiKey = "Pv1uU5vLUWR88twySsVZMkoK7mNl9ZLA";

let divContentSuggest = document.getElementsByClassName("sug_content")[0];
let searchContent = document.getElementsByClassName("busqueda_content")[0];
let btn_busqueda = document.getElementById("btn_search");
let divRandom = document.getElementsByClassName("random-content")[0];
let busqueda = document.getElementsByClassName("search")[0];
let lupaBlanca = document.getElementsByClassName('lupa-blanca')[0];
let lupaNegra = document.getElementsByClassName("lupa")[0];
const lupaGrisClara = document.getElementsByClassName('lupa-inactiva-light')[0];
const lupaGrisOscura = document.getElementsByClassName("lupa-inactiva-dark")[0];
let resultadoDisplay = document.getElementsByClassName("contenedor-resultado-sugerencias")[0];
let TagContent = document.getElementsByClassName("contenedor-tags")[0];
let buttonTag = document.querySelectorAll(".tag");



//--------- Sugerencias----------------------------//
function randomSuggest(){

    var randomArray = ["heroe","minnions","laugh","simpsons"];

    randomArray.forEach(element => {
        fetch(`https://api.giphy.com/v1/gifs/search?q=${element}&api_key=${ApiKey}&limit=1`)
        .then(function(response){
            return response.json();
        }).then(function(random) {
            arrayResults = random.data;
            //console.log(arrayResults);
            
            for(let i = 0; i< arrayResults.length; i++) {
              
              divContentSuggest.innerHTML += `
                  <div class="sug_content_gif">
                      <div class="sug_content_gif_header">
                          <p class="sug_content_gif_header_text">#${arrayResults[i].title}</p>
                          <img class="x-btn" src="./assets/button3.svg" alt="">
                      </div>
                      <img src="${arrayResults[i].images.original.url}" class="sugerenciaGif" alt="">
                      <button class="verMas-btn">Ver más...</button>
                  </div>`;        
            }
                  
            //------------Ver mas Botón------------------------------------//
            
            verMas_btn = document.getElementsByClassName("verMas-btn");
            
            sugTittle = document.getElementsByClassName("sug_content_gif_header_text");
            
            
            for (let i = 0; i< verMas_btn.length; i++) {
              
              verMas_btn[i].addEventListener ('click', () => {
            
                sugTittleText = sugTittle[i].textContent; 
                busqueda.value = sugTittleText.substr(1);
                console.log(busqueda.value);
                searchResults()
              })
            }
        });
    });
    
    fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${ApiKey}&limit=25`)
    .then(x=>{
      return x.json();
      }).then(random=> {
      busquedaRandom = random.data;
      //console.log(busquedaRandom);
      divRandom.innerHTML = "";
      for( i=0; i < busquedaRandom.length; i++){
      divRandom.innerHTML+= `
            <div class="contentRandom">
                <img src="${busquedaRandom[i].images.original.url}" class="randomGif" alt="">
                <div class="ran_content_gif_header">
                    <p class="ran_content_gif_header_text">#${busquedaRandom[i].title}</p>
                </div>
            </div>`;
      }
      });

    searchContent.style.display ="none";
    divRandom.style.display = "grid";
    let divSuggest = document.getElementsByClassName("tercera") [0];
    divSuggest.style.display = "grid";
}

randomSuggest()

//----------------------Busqueda Gif------------------------------------//

function searchResults(){
    
    let searchValue = busqueda.value.toLowerCase().trim();
    searchContent.style.display = "grid";
    TagContent.style.display = "block";

    fetch(`https://api.giphy.com/v1/gifs/search?q=${searchValue}&api_key=${ApiKey}`)
    .then(function(response){
        return response.json();
    })
    .then(data=> {
        resultado = data.data;
        let divSuggest = document.getElementsByClassName("tercera") [0];
        divSuggest.style.display = "none";
        divRandom.style.display = "none";
        busqueda.value = '';
        btn_busqueda.classList = 'search_btn';
        let content = document.getElementById("titulo-busqueda");
        content.innerHTML =`
        <p id = "tittle-search">${searchValue} (resultados)</p>`
    
        return resultado
        console.log(resultado);
    })
    .then( element => {
        searchContent.innerHTML= "";
        for( i=0; i < element.length; i++){
            searchContent.innerHTML+= `
                <div class="contentSearch">
                    <img src="${element[i].images.original.url}" class="searchGif" alt="">
                    <div class="res_content_gif_header">
                        <p class="res_content_gif_header_text">#${element[i].title}</p>
                    </div>
                    
                </div>`;
        }
        const arrayTags = element;
        
        for (let i = 0; i < 3; i++) {
          buttonTag[i].innerHTML = arrayTags[i].title;
          buttonTag[i].addEventListener('click', () => {
            busqueda.value = arrayTags[i].title;
            searchResults();
            setTimeout(function () {
              lupaInactiva();
              btn_busqueda.className = 'search_btn';
              ocultar();
            }, 100)
          })
        }

        let gif = document.getElementsByClassName("contentSearch");
        return gif
    })
}

function backHome () {
    searchContent.style.display ="none";
    divRandom.style.display = "grid";
    let divSuggest = document.getElementsByClassName("tercera") [0];
    divSuggest.style.display = "grid";
    TagContent.style.display = "none";
    ocultar();
    let content = document.getElementById("titulo-busqueda");
    content.innerHTML =`
    <p id = "tendencias">Tendencias: </p>`
}
//--------------Botones------------------------/

busqueda.addEventListener("keyup", (e) => {
    if (e.keyCode === 13 && busqueda.value !== '') {
      searchResults();
      ocultar();
    }
  });
  btn_busqueda.addEventListener("click", () => {
    if (busqueda.value !== '') {
      searchResults();
      ocultar();
      lupaInactiva();
      btn_busqueda.className = 'search_btn';
    }
  });
  busqueda.addEventListener("keyup", (e) => {
    if (e.keyCode === 27) {
      ocultar();
    }
  });
  function ocultar() {
    resultadoDisplay.style.display = 'none';
    busqueda.value = '';
  }

//----------------Lupa-----------------------/

function lupaInactiva() {
    const tema = localStorage.getItem('dark');
    if (tema == "false") {
      lupaGrisClara.style.display = 'block';
      lupaGrisOscura.style.display = 'none';
      lupaNegra.style.display = 'none';
      lupaBlanca.style.display = 'none';
    } else {
      lupaGrisOscura.style.display = 'block';
      lupaGrisClara.style.display = 'none';
      lupaBlanca.style.display = 'none';
      lupaNegra.style.display = 'none';
    }
  }
  
  function lupaActiva() {
    const tema = localStorage.getItem('dark');
    if (tema === "false") {
      lupaBlanca.style.display = 'none';
      lupaNegra.style.display = 'block';
      lupaGrisOscura.style.display = 'none';
      lupaGrisClara.style.display = 'none';
    } else {
      lupaNegra.style.display = 'none';
      lupaBlanca.style.display = 'block';
      lupaGrisOscura.style.display = 'none';
      lupaGrisClara.style.display = 'none';
    }
  }

  //----------------Autocompletar---------------------
  busqueda.addEventListener('keyup', () => {
    if (busqueda.value === '') {
      lupaInactiva();
      resultadoDisplay.style.display = 'none';
      btn_busqueda.className = 'search_btn';
    } else {
      btn_busqueda.className = 'buscar-boton-color';
      lupaActiva();
      resultadoDisplay.style.display = 'block';
      const limite = 3;
      const URL_AUTOCOMPLETE = `https://api.giphy.com/v1/gifs/search/tags?api_key=${ApiKey}&q=${busqueda.value}&limit=${limite}`
      const buttonSugerencias = document.querySelectorAll('.boton-sugerencias');
  
      fetch(URL_AUTOCOMPLETE)
        .then(response => response.json())
        .then(elem => {
  
          const arrayResultados = elem.data;
  
          for (let i = 0; i < arrayResultados.length; i++) {
            buttonSugerencias[i].innerHTML = arrayResultados[i].name;
            buttonSugerencias[i].addEventListener('click', () => {
              busqueda.value = elem.data[i].name;
              searchResults();
              setTimeout(function () {
                lupaInactiva();
                btn_busqueda.className = 'search_btn';
                ocultar();
              }, 100)
            })
          }
        }).catch(err => console.log(err));
    };
  });


