import React, { Component } from 'react';
import axios from 'axios';

import Wrapper from '../../hoc/Wrapper';
import WeaterInformationCard from './../../components/Wheater/WheaterInformationCard';
import Button from './../../components/UI/Button'

import './Wheater.css';
import Storm from './../../assets/icons/storm.svg';
import Place from './../../assets/icons/place.svg';
// import Modal from './../../components/UI/Modal/Modal';


class Wheater extends Component {
  state = {
    hasGeolocation: undefined,
    currentWeather: [],
    initialAnimation: false,
    finishAnimation: false,
  }

  constructor() {
    super();
    this.oi = this.oi.bind(this);
  }

  componentDidMount() {
    this.setState({ initialAnimation: true })
    setTimeout(() => {
      console.log(this.state)
      this.setState({ finishAnimation: true })

    }, 600);
  }

  geterror(error) {
    console.log(error);
  }

  oi() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getposition, this.geterror);
    }
  }

  getposition = (position) => {
    const latitude = position.coords.latitude;
    const lon = position.coords.longitude;

    const params = {
      lat: latitude,
      lon,
      APPID: '3cc15f29b5e1a6baec11ab23768ab424',
      units: 'metric'
    };

    // this.setState({ hasGeolocation: true });

    this.get(params);
  }

  get(params) {
    axios.get(`http://api.openweathermap.org/data/2.5/weather`, { params })
      .then(res => {
        const currentWeather = res.data;
        const [weather] = res.data.weather;
        currentWeather.weather = weather;

        this.setState({ currentWeather, hasGeolocation: true });

      })
  }


  render() {
    const noContentClasses = [
      'no-content',
      this.state.initialAnimation ? 'activeNoContent' : 'dsd',
      this.state.finishAnimation ? 'finish' : 'leaveActiveContent'
    ];

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


          {/* <Modal show={true} >
               bctt
                </Modal> */}
        </Wrapper>
      )
    }
    return (
      <Wrapper>
        <section>
          <div className={noContentClasses.join(' ')}>
            <img width='70' src={Storm} alt='Ícone de tempestade' />
            <p><span>Hummm!</span> Precisamos de sua localização para iniciar!</p>
            <Button
              click={this.oi}
              text='Ativar localização'
              icon={Place}
            />
          </div>
        </section>
      </Wrapper>
    );
  }
}

export default Wheater;