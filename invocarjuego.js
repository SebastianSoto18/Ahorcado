var juego = document.querySelector("#jugarb");

juego.addEventListener("click", function(e) {
    e.preventDefault();
    juego.classList.add("slide-out-elliptic-top-bck");
    
    setTimeout(function() { 
        
        juego.style.display = "none";
    },1000);

    //TODO hacer funcionalidad del juego 

});