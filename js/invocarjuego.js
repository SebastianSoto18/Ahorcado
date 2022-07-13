//caputra de boton jugar
var juego = document.querySelector("#jugarb");
var palabra = "";
//seguro indica si se el juego debe empezar desde cero o se undio el boton "nuevo juego"
var seguro = false;

//funcion que hace la llamada a la una Api que trae una palabra aleatoria
getpalabra(seguro);

function getpalabra(control) {
  seguro = control;

  //como en los requerimientos esta que no se reciben palabras con tilde y en la documentacion de la Api tampoco
  //hay forma alguna de evitar que lleguen palabras con tilde, entonces se opto por sustituir las tildes por su equivalente sin tilde

  var tildez = ["á", "é", "í", "ó", "ú"];
  var normal = ["a", "e", "i", "o", "u"];

  //url de la Api
  const url = "https://palabras-aleatorias-public-api.herokuapp.com/random";
  const Http = new XMLHttpRequest();
  Http.open("GET", url);
  //envio de la peticion por metodo GET
  Http.send();

  //se espera un evento que se activa una vez que la peticion cambie de estado
  Http.onreadystatechange = (e) => {
    //si la peticion arroja un 200, quiere decir que se completo con exito
    if (Http.readyState == 4 && Http.status == 200) {
      //se transforman los datos que vienes en un JSON a un objeto
      datos = JSON.parse(Http.responseText);
      //se obtiene la palabra y se crea un arreglo de ella misma letra por letra
      //ej:palabra="mamá"
      //palabra = ["m","a","m","á"]
      palabra = datos.body.Word;
      palabra = palabra.split("");

      //se recorre ese arreglo de letras
      palabra.forEach(function (word, indices) {
        //se pregunta si esa letra en cuestion se encuentra en el arreglo de letras con tilde
        if (tildez.findIndex((element) => element == word) != -1) {
          //si lo esta, extrae el indice donde se encuentra la tilde
          var indice = tildez.findIndex((element) => element == word);
          //luego se cambia en el arreglo paralabra en la posicion actual del ciclo
          //la letra del arreglo normal que es equivalente a la que esta en tilde
          palabra[indices] = normal[indice];
        }
      });

      //se crea una nueva variable auxiliar a la cual se le concatena el arreglo de la palabra actual
      //con las modificaciones ya realizadas (si es que las sufrio)
      var newpalabra = "";
      palabra.forEach((element) => {
        newpalabra += element;
      });
      //se reasigna el auxiliar a la variable  palabra
      palabra = newpalabra;
      //se pasa la palabra a la funcion control juego con el parametro "false", para que no nos afecte
      //el ciclo de juego actual
      controljuego(false, palabra);
    }
  };
}

//coloca las lineas dentro de su respectivo contenedor 
function colocarlineas(cajapalabras) {

  //si la variable seguro esta en true, quiere decir que el usuario esta solicitando un nuevo juego
  if (seguro) {
    //primeramente se eliminan las lineas de la palabra anterior
    while (cajapalabras.firstChild) {
      cajapalabras.removeChild(cajapalabras.firstChild);
    }
    setTimeout(function () {
      /* por alguna razon no funciona 
            palabra.forEach(element => {
                if(element!="" && element!=" "){
                    var linea = document.createElement('li');
                    linea.classList.add('linea');
                    linea.classList.add('slide-in-right');
                    linea.id = element;
                    cajapalabras.appendChild(linea);
                }
                
            });
            */
      
      //se crea una variable a la cual se van a concatenar el arreglo de la variable palabra 
      var newpalabra = "";

      for (let index = 0; index < palabra.length; index++) {
        const element = palabra[index];
        newpalabra += element;
      }
      
      //se reasigna la palabra ya concatena y en mayusculas a la variable original
      palabra = newpalabra.toUpperCase();
      //se separa la palabra en forma de arreglo 
      palabra = palabra.split("");

      //se rrecorre el arreglo actual
      for (let index = 0; index < palabra.length; index++) {
        const element = palabra[index];
        
        //si la letra actual es diferente de un espacio en blanco
        if (element != "" && element != " ") {
          
          //se crea una linea la cual tendra como id la letra correspondente
          var linea = document.createElement("li");
          linea.classList.add("linea");
          linea.classList.add("slide-in-right");
          linea.id = element.toUpperCase();

          //se agrega la linea a su contenedor
          cajapalabras.appendChild(linea);
        }
      }
    }, 2000);
  } else {

    //si el seguro esta en false, quiere decir que es el primer juego 

    //se recorre el arreglo de palabras 
    palabra.forEach((element) => {
        
      //si la letra es diferente de un espacio vacio 
      if (element != "" && element != " ") {

        //se crea una nueva linea, cuyo id sera la letra a la cual correzponde 
        var linea = document.createElement("li");
        linea.classList.add("linea");
        linea.classList.add("slide-in-right");
        linea.id = element;

        //se agrega la lena al contenedor
        cajapalabras.appendChild(linea);
      }
    });
  }
}

function iniciarjuego(){
    //si seguro es false, quiere decir que es el primer juego
    if (!seguro) {
        //se agrega la animacion de entrada de la imaen
        document.querySelector("#ahorcado").classList.add("slide-in-right");
        //se agrega la animacion de entrada del span de las letras erradas
        letters.classList.add("scale-in-center");
        //se hace visible la section donde estan contenidos los elementos de las lineas la imagen y el span
        $(".gamezone").show();
        //se oculta el main que es donde estan el titulo principal y el boton jugar 
        $("main").hide();
      } else {
        //si el usuario preciono desistir y luego jugar de nuevo 
        //se le remueve la animacion de salida a la section del juego
        document.querySelector(".gamezone").classList.remove("slide-out-elliptic-top-bck");
        //se agrega animacion de entrada a la imagen 
        document.querySelector("#ahorcado").classList.add("slide-in-right");
        //se hace visible la section donde estan contenidos los elementos de las lineas la imagen y el span
        $(".gamezone").show();
        //se oculta el main que es donde estan el titulo principal y el boton jugar 
        $("main").hide();;
      }
      controljuego(true, palabraux);

}

//se captura el click del usuario en el boton jugar
juego.addEventListener("click", function (e) {

  // se previene el comportamiento por default del boton
  e.preventDefault();

   // se traen el titulo y el boton jugar y se les agrega la animacion de salida
  var titulo = document.querySelector("#titulo");
  var letters = document.querySelector("#letters");
  juego.classList.add("slide-out-elliptic-top-bck");
  titulo.classList.add("slide-out-elliptic-top-bck");
  
  // se espera a que termine la animación para desaparecer la seccion donde están el titulo y el boton 
  setTimeout(function () {
    juego.style.display = "none";
  }, 1000);

  setTimeout(function () {

    //se obtiene el contenedor de las lineas
    var cajapalabras = document.querySelector(".contentpalabra");
    //se guarda rezpaldo de la palabra
    var palabraux = palabra.toUpperCase();

    //se pone en mayuscula y se convierte la palabra en un arreglo
    palabra = palabra.toUpperCase();
    palabra = palabra.split("");
    
    //se llama a la funcion que rellena el contenedor 
    colocarlineas(cajapalabras);
    
    //se llama a la funcion que oculta dependiendo del seguro 
    iniciarjuego();

  }, 500);
});
