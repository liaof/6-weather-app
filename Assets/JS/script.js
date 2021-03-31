var apiKey = "f25b698e5aca7ef3e7493ebf59f1c37d";


var generateCurrentInfo = function(data){
    var temp = data.current.feels_like;
    var humi = data.current.humidity;
    var wind = data.current.wind_speed;
    var uv = data.current.uvi;
    
    $("#tempValue").html(temp);
    $("#humiValue").html(humi);
    $("#windValue").html(wind);
    $("#uvValue").html(uv);
   
};
var generateForecastInfo = function(data){

}
var getWeatherRepo = function(lat, lon){
    console.log(lat, lon);
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=minutely,hourly,alerts&units=metric&appid="+apiKey;
    fetch(apiUrl).then(function(response){
        if(response.ok){
            console.log(response);
            response.json().then(function(data){
                console.log(data);
                generateCurrentInfo(data);
                generateForecastInfo(data);
            })
        }
    })
}





var getCoordinates = function(thisCity){
    //use the OpenWeatherMap api to find the co-ordinates of our city
    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q="+thisCity+"&limit=1&appid="+apiKey;
    fetch(apiUrl).then(function(response){
        if(response.ok){
            console.log(response);
            response.json().then(function(data){
                if(data.length!=0){
                    console.log(data);
                    //set our card title/name here so you can enter co-ordinates when searching for a city and still come up with the name
                    $("#currentCityDate").html(data[0].name+" "+"");
                    getWeatherRepo(data[0].lat, data[0].lon);
                } else {
                    document.location.replace("./index.html");
                }
            })
        } else {
            document.location.replace("./index.html");
        }
        
    })
};





$(".city-form").on("click",".btn", function(event){
    event.preventDefault();
    var thisCity = $("#thisCity").val();
    getCoordinates(thisCity);
});