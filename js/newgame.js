var ng = document.getElementById('newg');
var cajapalabras = document.querySelector('.contentpalabra');

//TODO colocar animacion para decir que se coloco una nueva palabra 

ng.addEventListener('click', function(e) {  
    e.preventDefault();
    getpalabra(true);
    colocarlineas(cajapalabras);
    document.getElementById('ahorcado').src="img/0.png";
})