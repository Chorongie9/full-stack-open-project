import React from 'react'
import CountryData from './CountryData';

const Country = ({ countryList, onShowCountry }) => {
  if (!Array.isArray(countryList) || countryList.length === 0) {
    return null
  }

  if (countryList.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  if (countryList.length === 1) {
    return <CountryData country={countryList[0]} />
  }

  // when between 2 and 10 (inclusive) show each country on its own list item
  return (
    <>
      {countryList.map(country => (
        <li key={country.cca3 || country.name.common}>
          {country.name.common} <button onClick={() => onShowCountry(country)}>Show</button>
        </li>
      ))}
    </>
  )
}

export default Country
