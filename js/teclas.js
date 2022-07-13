numero_de_aciertos=0;
numero_de_errores=0;
palabraux="";
var win = new Audio("../audio/mixkit-auditorium-moderate-applause-and-cheering-502.wav");
var lose = new Audio("../audio/mixkit-retro-arcade-game-over-470.wav");
var error = [];
function controljuego(seguro,palabra){
    if(seguro){
        palabraux=palabra;
        document.onkeypress = mostrarInformacionCaracter;
    }else{
        palabraux=palabra;
    }
}

function reiniciar(){
    numero_de_aciertos=0;
    numero_de_errores=0;
    error = [];
    document.querySelector('#letters').textContent="Fallaste con la letra:";
}


function mostrarInformacionCaracter(evObject) {

  
    var elCaracter = String.fromCharCode(evObject.which);

    if (evObject.which!=0 && evObject.which!=13) {
        var campos = document.querySelectorAll('.linea');
        var seguro = false;

        if(numero_de_aciertos < palabraux.length && numero_de_errores < 6){
            campos.forEach(function(linea) {    
                if(linea.textContent == ""){
                   
                    if(linea.id == elCaracter.toUpperCase()) {
                        seguro = true;
                        linea.textContent = elCaracter.toUpperCase();
                        numero_de_aciertos++;
    
                        
                    if(numero_de_aciertos == palabraux.length){
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
            if(!seguro){
                numero_de_errores++;
                
                if(error.findIndex((element) => element == elCaracter.toUpperCase())== -1){
                    var errormes= document.querySelector('#letters');
                    errormes.textContent+=elCaracter.toUpperCase();
                    error.push(elCaracter.toUpperCase());
                }
            
                if(numero_de_errores<=6){
                    document.querySelector('#ahorcado').src="img/"+numero_de_errores+".png";
                }
                if(numero_de_errores==6){   
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