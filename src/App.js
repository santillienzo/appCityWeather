import React, {Component} from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'weather-icons/css/weather-icons.css'

import Weather from './components/Weather'
import Form from './components/Form'

//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
const API_key = 'e9816131a162bfb986e16dfa4d0d0958';

class App extends Component{
  constructor(){
    super();
    //Definimos los estados del componente
    this.state = {
      city: undefined,
      country: undefined,
      main:undefined,
      minTemp:undefined,
      maxTemp:undefined,
      currentTemp:undefined,
      description:"",
      icon:undefined,
      error:false
    }

    //Definimos un objeto con todos los iconos para luego usarlos en la interfaz
    this.weatherIcon = {
      Thunderstorm:"wi-thunderstorm",
      Drizzle:"wi-sleet",
      Rain:"wi-storm-showers",
      Snow:"wi-snow",
      Atmosphere:"wi-fog",
      Clear:"wi-day-sunny",
      Clouds:"wi-day-fog"
    }
  }

  // pasar kelvin a celsius
  calculateCelsius(kelvin){
    let celsius = kelvin -273.15;
    return Math.floor(celsius);
  }

  //Con esta función seleccionamos los íconos de acuerdo al id del tiempo
  selectIcon(icons,id_tiempo){
    switch(true){
      case id_tiempo >= 200 && id_tiempo <=232:
        this.setState({icon:this.weatherIcon.Thunderstorm})
        break;
      case id_tiempo >= 300 && id_tiempo <=321:
        this.setState({icon:this.weatherIcon.Drizzle})
        break;
      case id_tiempo >= 500 && id_tiempo <=531:
        this.setState({icon:this.weatherIcon.Rain})
        break;
      case id_tiempo >= 600 && id_tiempo <=622:
        this.setState({icon:this.weatherIcon.Snow})
        break;
      case id_tiempo >= 701 && id_tiempo <=781:
        this.setState({icon:this.weatherIcon.Atmosphere})
        break;
      case id_tiempo == 800:
        this.setState({icon:this.weatherIcon.Clear})
        break;
      case id_tiempo > 800 && id_tiempo <=804:
        this.setState({icon:this.weatherIcon.Clouds})
        break;
      default:
        this.setState({icon:this.weatherIcon.Clouds})
    }
  }

  //Función para asignarle los valores a los estados utilizando el objeto json que nos envía la API
  getWeather = async(e) =>{
    e.preventDefault();

    const city=e.target.elements.city.value
    const country=e.target.elements.country.value

    if(city && country){
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`);

      const response = await api_call.json()

      console.log(response)

      this.setState({
        city:`${response.name},${response.sys.country}`,
        main:this.calculateCelsius(response.weather[0].main),
        minTemp:this.calculateCelsius(response.main.temp_min),
        maxTemp:this.calculateCelsius(response.main.temp_max),
        currentTemp:this.calculateCelsius(response.main.temp),
        description:response.weather[0].description,
        error:false
      })
      //Llamamos a la función para definir el ícono
      this.selectIcon(this.weatherIcon, response.weather[0].id)
    }else{
      this.setState({error:true})
    }
  }

  render(){
    return(
      <div className="App">
        <Form loadweather={this.getWeather} error={this.state.error}/>
        <Weather 
          city={this.state.city} 
          country={this.state.country} 
          minTemp={this.state.minTemp} 
          maxTemp={this.state.maxTemp}
          currentTemp={this.state.currentTemp}
          description={this.state.description}
          icon={this.state.icon}
        />
      </div>
    )
  }
}

export default App;
