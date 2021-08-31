import {
    Avatar,
    Dialog,
    DialogContent,
    Divider,
    Typography
} from '@material-ui/core';

import { googleTranslateWordDataDefinitionTYPE, googleTranslateWordDataTYPE } from '../dashboardHelpers';
import CustomChips from './CustomChips/CustomChips';
import CustomDialogTitle from './CustomDialogTitle/CustomDialogTitle';
import useStyles from './styles';

interface WordInfoDialogProps {
    detailsData: any;
    onCloseDialog?: () => void;
}
const WordInfoDialog: React.FC<WordInfoDialogProps> = ({ detailsData, onCloseDialog }) => {
    const classes = useStyles();
    return (
        <Dialog open={Boolean(detailsData)}>
            <CustomDialogTitle title={detailsData.word} onCloseDialog={onCloseDialog} />
            <Divider />
            <DialogContent>
                <Typography variant="body2" className={classes.wordDefContainer}>
                    {detailsData.word.definition}
                </Typography>
                {detailsData.word.wordType === 'word' ? (
                    detailsData.meanings.map((meaning: googleTranslateWordDataTYPE) => {
                        return (
                            <div key={meaning.partOfSpeech} className={classes.wordDefContainer}>
                                <Typography variant="body1" color="primary">
                                    {meaning.partOfSpeech}
                                </Typography>
                                {meaning.definitions.map(
                                    (def: googleTranslateWordDataDefinitionTYPE, defId: number) => (
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
                                    )
                                )}
                            </div>
                        );
                    })
                ) : (
                    <div>
                        <Typography variant="body1" color="secondary">
                            {detailsData.word.en}
                        </Typography>
                        <Typography variant="body2" className={classes.wordDef}>
                            {detailsData.word.pl}
                        </Typography>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};
export default WordInfoDialog;
