import CustomChips from 'components/molecules/CustomChips';
import { googleTranslateWordDataDefinitionTYPE, googleTranslateWordDataTYPE } from 'utils/types';

import { Avatar, Typography } from '@mui/material';

import useStyles from './styles';

interface EnglishWordDetailsProps {
    detailsData: any;
}
const EnglishWordDetails: React.FC<EnglishWordDetailsProps> = ({ detailsData }) => {
    const classes = useStyles();
    return (
        <>
            {detailsData.definition && (
                <Typography variant="body2" className={classes.wordDefContainer}>
                    {detailsData.definition}
                </Typography>
            )}
            {detailsData.meanings?.map((meaning: googleTranslateWordDataTYPE) => {
                return (
                    <div key={meaning.partOfSpeech} className={classes.wordDefContainer}>
                        <Typography variant="body1" color="primary">
                            {meaning.partOfSpeech}
                        </Typography>
                        {meaning.definitions.map((def: googleTranslateWordDataDefinitionTYPE, defId: number) => (
                            <div key={defId} className={classes.googleWordDef}>
                                <Avatar className={classes.avatar}>{defId + 1}</Avatar>
                                <div className={classes.googleDefSingleInfo}>
                                    <Typography variant="body1">{def.definition}</Typography>
                                    {def.example && (
                                        <Typography variant="body2" color="textSecondary">
                                            &quot;{def.example}&quot;
                                        </Typography>
                                    )}
                                    {def.synonyms.length ? (
                                        <CustomChips values={def.synonyms} title="Synonyms" />
                                    ) : null}
                                    {def.antonyms.length ? (
                                        <CustomChips values={def.antonyms} title="Antonyms" />
                                    ) : null}
                                </div>
                            </div>
                        ))}
                    </div>
                );
            })}
        </>
    );
};
export default EnglishWordDetails;
