//? Variables
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");

let tweets = [];

//? Listeners
listeners();
function listeners() {
  //Hacer submit en el formulario
  formulario.addEventListener("submit", agregarTweet);

  //Cuando el documento esta listo
  document.addEventListener("DOMContentLoaded", () => {
    tweets = JSON.parse(localStorage.getItem("tweets")) || [];
    agregarTweetDOM();
  });
}

//? funciones

function agregarTweet(e) {
  e.preventDefault();
  //identificar el tweet
  const tweet = document.querySelector("#tweet").value;

  //Si el tweet está vacio se muestra un error
  if (tweet === "") {
    mostrarError("El campo esta vacio");
    return;
  }
  //Creamos el objeto con el id
  const tweetObj = {
    id: Date.now(),
    tweet,
  };

  //Agregamos el tweet al arreglo
  tweets = [...tweets, tweetObj];

  //Agregamos el tweet al DOM
  agregarTweetDOM();
}

//Funcion generadora de errores
function mostrarError(error) {
  const msgError = document.createElement("p");
  msgError.textContent = error;
  msgError.classList.add("error");
  formulario.appendChild(msgError);

  setTimeout(() => {
    msgError.remove();
  }, 3000);
}

function agregarTweetDOM() {
  //Limpiamos el html
  limpiarHtml();

  //Si el arreglo tiene tweets
  if (tweets.length > 0) {
    tweets.forEach((tweet) => {
      //Creamos html del button eliminar tweet
      const btnEliminar = document.createElement("a");
      btnEliminar.classList.add("borrar-tweet");
      btnEliminar.textContent = "X";

      btnEliminar.onclick = () => {
        eliminarTweet(tweet.id);
      }

      //Creamos el html del li
      const li = document.createElement("li");
      li.textContent = tweet.tweet;
      li.appendChild(btnEliminar);
      listaTweets.appendChild(li);
    });
  } else {
    listaTweets.innerHTML = "No hay tweets";
  }

  sincronizarLocalStorage();
}

//Eliminar la repeticion de Html
function limpiarHtml() {
  while (listaTweets.firstChild) {
    listaTweets.removeChild(listaTweets.firstChild);
  }
}

//Eliminar Tweet
function eliminarTweet(id) {
    tweets = tweets.filter((tweet) => tweet.id !== id);
    agregarTweetDOM();
}

//Sincronixar los daros en el localStorage
function sincronizarLocalStorage() {
  localStorage.setItem("tweets", JSON.stringify(tweets));
}
