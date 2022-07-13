//se trae el boton de nuevo juego
var ng = document.getElementById('newg');
//se trae el contenedor de las lineas
var cajapalabras = document.querySelector('.contentpalabra');

//se captura el evento click 
ng.addEventListener('click', function(e) {  
    //se inhabilita el comportamiento por default
    e.preventDefault();

    //se obtiene una nueva palabra 
    getpalabra(true);
    
    //se preparan y ponen las lenas de esa palabra en el contenedor
    colocarlineas(cajapalabras);

    //se deja la imagen de incio del ahorcado
    document.getElementById('ahorcado').src="img/0.png";

    //se reinician los marcadores y las letras falladas
    reiniciar();
})