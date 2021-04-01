var apiKey = "f25b698e5aca7ef3e7493ebf59f1c37d";
var tasks = {};
var dayCards = [$("day1"),$("day2"),$("day3"),$("day4"),$("day5")];
var loadTasks = function() {
    if (!tasks) {
        tasks = new [];
    };
}

var saveTasks = function(){
    console.log("saved");
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
var generateCurrentInfo = function(data){
    var temp = data.current.feels_like;
    var humi = data.current.humidity;
    var wind = data.current.wind_speed;
    var uv = data.current.uvi;
    
    
    $("#tempDisplay").html("Temperature: "+temp+"℃");
    $("#humiDisplay").html("Humidity: "+humi+"%");
    $("#windDisplay").html("Wind Speed: "+wind+"km/h");
    $("#uvDisplay").html("UV Index: "+uv).addClass("rounded");
   

    if (uv>=7){//high UV index
        $("#uvDisplay").addClass("text-danger"); 
    } else if (uv>3&&u<7){
        $("#uvDisplay").addClass("text-warning"); 
    } else if (uv<=3){//low UV index
        $("#uvDisplay").addClass("text-success"); 
    };
   
};
var generateForecastInfo = function(data){
  
    var dayCard = [];
    for (var i = 0; i<5;i++){
        dayCard[i] = $(".forecastCard[index="+i+"]");
        console.log(i);

        var temp = data.daily[i].feels_like.day;
        var humi = data.daily[i].humidity;
        var icon =  data.daily[i].weather[0].icon;
        var date = moment().add(i, 'days').format("MMM Do");

      

        
        var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
       console.log(iconurl);
        //if (ikon ===undefined){
        //    var ikon = $("<img>").attr("id", "wicon").attr("src", iconurl).attr("alt", "Weather Icon");
        //} else {
        //    $( "ikon" ).remove();
        //};
        
        
        
            //$("ikon").remove();
            //console.log("remoe");
            //var ikon = $("<img>").attr("id", "wicon").attr("src", iconurl).attr("alt", "Weather Icon");
            //$("#iconimg").attr("id","wicon").add("src", iconurl);
        $("#iconimg").attr("src", iconurl);
        console.log($("#iconimg"));
        //var child = $((dayCard[i].children())[1]);
        //console.log($(child).html());
        console.log($(dayCard[i].children().val));
        console.log($(dayCard[i][0]).children[1]);
        var currentIconSpaceEl = $(dayCard[i].children("#icon").children("#iconimg"));
        $(currentIconSpaceEl).attr("src", iconurl);
        //$(dayCard[i][0]).children("#icon").append(ikon);
        //console.log(ikon);
        //console.log(ikon.siblings());
        //var iconSibling = ikon.siblings();
       // console.log(iconSibling);
        //console.log(iconSibling.length);
       //var previous = iconSibling.prev().has("id","wicon");
        //console.log(previous);
       //if (!$(iconSibling).length==0){
          //  $(this).remove(previous);
          //  console.log("has siblings");
       // }; 
        
        
        //$(dayCard[i][0]).children(".iconplaceholder").replaceWith(ikon);
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

            response.json().then(function(data){
                if(data.length!=0){
                    
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
    saveTasks();
});