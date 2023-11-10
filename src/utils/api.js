const WEATHER_API_KEY = "533124e009250eb21a0bb77c07771675";

export async function fetchWeatherData(latitude, longitude) {
  try {
    const [weatherPromise, forecastPromise] = await Promise.all([
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric&lang=pt_br`
      ),
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric&lang=pt_br`
      ),
    ]);

    const weatherResponse = await weatherPromise.json();
    const forcastResponse = await forecastPromise.json();
    return [weatherResponse, forcastResponse];
  } catch (error) {
    console.log(error);
  }
}
