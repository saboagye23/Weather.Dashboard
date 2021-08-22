var weatherApiKey = 'ba0df728719b3147dce53ee182920426'


var searchWeather = function(searchTerm){
    $.getJSON( `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=imperial&appid=${weatherApiKey}`, function( weather ) {
        saveSearchTerm(weather.name); 
        displaySearchTerm();   
        displayWeather(weather);
    }); 
    
    $.getJSON(`https://api.openweathermap.org/data/2.5/forecast?q=${searchTerm}&units=imperial&appid=${weatherApiKey}`, function( forecast ) {
        displayForecast(forecast);
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

var getWeatherIcon = function(weather){
    var iconImage = '';
    if(weather.weather){
        iconImage = `<img class='icon' src = 'http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png'/>`
    }
    return iconImage;
}

var displayWeather = function(weather, uvIndex){
    var dt = moment.unix(weather.dt).format('M/DD/YYYY');
    var iconImage = getWeatherIcon(weather);  
    var content = `<div class='weather card'><h2 class='city'>${weather.name} (${dt}) ${iconImage}</h2>`;
    content += addWeatherDetail(weather, uvIndex);
    content += '</div>';
    $('.current-weather').html(content);
    console.log('weather', weather);
}

var displayForecast = function(forecast){
    var content = '';
    for(var i=0; i < forecast.list.length; i += 8){
        var weather = forecast.list[i];
        var dt = moment.unix(weather.dt).format('M/DD/YYYY');
        var iconImage = getWeatherIcon(weather);  
        content += 
        `<div class="col-md-3"><div class="card">
            <h3>${dt}</h3>
            <div>${iconImage}</div>
            ${addWeatherDetail(weather)}
        </div></div>`;
    } 

    $('.future-forecast').html(content)
}

var saveSearchTerm = function(searchTerm){
    var searchTerms=JSON.parse(window.localStorage.getItem("searchTerms")) ; 
    if(searchTerms == undefined){
        searchTerms = {}
    }
    searchTerms[searchTerm] = {};
    window.localStorage.setItem("searchTerms", JSON.stringify(searchTerms));
}

var displaySearchTerm = function(){ 
    var searchTerms =JSON.parse(window.localStorage.getItem("searchTerms"));
    if(searchTerms){
        var content = '<ul>';
        for (const [term, value] of Object.entries(searchTerms)) {
            content += `<li class='btn d-grid btn-secondary btn-city mb-1'>${term}</li>`
        } 
        content += '</ul>';
        $('.search-cities').html(content);
    }
}

$(document).ready(function(){
    displaySearchTerm();
    $(document).on("click", '.btn.search', function(e){
        var searchTerm = $('#txt-search').val();
        searchWeather(searchTerm);  
        
    });

    $(document).on("keypress", '#txt-search', function(e){ 
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if(keycode == '13'){
            var searchTerm = $('#txt-search').val();
            searchWeather(searchTerm);  
        } 
    });

    $(document).on("click", '.search-cities .btn-city', function(e){
        var searchTerm = $(this).html();
        searchWeather(searchTerm);  
    });

})

