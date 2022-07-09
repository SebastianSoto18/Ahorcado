var juego = document.querySelector("#jugarb");
var palabra;

juego.addEventListener("click", function(e) {
    e.preventDefault();
    var titulo = document.querySelector("#titulo");
    juego.classList.add("slide-out-elliptic-top-bck");
    titulo.classList.add("slide-out-elliptic-top-bck");
    setTimeout(function() { 
        juego.style.display = "none";
    },1000);

    //TODO buscar manera de que no entren palabras sin tildes

    const url='https://palabras-aleatorias-public-api.herokuapp.com/random';
    const Http = new XMLHttpRequest();
    Http.open("GET", url);
    Http.send();

    

    Http.onreadystatechange = (e) => {
        if (Http.readyState == 4 && Http.status == 200) {
            datos=JSON.parse(Http.responseText);
            palabra=datos.body.Word;
            console.log(palabra);
        }
    }

     setTimeout(function() {
        var cajapalabras = document.querySelector('.contentpalabra');
        var palabraux=palabra.toUpperCase();
        palabra=palabra.toUpperCase();
        palabra=palabra.split('');
        palabra.forEach(element => {
            var linea = document.createElement('li');
            linea.classList.add('linea');
            linea.classList.add('slide-in-right');
            linea.id = element;
            console.log(linea.id);
            setTimeout(() => {cajapalabras.appendChild(linea);},100);
        
        });
        document.querySelector('#ahorcado').classList.add('slide-in-right');
        $(".gamezone").show();
        $("main").hide();
        controljuego(true,palabraux);
        },2500);
     

});
