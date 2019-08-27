import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import media from '../styled/media';

const Wrapper = styled(Paper)`
    && {
        max-width: 42rem;
        width: 100%;
        /* height: 100%; */
        box-sizing: border-box;
        min-height: 100%;
        margin: 0.9px auto;
        padding: 20px 20px 80px 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0px;
        flex-direction: column;

        ${media.small`
            padding: 20px 10px 80px;
        `}
    }
`;

export default Wrapper;
