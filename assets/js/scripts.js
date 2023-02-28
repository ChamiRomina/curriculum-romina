var img = document.querySelector("img");
var nombre_completo = document.getElementById("nombre_completo");
var nacimiento_edad = document.getElementById("nacimiento_edad");
var email = document.getElementById("email");
var domicilio = document.getElementById("domicilio");
var telefono = document.getElementById("telefono");
var links = document.querySelectorAll("li.conocimiento", "a[data-id]");

// Cuando el documento esta listo inicia las funciones
$(document).ready(function () {
  // Carga de datos de muestra desde API
  $.ajax({
    url: "https://randomuser.me/api/",
    dataType: "json",
    success: function (data) {
      let results = data.results;
      let nomb_completo;
      results.forEach((result) => {
        // carga los valores mediante manejo de DOM con información de API
        nomb_completo = result.name.first + ", " + result.name.last;
        img.src = result.picture.large;
        nombre_completo.innerText = nomb_completo;
        email.innerHTML = `<a class="sin-decoracion"href="mailto:${result.email}">${result.email}</a>`;
        domicilio.innerText =
          result.location.street.name +
          ", " +
          result.location.street.number +
          ", " +
          result.location.state +
          ", " +
          result.location.country +
          ".";
        telefono.innerText = result.phone;

        // FUNCION PARA CALCULAR EDAD
        fechaEdad(result.dob.date);
      });
    },
  });

  // Llamada a función mostrar info de conocimientos
  $("ul.fa-ul").click(function (e) {
    e.preventDefault();
    var li = e.target.parentNode;
    mostrarInformacion(li);
  });

  // Scroll de secciones
  scrollASeccion();

  // Botón ir arriba
  scrollTop();
});

function scrollASeccion() {
  // Desplazamiento suave con jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (
      location.pathname.replace(/^\//, "") ==
      this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html, body").animate(
          {
            scrollTop: target.offset().top,
          },
          1000,
          "easeInOutExpo"
        );
        return false;
      }
    }
  });

  // Cierra el menú interactivo al hacer clic en un enlace de activación de desplazamiento.
  $(".js-scroll-trigger").click(function () {
    $(".navbar-collapse").collapse("hide");
  });

  // Activa scrollspy para añadir una clase activa a los elementos de la barra de navegación al desplazarse
  $("body").scrollspy({
    target: "#menu-navegacion",
  });
}

// Calcular edad
function fechaEdad(date) {
  var hoy = new Date();
  var cumpleanos = new Date(date);
  var edad = hoy.getFullYear() - cumpleanos.getFullYear();
  var m = hoy.getMonth() - cumpleanos.getMonth();

  if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
    edad--;
  }

  return (nacimiento_edad.innerText =
    new Date(date).toLocaleDateString("es-ES") + " | " + edad + " años");
}

// Mostrar información de elemento clickeado en conocimientos
function mostrarInformacion(li) {
  if (li.id == 1) {
    alert(
      'El contenido del element "1" es Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio vitae illum at quidem voluptates! At veritatis fuga accusamus aliquid, nulla aliquam, error sint dignissimos iste, non sed commodi fugiat vero!'
    );
  } else if (li.id == 2) {
    alert(
      'El contenido del element "2" es Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio vitae illum at quidem voluptates! At veritatis fuga accusamus aliquid, nulla aliquam, error sint dignissimos iste, non sed commodi fugiat vero!'
    );
  } else {
    alert(
      'El contenido del element "3" es Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio vitae illum at quidem voluptates! At veritatis fuga accusamus aliquid, nulla aliquam, error sint dignissimos iste, non sed commodi fugiat vero!'
    );
  }
}

function scrollTop() {
  $("#ir-arriba").hide();
  $("#ir-arriba").click(function () {
    $("body, html").animate(
      {
        scrollTop: "0px",
      },
      300
    );
  });
  $(window).scroll(function () {
    if ($(this).scrollTop() > 0) {
      $("#ir-arriba").fadeIn(300);
    } else {
      $("#ir-arriba").fadeOut(300);
    }
  });
}
