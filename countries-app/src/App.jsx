import {useState, useEffect} from 'react';
import React from 'react'
import axios from 'axios';
import Country from './components/Country';
import CountryData from './components/CountryData';

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    fetch('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => response.json())
      .then(data => setCountries(data))
  }, [])

  // derived filtered list based on search
  const countryList = countries.filter(country =>
    country.name && country.name.common && country.name.common.toLowerCase().includes(search.toLowerCase())
  )

  const handleShowCountry = (country) => {
    setSelectedCountry(country)
  }

  return (
  
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {selectedCountry ? (
        <CountryData country={selectedCountry} />
      ) : (
        <ul>
          <Country countryList={countryList} onShowCountry={handleShowCountry} />
        </ul>
      )}
    </div>
  )
}

export default App

