import { useHistory } from 'react-router-dom';

import { IconButton, makeStyles, Tooltip } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

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
                <ArrowBackIcon />
            </IconButton>
        </Tooltip>
    );
};

export default BackButton;
