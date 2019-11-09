import React, { Component } from 'react';
import axios from 'axios';

import Wrapper from '../../hoc/Wrapper';
import Modal from './../../components/UI/Modal/Modal';


class Wheater extends Component {
  state = {
    wheater: [],
  }

  componentWillMount() {
    if (navigator.geolocation && navigator.geolocation.getCurrentPosition) {
      navigator.geolocation.getCurrentPosition(this.getposition);
    }
  }

  getposition = (position) => {
    const latitude = position.coords.latitude;
    const lon = position.coords.longitude;

    const params = {
      lat: latitude,
      lon,
      APPID: '3cc15f29b5e1a6baec11ab23768ab424',
    };

    axios.get(`http://api.openweathermap.org/data/2.5/weather`, { params })
    .then(res => {
      const wheater = res.data;
      this.setState({ wheater });
    })
  }

  render() {
    if (this.state && this.state.wheater) {
      const infos = this.state.wheater;
      return (
        <Wrapper>
          <p>
            {infos.name}
          </p>

          {/* <Modal show={true} >
               bctt
                </Modal> */}
        </Wrapper>
      )
    }
    return (
        <Wrapper>
            <div>wheater title</div>
            <div>wheater info</div>
        </Wrapper>
    );
  }
}

export default Wheater;