import GoogleTranslateLink from 'components/atoms/GoogleTranslateLink';

import { Chip, Typography } from '@material-ui/core';

import useStyles from './styles';

interface CustomChipsProps {
    values: string[];
}
const CustomChips: React.FC<CustomChipsProps> = ({ values }) => {
    const classes = useStyles();
    return (
        <div>
            <Typography variant="body2" color="textSecondary">
                Synonyms:
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
