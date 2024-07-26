// const { getHours } = require("date-fns");

function uiHandler() {
 

    const fetchButton = document.querySelector(".get");
    const country = document.querySelector("#country");
    const countryUi = document.querySelector("#countryUi") ; 
    const img = document.querySelector('#icon') ; 
    const temp = document.querySelector("#temp") ;
    const hourlyContainer = document.querySelector("#hourly-container") ; 
    // const SubInfo = document.querySelector(".subInfo") ; 
    const percip = document.querySelector("#Precipitation")  ; 
    const humi = document.querySelector("#Humidity") ; 
    const wind = document.querySelector("#wind") ;
    fetchButton.addEventListener("click", async () => {
        try {
            
            const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${country.value}?unitGroup=metric&key=YH3H376K4A5WEURGE8VLSXYV8&contentType=json&iconSet=icons1`, { mode: 'cors' });
            if (!response.ok) {
                throw new Error("network response error");
            }
            const WeatherData = await response.json();
            console.log(WeatherData) ;
            countryUi.innerHTML = "Results For : "+country.value.charAt(0).toUpperCase()+country.value.slice(1) ; 
            temp.innerHTML = WeatherData.currentConditions.conditions + ' '+ WeatherData.currentConditions.temp + ' °C' ; 
            const iconInfo = WeatherData.currentConditions.icon ; 
            percip.textContent = "Precipitation: "+WeatherData.currentConditions.precipprob+"%" ; 
            humi.textContent = "Humidity: "+WeatherData.currentConditions.humidity+"%" ; 
            wind.textContent = "Wind: "+WeatherData.currentConditions.windspeed+"km/h" ; 
            img.src = `./assests/icons/${iconInfo}.svg`; 
          
            hourlyContainer.innerHTML = "" ;

            
            
            WeatherData.days[0].hours.forEach((hour,index) => {
                if(index%3==0)
                {
                const hourDiv = document.createElement("div") ; 
                hourDiv.classList.add("Hourly-Forecasts") ; 
      
               const hourtext = document.createElement("p") ; 
               hourtext.classList.add("hour-text") ; 
            //    console.log(hour.datetime.type) ; 
               hourtext.textContent = hour.datetime.substring(0,5);
               const hourtemp = document.createElement("p") ; 
               hourtemp.classList.add("hourly-temp") ; 
               hourtemp.textContent = hour.temp + ' °C';
               const hourIcon = document.createElement("img") ;
               hourIcon.classList.add("Hourly-icon") ; 
               hourIcon.src = `./assests/icons/${hour.icon}.svg` ; 
               hourIcon.style.width = "50px" ;
               hourIcon.style.height = "50px"
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