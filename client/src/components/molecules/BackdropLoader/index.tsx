import CircularLoader from 'components/atoms/CircularLoader';

import { Backdrop } from '@mui/material';

import { useStyles } from './styles';

const BackdropLoader: React.FC = (): JSX.Element => {
    const classes = useStyles();
    return (
        <Backdrop className={classes.backdrop} open>
            <CircularLoader size="lg" />
        </Backdrop>
    );
};

export default BackdropLoader;
