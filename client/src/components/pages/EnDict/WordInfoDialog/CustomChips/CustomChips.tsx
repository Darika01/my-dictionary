import GoogleTranslateLink from 'components/atoms/GoogleTranslateLink';

import { Chip, Typography } from '@material-ui/core';

import useStyles from './styles';

interface CustomChipsProps {
    title: string;
    values: string[];
}
const CustomChips: React.FC<CustomChipsProps> = ({ title, values }) => {
    const classes = useStyles();
    return (
        <div>
            <Typography variant="body2" color="textSecondary">
                {title}:
            </Typography>
            {values.map((el: string) => (
                <GoogleTranslateLink key={el} value={el} className={classes.chipLink}>
                    <Chip label={el} variant="outlined" className={classes.chip} />
                </GoogleTranslateLink>
            ))}
        </div>
    );
};
export default CustomChips;
