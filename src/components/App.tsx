import * as React from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components'
import { colors } from '../styledHelpers/colors';
import WeatherPins from './WeatherPins/WeatherPins';

const App = () => {
    return (
        <Wrapper>
            <GlobalStyle />
            <WeatherPins />
        </Wrapper>
    );
}

export default App;

const Wrapper = styled.div`
`;


const GlobalStyle = createGlobalStyle`
  body { 
      color:${colors.white};
      background-color:${colors.purple};
      font-family: 'Roboto', sans-serif;
      max-width:100vw;
      min-height:100%;
  }
`;