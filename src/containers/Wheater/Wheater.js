import React, { Component } from 'react';
import axios from 'axios';

import Wrapper from '../../hoc/Wrapper';
import WeaterInformationCard from './../../components/Wheater/WheaterInformationCard';
import NoGeolocation from './../../components/UI/NoGeolocation';

import './Wheater.css';
import Place from './../../assets/icons/place.svg';


class Wheater extends Component {
  state = {
    hasGeolocation: undefined,
    currentWeather: [],
    initialAnimation: false,
    finishAnimation: false,
  }

  constructor() {
    super();
    this.requestUserLocation = this.requestUserLocation.bind(this);
    this.getUserGeolocationHandler = this.getUserGeolocationHandler.bind(this);
  }

  componentDidMount() {
    this.setState({ initialAnimation: true })
    setTimeout(() => {
      console.log(this.state)
      this.setState({ finishAnimation: true })

    }, 600);
  }

  userRequestLocationHandler(error) {
    console.log(error);
  }

  requestUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation
      .getCurrentPosition(this.getUserGeolocationHandler, this.userRequestLocationHandler);
    }
  }

  getUserGeolocationHandler = (position) => {
    const latitude = position.coords.latitude;
    const lon = position.coords.longitude;

    const params = {
      lat: latitude,
      lon,
      APPID: '3cc15f29b5e1a6baec11ab23768ab424',
      units: 'metric'
    };

    this.requestWeatherForescast(params);
  }

  requestWeatherForescast(params) {
    axios.get(`http://api.openweathermap.org/data/2.5/weather`, { params })
      .then(res => {
        const currentWeather = res.data;
        const [weather] = res.data.weather;
        currentWeather.weather = weather;

        this.setState({ currentWeather, hasGeolocation: true });
      });
  }


  render() {
    if (this.state && this.state.hasGeolocation) {
      const regionName = this.state.currentWeather.name;
      return (
        <Wrapper>

          <WeaterInformationCard
            weather={this.state.currentWeather.weather}
            regionName={regionName}
            show={this.state.hasGeolocation}
            main={this.state.currentWeather.main}
          />

        </Wrapper>
      )
    }
    return (
      <Wrapper>
        <NoGeolocation
          initialAnimation={this.state.initialAnimation}
          finishAnimation={this.state.finishAnimation}
          span='Hummm!'
          message='Precisamos de sua localização para iniciar!'
          btnText='Ativar localização'
          btnIcon={Place}
          click={this.requestUserLocation}
        />
        {/* <section>
          <div className={noContentClasses.join(' ')}>
            <img width='70' src={Storm} alt='Ícone de tempestade' />
            <p><span></span> </p>
            <Button
              click={this.requestUserLocation}
              text='Ativar localização'
              icon={Place}
            />
          </div>
        </section> */}
      </Wrapper>
    );
  }
}

export default Wheater;