import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components'
import { colors } from '../styledHelpers/colors';
import AddPinForm from './AddPinForm/AddPinForm';
import WeatherPins from './WeatherPins/WeatherPins';

export interface ICity{
    name: string;
    id: string;
}

const App = () => {
    const [formOpen, setFormOpen] = useState<boolean>(false);
    const [cities, setCities] = useState<ICity[]>([]);

    useEffect(() =>{
        if(localStorage.getItem('cities') === null)
        {
            localStorage.setItem('cities', '');
        }
        else
        {
            const savedCities: ICity[] = JSON.parse(localStorage.getItem('cities') || '[]');
            setCitiesHandler(savedCities);
        }
    },[]);

    const setCitiesHandler = (newCities: ICity[]) => {
        setCities(newCities);
    };

    const openFormHandler = () => {
        setFormOpen(!formOpen);
    };
    
    return (
        <Wrapper>
            <GlobalStyle />
            <WeatherPins cities={cities} setCities={setCitiesHandler}/>
            <AddPinForm visible={formOpen} setCities={setCitiesHandler}/>
            <AddPinButton onClick={openFormHandler}/>
        </Wrapper>
    );
}

export default App;

const Wrapper = styled.div`
      max-width:100vw;
      min-height:100vh;
      position:relative;
`;

const AddPinButton = styled.button`
    border:none;
    width:40px;
    height:40px;
    border-radius:20px;
    background-color:${colors.lightPurple};
    cursor:pointer;
    position:absolute;
    bottom:20px;
    right:20px;
`;

const GlobalStyle = createGlobalStyle`
  body { 
      color:${colors.white};
      background-color:${colors.purple};
      font-family: 'Roboto', sans-serif;
      max-width:100vw;
      min-height:100%;
      padding:0px;
      margin:0px;
      position:relative;
  }
`;