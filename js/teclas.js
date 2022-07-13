//numero de letras acertadas
numero_de_aciertos=0;
//numero de letras equivocadas ingresadas por el usuario 
numero_de_errores=0;
//palabra con la que se va a trabajar
palabraux="";
//audio que surge al ganar
var win = new Audio("audio/mixkit-auditorium-moderate-applause-and-cheering-502.mp3");
//audio que surge al perder
var lose = new Audio("audio/mixkit-retro-arcade-game-over-470.mp3");
//arreglo donde se almacenan las letras equivocadas
var error = [];

//funcion que determina si se escuchan o no las teclas que el usuario precione
//tambien asigna la palabra en caso de que se necesite 
function controljuego(seguro,palabra){
    if(seguro){
        palabraux=palabra;
        document.onkeypress = mostrarInformacionCaracter;
    }else{
        palabraux=palabra;
    }
}

//reinicia los marcadores de aciertos y errores, el arreglo de letras erradas y el span donde se muestran
function reiniciar(){
    numero_de_aciertos=0;
    numero_de_errores=0;
    error = [];
    document.querySelector('#letters').textContent="Fallaste con la letra:";
}

//funcion que se ejecuta con cada tecla presionada 
function mostrarInformacionCaracter(evObject) {

    //se captura el caracter precionado por el usuario
    var elCaracter = String.fromCharCode(evObject.which);
    //seguro cambia a true si la tecla que preciono el usuario se encuentra dentro de la palabra
    var seguro =false;
    //se pregunta si no es una tecla especial como CTRL 
    if (evObject.which!=0 && evObject.which!=13) {

        //se crea un arreglo con todas las lineas actuales
        var campos = document.querySelectorAll('.linea');

        //se pregunta si el usuario no ha ganado(numero_de_aciertos < palabraux.length)
        //o si no ha perdido ( numero_de_errores < 6)
        //esto con el fin de no ejecutar el bloque de codigo una vez haya concluido lapartida
        if(numero_de_aciertos < palabraux.length && numero_de_errores < 6){
            
            campos.forEach(function(linea) { 
                //si la linea en cuestion aun no tiene texto  
                if(linea.textContent == ""){
                   
                    //se pregunta si el id de esa linea (que es la letra a ala que corresponde)
                    //es igual al caracter que preciono el usuario 
                    if(linea.id == elCaracter.toUpperCase()){
                        
                        //seguro cambia, indicando que la tecla precionada si corresponde a alguna de las lineas
                        seguro = true;
                        //a la linea se le asigna el caracter que preciono el usuario
                        linea.textContent = elCaracter.toUpperCase();
                        //aumenta el numero de aciertos
                        numero_de_aciertos++;
    
                        //si el numero de aciertos es igual al numero de letras de la palabra
                        if(numero_de_aciertos == palabraux.length){
                            //suena el sonido que indica que el usuario gano seguido de una alerta
                            win.play();
                            Swal.fire({
                                title: 'Haz ganado :D ',
                                showClass: {
                                popup: 'animate__animated animate__zoomIn'
                                },
                                hideClass: {
                                popup: 'animate__animated animate__zoomOut'
                                }
                            });
                            }
                    }
                }
            });
            
            //si el seguro nunca cambia a true, aumenta el numero de errores
            if(!seguro){
                numero_de_errores++;

                //si la letra precionada no se encuentra aun esta en el array de errores
                //agrega la letra al span y luego la agrega al array 
                if(error.findIndex((element) => element == elCaracter.toUpperCase())== -1){
                    var errormes= document.querySelector('#letters');
                    errormes.textContent+=elCaracter.toUpperCase();
                    error.push(elCaracter.toUpperCase());
                }
                
                //si el numero de errores es menor al numero de imagenes de los estados del ahrcado, sigue cambiando la imagen
                if(numero_de_errores<=6){
                    document.querySelector('#ahorcado').src="img/"+numero_de_errores+".png";
                }

                //si ya el numero es 6, inidica que el usuario perdio
                if(numero_de_errores==6){  
                    //se reproduce el audio inidicando que perdio el usuario y aparece una alerta que le dice al usuario que perdio y la palabra
                    //que tenia que adivinar
                    lose.play();
                    Swal.fire({
                        title: 'Haz perdido, la palabra era: '+" "+palabraux,
                        showClass: {
                            popup: 'animate__animated animate__zoomIn'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__zoomOut'
                        }
                        });
                }
            }
        }
        }
        
}