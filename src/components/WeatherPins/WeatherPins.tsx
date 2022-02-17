import * as React from 'react';
import { FC } from 'react';
import styled from 'styled-components';
import { ICity } from '../App';
import Pin from './Pin/Pin';

interface IWeatherPins{
    cities: ICity[];
    setCities(newCities: ICity[]): void;
}

const WeatherPins:FC<IWeatherPins> = (props) => {

    return (
        <Wrapper>
            {props.cities?.map(city =>
                <Pin 
                    key={city.id}
                    id={city.id}
                    name={city.name}
                    setCities={props.setCities}    
                />
            )}
        </Wrapper>
    );
}

export default WeatherPins;

const Wrapper = styled.div`
    min-width:100vw;
    max-width:100vw;
    min-height:100vh;
    display:flex;
    align-items:center;
    justify-content: safe center;
    flex-wrap:wrap;
    overflow:hidden;
`;