var juego = document.querySelector("#jugarb");
var palabra="";
var seguro = false;
getpalabra(seguro);

function getpalabra(control) {
    
    seguro = control;

    var tildez = ["á","é","í","ó","ú"];
    var normal = ["a","e","i","o","u"];

    const url='https://palabras-aleatorias-public-api.herokuapp.com/random';
    const Http = new XMLHttpRequest();
    Http.open("GET", url);

    Http.send();

    Http.onreadystatechange = (e) => {
        if (Http.readyState == 4 && Http.status == 200) {
            datos=JSON.parse(Http.responseText);
            palabra=datos.body.Word;
            palabra=palabra.split(''); 
           
            palabra.forEach(function(word, indices){
              
                if(tildez.findIndex( (element) => element == word ) != -1) {
                    var indice =tildez.findIndex( (element) => element == word);
                  
                    palabra[indices]=normal[indice];
                }
            });
            var newpalabra="";
            palabra.forEach(element => {
                newpalabra+=element;
            });
            palabra=newpalabra;
            controljuego(false,palabra);
          
            }
        }
}


function colocarlineas(cajapalabras) {
    if(seguro){
        while (cajapalabras.firstChild) {
            cajapalabras.removeChild(cajapalabras.firstChild);
        }
        setTimeout(function(){
           /* por alguna razon no funciona 
            palabra.forEach(element => {
                if(element!="" && element!=" "){
                    var linea = document.createElement('li');
                    linea.classList.add('linea');
                    linea.classList.add('slide-in-right');
                    linea.id = element;
                    cajapalabras.appendChild(linea);
                }
                
            });
            */
           for (let index = 0; index < palabra.length; index++) {
            const element = palabra[index];
            if(element!="" && element!=" "){
                var linea = document.createElement('li');
                linea.classList.add('linea');
                linea.classList.add('slide-in-right');
                linea.id = element.toUpperCase();
             
                cajapalabras.appendChild(linea);
            }
           }
    },2000);
       
    }else{
        palabra.forEach(element => {
            if(element!="" && element!=" "){
                var linea = document.createElement('li');
                linea.classList.add('linea');
                linea.classList.add('slide-in-right');
                linea.id = element;
                cajapalabras.appendChild(linea);
            }
            
        });
    }
}
 
juego.addEventListener("click", function(e) {
    e.preventDefault();
    
    var titulo = document.querySelector("#titulo");
    var letters = document.querySelector("#letters");
    juego.classList.add("slide-out-elliptic-top-bck");
    titulo.classList.add("slide-out-elliptic-top-bck");
    setTimeout(function() { 
        juego.style.display = "none";
        
    },1000);
 
     setTimeout(function() {
        var cajapalabras = document.querySelector('.contentpalabra');
        var palabraux=palabra.toUpperCase();
        palabra=palabra.toUpperCase();
        palabra=palabra.split('');
        
       colocarlineas(cajapalabras);
       
        if(!seguro){
            document.querySelector('#ahorcado').classList.add('slide-in-right');
            letters.classList.add("scale-in-center");
            $(".gamezone").show();
            $("main").hide();
            controljuego(true,palabraux);
        }else{
            document.querySelector('.gamezone').classList.remove('slide-out-elliptic-top-bck');
            document.querySelector('#ahorcado').classList.add('slide-in-right');
            $(".gamezone").show();
            $("main").hide();
            controljuego(true,palabraux);
        }
       
        },500);
     
});


