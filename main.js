/*http://api.openweathermap.org/data/2.5/forecast?q=Київ&lang=ua&appid=e10afd6cfab564666c75decad3486359*/

const btnadmin = document.querySelector('.btnadmin');
btnadmin.onclick = function() {
  window.location.href = 'login.html';
}
const apiKey= 'e10afd6cfab564666c75decad3486359';

let cityName ;
const form = document.querySelector('#form');
const input = document.querySelector('#inputCity');


const icons=[ 
  document.querySelector('.image'),
document.querySelector('.image1'),
document.querySelector('.image2'),
document.querySelector('.image3'),
document.querySelector('.image4'),
document.querySelector('.image5'),
document.querySelector('.image6'),
document.querySelector('.image7'),
document.querySelector('.image8'),
];
const cities =[
  document.querySelector('.city'),
  document.querySelector('.city1'),
  document.querySelector('.city2'), 
  document.querySelector('.city3'),
  document.querySelector('.city4'),
  document.querySelector('.city5'),
  document.querySelector('.city6'),
  document.querySelector('.city7'),
  document.querySelector('.city8')];

  const values = [
    document.querySelector('.value'),
    document.querySelector('.value1'),
    document.querySelector('.value2'),
    document.querySelector('.value3'),
    document.querySelector('.value4'),
    document.querySelector('.value5'),
    document.querySelector('.value6'),
    document.querySelector('.value7'),
    document.querySelector('.value8')
  ];
  const descroptions = [
    document.querySelector('.decription'),
    document.querySelector('.decription1'),
    document.querySelector('.decription2'),
    document.querySelector('.decription3'),
    document.querySelector('.decription4'),
    document.querySelector('.decription5'),
    document.querySelector('.decription6'),
    document.querySelector('.decription7'),
    document.querySelector('.decription8')
  ];
  const datatimes = [
    document.querySelector('.date'),
    document.querySelector('.date1'),
    document.querySelector('.date2'),
    document.querySelector('.date3'),
    document.querySelector('.date4'),
    document.querySelector('.date5'),
    document.querySelector('.date6'),
    document.querySelector('.date7'),
    document.querySelector('.date8')
  ];


const urlmock = `https://6460dda2491f9402f4998a68.mockapi.io/api/v1/weather`;
form.onsubmit = function(e){
  e.preventDefault();
  cityName = input.value.trim();

  const url = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&lang=ua&appid=${apiKey}`;
  fetch(url).then((response)=>{
    if (!response.ok) {
      throw new Error('Місто не знайдено');
    }
   
    return response.json()
  }).then((data)=>{
    console.log(data);


    for (let i = 0; i <10; i++) {

      const image = icons[i];
      const city = cities[i];
      const value = values[i];
      const description = descroptions[i];
      const date = datatimes[i];

      
      const datetime = data.list[i].dt_txt; 
      const timezoneOffsetSeconds = data.city.timezone; 
      const dates = new Date(datetime); // створення об'єкту дати
      const localDate = new Date(dates.getTime() + timezoneOffsetSeconds * 1000); // додавання часового поясу до дати
      const hour = localDate.getHours(); // отримання годин з локальної дати


      console.log(`Локальний час ${localDate}`);
      console.log(`година ${hour}`);

      cities[i].innerHTML = data.city.name;
      values[i].innerHTML = Math.round(data.list[i].main.temp - 273, 15) + '&degC';
      descroptions[i].innerHTML = data.list[i].weather[0].description;
      datatimes[i].innerHTML = datetime;

      if ((hour >= 21 && hour <= 23) || (hour >= 0 && hour <= 6)) {
        if (data.list[i].weather[0].main === "Clouds") {
          icons[i].src = "image/cloudy night.png";
        } else if (data.list[i].weather[0].main === "Rain") {
          icons[i].src = "image/rainy.png";
        } else if (data.list[i].weather[0].main === "Clear") {
          icons[i].src = "image/night.png";
        } else if (data.list[i].weather[0].main === "Overcast") {
          icons[i].src = "image/mainly cloudy.png";
        }
      } else {
        if (data.list[i].weather[0].main === "Clouds") {
          icons[i].src = "image/cloudy.png";
        } else if (data.list[i].weather[0].main === "Rain") {
          icons[i].src = "image/rainy.png";
        } else if (data.list[i].weather[0].main === "Clear") {
          icons[i].src = "image/sunny.png";
        }
      }
      //console.log(data);
      console.log(data.city.name);
      console.log(Math.round(data.list[i].main.temp-273,15));
      console.log(data.list[i].weather[0].description);
      console.log(data.list[i].dt_txt);
      input.value = ''; // Очищуємо значення поля input
      input.placeholder = `${cityName}`; // Встановлюємо повідомлення у полі input
    }

    
    /*....*/
  })
  .catch((error) => {
    console.log(error);
    input.classList.add('error'); // Додаємо клас "error" до поля input
    
      input.value = ''; // Очищуємо значення поля input
      input.placeholder = 'Місто не знайдено'; // Встановлюємо повідомлення у полі input
   
  });
}
/*})
.catch((error) => {
console.log(error);
});
}*/
  
  
  /*const mockApiUrl = `${urlmock}?cityName=${cityName}`;
    fetch(mockApiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          // Якщо місто є в mock api, використовуємо дані з нього
          const mockData = data[0];
          console.log(mockData);
          console.log(mockData.name);
          console.log(Math.round(mockData.temp - 273, 15));
          console.log(mockData.description);
          console.log(mockData.dt_txt);
          document.querySelector('.city').textContent = mockData.cityName;
          document.querySelector('.value').innerHTML = Math.round(mockData.temperature) + '&degC';
          document.querySelector('.decription').textContent = mockData.description;

         
  
          /*const datetime = mockData.dt_txt; // отримання дати і часу з mock api
  
          const timezoneOffsetSeconds = mockData.timezone; // отримання часового поясу в секундах
  
          const date = new Date(datetime); // створення об'єкту дати
          const localDate = new Date(date.getTime() + timezoneOffsetSeconds * 1000); // додавання часового поясу до дати
  
          const hour = localDate.getHours(); // отримання годин з локальної дати
          document.querySelector('.date').textContent = datetime;
          console.log(localDate);
          console.log(hour);
  
          if ((hour >= 21 && hour <= 23) || (hour >= 0 && hour <= 6)) {
            console.log("зараз ніч");// якщо зараз ніч
            if (mockData.weather === "Clouds") {
              icon.src = "image/cloudy night.png";
            } else if (mockData.weather === "Rain") {
              icon.src = "image/rainy.png";
            } else if (mockData.weather === "Clear") {
              icon.src = "image/night.png";
            } else if (mockData.weather === "Overcast") {
              icon.src = "image/mainly cloudy.png";
            }
          } else {
            console.log("зараз день");
            if (mockData.weather === "Clouds") {
              icon.src = "image/cloudy.png";
            } else if (mockData.weather === "Rain") {
              icon.src = "image/rainy.png";
            } else if (mockData.weather === "Clear") {
              icon.src = "image/sunny.png";
            }
          }
        } else {*/
  
    
 