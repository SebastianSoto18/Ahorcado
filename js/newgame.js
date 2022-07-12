var ng = document.getElementById('newg');
var cajapalabras = document.querySelector('.contentpalabra');



ng.addEventListener('click', function(e) {  
    e.preventDefault();
    getpalabra(true);
    
    colocarlineas(cajapalabras);
    document.getElementById('ahorcado').src="img/0.png";
    reiniciar();
})