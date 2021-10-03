import { Switch, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    switchContainer: {
        display: 'inline-flex',
        alignItems: 'center',
        marginBottom: '1rem'
    }
}));

interface CustomSwitchProps {
    labelOn: string;
    labelOff: string;
    checked: boolean;
    onChange: () => void;
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({ labelOn, labelOff, checked, onChange }) => {
    const classes = useStyles();
    return (
        <Typography component="label" className={classes.switchContainer}>
            <Typography variant="body1">{labelOff}</Typography>
            <Switch checked={checked} onChange={onChange} name="langSwitch" />
            <Typography variant="body1">{labelOn}</Typography>
        </Typography>
    );
};

export default CustomSwitch;
