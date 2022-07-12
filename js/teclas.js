numero_de_aciertos=0;
numero_de_errores=0;
palabraux="";

function controljuego(seguro,palabra){
    if(seguro){
        palabraux=palabra;
        document.onkeypress = mostrarInformacionCaracter;
    }
}

function reiniciar(){
    numero_de_aciertos=0;
    numero_de_errores=0;
}


function mostrarInformacionCaracter(evObject) {

    var error = [];
    var elCaracter = String.fromCharCode(evObject.which);

    if (evObject.which!=0 && evObject.which!=13) {
        var campos = document.querySelectorAll('.linea');
        var seguro = false;
        campos.forEach(function(linea) {    
            if(linea.textContent == ""){
                if(linea.id == elCaracter.toUpperCase()) {
                    seguro = true;
                    linea.textContent = elCaracter.toUpperCase();
                    numero_de_aciertos++;
                    if(numero_de_aciertos == palabraux.length){
                        alert("haz ganado");
                    }
                }
            }
        });
        if(!seguro){
            numero_de_errores++;
            if(error.findIndex((element) => element == elCaracter)== -1){
                var errormes= document.querySelector('#letters');
                errormes.textContent+=elCaracter.toUpperCase();
                error.push(elCaracter.toUpperCase());
            }
            document.querySelector('#ahorcado').src="img/"+numero_de_errores+".png";
            if(numero_de_errores==6){
                alert("haz perdido");
            }
        }
    }

}