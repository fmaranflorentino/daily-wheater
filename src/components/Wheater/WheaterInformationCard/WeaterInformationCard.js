import React from 'react';

import Wrapper from './../../../hoc/Wrapper';
import Button from './../../../components/UI/Button';

import './WeaterInformationCard.css';
import Cloud from './../../../assets/icons/cloud.svg';
import EyeOpen from './../../../assets/icons/eye-open.svg';

const WeatherInformationCard = (props) => {
    const currentWeather = props.weather;

    if (currentWeather && currentWeather.description && props.show) {
        const weatherMain = currentWeather.main;
        const weatherDescription = currentWeather.description;
        const regionName = props.regionName;

        const classes = [
            'weather-card',
            props.show ? 'enter' : 'dsd'
        ];

        return (
            <Wrapper>
                <article className={classes.join(' ')}>
                    <header>
                        <div className='header-info'>
                            <img width="90" src={Cloud} alt='Nuvens' />
                            <span>{props.main.temp} °</span>
                        </div>
                        <h3>{regionName}</h3>
                    </header>
                    <div className='card-body'>
                        <div>
                            <h5>{weatherMain}</h5>
                            <p>{weatherDescription}</p>
                        </div>
                        <Button
                            text='Ver mais detalhes'
                            type='small'
                            icon={EyeOpen}
                        />
                    </div>
                </article>
            </Wrapper>
        );
    }

}

export default WeatherInformationCard;