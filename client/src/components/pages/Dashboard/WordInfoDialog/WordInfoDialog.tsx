import {
    Avatar,
    Dialog,
    DialogContent,
    Divider,
    Typography
} from '@material-ui/core';

import { googleTranslateWordDataTYPE } from '../';
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
                {Object.entries(detailsData).map(([dataKey, dataValue]: any) => {
                    if (dataKey === 'word') {
                        return (
                            <Typography key={dataKey} variant="body2" className={classes.wordDefContainer}>
                                {dataValue.definition}
                            </Typography>
                        );
                    } else
                        return (
                            <div key={dataKey} className={classes.wordDefContainer}>
                                {dataValue.map((defEl: googleTranslateWordDataTYPE, defElIndex: number) => {
                                    return (
                                        <div key={defEl.definition} className={classes.wordDefContent}>
                                            {defElIndex === 0 && (
                                                <Typography variant="body1" color="primary">
                                                    {dataKey}
                                                </Typography>
                                            )}
                                            <div className={classes.googleWordDef}>
                                                <Avatar className={classes.avatar}>{defElIndex + 1}</Avatar>
                                                <div className={classes.googleDefSingleInfo}>
                                                    <Typography variant="body1">{defEl.definition}</Typography>
                                                    {defEl.example && (
                                                        <Typography variant="body2" color="textSecondary">
                                                            &quot;{defEl.example}&quot;
                                                        </Typography>
                                                    )}
                                                    {defEl.synonyms && <CustomChips values={defEl.synonyms} />}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                })}
            </DialogContent>
        </Dialog>
    );
};
export default WordInfoDialog;
