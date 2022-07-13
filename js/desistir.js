//se trae el boton de desistir
var out = document.querySelector('#out');

//se captura el evento click
out.addEventListener('click', function(e) {
    
    //se anula el comportamiento por defaul del boton
    e.preventDefault();

    //se trae la section del juego y se le agrega una animacion de salida
    //una vez terminada, se oculta la zona de juego
    var gz = document.querySelector('.gamezone');
    gz.classList.add('slide-out-elliptic-top-bck');
    setTimeout(function() { 
        gz.style.display = "none";
        $(".gamezone").hide();
    },1000);
    
    //reinicia los marcadores y los errores
    reiniciar();

    //se trae el main y lo hace visible, se le quitan las animaciones de salida
    setTimeout(function() { 
        var main = document.querySelector('main');
        main.style.display = "flex";
        var juegob = document.querySelector("#jugarb");
        var titulo = document.querySelector("#titulo");
        juegob.style.display = "flex";
        juegob.setAttribute("style", "text-align:center");
        juegob.classList.remove("slide-out-elliptic-top-bck");
        titulo.classList.remove("slide-out-elliptic-top-bck");
        //se genera una nueva palabra por si el usuario desea volver a jugar
        getpalabra(true); 
        //se muestra el bloque main 
        $("main").show();
    },2000);
    
    
});