var apiKey = "f25b698e5aca7ef3e7493ebf59f1c37d";


var generateCurrentInfo = function(data){
    var temp = data.current.feels_like;
    var humi = data.current.humidity;
    var wind = data.current.wind_speed;
    var uv = data.current.uvi;
    
    $("#tempDisplay").html("Temperature: "+temp+"℃");
    $("#humiDisplay").html("Humidity: "+humi+"%");
    $("#windDisplay").html("Wind Speed: "+wind+"km/h");
    $("#uvDisplay").html("UV Index: "+uv).addClass("rounded");
    if (uv<=3){
        $("#uvDisplay").addClass("text-success"); 
    } else if (uv>3&&u<7){
        $("#uvDisplay").addClass("text-warning"); 
    } else if (uv<=7){
        $("#uvDisplay").addClass("text-danger"); 
    }
   
};
var generateForecastInfo = function(data){
    console.log(data);
    console.log(data.daily[0]);
    var dayCard = [];
    for (var i = 0; i<5;i++){
        dayCard[i] = $(".forecastCard[index="+i+"]");
        
        console.log(dayCard[i][0]);
        console.log(data)
        var temp = data.daily[i].feels_like.day;
        var humi = data.daily[i].humidity;
        var icon =  data.daily[i].weather[0].icon;
        var date = moment().add(i, 'days').format("MMM Do");

       

        
        var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
        var ikon = $("<img>").attr("id", "wicon").attr("src", iconurl).attr("alt", "Weather Icon");
        $(dayCard[i][0]).children("#icon").append(ikon);
        //console.log(iconurl);
        //console.log(icon);
        //console.log($(dayCard[i][0]).children("#icon").children("#wicon"));
        $(dayCard[i][0]).children("#forecastDate").html(date);
        
        $(dayCard[i][0]).children("#forecastTempDisplay").html("Temp: "+temp+"℃");
        $(dayCard[i][0]).children("#forecastHumiDisplay").html("Humidity: "+humi+"%");
        //$(dayCard[i]).children[3].html(humi);
        //console.log($(dayCard[0]).children("#forecastTempValue").val)
    }
}
var getWeatherRepo = function(lat, lon){
    console.log(lat, lon);
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=minutely,hourly,alerts&units=metric&appid="+apiKey;
    fetch(apiUrl).then(function(response){
        if(response.ok){
            
            response.json().then(function(data){
                
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