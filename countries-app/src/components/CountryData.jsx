import React from 'react'
import axios from 'axios';
import { useEffect } from 'react';

const CountryData = ({ country }) => {
    

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h2>Languages:</h2>
      <ul>
        {country.languages && Object.values(country.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      {country.flags && <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />}
    </div>
  )
}

export default CountryData
