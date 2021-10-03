import { useHistory } from 'react-router-dom';

import { ArrowBack } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    button: {
        margin: '0 1.2rem 0 -1.2rem'
    }
}));

const BackButton: React.FC = () => {
    const history = useHistory();

    const onBackClick = () => history.goBack();
    const tooltipText = 'Go back';
    const classes = useStyles();
    return (
        <Tooltip title={tooltipText}>
            <IconButton onClick={onBackClick} className={classes.button}>
                <ArrowBack />
            </IconButton>
        </Tooltip>
    );
};

export default BackButton;
