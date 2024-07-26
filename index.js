// const { getHours } = require("date-fns");

function uiHandler() {
 

    const fetchButton = document.querySelector(".get");
    const country = document.querySelector("#country");
    const countryUi = document.querySelector("#countryUi") ; 
    const img = document.querySelector('#icon') ; 
    const temp = document.querySelector("#temp") ;
    const hourlyContainer = document.querySelector("#hourly-container") ; 
    fetchButton.addEventListener("click", async () => {
        try {
            
            const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${country.value}?unitGroup=metric&key=YH3H376K4A5WEURGE8VLSXYV8&contentType=json&iconSet=icons1`, { mode: 'cors' });
            if (!response.ok) {
                throw new Error("network response error");
            }
            const WeatherData = await response.json();
            console.log(WeatherData) ;
            countryUi.innerHTML = country.value ; 
            temp.innerHTML = WeatherData.currentConditions.temp ; 
            const iconInfo = WeatherData.currentConditions.icon ; 
            
            //const gifResponse = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=tE7e5fdyvGOXLQB5kZDcDBt1hBIAEpB0&s=${iconInfo}`, { mode: 'cors' });
            //const gifData = await gifResponse.json() ; 
            img.src = `./assests/icons/${iconInfo}.svg`; 
          
            hourlyContainer.innerHTML = "" ;

            
            
            WeatherData.days[0].hours.forEach((hour,index) => {
                if(index%3==0)
                {
                const hourDiv = document.createElement("div") ; 
                hourDiv.classList.add("Hourly-Forecasts") ; 
      
               const hourtext = document.createElement("p") ; 
               hourtext.classList.add("hour-text") ; 
               hourtext.textContent = hour.datetime;
               const hourtemp = document.createElement("p") ; 
               hourtemp.classList.add("hourly-temp") ; 
               hourtemp.textContent = hour.temp;
               const hourIcon = document.createElement("img") ;
               hourIcon.classList.add("Hourly-icon") ; 
               hourIcon.src = `./assests/icons/${hour.icon}.svg` ; 
               hourDiv.appendChild(hourtext) ; 
               hourDiv.appendChild(hourIcon) ; 
               hourDiv.appendChild(hourtemp) ; 
               hourlyContainer.appendChild(hourDiv)  ;
                
              console.log(hour);                 
                }
            }); 
            }            
    






            catch (error) {
        console.error("Error fetching weather data:", error);
        }
    });
}

uiHandler() ;