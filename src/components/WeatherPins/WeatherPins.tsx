import * as React from 'react';
import { FC } from 'react';
import styled from 'styled-components';
import { colors } from '../../styledHelpers/colors';
import { ICity } from '../App';
import Pin from './Pin/Pin';

interface IWeatherPins{
    cities: ICity[];
    setCities(newCities: ICity[]): void;
}

const WeatherPins:FC<IWeatherPins> = (props) => {

    return (
        <>
            {props.cities.map(city =>
                <Pin 
                    key={city.id}
                    id={city.id}
                    name={city.name}
                    setCities={props.setCities}    
                />
            )}
        </>
    );
}

export default WeatherPins;
