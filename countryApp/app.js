const searchInput = document.querySelector('.search-container input'),
       filterByRegion = document.querySelector('.filter-by-region'),
       countriesContainer = document.querySelector('.countries-container'),
       themeChanger = document.querySelector('.theme-changer');


// Mode
themeChanger.addEventListener('click', () => {
  document.body.classList.toggle('dark')
})

// All countries
let allCountriesData=[]
fetch(`https://restcountries.com/v3.1/all`)
  .then((response) => response.json())
  .then((data) => {
    renderCountries(data)
    allCountriesData = data
  }
  )


// Qit'a bo'yicha filter qilish
filterByRegion.addEventListener('change', (e) => {
  fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
    .then((response) => response.json())
    .then(renderCountries)

})

// Davlatlarni qidirish
searchInput.addEventListener('keyup', () => {
  const searchText = searchInput.value.toLowerCase();

  const filteredCountries = allCountriesData.filter((country) => {
    const countryName = country.name.common.toLowerCase();
    return countryName.includes(searchText);
  });

  renderCountries(filteredCountries);
});


function renderCountries(data) {
  countriesContainer.innerHTML = data.map(country => `
    <div class="country-card">
      <a href="./pages/country.html?name=${country.name.common}">
        <img src="${country.flags.svg}" alt="${country.name.common} flag"/>
        <div class="card-text">
          <h3 class="card-title">${country.name.common}</h3>
          <p><b>Population: </b>${country.population}</p>
          <p><b>Region: </b>${country.region}</p>
          <p><b>Capital: </b>${country.capital}</p>
        </div>
      </a>
    </div>
  `).join('');
}
