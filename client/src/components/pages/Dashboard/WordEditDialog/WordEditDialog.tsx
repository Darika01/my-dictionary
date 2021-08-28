import API from 'api';
import RectangularButton from 'components/atoms/buttons/RectangularButton';
import GoogleTranslateLink from 'components/atoms/GoogleTranslateLink';
import { SnackbarVariantTYPE } from 'components/molecules/InfoSnackbar';
import FormikInput from 'components/molecules/textfields/FormikInput';
import FormikSelect from 'components/molecules/textfields/FormikSelect';
import { Form, Formik } from 'formik';
import { worDataTYPE } from 'utils/types';
import * as Yup from 'yup';

import {
    Dialog,
    DialogActions,
    DialogTitle,
    Divider,
    Typography
} from '@material-ui/core';
import { Close, Save } from '@material-ui/icons';

import { setErrorMes } from '../';
import useStyles from './styles';

interface WordEditDialogProps {
    data: worDataTYPE;
    onCloseDialog: (shouldUpdateTableData: boolean) => void;
    setSnackbarData: ({ title, variant }: { title: string; variant: SnackbarVariantTYPE }) => void;
}

const WordEditDialog: React.FC<WordEditDialogProps> = ({ data, onCloseDialog, setSnackbarData }) => {
    const classes = useStyles();

    const postData = async (data: worDataTYPE) => {
        await API.put(`word/${data.id}`, {
            pl: data.pl,
            en: data.en,
            wordType: data.wordType,
            definition: data.definition,
            category: data.category ? data.category : null
        })
            .then(res => {
                setSnackbarData({
                    title: 'Word ' + res.data.data.en + ' saved',
                    variant: 'success'
                });
                setTimeout(() => {
                    onCloseDialog(true);
                }, 100);
            })
            .catch(err => {
                console.log(err);
                setSnackbarData({
                    title: setErrorMes(err.response.status, err.message),
                    variant: 'error'
                });
            });
    };

    const validationSchema = Yup.object().shape({
        pl: Yup.string().required('This field is required'),
        wordType: Yup.string().required('This field is required')
        // category: Yup.string().required('This field is required'),
        // definition: Yup.string().required('This field is required')
    });

    return (
        <>
            <Dialog open>
                <DialogTitle disableTypography>
                    <div>
                        <Typography variant="subtitle1" component="span">
                            Editing word
                        </Typography>
                        <GoogleTranslateLink value={data.en}>
                            <Typography variant="subtitle1" component="span" color="secondary">
                                {' ' + data.en}
                            </Typography>
                        </GoogleTranslateLink>
                    </div>
                </DialogTitle>
                <Divider />
                <div>
                    <Formik
                        initialValues={data}
                        validationSchema={validationSchema}
                        onSubmit={postData}
                        onReset={() => onCloseDialog(false)}
                    >
                        {formProps => (
                            <Form className={classes.formContainer}>
                                <div className={classes.form}>
                                    <div>
                                        <FormikInput name="pl" label="Translation" />
                                        <FormikSelect
                                            name="wordType"
                                            label="Word type"
                                            options={[
                                                { value: 'word', label: 'Word' },
                                                { value: 'sentence', label: 'Sentence' },
                                                { value: 'phrase', label: 'Phrase' }
                                            ]}
                                        />
                                    </div>
                                    <FormikInput name="category" label="Category" />
                                    <FormikInput name="definition" label="Definition" fullWidth />
                                </div>
                                <DialogActions>
                                    <RectangularButton
                                        text="Close"
                                        type="reset"
                                        variant="outlined"
                                        color="grey"
                                        startIcon={<Close />}
                                    />
                                    <RectangularButton
                                        text="Save"
                                        type="submit"
                                        loading={formProps.isSubmitting}
                                        disabled={formProps.isSubmitting || !formProps.isValid}
                                        startIcon={<Save />}
                                    />
                                </DialogActions>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Dialog>
        </>
    );
};
export default WordEditDialog;
