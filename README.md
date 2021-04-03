# six-weather-app

#### [ Site Deployed Here](https://openweathermap.org/api)

## Acceptance Criteria 

GIVEN I am using a daily planner to create a schedule
WHEN I open the planner
THEN the current day is displayed at the top of the calendar
WHEN I scroll down
THEN I am presented with time blocks for standard business hours
WHEN I view the time blocks for that day
THEN each time block is color-coded to indicate whether it is in the past, present, or future
WHEN I click into a time block
THEN I can enter an event
WHEN I click the save button for that time block
THEN the text for that event is saved in local storage
WHEN I refresh the page
THEN the saved events persist

## Project Summary

For this project I have created a Weather Dashboard that uses [OpenWeather API](https://openweathermap.org/api) to take an city name and fetches it's co-ordinates, which is then used as parameters to fetch a different OpenWeather API that returns the weather forecast. This data is then displayed in the appropriate page elements.

After the content is fetched and displayed on the webpage, the search term is saved in localStorage and a button is created that upon triggering, re-searches the corresponding city.

If a search is triggered by clicking one of the history buttons, that search term is not logged and no new btn elements are created. Basically, each search term can be logged once, preventing clutter.

### Screenshots


With a clear localStorage<br /><br />
![No Local Storage](Assets/Screenshots/no-storage.jpg) 
<br /><br />
After a few searches and a page refresh<br /><br />
![Search History](Assets/Screenshots/saved.jpg)
<br /><br />
UV color coding<br /><br />
![low UV](Assets/Screenshots/low-uv.jpg)<br />
![mid UV](Assets/Screenshots/mid-uv.jpg)<br />
![high UV](Assets/Screenshots/hi-uv.jpg)<br />


### Resources Used
OpenWeather API
FontAwesome
JQuery
Bootstrap
Momentjs
[www.w3schools](https://www.w3schools.com/)<br />
[This blogpost concerning localStorage](https://blog.logrocket.com/localstorage-javascript-complete-guide/)
