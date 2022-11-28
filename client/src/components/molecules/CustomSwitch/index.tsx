import { Switch, Typography } from '@mui/material';
import { styled } from '@mui/system';

export const SwitchContainer = styled(Typography)({
    display: 'inline-flex',
    alignItems: 'center',
    marginBottom: '1rem'
});

interface CustomSwitchProps {
    labelOn: string;
    labelOff: string;
    checked: boolean;
    onChange: () => void;
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({ labelOn, labelOff, checked, onChange }) => {
    return (
        <SwitchContainer component="label">
            <Typography variant="body1">{labelOff}</Typography>
            <Switch checked={checked} onChange={onChange} name="langSwitch" color="secondary" />
            <Typography variant="body1">{labelOn}</Typography>
        </SwitchContainer>
    );
};

export default CustomSwitch;
