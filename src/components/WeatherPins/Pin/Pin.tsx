import * as React from 'react';
import { FC } from 'react';
import styled from 'styled-components';
import { colors } from '../../../styledHelpers/colors';
import { ICity } from '../../App';

interface IPin extends ICity{
    setCities(newCities: ICity[]): void;
}

const Pin: FC<IPin> = (props) => {

    const deleteHandler = () => {
        if(localStorage.getItem('cities') !== null)
        {
            const savedCities: ICity[] = JSON.parse(localStorage.getItem('cities') || '[]');
            const newCities = savedCities.filter(city => city.id !== props.id);
            localStorage.setItem('cities', JSON.stringify(newCities));
            props.setCities(newCities);
        }
    };

    return (
        <Wrapper>
            {props.name}
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