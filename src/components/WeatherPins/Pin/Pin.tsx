import * as React from 'react';
import { FC, useEffect, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { colors } from '../../../styledHelpers/colors';
import { ICity } from '../../App';
import API from '../../../helpers/api';
import { WiBarometer, WiHumidity, WiStrongWind, WiNightAltSnow, WiNightClear, WiNightAltThunderstorm, WiNightAltShowers, WiNightFog, WiNightAltRain, WiNightAltCloudy, WiDaySunny, WiDayCloudy, WiDaySnow, WiDayThunderstorm, WiDayShowers, WiDayRain, WiDayFog } from "react-icons/wi";
import { VscChromeClose } from "react-icons/vsc";


interface IPin extends ICity {
    setCities(newCities: ICity[]): void;
}

const Pin: FC<IPin> = (props) => {
    //Refs
    const cityNameRef = useRef<HTMLDivElement>(null);
    //States
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [data, setData] = useState<any>();
    //UseEffects
    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${props.name}&lang=eng&units=metric&appid=${API.key}`)
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

    const getCityImage = () => {
        const cityTime = getCityTime();
        if (cityTime >= 20 && cityTime < 6) {
            switch (data?.weather[0].main) {
                case 'Clouds':
                    return (<WiNightAltCloudy />);
                case 'Snow':
                    return (<WiNightAltSnow />);
                case 'Clear':
                    return (<WiNightClear />);
                case 'Thunderstorm':
                    return (<WiNightAltThunderstorm />);
                case 'Drizzle':
                    return (<WiNightAltShowers />);
                case 'Rain':
                    return (<WiNightAltRain />);
                default:
                    return (<WiNightFog />);
            }
        }
        else {
            switch (data?.weather[0].main) {
                case 'Clouds':
                    return (<WiDayCloudy />);
                case 'Snow':
                    return (<WiDaySnow />);
                case 'Clear':
                    return (<WiDaySunny />);
                case 'Thunderstorm':
                    return (<WiDayThunderstorm />);
                case 'Drizzle':
                    return (<WiDayShowers />);
                case 'Rain':
                    return (<WiDayRain />);
                default:
                    return (<WiDayFog />);
            }
        }
    };


    if (!isLoaded)
        return (
            <LoadingWrapper>
                <LoadWrapper>
                    LOADING
                </LoadWrapper>
            </LoadingWrapper>
        );
    else
        return (
            <Wrapper time={getCityTime()}>
                <CityName ref={cityNameRef} cityLength={cityNameRef?.current ? cityNameRef.current!.scrollWidth : 0}>
                    {data?.name}
                </CityName>
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
                    {getCityImage()}
                </CityImage>
                <CityInfo>
                    <Info>
                        <WiStrongWind />
                        <p>{data?.wind.speed}km/h</p>
                    </Info>
                    <Info>
                        <WiBarometer />
                        <p>{data?.main.pressure}hPa</p>
                    </Info>
                    <Info>
                        <WiHumidity />
                        <p>{data?.main.humidity}%</p>
                    </Info>
                </CityInfo>
                <DeleteWrapper onClick={deleteHandler}>
                    <VscChromeClose />
                </DeleteWrapper>
            </Wrapper>
        );
}

export default Pin;

////////styled

//interfaces
interface IWrapper {
    time?: number;
}

interface ICityName {
    cityLength: number;
}

///

const Wrapper = styled.div<IWrapper>`
    overflow:hidden;
    margin:15px 0;
    min-width:300px;
    max-width:300px;
    height:500px;
    margin-right:15px;
    background-color:${colors.pink};
    box-shadow: #5a164f -3px -1px 15px;
    box-sizing:border-box;
    padding:15px 10px;
    border-radius:2px;
    position:relative;
    ${props => {
        if (props?.time === undefined) {
            return `
            background: rgb(74,63,182);
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
        else if (props?.time >= 0) {
            return `
            background: rgb(74,63,182);
            background: linear-gradient(0deg, rgba(74,63,182,1) 0%, rgba(100,91,179,1) 25%, rgba(30,24,88,1) 100%);
        `;
        }
    }};
`;

const CityName = styled.div<ICityName>`
    cursor:default;
    color:${colors.white};
    text-transform: uppercase;
    font-size: 45px;
    font-weight: 300;
    letter-spacing: 3px;
    text-shadow: black 1px 1px 1px;
    white-space:nowrap;
    transition:1s;
    ${props => (
        props?.cityLength >= 280 && `
        &:hover{
            transform:translateX(-${(props?.cityLength - 280)}px);
        }`
    )};
`;

const CityDate = styled.div`
    cursor:default;
    font-weight: 300;
    font-size: 14px;
    color: #ffffffa9;
    margin-top:5px;
`;

const Temp = styled.div`
    cursor:default;
    font-weight: 200;
    font-size: 50px;
    color: white;
    margin-top:5px;
`;
const WeatherText = styled.div`
    cursor:default;
    font-weight: 200;
    font-size: 24px;
    color: white;
`;

const CityImage = styled.div`
    margin-top:5px;
    display:flex;
    align-items:center;
    justify-content:center;
    width:100%;
    height:200px;
    font-size:170px;
    overflow:hidden;
`;

const CityInfo = styled.div`
    margin-top:5px;
    padding-top:15px;
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

const DeleteWrapper = styled.button`
    background-color:transparent;
    border:none;
    cursor:pointer;
    color: #ffffffa9;
    width:40px;
    height:40px;
    position:absolute;
    top:110px;
    right:-20px;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:40px;
    transition:.2s;
    &:hover{
        right:0px;
        color:white;
        background-color:#ffffff2f;
        border-radius:2px;
    }
`;


///////

const LoadingWrapper = styled(Wrapper)`
    display:flex;
    align-items:center;
    justify-content:center;
`

const BounceAnimation = keyframes`
    0% { transform:rotate(0deg); }
    100% { transform:rotate(360deg); }
`;
const LoadWrapper = styled.div`
    border: 2px solid white;
    width:60px;
    height:60px;
    border-radius:2px;
    animation: ${BounceAnimation} 2s linear infinite;
`;