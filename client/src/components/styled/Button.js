import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const StyledButton = styled(Button)`
    && {
        text-transform: none;
        font-weight: bolder;
        color: ${props => (props.color === 'primary' ? '#00d9c5' : '#ffffff')};
        margin: ${props => (props.margin ? props.margin : null)};
        width: ${props => (props.width ? props.width : '160px')};
        background-color: ${props =>
            props.backgroundcolor === 'primary' ? '#00d9c5' : '#ffffff'};
        font-size: ${props => (props.fontsize ? props.fontsize : '16px')};
        padding: ${props => props.padding};
        border-radius: 2px;
        height: ${props => (props.height ? props.height : '45px')};
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.24),
            0px 0px 2px rgba(0, 0, 0, 0.12);
    }
    &&:hover {
        background-color: ${props =>
            props.hovercolor ? props.hovercolor : '#00EAD4'};
    }
`;

export default StyledButton;
