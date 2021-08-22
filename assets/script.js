/** 
`<div class="col-md-3">
<div class="card">
    <img src="..." class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>
</div>`
*/
var weatherApiKey = 'ba0df728719b3147dce53ee182920426'
var searchWeather = function(searchTerm){
    $.getJSON( `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${weatherApiKey}&units=imperial`, function( weather ) {
        saveSearchTerm(weather.name);    
        displayCurrentWeather(weather);
    });     
}
var searchForecast = function(searchTerm){
    $.getJSON(`https://api.openweathermap.org/data/2.5/forecast?q=${searchTerm}&appid=${weatherApiKey}&units=imperial`, function( data ) {
        console.log("forecast", data)
    });     
}

var addWeatherDetail = function(weather, uvIndex){
    var content = 
    `<ul class='details'>
        <li><span>Temp:</span> ${weather.main.temp} °F</li>
        <li><span>Wind:</span> ${weather.wind.speed} MPH</li>
        <li><span>Humidity:</span> ${weather.main.humidity} %</li>
    `;

    if(uvIndex){
        content += `<li><span>UV Index:</span> <span class='uv-index'>${uvIndex}</span></li>`;
    }

    content += '</ul>';

    return content;
}

var displayCurrentWeather = function(weather, uvIndex){
    var dt = moment.unix(weather.dt).format('MM/DD/YYYY');
    var iconImage = '';
    if(weather.weather){
        iconImage = `<img class='icon' src = 'http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png'/>`
    }
    
    var content = `<div class='weather'><h2 class='city'>${weather.name} (${dt}) ${iconImage}</h2>`;
    content += addWeatherDetail(weather, uvIndex);
    content += '</div>';
    $('.current-weather').html(content);
}

var saveSearchTerm = function(searchTerm){
    var searchTerms=JSON.parse(window.localStorage.getItem("searchTerms")) ; 
    if(searchTerms == undefined){
        searchTerms = {}
    }
    searchTerms[searchTerm] = {};
    window.localStorage.setItem("searchTerms", JSON.stringify(searchTerms));
}

$(document).ready(function(){
    $(document).on("click", '.btn.search', function(e){
        var searchTerm = $('#txt-search').val();
        searchWeather(searchTerm);
    });

})

