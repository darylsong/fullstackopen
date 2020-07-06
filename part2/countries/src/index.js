import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const Weather = ({ country }) => {
  const [ countryWeather, setCountryWeather ] = useState({
    location: { name: '' },
    current: { temperature: 0, wind_speed: 0, wind_dir: '' }
  })

  const countryName = country.name

  useEffect(() => {
    axios
      .get('http://api.weatherstack.com/current?access_key=' + process.env.REACT_APP_API_KEY + '&query=' + countryName)
      .then(response => {
        setCountryWeather(response.data)
      })
  })

  return (
    <div>
      <h2>Weather in {countryWeather.location.name}</h2>
      <div><strong>temperature: </strong> {countryWeather.current.temperature} celcius</div>
    
  <div><strong>wind: </strong> {countryWeather.current.wind_speed} mph direction {countryWeather.current.wind_dir}</div>

    </div>
  )

}

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h2>languages</h2>
      <ul>
        {country.languages.map(language => (
          <li key={language.iso639_1}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt={country.name} width='200px' border='2' />
      <Weather country={country} />
    </div>
  )
}

const Find = ({ searchTerm, handleInputChange}) => {
  return (
    <div>
      find countries <input value={searchTerm} onChange={handleInputChange} />
  </div>
  )
}

const Result = ({ countries }) => {
  const [ showCountry, setShowCountry ] = useState(false)
  const [ countryToBeShown, setCountryToBeShown ] = useState(countries[0])

  const handleButtonClick = (event) => {
    countries.forEach(country => {
      if (country.name === event.target.attributes.country.value) {
        setCountryToBeShown(country)
      }
    })

    setShowCountry(true)
  }

  if (countries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (countries.length === 1) {
      return (
        <div>
          <Country country={countries[0]} />
        </div>
      )
  } else if (countries.length === 0) {
      return (
        <div>
          No matches
        </div>
      )
  } else {
      return (
        <div>
          {countries.map(country => (
            <div key={country.numericCode}>
              {country.name}
              <button onClick={handleButtonClick} country={country.name}>show</button>
            </div>
          ))}
          
          { showCountry ? <Country country={countryToBeShown} /> : null }
        </div>
      )
  }

}

const App = () => {
  const [ countries, setCountries ] = useState([]) 
  const [ searchTerm, setSearchTerm ] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const nameContainsTerm = (name, searchTerm) => {
    if (name.toLowerCase().indexOf(searchTerm.toLowerCase()) === -1) {
        return false
    } else {
        return true
    }
  }

  const filteredCountries = countries.filter(country => {
    return nameContainsTerm(country.name, searchTerm)
  })

  return (
    <div>
      <Find searchTerm={searchTerm} handleInputChange={handleInputChange} />
      <Result countries={filteredCountries} />
    </div>
  )


}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);