import * as React from 'react';
import { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { generateUUID } from '../../helpers/uuidGenerator';
import { colors } from '../../styledHelpers/colors';
import { ICity } from '../App';
import API from '../../helpers/api';

interface IAddPinForm {
    visible: boolean;
    setCities(newCities: ICity[]): void;
    openHandler(): void;
}

const AddPinForm: FC<IAddPinForm> = (props) => {
    const formWrapper = useRef<HTMLDivElement>(null);

    const [cityInput, setCityInput] = useState<string>('');
    const [cityInputError, setCityError] = useState<string>('');

    const addCityHandler = () => {
        if (localStorage.getItem('cities') !== null) {
            fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityInput}&lang=eng&units=metric&appid=${API.key}`)
                .then(res => res.json())
                .then(
                    (result) => {
                        if (result.cod !== 200)
                            {
                                setCityInput('');
                                setCityError('Wrong city name!')
                                return;
                            }
                        let cities: ICity[] = JSON.parse(localStorage.getItem('cities') || '[]');
                        let newCity: ICity = {
                            name: result.name,
                            id: `${generateUUID()}`,
                        };
                        const isCityAdded = cities.filter(city => city.name === newCity.name);
                        if(isCityAdded.length === 0) //Check if added city is already existing
                        {
                            cities.push(newCity);
                            localStorage.setItem('cities', JSON.stringify(cities));
                            props.setCities(cities);
                            setCityInput('');
                            setCityError('');
                            props.openHandler();
                        }
                        else
                        {
                            setCityError('This city is already added!');
                            setCityInput('');
                        }
                    },
                    (error) => {
                        setCityError('Uknown error');
                    }
                );
        }
    };

    const closeHandler = (e:any) => {
        if(e.target == formWrapper.current)
            props.openHandler();
    }

    return (
        <Wrapper open={props.visible} ref={formWrapper} onClick={e => closeHandler(e)}>
            <Form open={props.visible}>
                <CityError>
                    {cityInputError}
                </CityError>
                <InputWrapper>
                    <FormInput value={cityInput} type='text' onChange={e => setCityInput(e.target.value)} />
                </InputWrapper>
                <InputButton onClick={addCityHandler}>Add</InputButton>
            </Form>
        </Wrapper>
    );
}

export default AddPinForm;

interface IWrapper {
    open: boolean;
}
const Wrapper = styled.div<IWrapper>`
    height:100vh;
    width:100vw;
    position:fixed;
    left:0;
    top:0;
    display:flex;
    align-items:center;
    justify-content:center;
    transition:.1s;
    visibility:hidden;
    background-color:#0000000;
    transform:scale(0.8);

    ${props => (props.open && ` 
        visibility:visible;
        background-color:#0000007b;
        transform:scale(1);
    `
    )};
`;

interface IForm {
    open: boolean;
}
const Form = styled.div<IForm>`
    background: rgb(223,36,183);
    background: linear-gradient(0deg, rgba(223,36,183,1) 0%, rgba(221,244,119,1) 100%);
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:space-around;
    width:250px;
    height:100px;
    border-radius:2px;
    opacity:0;
    box-shadow: black 0px 0px 5px;
    padding:5px 10px;
    ${props => (props.open && ` 
        opacity:1;
    `
    )};
`;

const FormInput = styled.input`
    height:25px;
    font-size:18px;
    width:245px;
    border:none;

    &:focus{
        border:none;
        outline:none;
    }
`;

const InputWrapper = styled.div`
    width:100%;
    padding:4px;
    background: linear-gradient(to right, #ff1e69, #10259c);
`;

const InputButton = styled.button`
    width:50px;
    height:30px;
    border:none;
    border-radius:2px;
    background-color:${colors.lightPurple};
    color:white;
    text-shadow:black 1px 1px 1px;
    transition:.2s;
    box-sizing:border-box;
    cursor:pointer;
    box-shadow: 0px 0px 5px black;
    &:hover{
        background-color: #ff1e69;
    }
    &:focus{
        border:none;
        outline:none;
    }
    &:active{
        background-color: #ff004c;
    }
`;

const CityError = styled.p`
    color:black;
    margin:0;
`;