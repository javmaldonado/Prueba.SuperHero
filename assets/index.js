//Captura con click en el boton de busqueda, validar que el id sea un numero  y con fetch realizar la consulta a la API//

$(document).ready(function () {
    $("#button").on("click", function () {
      let heroId = $("#heroId").val();
      if (validInput(heroId)) {
        $("#error-message").text("");
        fetchHero(heroId);
      } else {
        $("#error-message").text("Por favor, ingrese un número válido entre 1 y 732");
      }
    });
  });
  //Valida que el id sea un número (10 base numérica) //
  function validInput(input) {
      let num = parseInt (input, 10);    
      return /^\d+$/.test(input) && num >= 1 && num <=732;
  }
  
  // Consultar la API mediante AJAX , traer la informacion de la Api con get //
  function fetchHero(heroId) {
    $.ajax({
      url: `https://superheroapi.com/api.php/3033707663582647/${heroId}`,
      method: "GET",
      success: function (data) {
        HeroCard(data);
        HeroChart(data);
      },
  //Implementar estructuras condicionales para generar alertas cuando existan errores en la búsqueda//
      error: function () {
        alert("Se ha producido un error. Por favor, intente nuevamente.");
      },
    });
  }
  // Renderizar la información en una card de Bootstrap.//
  function HeroCard(hero) {
    let heroCard = `
    <h5 class="card-title text-start text-success text-bold fs-3 gap-3 fw-bold mb-2">SuperHero encontrado</h5>
     <div class="card mb-3">
          <div class="row g-0">
          <div class="col-md-4">
     <img src="${hero.image.url}" class=" img-fluid" alt="...">
          </div>
          <div class="col-md-8">
              <div class="card-body">
                  <p class="card-text ">Nombre: ${hero.name}</p>
                  <p class="card-text ">Conexiones: ${hero.connections.relatives}</p>
                  <p class="card-text ">Ocupación: ${hero.work.occupation}</p>
                  <p class="card-text ">Primera aparición: ${hero.biography.publisher}
                  <p class="card-text ">Primera aparición: ${hero.biography.alignment}</p>
                  <p class="card-text ">Altura: ${hero.appearance.height}</p>
                  <p class="card-text ">Peso: ${hero.appearance.weight}</p>
                  <p class="card-text ">Alianzas: ${hero.biography.aliases}</p>
              </div>
          </div>
          </div>
          </div>`;
    $("#heroInfo").html(heroCard);
  }
  //Utilizar la librería de gráficos CanvasJS//
  function HeroChart(hero) {
    let chart = new CanvasJS.Chart("chartContainer", {
      title: {
        text: `Estadísticas de poder ${hero.name}`,
        fontFamily: "arial",
        fontSize: 30,
        fontWeight: "bold",
        fontColor: "green",
        labelFontColor: "red"
      },
      legend: {
          fontFamily: "arial",
        },
      data: [
        {
          type: "pie",
          showInLegend: true,
          indexLabel: "{name} {y}%",
          startAngle: 60,
          indexLabelFontSize: 17,
          indexLabelFontFamily: "arial",
          dataPoints: [
            { y: hero.powerstats.intelligence,name: "Inteligencia",label: "Inteligencia",},
            { y: hero.powerstats.strength, name: "Fuerza", label: "Fuerza" },
            { y: hero.powerstats.speed, name: "Velocidad", label: "Velocidad" },
            { y: hero.powerstats.durability,name: "Durabilidad",label: "Durabilidad",},
            { y: hero.powerstats.power, name: "Poder", label: "Poder" },
            { y: hero.powerstats.combat, name: "Combate", label: "Combate" },
          ],
        },
      ],
    });
    chart.render();
  }
  