import { Chip, Link, Typography } from '@material-ui/core';

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
                <Link
                    key={el}
                    href={`https://translate.google.ru/?sl=en&tl=pl&text=${el}&op=translate`}
                    target="_blank"
                    rel="noreferrer"
                    className={classes.chipLink}
                >
                    <Chip label={el} variant="outlined" className={classes.chip} />
                </Link>
            ))}
        </div>
    );
};
export default CustomChips;
