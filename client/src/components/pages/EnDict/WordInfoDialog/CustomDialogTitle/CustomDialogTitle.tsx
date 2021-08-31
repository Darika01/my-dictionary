import RoundButton from 'components/atoms/buttons/RoundButton';
import GoogleTranslateLink from 'components/atoms/GoogleTranslateLink';
import { worDataTYPE } from 'utils/types';

import { DialogTitle, Typography } from '@material-ui/core';
import { Close } from '@material-ui/icons';

import useStyles from './styles';

interface CustomDialogTitleProps {
    title: worDataTYPE;
    onCloseDialog?: () => void;
}
const CustomDialogTitle: React.FC<CustomDialogTitleProps> = ({ title, onCloseDialog }) => {
    const classes = useStyles();
    return (
        <DialogTitle disableTypography className={classes.title}>
            <div>
                {title.wordType === 'word' ? (
                    <>
                        <GoogleTranslateLink value={title.word.text}>
                            <Typography variant="subtitle1" component="span" color="secondary">
                                {title.word.text}
                            </Typography>
                        </GoogleTranslateLink>
                        <Typography variant="caption">&nbsp; [{title.phonetic}] -&nbsp;</Typography>
                        <Typography variant="body1" component="span">
                            {title.translation.text}
                        </Typography>
                    </>
                ) : (
                    <GoogleTranslateLink value={title.word.text}>
                        <Typography variant="subtitle1" component="span" color="primary">
                            Translation
                        </Typography>
                    </GoogleTranslateLink>
                )}
            </div>
            <RoundButton handleClick={onCloseDialog} tooltipTitle="Close">
                <Close />
            </RoundButton>
        </DialogTitle>
    );
};
export default CustomDialogTitle;
