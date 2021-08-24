import CircularLoader from 'components/atoms/CircularLoader';

import { Backdrop } from '@material-ui/core';

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
