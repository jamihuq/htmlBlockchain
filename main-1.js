// Foursquare API Info
const clientId = 'GKSKYAV50PYJBIQ3UXGBWT02EOJZJ5PXHVF2D4BT54VCZFQN';
const clientSecret = 'ILEMWGDUR5KK4PEM51YP1NSIFCOWQRK0YXPI4XPH1NGH0KI5';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';
const imgPrefix = 'https://igx.4sqi.net/img/general/150x200';

// APIXU Info
const apiKey = '0a396ddf0e4f4dd88c9151514182802';
const forecastUrl = 'https://api.apixu.com/v1/forecast.json?key=';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4"), $("#venue5")];
const $weatherDivs = [$("#weather1"), $("#weather2"), $("#weather3"), $("#weather4")];
const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// AJAX functions
async function getVenues() {
  const city = $input.val();
  const urlToFetch = url + city + '&venuePhotos=1&limit=10&client_id=' + clientId + '&client_secret=' + clientSecret + '&v=20180228';
  
  try {
    let response = await fetch(urlToFetch);

    if(response.ok) {
      let jsonResponse = await response.json();
      let venues = jsonResponse.response.groups[0].items.map(location => location.venue);

//      console.log(jsonResponse);
//      return jsonResponse;
      return venues;
    }
    
//  return venues; 
    throw new Error('Request failed');
  } catch(error) {
    console.log(error);
  }
  
};

async function getForecast(){
 // const city = $input.val();
  const urlToFetch = forecastUrl + apiKey + '&q=' + $input.val() + '&days=4&hour=11';
  
  try {
    let response = await fetch(urlToFetch);
    if(response.ok) {
      let jsonResponse = await response.json();
//      console.log(jsonResponse);
      let days = jsonResponse.forecast.forecastday;
      return days;
    }
     throw new Error('Request failed');
  } catch(error){
    console.log(error);
  };
//  return days;
};

// Render functions
function renderVenues(venues) {
  $venueDivs.forEach(($venue, index) => {
    let venueContent =
      '<h2>' + venues[index].name + '</h2>' +
      '<img class="venueimage" src="' + imgPrefix +
      venues[index].photos.groups[0].items[0].suffix + '"/>' +
      '<h3>Address:</h3>' +
      '<p>' + venues[index].location.address + '</p>' +
      '<p>' + venues[index].location.city + '</p>' +
      '<p>' + venues[index].location.country + '</p>';
    $venue.append(venueContent);
  });
  $destination.append('<h2>' + venues[0].location.city + '</h2>');
}


function renderForecast(days) {
  $weatherDivs.forEach(($day, index) => {
    let weatherContent =
      '<h2> High: ' + days[index].day.maxtemp_f + '</h2>' +
      '<h2> Low: ' + days[index].day.mintemp_f + '</h2>' +
      '<img src="http://' + days[index].day.condition.icon +
      '" class="weathericon" />' +
      '<h2>' + weekDays[(new Date(days[index].date)).getDay()] + '</h2>';
    $day.append(weatherContent);
  });
}

function executeSearch() {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDivs.forEach(day => day.empty());
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues().then(venues => renderVenues(venues));
  getForecast().then(foreCast => renderForecast(foreCast));
  return false;
}

$submit.click(executeSearch)
