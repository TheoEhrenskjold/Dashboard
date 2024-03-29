/*Time script */


    function updateClock() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();    
    var day = now.getDate();
    var month = now.getMonth() + 1; // Month is zero-based
    var year = now.getFullYear();

    // Format time to two digits if less than 10
    hours = ("0" + hours).slice(-2);
    minutes = ("0" + minutes).slice(-2);    
    month = ("0" + month).slice(-2);

    var clockDiv = document.getElementById('clock');
    clockDiv.textContent = hours + ':' + minutes;

    var dateDiv = document.getElementById('date');
    dateDiv.textContent = day + '/' + month + '/' + year;
}

// Call updateClock function every second to update time
setInterval(updateClock, 1000);

// Initial call to set the time immediately when the page loads
updateClock();




/*Edit the H1*/

function makeHeaderEditable() {
    // Hitta rubrik-elementet
    const rubrik = document.getElementById('rubrik');
  
    if (!rubrik) {
      console.error("Element with ID 'rubrik' not found.");
      return;
    }
  
    // Ladda den sparade rubriken från localStorage om den finns
    const savedHeader = localStorage.getItem('headerText');
    if (savedHeader) {
      rubrik.textContent = savedHeader;
    }
  
    // Lägg till klickhändelse för att göra rubriken redigerbar
    rubrik.addEventListener('click', function() {
      // Skapa ett input-element
      const inputElement = document.createElement('input');
      inputElement.setAttribute('type', 'text');
  
      // Kopiera rubrikens stil till input-elementet
      inputElement.style.font = window.getComputedStyle(rubrik).font;
      inputElement.style.color = window.getComputedStyle(rubrik).color;
      inputElement.style.backgroundColor = window.getComputedStyle(rubrik).backgroundColor;
      inputElement.style.border = 'none';
    //   inputElement.style.border = window.getComputedStyle(rubrik).marginLeft;
        inputElement.style.border = window.getComputedStyle(rubrik).marginTop;

      const rect = rubrik.getBoundingClientRect();
    inputElement.style.position = 'relative';    
    inputElement.style.marginTop = '5%';
    inputElement.style.marginLeft = '40%';
  
      // Sätt det befintliga rubrik-textvärdet som värdet i input-fältet
      inputElement.value = rubrik.textContent;
  
      // Byt ut rubrik-elementet med input-elementet
      rubrik.parentNode.insertBefore(inputElement, rubrik);
      rubrik.style.display = 'none';
  
      // Fokus på input-elementet
      inputElement.focus();
  
      // Lyssna på ändringar i input-elementet
      inputElement.addEventListener('blur', function() {
        // Spara den ändrade rubriken i localStorage
        localStorage.setItem('headerText', inputElement.value);
  
        // Visa rubrik-elementet igen och uppdatera texten
        rubrik.style.display = 'inline-block';
        rubrik.textContent = inputElement.value;
  
        // Ta bort input-elementet
        inputElement.parentNode.removeChild(inputElement);
      });
    });
  }  
  // Anropa funktionen när sidan har laddats
  window.onload = makeHeaderEditable;






  /* Script för Snabblänkar */
  document.addEventListener("DOMContentLoaded", function() {
    const linksContainer = document.getElementById('links-list');
    const toggleLinkFormBtn = document.getElementById('toggle-link-form-btn');
    const linkUrlInput = document.getElementById('link-url');
    const linkTitleInput = document.getElementById('link-title');
    const addLinkBtn = document.getElementById('add-link-btn');
  
    // Define preset links
    const presetLinks = JSON.parse(localStorage.getItem('presetLinks')) || [
      { url: 'https://Google.com', title: 'Google' },
      { url: 'https://campusvarberg.learnpoint.se/GroupForms/Groups.aspx', title: 'LearnPoint' },
      { url: 'https://qlok.notion.site/SUT23-957b2a2ab7cb4dd1a02f5e6b2c01a28b', title: 'Notion' }
    ];
  
    // Function to render links
    function renderLinks() {
      linksContainer.innerHTML = '';
      presetLinks.forEach((link, index) => {
        const li = createLinkListItem(link, index);
        linksContainer.appendChild(li);
      });
  
      const savedLinks = JSON.parse(localStorage.getItem('links')) || [];
      savedLinks.forEach((link, index) => {
        const li = createLinkListItem(link, presetLinks.length + index);
        linksContainer.appendChild(li);
      });
    }
  
    // Function to create list item for link
    function createLinkListItem(link, index) {
      const li = document.createElement('li');
      const linkElement = document.createElement('a');
      linkElement.href = link.url;
      linkElement.textContent = link.title;
      linkElement.target = '_blank';
      const faviconUrl = `https://www.google.com/s2/favicons?domain=${link.url}`;
      const faviconImg = document.createElement('img');
      faviconImg.src = faviconUrl;
      faviconImg.classList.add('favicon');
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Remove';
      deleteBtn.addEventListener('click', function() {
        deleteLink(index);
      });
      li.appendChild(linkElement);
      li.appendChild(faviconImg);
      li.appendChild(deleteBtn);
      return li;
    }
  
    // Initial rendering of links
    renderLinks();
  
    // Event listener for adding a new link
    addLinkBtn.addEventListener('click', function() {
      const url = linkUrlInput.value.trim();
      const title = linkTitleInput.value.trim();
      if (url !== '' && title !== '') {
        const link = { url, title };
        saveLink(link);
        linkUrlInput.value = '';
        linkTitleInput.value = '';
        renderLinks();
      } else {
        alert('Please enter both URL and Title.');
      }
    });
  
    // Function to save a link
    function saveLink(link) {
      let links = JSON.parse(localStorage.getItem('links')) || [];
      links.push(link);
      localStorage.setItem('links', JSON.stringify(links));
    }
  
    // Function to delete a link
    function deleteLink(index) {
      if (index < presetLinks.length) {
        presetLinks.splice(index, 1);
        localStorage.setItem('presetLinks', JSON.stringify(presetLinks)); // Update localStorage
      } else {
        let links = JSON.parse(localStorage.getItem('links')) || [];
        links.splice(index - presetLinks.length, 1);
        localStorage.setItem('links', JSON.stringify(links));
      }
      renderLinks();
    }
  
    // Event listener for toggling the link form
    toggleLinkFormBtn.addEventListener('click', function() {
      linkUrlInput.style.display = linkUrlInput.style.display === 'none' ? 'block' : 'none';
      linkTitleInput.style.display = linkTitleInput.style.display === 'none' ? 'block' : 'none';
      addLinkBtn.style.display = addLinkBtn.style.display === 'none' ? 'block' : 'none';
    });
  });

  /* VÄDER API */
  document.addEventListener("DOMContentLoaded", function() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const apiKey = "cfb9c03368371327dd383433f67578a1";

            // Hämta Unix-tidsstampel för dagens datum
            const todayUnixTimestamp = Math.floor(Date.now() / 1000);

            // Hämta Unix-tidsstampel för imorgon
            const tomorrowUnixTimestamp = todayUnixTimestamp + 86400;

            // Hämta Unix-tidsstampel för dagen efter imorgon
            const twoDaysLaterUnixTimestamp = tomorrowUnixTimestamp + 86400;

            // API URL för att hämta väderprognoser för idag, imorgon och två dagar framöver
            const apiUrlToday = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&dt=${todayUnixTimestamp}&appid=${apiKey}`;
            const apiUrlTomorrow = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&dt=${tomorrowUnixTimestamp}&appid=${apiKey}`;
            const apiUrlTwoDaysLater = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&dt=${twoDaysLaterUnixTimestamp}&appid=${apiKey}`;

            try {
                const responseToday = await fetch(apiUrlToday);
                const responseTomorrow = await fetch(apiUrlTomorrow);
                const responseTwoDaysLater = await fetch(apiUrlTwoDaysLater);
                
                const dataToday = await responseToday.json();
                const dataTomorrow = await responseTomorrow.json();
                const dataTwoDaysLater = await responseTwoDaysLater.json();

                displayWeather(dataToday, dataTomorrow, dataTwoDaysLater);
            } catch (error) {
                console.error("Error fetching weather data:", error);
                displayError();
            }
        });
    } else {
        console.error("Geolocation is not supported by this browser.");
        displayError();
    }
});

function displayWeather(dataToday, dataTomorrow, dataTwoDaysLater) {
  const weatherInfo = document.getElementById("weather-info");

  if (dataToday.main && dataToday.weather && dataToday.weather[0] &&
      dataTomorrow.list && dataTomorrow.list[0] && dataTomorrow.list[0].main && dataTomorrow.list[0].weather && dataTomorrow.list[0].weather[0] &&
      dataTwoDaysLater.list && dataTwoDaysLater.list[0] && dataTwoDaysLater.list[0].main && dataTwoDaysLater.list[0].weather && dataTwoDaysLater.list[0].weather[0]) {

      const cityNameToday = dataToday.name;
      const temperatureKelvinToday = dataToday.main.temp;
      const temperatureCelsiusToday = temperatureKelvinToday - 273.15;
      const descriptionToday = dataToday.weather[0].description;

      
      let temperatureCelsiusTomorrow = null;
      let descriptionTomorrow = null;
      for (const forecast of dataTomorrow.list) {
        if (forecast.dt_txt.includes("12:00:00")) { 
          temperatureCelsiusTomorrow = forecast.main.temp - 273.15;
          descriptionTomorrow = forecast.weather[0].description;
          break;
        }
      }

      // Find the temperature for two days later
      let temperatureCelsiusTwoDaysLater = null;
      let descriptionTwoDaysLater = null;
      for (const forecast of dataTwoDaysLater.list) {
        if (forecast.dt_txt.includes("12:00:00")) { 
          temperatureCelsiusTwoDaysLater = forecast.main.temp - 273.15;
          descriptionTwoDaysLater = forecast.weather[0].description;
          break;
        }
      }

      weatherInfo.innerHTML = `
          <div class="weather-box">
              <p><strong>Idag:</strong></p>
              <p>Stad: ${cityNameToday}</p>
              <p>Temperatur: ${temperatureCelsiusToday.toFixed(2)} °C</p>
              <p>Väder: ${descriptionToday}</p>
          </div>
          <div class="weather-box">
              <p><strong>Imorgon:</strong></p>
              <p>Stad: ${cityNameToday}</p>
              <p>Temperatur: ${temperatureCelsiusTomorrow.toFixed(2)} °C</p>
              <p>Väder: ${descriptionTomorrow}</p>
          </div>
          <div class="weather-box">
              <p><strong>Om två dagar:</strong></p>
              <p>Stad: ${cityNameToday}</p>
              <p>Temperatur: ${temperatureCelsiusTwoDaysLater.toFixed(2)} °C</p>
              <p>Väder: ${descriptionTwoDaysLater}</p>
          </div>
      `;
  } else {
      displayError();
  }
}

function displayError() {
    const weatherInfo = document.getElementById("weather-info");
    weatherInfo.textContent = "Kunde inte hämta väderinformation.";
}








/* Anteckningar */
const notesTextarea = document.getElementById("notes-textarea");

        // Ladda in tidigare sparade anteckningar vid sidans laddning
        notesTextarea.value = localStorage.getItem("notes") || "";

        // Lyssna på inmatningsevenemang och spara innehållet i Local Storage
        notesTextarea.addEventListener("input", function() {
            const notesContent = notesTextarea.value;
            localStorage.setItem("notes", notesContent);
        });




/* Pokemon API */
document.addEventListener("DOMContentLoaded", function() {
  const fetchButton = document.getElementById("fetch-button");
  const pokemonInput = document.getElementById("pokemon-input");

  fetchButton.addEventListener("click", function() {
      const pokemonId = pokemonInput.value.trim();
      if (!pokemonId) {
          alert("Please enter a Pokémon ID.");
          return;
      }

      const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

      fetch(apiUrl)
          .then(response => {
              if (!response.ok) {
                  throw new Error("Failed to fetch Pokémon data.");
              }
              return response.json();
          })
          .then(data => {
              displayPokemonInfo(data);
          })
          .catch(error => {
              console.error("Error fetching Pokémon data:", error);
              displayError();
          });
  });

  function displayPokemonInfo(pokemon) {
      const pokemonInfo = document.getElementById("pokemon-info");
      pokemonInfo.innerHTML = `
          <h2>${pokemon.name}</h2>
          <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="pokemon-sprite">
          <p>Height: ${pokemon.height + "0"} CM</p>
          <p>Weight: ${pokemon.weight /10} Kg</p>
      `;
  }

  function displayError() {
      const pokemonInfo = document.getElementById("pokemon-info");
      pokemonInfo.innerHTML = "<p>Failed to fetch Pokémon data.</p>";
  }
});




/* Backgrunds api */
const searchButton = document.getElementById("search-button");
        const searchKeywordInput = document.getElementById("search-keyword");

        // Load the last search keyword from local storage
        const lastKeyword = localStorage.getItem("lastKeyword");
        if (lastKeyword) {
            searchKeywordInput.value = lastKeyword;
            fetchRandomImage(lastKeyword)
                .then(imageUrl => {
                    if (imageUrl) {
                        document.body.style.backgroundImage = `url(${imageUrl})`;
                    } else {
                        console.error("Failed to fetch random image.");
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                });
        }

        searchButton.addEventListener("click", () => {
            const searchKeyword = searchKeywordInput.value.trim();

            if (searchKeyword) {
                fetchRandomImage(searchKeyword)
                    .then(imageUrl => {
                        if (imageUrl) {
                            document.body.style.backgroundImage = `url(${imageUrl})`;
                            // Save the search keyword to local storage
                            localStorage.setItem("lastKeyword", searchKeyword);
                        } else {
                            console.error("Failed to fetch random image.");
                        }
                    })
                    .catch(error => {
                        console.error("Error:", error);
                    });
            } else {
                console.error("Please enter a keyword.");
            }
        });

        async function fetchRandomImage(keyword) {
            const apiKey = "MFAYgorQGLEl7hg7S1HQJKllgtVfIYXQ2duiUy2EiDQ";
            const apiUrl = `https://api.unsplash.com/photos/random?query=${keyword}&client_id=${apiKey}`;

            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error("Failed to fetch random image.");
                }
                const data = await response.json();
                return data.urls.regular;
            } catch (error) {
                throw error;
            }
        }







