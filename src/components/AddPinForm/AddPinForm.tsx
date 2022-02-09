import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { generateUUID } from '../../helpers/uuidGenerator';
import { colors } from '../../styledHelpers/colors';
import { ICity } from '../App';

interface IAddPinForm{
    visible: boolean;
    setCities(newCities: ICity[]): void;
}

const AddPinForm: FC<IAddPinForm> = (props) => {

    const [cityInput, setCityInput] = useState<string>('');

    const addCityHandler = () => {
        if(localStorage.getItem('cities') !== null)    
        {
            let cities: ICity[] = JSON.parse(localStorage.getItem('cities') || '[]');
            let newCity: ICity = {
                name: cityInput, 
                id: `${generateUUID()}`,
            };
            cities.push(newCity);
            localStorage.setItem('cities', JSON.stringify(cities));
            props.setCities(cities);
        }
    };

    return (
        <Wrapper open={props.visible}>   
            <input type='text' onChange={e => setCityInput(e.target.value)}/>
            <button onClick={addCityHandler}>Add</button>
        </Wrapper>
    );
}

export default AddPinForm;

interface IWrapper{
    open: boolean;
}
const Wrapper = styled.div<IWrapper>`
    height:100px;
    width:200px;
    position:fixed;
    left:calc(50% - 100px);
    top:calc(50% - 50px);
    background-color:red;
    visibility:hidden;
    ${props => (props.open && 'visibility:visible;')};
`;