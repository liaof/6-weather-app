var apiKey = "f25b698e5aca7ef3e7493ebf59f1c37d";
var cities = [];
var dayCards = [$("day1"),$("day2"),$("day3"),$("day4"),$("day5")];

var createHistoryLinks = function(cities){
    console.log(cities)
    var tempBtnEl = $("<button>").addClass("btn btn-primary w-100 mb-1").html("<p class = 'm-1'>"+cities+"</p>");
    $("#searchHistory").append(tempBtnEl);
    //
//$("searchHistory").append("cityLink");
};
var loadCities = function() {
    cities = JSON.parse(localStorage.getItem("cities"));
    
    //loop over each cities value
    
    //loop over each cities object
    //$.each(cities, function(){
     //   createHistorLinks(cities);
    //});
    console.log(cities);
    for (var i = 0; i<cities.length; i++){
        createHistoryLinks(cities[i]);
    }
};

var saveCities = function(){
 
    console.log("saved");
    localStorage.setItem("cities", JSON.stringify(cities));
};
//fill out the top right quad of the site
var generateCurrentInfo = function(data){
    var temp = data.current.feels_like;
    var humi = data.current.humidity;
    var wind = data.current.wind_speed;
    var uv = data.current.uvi;
    

    $("#tempDisplay").html("Temperature: "+temp+"℃");
    $("#humiDisplay").html("Humidity: "+humi+"%");
    $("#windDisplay").html("Wind Speed: "+wind+"km/h");
    $("#uvDisplay").html("UV Index: "+uv).addClass("rounded");
   
    //UV index coloring thing
    if (uv>=7){//high UV index
        $("#uvDisplay").addClass("text-danger"); 
    } else if (uv>3&&u<7){
        $("#uvDisplay").addClass("text-warning"); 
    } else if (uv<=3){//low UV index
        $("#uvDisplay").addClass("text-success"); 
    };
   
};

//fill out the 2nd quadrant of the side, each day individually and consecutively
var generateForecastInfo = function(data){
  
    var dayCardEl = [];
    for (var i = 0; i<5;i++){
        dayCardEl[i] = $(".forecastCard[index="+i+"]");

        var temp = data.daily[i].feels_like.day;
        var humi = data.daily[i].humidity;
        var icon =  data.daily[i].weather[0].icon;
        var date = moment().add(i+1, 'days').format("MMM Do");

        var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
       //console.log(iconurl);

        $("#iconimg").attr("src", iconurl);
        //console.log($("#iconimg"));

        //console.log($(dayCardEl[i].children().val));
        //console.log($(dayCardEl[i][0]).children[1]);

        //finds the <img> element of the currently indexed dayCard
        var currentIconSpaceEl = $(dayCardEl[i].children("#icon").children("#iconimg"));
        //setIcon
        $(currentIconSpaceEl).attr("src", iconurl);
    
        //set the values of the currently indexed dayCard
        $(dayCardEl[i][0]).children("#forecastDate").html(date);
        $(dayCardEl[i][0]).children("#forecastTempDisplay").html("Temp: "+temp+"℃");
        $(dayCardEl[i][0]).children("#forecastHumiDisplay").html("Humidity: "+humi+"%");
    }
};

var getWeatherRepo = function(lat, lon){
    
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=minutely,hourly,alerts&units=metric&appid="+apiKey;
    //fetch api
    fetch(apiUrl).then(function(response){
        //if api exists
        if(response.ok){
            //parse response
            response.json().then(function(data){
                //fill page elements
                generateCurrentInfo(data);
                generateForecastInfo(data);
            })
        }
    })
};

//the OWP api only takes co-ordinates as input. Luckily they have another api we can use to convert city names to their co-ordinates
var getCoordinates = function(thisCity){
    //use the OpenWeatherMap api to find the co-ordinates of our city
    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q="+thisCity+"&limit=1&appid="+apiKey;
    fetch(apiUrl).then(function(response){
        if(response.ok){

            response.json().then(function(data){
                if(data.length!=0){//check if the response actually contains any data ie. if the input is either a real city name or the co-ordinates of a real city
                    
                    //update card title with city name and current date
                    $("#currentCityDate").html(data[0].name+", "+moment().format("MMM Do YYYY"));
                    getWeatherRepo(data[0].lat, data[0].lon);
                    
                    //save the input if it was a real city
                    saveCities();
                } else {//catch successfully fetched data that does not have the information we need
                    document.location.replace("./index.html");
                }
            })
        } else {//only catches extremely wrong inputs, like single letters and special characters. need another error handler inside
            document.location.replace("./index.html");
        }
    })
};

$(".city-form").on("click",".btn", function(event){
    event.preventDefault();
    var thisCity = $("#thisCity").val();
    
    getCoordinates(thisCity);
    console.log("finished");
    cities.push(thisCity);
    
    console.log(cities);
});

loadCities();