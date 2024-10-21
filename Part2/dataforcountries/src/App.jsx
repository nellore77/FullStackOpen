import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/";

  const [countries, setCountries] = useState([]); // Get countries
  const [filterCountries, setFilterCountries] = useState([]); // Filtered countries
  const [searchTerm, setSearchTerm] = useState(""); // Track search term
  const [selectedCountry, setSelectedCountry] = useState(null); // Track selected country
  const [weather, setWeather] = useState(null); // Track weather data

  useEffect(() => {
    getAllCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const { latlng } = selectedCountry; // Use lat, lon coordinates for weather data
      getWeatherData(latlng[0], latlng[1]); // Fetch weather for selected country's lat/lon
    }
  }, [selectedCountry]);

  const getAllCountries = async () => {
    try {
      const response = await axios.get(`${baseUrl}/all`);
      setCountries(response.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const getWeatherData = async (lat, lon) => {
    const apiKey = import.meta.env.VITE_API_KEY; // Use your provided API key
    const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${apiKey}&units=metric`;

    try {
      const response = await axios.get(weatherUrl);
      setWeather(response.data); // Set weather data for the selected country's lat/lon
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const applyFilter = (searchTerm) => {
    const filtered = countries.filter((country) => {
      const countryName = country.name.common.toLowerCase();
      return countryName.includes(searchTerm.toLowerCase());
    });

    setFilterCountries(filtered);
  };

  const getFilterCountries = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm); // Update search term state

    // If countries are already fetched, apply the filter immediately
    if (countries.length > 0 && searchTerm.length >= 1) {
      applyFilter(searchTerm);
    } else {
      setFilterCountries([]); // Clear results if search is cleared
      setSelectedCountry(null);
    }
  };

  const showCountryDetails = (country) => {
    setSelectedCountry(country); // Set the selected country
    setWeather(null); // Reset weather data when selecting a new country
  };

  return (
    <div>
      Find countries
      <input type="text" onChange={getFilterCountries} />
      <div>
        {filterCountries.length > 10 ? (
          <p>Size more than 10... add more letters</p>
        ) : filterCountries.length > 1 ? (
          filterCountries.map((country, index) => (
            <p key={index}>
              {country.name.common}{" "}
              <button onClick={() => showCountryDetails(country)}>Show</button>
            </p>
          ))
        ) : filterCountries.length === 1 ? (
          <div>
            <h1>{filterCountries[0].name.common}</h1>
            <p>Capital: {filterCountries[0].capital}</p>
            <p>Area: {filterCountries[0].area}</p>
            <p><strong>Languages:</strong></p>
            <ul>
              {Object.entries(filterCountries[0].languages).map(
                ([key, value]) => (
                  <li key={key}>{value}</li>
                )
              )}
            </ul>
            <img
              src={filterCountries[0].flags.png}
              alt="Flag of the country"
            />
          </div>
        ) : (
          <p>No countries found</p>
        )}

        {/* Display selected country details when a country is clicked */}
        {selectedCountry && (
          <div>
            <h1>{selectedCountry.name.common}</h1>
            <p>Capital: {selectedCountry.capital}</p>
            <p>Area: {selectedCountry.area}</p>
            <p><strong>Languages:</strong></p>
            <ul>
              {Object.entries(selectedCountry.languages).map(([key, value]) => (
                <li key={key}>{value}</li>
              ))}
            </ul>
            <img
              src={selectedCountry.flags.png}
              alt={`Flag of ${selectedCountry.name.common}`}
            />

            {/* Weather information */}
            {weather ? (
              <div>
                <h3>Weather in {selectedCountry.capital}</h3>
                <p>Temperature: {weather.current.temp}°C</p>
                <p>Weather: {weather.current.weather[0].description}</p>
                <img
                  src={`http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`}
                  alt="Weather icon"
                />
              </div>
            ) : (
              <p>Loading weather data...</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
