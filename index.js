const weatherform=document.querySelector(".weatherform");
const cityInput=document.querySelector(".cityInput");
const card=document.querySelector(".card");
const apikey= "47511c322a0b590d3de5aa90cb940df5";



weatherform.addEventListener("submit",async event =>
    { 
          event.preventDefault();
          city=cityInput.value;
          if(city){
                 try{
                   const weatherData= await getWeatherData(city);
                   displayWeatherInfo(weatherData);

                 }
                 catch(error){
                    displayerror(error);
                 }
          }
          else{
            displayerror("Please Enter a City");
             
          }
    }
)

async function getWeatherData(city){
   const apiurl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`
   const response =await fetch(apiurl);
    if(!response.ok){
        throw new error("colud not fetch data")
    }
    else{
        return  await response.json();
    }
} 

function displayWeatherInfo(data){
   const {name:city,
          main:{temp,humidity},
          weather:[{description,id}]}=data;
          card.textContent=" ";
          card.style.display="flex";
          
          const cityDisplay=document.createElement("h1");
          const tempDisplay=document.createElement("p");
          const humidityDisplay=document.createElement("p");
          const descDisplay=document.createElement("p");
          const weatherEmoji=document.createElement("p");
          cityDisplay.classList.add("cityDisplay");
          cityDisplay.textContent=city;
          card.appendChild(cityDisplay);

          tempDisplay.classList.add("tempDisplay");
          tempDisplay.textContent=`${(temp-273.15).toFixed(1)} °C`;
          card.appendChild(tempDisplay);

          humidityDisplay.classList.add("humidityDisplay")
          humidityDisplay.textContent=`Humidity :${humidity}%`;
          card.appendChild(humidityDisplay);

          descDisplay.classList.add("descDisplay");
          descDisplay.textContent=description;
          card.appendChild(descDisplay);

          weatherEmoji.classList.add("weatherEmoji");
          weatherEmoji.textContent=getWeatherEmoji(id);
          card.appendChild(weatherEmoji);


           
           

}

function getWeatherEmoji(WeatherId){
       if(WeatherId>=200)
        return "⛈️";
        else if(WeatherId>=300)
            return "🌧️";
    else if(WeatherId>=400)
        return "🌧️";
    else if(WeatherId>=600)
        return "🌨️";
else if(WeatherId>=700)
    return "☀️";
    else if(WeatherId>=800)
        return "☀️";
}

function displayerror(message){
          const errorDisplay=document.createElement("p");
          errorDisplay.textContent=message;
         
          console.error(message)
         
          card.textContent="";
          card.style.display="flex";
          card.appendChild(errorDisplay);
}


