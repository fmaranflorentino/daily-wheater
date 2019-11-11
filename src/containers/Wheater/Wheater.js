import React, { Component } from 'react';
import axios from 'axios';

import Wrapper from '../../hoc/Wrapper';
import Error from './../../components/UI/Error';
import Loader from './../../components/UI/Loader';

import WeaterInformationCard from './../../components/Wheater/WheaterInformationCard';
import NoGeolocation from './../../components/UI/NoGeolocation';

import './Wheater.css';
import Place from './../../assets/icons/place.svg';


class Wheater extends Component {
  state = {
    hasGeolocation: undefined,
    userDenied: false,
    currentWeather: [],
    initialAnimation: false,
    finishAnimation: false,
    loadingRequest: false,
    hasweater: false,
    lastUpdate: null,
    requestParams: null,
  }

  constructor() {
    super();

    this.requestUserLocation = this.requestUserLocation.bind(this);
    this.getUserGeolocationHandler = this.getUserGeolocationHandler.bind(this);
    this.userRequestLocationHandler = this.userRequestLocationHandler.bind(this);
    this.requestWeatherForescast = this.requestWeatherForescast.bind(this);
    this.refreshWeatherStatus = this.refreshWeatherStatus.bind(this);
    this.setError = this.setError.bind(this);
  }

  componentDidMount() {
    this.setState({ initialAnimation: true })
    setTimeout(() => {
      this.setState({ finishAnimation: true })
    }, 600);
  }

  setError(error) {
    this.setState({ error: true });
  }

  userRequestLocationHandler(error) {
    if (error && error.code === 1) {
      this.setState({ userDenied: true })
    }
  }

  requestUserLocation(request) {
    if (navigator.geolocation) {
      navigator.geolocation
        .getCurrentPosition(this.getUserGeolocationHandler, this.userRequestLocationHandler);
    }
  }

  getUserGeolocationHandler = (position) => {
    const latitude = position.coords.latitude;
    const lon = position.coords.longitude;

    const params = {
      lon,
      lat: latitude,
      APPID: '3cc15f29b5e1a6baec11ab23768ab424',
      units: 'metric'
    };

    this.setState({ hasGeolocation: true, requestParams: params });

    this.requestWeatherForescast(params);
  }

  executeRequest(params) {
    return new Promise((resolve, reject) => {
      axios.get(`https://api.openweathermap.org/data/2.5/weather`, { params })
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
    }
    );
  }

  requestWeatherForescast(params) {
    this.setState({ loadingRequest: true });

    this.executeRequest(params)
      .then((res) => {
        const currentWeather = res.data;
        const [weather] = res.data.weather;
        currentWeather.weather = weather;
        weather.country = res.data.sys.country;
        const date = new Date().toString();

        this.setState({
          currentWeather,
          hasWeater: true,
          loadingRequest: false,
          lastUpdate: date,
        });
      });
  }

  refreshWeatherStatus ()  {
    this.setState({ loadingRequest: true });
    const params = this.state.requestParams;

    this.requestWeatherForescast(params);
  }

  render() {
    const defaultState = (
      <Wrapper>
        <NoGeolocation
          initialAnimation={this.state.initialAnimation}
          finishAnimation={this.state.finishAnimation}
          span='opss!'
          message='Precisamos de sua localização para iniciar!'
          btnText='Ativar localização'
          btnIcon={Place}
          click={this.requestUserLocation}
        />
      </Wrapper>
    );

    const hasWeatherInformationState = (
      <Wrapper>

        <WeaterInformationCard
          weather={this.state.currentWeather.weather}
          regionName={this.state.currentWeather.name}
          lastUpdate={this.state.lastUpdate}
          show={this.state.hasGeolocation}
          main={this.state.currentWeather.main}
          refreshWeather={this.refreshWeatherStatus}
        />

      </Wrapper>
    )

    if (this.state && this.state.hasWeater && !this.state.loadingRequest) {
      return hasWeatherInformationState;
    }

    if (this.state && this.state.userDenied && !this.state.loadingRequest) {
      return <Error message='Você não autorizou nossa aplicação acessar sua localização :/' />;
    }

    if (this.state && this.state.loadingRequest) {
      return <Loader />;
    }

    return defaultState;
  }

}

export default Wheater;