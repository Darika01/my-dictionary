import CircularLoader from 'components/atoms/CircularLoader';

import { StyledBackdrop } from './styles';

const BackdropLoader: React.FC = (): JSX.Element => {
    return (
        <StyledBackdrop open>
            <CircularLoader size="4rem" />
        </StyledBackdrop>
    );
};

export default BackdropLoader;
