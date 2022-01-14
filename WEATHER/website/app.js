// Personal API Key for OpenWeatherMap API
const apiKey = '25bb83df844c02ea6ed038a6cce3e3d3';
const baseUrl = 'http://api.openweathermap.org/data/2.5/forecast?zip='
const generateBtn = document.getElementById('generate');
const zip = document.getElementById('zip');
const feelings = document.getElementById('feelings')
const date = document.getElementById('date');
const temperature = document.getElementById('temp');
const content = document.getElementById('content');
/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//event listener activated when we click on generate button
generateBtn.addEventListener('click', () => {
    userZip = zip.value;
    userFeelings = feelings.value;
    displayWeather(baseUrl, userZip, apiKey)
        .then(data => {
            console.log(data);
            postData('/add', {date: newDate, temp: data.list[0].main.temp, content: userFeelings})
            updateUI();
        })
});

let displayWeather = async (baseUrl, zipCode, key) => {
    let request = await fetch(baseUrl+zipCode+key)
    try {
        // Transform into JSON
        const data = await request.json()
        return data;
        }
        catch(error) {
        console.log("error", error);
        
        }
};

const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)      
});

    try {
      const newData = await response.json();
      console.log(newData);
      return newData;
    }catch(error) {
    console.log("error", error);
    }
};

const updateUI = async () => {
    let request = await fetch('/all');
    try{
        let allData = await request.json();
        date.innerHTML = `DATE: ${allData[0].date}`;
        temperature.innerHTML = `TEMPERATURE: ${allData[0].temp}`;
        content.innerHTML = `YOU FEEL: ${allData[0].content}`;
    }catch(error) {
        console.log("error", error);
    }
}