import * as React from 'react';
import styled from 'styled-components';
import { colors } from '../../../styledHelpers/colors';

const Pin = () => {
    return (
        <Wrapper>
            test
        </Wrapper>
    );
}

export default Pin;

const Wrapper = styled.div`
    width:200px;
    height:300px;
    background-color:${colors.pink};
`;