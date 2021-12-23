import { CircularProgress, CircularProgressProps } from '@mui/material';

import { LoaderContainer } from './styles';

interface CircularLoaderProps extends CircularProgressProps {
    overlay?: boolean;
    fixed?: boolean;
    relative?: boolean;
    size?: number | string;
    color?: 'primary' | 'secondary';
}

const CircularLoader: React.FC<CircularLoaderProps> = ({ overlay, fixed, size, relative, color = 'primary' }) => {
    return (
        <LoaderContainer overlay={overlay} fixed={fixed} relative={relative}>
            <CircularProgress size={size} color={color} />
        </LoaderContainer>
    );
};

export default CircularLoader;
