var apiKey = "f25b698e5aca7ef3e7493ebf59f1c37d";

var getWeatherRepoCurrent = function(thisCity){
    console.log(thisCity);
    
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+thisCity+"&units=metric&appid="+apiKey;
    fetch(apiUrl).then(function(response){
        if(response.ok){
            console.log(response);
            response.json().then(function(data){
                console.log(data);
            })
        }
    })
    console.log(thisCity);
    getWeatherRepoForecast(thisCity)
}

var getWeatherRepoForecast = function(thisCity){
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+thisCity+"&units=metric&appid="+apiKey;
    fetch(apiUrl).then(function(response){
        if(response.ok){
            console.log(response);
            response.json().then(function(data){
                console.log(data);
            })
        }
    })
};



$(".city-form").on("click",".btn", function(event){
    event.preventDefault();
    var thisCity = $("#thisCity").val();
    
    getWeatherRepoCurrent(thisCity);
});