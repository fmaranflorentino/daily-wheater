import React from 'react';

import Moment from 'moment';

import Wrapper from './../../../hoc/Wrapper';
import Button from './../../../components/UI/Button';

import './WeaterInformationCard.css';
import Clouds from './../../../assets/icons/clouds.svg';
import Sun from './../../../assets/icons/sun.svg';
import Snow from './../../../assets/icons/snowflake.svg';
import Rain from './../../../assets/icons/rain.svg';
import Refresh from './../../../assets/icons/refresh.svg';

const getWeatherIcon = (props) => {
    switch (props) {
        case 'Clouds':
            return Clouds;
        case 'Clear':
            return Sun;
        case 'Snow':
            return Snow;
        case 'Rain':
            return Rain;
        case 'Drizzle':
            return Rain;
        case 'Thunderstorm':
            return Rain;
        default:
            return props
    }
}

const getWeatherTranslation = (props) => {
    switch (props) {
        case 'Clouds':
            return 'Nuvens';
        case 'Rain':
            return 'Chuva'
        case 'Snow':
            return 'Neve';
        case 'Clear':
            return 'Limpo';
        case 'Drizzle':
            return 'Chuvisco';
        case 'Thunderstorm':
            return 'Tempestade';
        case 'broken clouds':
            return 'Nuvens Quebradas';
        case 'few clouds':
            return 'Algumas Nuvens'
        case 'scattered clouds':
            return 'Nuvens Dispersas';
        case 'overcast clouds':
            return 'Nuvens Nubladas';
        case 'light rain':
            return 'Chuva Leve';
        case 'moderate rain':
            return 'Chuva Moderada'
        case 'heavy intensity rain':
            return 'Chuva Pesada'
        case 'very heavy rain':
            return 'Chuva Pesada';
        case 'clear sky':
            return 'Céu Limpo';
        default:
            return props;
    }
}

const WeatherInformationCard = (props) => {
    const currentWeather = props.weather;

    if (currentWeather && currentWeather.description && props.show) {
        const weatherMain = currentWeather.main;
        const weatherDescription = currentWeather.description;
        const regionName = props.regionName;
        const lastUpdate = Moment(props.lastUpdate).format('DD/MM/YY HH:mm:ss');

        const classes = [
            'weather-card',
            props.show ? 'enter' : ''
        ];

        return (
            <Wrapper>
                <article className={classes.join(' ')}>
                    <header>
                        <div className='header-info'>
                            <img src={getWeatherIcon(weatherMain)} alt={weatherMain} />
                            <div className='temperature'>
                                <p>Tempo em <strong>{regionName}, {currentWeather.country}</strong></p>
                                <span>{props.main.temp} °C</span>
                            </div>
                        </div>
                    </header>
                    <div className='card-body'>
                        <div className='infos'>
                            <h5>{getWeatherTranslation(weatherMain)}</h5>
                            <p>{getWeatherTranslation(weatherDescription)}</p>
                        </div>
                        <div className='last-updates'>
                            <h5>Última atualização:</h5>
                            <p>{lastUpdate}</p>
                        </div>
                    </div>
                    <div className='card-footer'>
                        <Button
                            text='Atualizar'
                            type='small'
                            icon={Refresh}
                            click={props.refreshWeather}
                        />
                    </div>
                    <div>
                    </div>
                </article>
            </Wrapper>
        );
    }

}

export default WeatherInformationCard;