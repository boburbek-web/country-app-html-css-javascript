const countryName = new URLSearchParams(location.search).get('name'),
  flagImage = document.querySelector('.country-details img'),
  countryNameH1 = document.querySelector('.country-details h1'),
  nativeName = document.querySelector('.native-name'),
  population = document.querySelector('.population'),
  region = document.querySelector('.region'),
  subRegion = document.querySelector('.sub-region'),
  capital = document.querySelector('.capital'),
  topLevelDomain = document.querySelector('.top-level-domain'),
  currencies = document.querySelector('.currencies'),
  languages = document.querySelector('.languages'),
  borderCountries = document.querySelector('.border-countries'),
  themeChanger = document.querySelector('.theme-changer');


// Mode
themeChanger.addEventListener('click', () => {
  document.body.classList.toggle('dark')
})
async function fetchCountryDetails() {
  const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  const [country] = await response.json()

  flagImage.src = country.flags.svg
  countryNameH1.innerText = country.name.common
  population.innerText = country.population.toLocaleString('en-IN')
  region.innerText = country.region
  topLevelDomain.innerText = country.tld.join(', ')
  capital.innerText = country.capital?.[0]

  if (country.subregion) {
    subRegion.innerText = country.subregion
  }

  if (country.name.nativeName) {
    nativeName.innerText = Object.values(country.name.nativeName)[0].common
  } else {
    nativeName.innerText = country.name.common
  }

  if (country.currencies) {
    currencies.innerText = Object.values(country.currencies)
      .map((currency) => currency.name)
      .join(', ')
  }

  if (country.languages) {
    languages.innerText = Object.values(country.languages).join(', ')
  }

  if (country.borders) {
    for (const border of country.borders) {
      const response = await fetch(`https://restcountries.com/v3.1/alpha/${border}`)
      const [borderCountry] = await response.json()

      const borderCountryTag = document.createElement('a')
      borderCountryTag.innerText = borderCountry.name.common
      borderCountryTag.href = `country.html?name=${borderCountry.name.common}`
      borderCountries.append(borderCountryTag)
    }
  }
}

fetchCountryDetails()
