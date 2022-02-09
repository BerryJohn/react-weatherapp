import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../../styledHelpers/colors';
import { ICity } from '../../App';
import API from '../../../helpers/api';
import { WiBarometer, WiHumidity, WiStrongWind } from "react-icons/wi";

interface IPin extends ICity {
    setCities(newCities: ICity[]): void;
}

const Pin: FC<IPin> = (props) => {
    //States
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [data, setData] = useState<any>();
    //UseEffects
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

    //Handlers
    const deleteHandler = () => {
        if (localStorage.getItem('cities') !== null) {
            const savedCities: ICity[] = JSON.parse(localStorage.getItem('cities') || '[]');
            const newCities = savedCities.filter(city => city.id !== props.id);
            localStorage.setItem('cities', JSON.stringify(newCities));
            props.setCities(newCities);
        }
    };
    //Functions
    const transformDate = () => {
        const localDate = new Date();
        let localDateTime = localDate.getTime() + (localDate.getTimezoneOffset() * 60 * 1000) + data?.timezone * 1000;

        return new Date(localDateTime)
            .toLocaleString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })
            .replaceAll('.', '/');
    };

    const getCityTime = () => {
        const localDate = new Date();
        let localDateTime = localDate.getTime() + (localDate.getTimezoneOffset() * 60 * 1000) + data?.timezone * 1000;

        return new Date(localDateTime).getHours();
    };

    if (!isLoaded)
        return (
            <Wrapper>
                louuuding
            </Wrapper>
        );
    else
        return (
            <Wrapper time={getCityTime()}>
                <City>
                    {data?.name}
                </City>
                <CityDate>
                    {transformDate()}
                </CityDate>
                <Temp>
                    {data?.main.temp}&deg;
                </Temp>
                <WeatherText>
                    {data?.weather[0].main}
                </WeatherText>
                <CityImage>

                </CityImage>
                <CityInfo>
                    <Info>
                        <WiStrongWind />
                        <p>{data?.wind.speed}km/h</p>
                    </Info>
                    <Info>
                        <WiBarometer />
                        <p>{data?.main.pressure}</p>
                    </Info>
                    <Info>
                        <WiHumidity />
                        <p>{data?.main.humidity}%</p>
                    </Info>
                </CityInfo>
                {/* <button onClick={deleteHandler}>delete</button> */}
            </Wrapper>
        );
}

export default Pin;


interface IWrapper {
    time?: number;
}

const Wrapper = styled.div<IWrapper>`
    width:300px;
    height:500px;
    margin-right:15px;
    background-color:${colors.pink};
    box-shadow: #5a164f -3px -1px 15px;
    box-sizing:border-box;
    padding:15px 10px;
    border-radius:2px;
    ${props => {
        if (props?.time === undefined) {
            return `
            background: rgb(74,63,182);
            background: linear-gradient(0deg, #3fb649 0%, #d51a1a 100%);
        `;
        }
        else if (props?.time >= 22) {
            return `
            background: rgb(74,63,182);
            background: linear-gradient(0deg, rgba(74,63,182,1) 0%, rgba(100,91,179,1) 25%, rgba(30,24,88,1) 100%);
        `;
        }
        else if (props?.time >= 18) {
            return `
            background: rgb(74,63,182);
            background: linear-gradient(0deg, rgba(74,63,182,1) 0%, rgba(210,48,159,1) 25%, rgba(30,24,88,1) 100%);
        `;
        }
        else if (props?.time >= 12) {
            return `
            background: rgb(135,36,223);
            background: linear-gradient(0deg, rgba(135,36,223,1) 0%, rgba(210,48,159,1) 31%, rgba(221,244,119,1) 100%);
        `;
        }
        else if (props?.time >= 6) {
            return `
            background: rgb(74,63,182);
            background: linear-gradient(0deg, rgba(74,63,182,1) 0%, rgba(100,91,179,1) 25%, rgba(210,48,159,1)   100%);
        `;
        }
    }};
`;

const City = styled.div`
    color:${colors.white};
    text-transform: uppercase;
    font-size: 45px;
    font-weight: 300;
    letter-spacing: 3px;
    text-shadow: black 1px 1px 1px;
`;

const CityDate = styled.div`
    font-weight: 300;
    font-size: 14px;
    color: #ffffffa9;
    margin-top:5px;
`;

const Temp = styled.div`
    font-weight: 200;
    font-size: 50px;
    color: white;
    margin-top:5px;
`;
const WeatherText = styled.div`
    font-weight: 200;
    font-size: 24px;
    color: white;
`;

const CityImage = styled.div`
    margin-top:5px;
    /* background-color:red; */
    width:100%;
    height:200px;
`;

const CityInfo = styled.div`
    margin-top:5px;
    padding-top:5px;
    border-top:1px solid #ffffffa9;
    color: #ffffffa9;
    width:100%;
    height:60px;
    display:flex;
    justify-content:space-around;
`;

const Info = styled.div`
    width:80px;
    height:80px;
    font-size:30px;
    display:flex;
    align-items:center;
    flex-direction:column;
    transition:.2s;
    & p{
        font-size:16px;
    }
    &:hover{
        color:white;
        transform:scale(1.1);
    }
`;