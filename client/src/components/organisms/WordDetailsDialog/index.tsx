import GoogleTranslateLink from 'components/atoms/GoogleTranslateLink';
import CustomDialogTitle from 'components/molecules/CustomDialogTitle';

import { Dialog, DialogContent, Divider, Typography } from '@mui/material';

import EnglishWordDetails from './EnglishWordDetails';
import useStyles from './EnglishWordDetails/styles';

interface WordDetailsDialogProps {
    dictName: string;
    data: any;
    onCloseDialog?: () => void;
}
const WordDetailsDialog: React.FC<WordDetailsDialogProps> = ({ dictName, data, onCloseDialog }) => {
    const classes = useStyles();
    return (
        <Dialog open={Boolean(data)}>
            <CustomDialogTitle onCloseDialog={onCloseDialog}>
                <div>
                    {data.wordType === 'word' ? (
                        <>
                            <GoogleTranslateLink value={data.wordText}>
                                <Typography variant="subtitle1" component="span" color="secondary">
                                    {data.wordText}&nbsp;
                                </Typography>
                            </GoogleTranslateLink>
                            {data.phonetic && <Typography variant="caption">[{data.phonetic}] &nbsp;</Typography>}
                            <Typography variant="body1" component="span">
                                -&nbsp;{data.translationText}
                            </Typography>
                        </>
                    ) : (
                        <GoogleTranslateLink value={data.wordText}>
                            <Typography variant="subtitle1" component="span" color="primary">
                                Translation
                            </Typography>
                        </GoogleTranslateLink>
                    )}
                </div>
            </CustomDialogTitle>
            <Divider />
            <DialogContent>
                {data.wordType === 'word' && dictName.split('-')[0] === 'en' ? (
                    <EnglishWordDetails detailsData={data} />
                ) : (
                    <div>
                        <Typography variant="body1" color="secondary">
                            {data.wordText}
                        </Typography>
                        <Typography variant="body2" className={classes.wordDef}>
                            {data.translationText}
                        </Typography>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};
export default WordDetailsDialog;
