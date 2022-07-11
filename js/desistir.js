var out = document.querySelector('#out');

out.addEventListener('click', function(e) {
  
    e.preventDefault();

    var gz = document.querySelector('.gamezone');
    gz.classList.add('slide-out-elliptic-top-bck');
    setTimeout(function() { 
        gz.style.display = "none";
        $(".gamezone").hide();
    },1000);
    
       
    setTimeout(function() { 
        var main = document.querySelector('main');
        main.style.display = "flex";
        var juegob = document.querySelector("#jugarb");
        var titulo = document.querySelector("#titulo");
        juegob.style.display = "flex";
        juegob.setAttribute("style", "text-align:center");
        juegob.classList.remove("slide-out-elliptic-top-bck");
        titulo.classList.remove("slide-out-elliptic-top-bck");
        getpalabra(true); 
        $("main").show();
    },2000);
    
    
});