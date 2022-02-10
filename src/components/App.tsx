import React, { useEffect, useState } from 'react';
import { VscAdd } from 'react-icons/vsc';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components'
import { colors } from '../styledHelpers/colors';
import AddPinForm from './AddPinForm/AddPinForm';
import WeatherPins from './WeatherPins/WeatherPins';

export interface ICity {
    name: string;
    id: string;
}

const App = () => {
    const [formOpen, setFormOpen] = useState<boolean>(false);
    const [cities, setCities] = useState<ICity[]>([]);

    useEffect(() => {
        if (localStorage.getItem('cities') === null) {
            localStorage.setItem('cities', '');
        }
        else {
            const savedCities: ICity[] = JSON.parse(localStorage.getItem('cities') || '[]');
            setCitiesHandler(savedCities);
        }
    }, []);

    const setCitiesHandler = (newCities: ICity[]) => {
        setCities(newCities);
    };

    const openFormHandler = () => {
        setFormOpen(!formOpen);
    };

    return (
        <Wrapper>
            <GlobalStyle />
            <WeatherPins cities={cities} setCities={setCitiesHandler} />
            <AddPinForm visible={formOpen} setCities={setCitiesHandler} openHandler={openFormHandler}/>
            <AddPinButton onClick={openFormHandler}>
                <VscAdd />
            </AddPinButton>
        </Wrapper>
    );
}

export default App;

const Wrapper = styled.div`
      min-width:100vw;
      min-height:100vh;
      position:relative;
      overflow-y:hidden; 
`;

const AddPinButton = styled.button`
    border:none;
    width:40px;
    height:40px;
    border-radius:4px;
    background-color:${colors.lightPurple};
    box-shadow: black -1px 0px 8px;
    cursor:pointer;
    position:fixed;
    bottom:20px;
    right:20px;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:20px;
    transition:.1s;
    &:hover{
        transform:scale(1.05);
    }
`;

const GlobalStyle = createGlobalStyle`
  body { 
      color:${colors.white};
      background: rgb(64,0,134);
      background: linear-gradient(0deg, rgba(64,0,134,1) 0%, rgba(212,59,255,1) 100%); 
      min-width:100vw;
      min-height:100%;
      padding:0px;
      margin:0px;
      position:relative;
      font-family: 'Lato', sans-serif;
  }
`;