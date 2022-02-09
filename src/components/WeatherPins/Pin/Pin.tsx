import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../../styledHelpers/colors';
import { ICity } from '../../App';
import API from '../../../helpers/api';

interface IPin extends ICity{
    setCities(newCities: ICity[]): void;
}

const Pin: FC<IPin> = (props) => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [data, setData] = useState<any>();
  
    useEffect(() => {
      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${props.name}&lang=eng&units=metric&appid=${API.key}`)
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setData(result);
          },
          (error) => {
            setIsLoaded(true);
          }
        )
    }, []);

    const deleteHandler = () => {
        if(localStorage.getItem('cities') !== null)
        {
            const savedCities: ICity[] = JSON.parse(localStorage.getItem('cities') || '[]');
            const newCities = savedCities.filter(city => city.id !== props.id);
            localStorage.setItem('cities', JSON.stringify(newCities));
            props.setCities(newCities);
        }
    };

    if(!isLoaded)
    return (
        <Wrapper>
            louuuding
        </Wrapper>
    );
    else
    return (
        <Wrapper>
            {data?.name}
            {data?.main.temp}
            <button onClick={deleteHandler}>delete</button>
        </Wrapper>
    );
}

export default Pin;

const Wrapper = styled.div`
    width:200px;
    height:300px;
    background-color:${colors.pink};
`;