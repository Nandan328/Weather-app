const apiKey = '5020d15a9ed6b59262edefee58eb615c';
const searchBox = document.getElementById('searchBox');
const display = document.querySelector('.display'); 

async function getData()
{
    const cityName = searchBox.value.trim();
    var apiUrl;
    if(cityName)
    {
        apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
        try{
            var data = await fetch(apiUrl);
            if(!data.ok)
            {
                throw new Error("City not found");
            }
            wet = await data.json();
            searchBox.value = "";
            display.innerHTML = "";
            display.style.display = "flex";
            showData(wet);
        }
        catch(err)
        {
            displayError(err);
        }
        
    }
    else
    {
        displayError("Please enter a city name");
    }
}   

function showData(data)
{   
    cityName = data.name;
    tem = data.main.temp;
    des = data.weather[0].description;
    id = data.weather[0].id;

    const cName = document.createElement('p');
    cName.classList.add('city');
    cName.textContent = cityName;
    display.appendChild(cName);

    const cTemp = document.createElement('p');
    cTemp.classList.add('temp');
    cTemp.textContent = (tem-273.15).toFixed(1) + "°C";
    display.appendChild(cTemp);

    const cDesc = document.createElement('p');
    cDesc.classList.add('desc');
    cDesc.textContent = des;
    display.appendChild(cDesc);
    
    const cEmoji = document.createElement('p');
    cEmoji.classList.add('emoji');
    cEmoji.textContent = createEmoji(id);
    display.appendChild(cEmoji);
}

function createEmoji(id){
    switch(true){
        case (id >= 200 && id < 300):
            return "⛈️";
        case (id >= 300 && id < 500):
            return "🌧️";
        case (id >= 500 && id < 600):
            return "☔";
        case (id >= 600 && id < 700):
            return "❄️";
        case (id >= 700 && id < 800):
            return "🌫️";
        case id === 800:
            return "☀️";
        case id > 800:
            return "☁️";
        default:
            return "❓";
    }
}

function displayError(message)
{
    display.innerHTML = "";
    display.style.display = "flex";
    const error = document.createElement('p');
    error.classList.add('error');
    error.textContent = message;
    display.appendChild(error);
}
