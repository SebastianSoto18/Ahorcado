numero_de_aciertos=0;
palabraux="";
function controljuego(seguro,palabra){
    if(seguro){
        palabraux=palabra;
        document.onkeypress = mostrarInformacionCaracter;
    }
}


function mostrarInformacionCaracter(evObject) {

    var msg = ''; 
    var elCaracter = String.fromCharCode(evObject.which);

    if (evObject.which!=0 && evObject.which!=13) {

        msg = 'Tecla pulsada: ' + elCaracter;
        alert(msg);
        var campos = document.querySelectorAll('.linea');
        var seguro = false;
        campos.forEach(function(linea) {    
            if(linea.textContent == ""){
                if(linea.id == elCaracter) {
                    seguro = true;
                    linea.textContent = elCaracter;
                    numero_de_aciertos++;
                    console.log(palabraux);
                    if(numero_de_aciertos == palabraux.length){
                        alert("haz ganado");
                    }
                }
            }
        });

    }

}