const apiKey = 'e10afd6cfab564666c75decad3486359';

let cityName;
const form = document.querySelector('#forms');
const input = document.querySelector('#InputCity');
const icon = document.querySelector('.imageadm');
const selectedCards = [];

const choosecardmenu = document.querySelector('.choosecardmenu');
const cardmenu = document.querySelector('.cardmenu');
const carditems = document.querySelectorAll('.cardmenu li');


choosecardmenu.addEventListener('mouseover', showMenu);
choosecardmenu.addEventListener('mouseout', hideMenu);
form.addEventListener('submit', onSubmitForm);
carditems.forEach((item, index) => item.addEventListener('click', onCardItemClick));


function showMenu() {
  cardmenu.style.display = 'block';
}

function hideMenu() {
  cardmenu.style.display = 'none';
}

function onCardItemClick() {
  const cardIndex = Array.from(carditems).indexOf(this);
  const isSelected = selectedCards.includes(cardIndex);
  
  if (isSelected) {
  selectedCards.splice(selectedCards.indexOf(cardIndex), 1);
  } else {
  selectedCards.push(cardIndex);
  }
  
  console.log(`Selected cards: ${selectedCards.join(', ')}`);
  }


const btntemp = document.querySelector('.btntemp');
const btndescr = document.querySelector('.btndescr');
const btnsave = document.querySelector('.btnsave');
const btnret = document.querySelector('.btndel');

// Обробник події для кнопки "Змінити" температуру
btntemp.addEventListener('click', () => {
  const tempInput = document.querySelector('#temp');
  tempInput.disabled = false;
  btntemp.disabled = true;
});




// Обробник події для кнопки "Змінити" опис погоди
btndescr.addEventListener('click', () => {
  const descrInput = document.querySelector('#decript');
  descrInput.disabled = false;
  btndescr.disabled = true;
  btnsave.disabled = false;
});

btnret.addEventListener('click', function(event) {
  event.preventDefault(); // prevent the default button behavior
  const btnadmin = document.querySelector('.btndel');
  btnadmin.onclick = function() {
    window.location.href = 'index.html';
  }
  

  
});


// Обробник події для кнопки "Зберегти" опис погоди
btnsave.addEventListener('click', () => {
  const descrInput = document.querySelector('#decript');
  descrInput.disabled = true;
  btndescr.disabled = false;
  
  const tempInput = document.querySelector('#temp');
  tempInput.disabled = true;
  btntemp.disabled = false;
  
  btnsave.disabled = true;
  
  const temperature = tempInput.value;
  
  const description = descrInput.value;
  const now = new Date();
  const date = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
  
  // Отримуємо дату та час
  document.querySelector('.valueadm').innerHTML = (`${temperature}&deg;C`);
  document.querySelector('.decriptionadm').textContent = description;
  icon.src="image/black.png";
  // Відправляємо дані на сервер
  fetch('https://6460dda2491f9402f4998a68.mockapi.io/api/v1/weather', {
  method: 'POST',
  headers: {
  'Content-Type': 'application/json; charset=utf-8'
  },
  body: JSON.stringify({
  cityName: cityName,
  temperature: temperature,
  description: description,
  selectedCardIndex: selectedCards.length > 0 ? selectedCards[0] : null,
  date
  })
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log(error));
  });


  function showLastSavedWeather() {
    fetch('https://6460dda2491f9402f4998a68.mockapi.io/api/v1/weather?_sort=createdAt&_order=asc&_limit=1')
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const lastSavedWeather = data[data.length - 1];
          document.querySelector('.valueadm').innerHTML = `${lastSavedWeather.temperature}&deg;C`;
          document.querySelector('.decriptionadm').textContent = lastSavedWeather.description
          document.querySelector('.cityadm').textContent = lastSavedWeather.cityName;
          document.querySelector('.dateadm').textContent = lastSavedWeather.date;
          icon.src="image/black.png";
        }
      })
      .catch(error => console.log(error));
  }
  

  window.addEventListener('load', showLastSavedWeather);


function onSubmitForm(e) {
  e.preventDefault();
  cityName = input.value.trim();
  const url = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&lang=ua&appid=${apiKey}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const selectedCardIndex = selectedCards.length > 0 ? selectedCards[0] : 0;
      const selectedCardData = data.list[selectedCardIndex];
      const temperature = Math.round(selectedCardData.main.temp - 273, 15);
      const description = selectedCardData.weather[0].description;

      document.querySelector('.cityadm').textContent = data.city.name;
      document.querySelector('.valueadm').innerHTML = `${temperature}&deg;C`;
      document.querySelector('.decriptionadm').textContent = description;

      document.querySelector('#temp').value = temperature;
      document.querySelector('#decript').value = description;

      const datetime = selectedCardData.dt_txt;
      const timezoneOffsetSeconds = data.city.timezone;
      const localDate = new Date(new Date(datetime).getTime() + timezoneOffsetSeconds * 1000);
      const hour = localDate.getHours();
      document.querySelector('.dateadm').textContent = datetime;

      if ((hour >= 21 && hour <= 23) || (hour >= 0 && hour <= 6)) { 
        if (selectedCardData.weather[0].main === "Clouds") {
          icon.src = "image/cloudy night.png";
        } else if (selectedCardData.weather[0].main === "Rain") {
          icon.src = "image/rainy.png";
        } else if (selectedCardData.weather[0].main === "Clear") {
          icon.src = "image/night.png";
        } else if (selectedCardData.weather[0].main === "Overcast") {
          icon.src = "image/mainly cloudy.png";
        }
      } else {
        if (selectedCardData.weather[0].main === "Clouds") {
          icon.src = "image/cloudy.png";
        } else if (selectedCardData.weather[0].main === "Rain") {
          icon.src = "image/rainy.png";
        } else if (selectedCardData.weather[0].main === "Clear") {
          icon.src = "image/sunny.png";
        }
      }
    })
    .catch((error) => console.log(error));
}





  
  


