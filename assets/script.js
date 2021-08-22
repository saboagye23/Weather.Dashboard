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
var weatherApiKey='ba0df728719b3147dce53ee182920426'
var searchWeather=function(searchTerm){
    $.getJSON( `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${weatherApiKey}&units=imperial`, function( data ) {
        console.log("weather", data)
    });     
}
var searchForecast=function(searchTerm){
    $.getJSON(`api.openweathermap.org/data/2.5/forecast?q=${searchTerm}&appid=${weatherApiKey}&units=imperial`, function( data ) {
        console.log("forecast", data)
    });     
}

$(document).ready(function(){
    $(document).on("click", '.btn.search', function(e){
        var searchTerm=$('#txt-search').val();
        searchWeather(searchTerm);
    });

})

