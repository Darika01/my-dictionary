import API from 'api';
import RectangularButton from 'components/atoms/buttons/RectangularButton';
import GoogleTranslateLink from 'components/atoms/GoogleTranslateLink';
import CustomDialogTitle from 'components/molecules/CustomDialogTitle';
import FormikInput from 'components/molecules/textfields/FormikInput';
import FormikSelect from 'components/molecules/textfields/FormikSelect';
import { OPEN_ALERT } from 'context/actions';
import { useGlobalContext } from 'context/globalContext';
import { Form, Formik } from 'formik';
import { getErrorMessage } from 'utils/getErrorMessage';
import { worDataTYPE } from 'utils/types';
import * as Yup from 'yup';

import { Dialog, DialogActions, Divider, Typography } from '@material-ui/core';
import { Close, Save } from '@material-ui/icons';

import { wordTypeOptions } from '../AddingWordForm/helpers';
import useStyles from './styles';

interface TranslationEditingFormProps {
    data: worDataTYPE;
    dictName: string;
    onCloseDialog: (shouldUpdateTableData: boolean) => void;
}

const TranslationEditingForm: React.FC<TranslationEditingFormProps> = ({ data, dictName, onCloseDialog }) => {
    const classes = useStyles();
    const { dispatchContext } = useGlobalContext();

    const postData = async (data: worDataTYPE) => {
        await API.put(`word/${dictName}/${data.id}`, {
            translationText: data.translationText,
            wordType: data.wordType,
            definition: data.definition,
            category: data.category
        })
            .then(res => {
                dispatchContext({
                    type: OPEN_ALERT,
                    message: 'Word ' + res.data.data.wordText + ' saved',
                    variant: 'success'
                });
                onCloseDialog(true);
            })
            .catch(err => {
                console.log(err);
                dispatchContext({
                    type: OPEN_ALERT,
                    message: getErrorMessage(err.response.status, err.message),
                    variant: 'error'
                });
            });
    };

    const validationSchema = Yup.object().shape({
        wordText: Yup.string().required('This field is required'),
        wordType: Yup.string().required('This field is required')
        // category: Yup.string().required('This field is required'),
        // definition: Yup.string().required('This field is required')
    });

    return (
        <>
            <Dialog open>
                <CustomDialogTitle>
                    <div>
                        <Typography variant="subtitle1" component="span">
                            Editing word
                        </Typography>
                        <GoogleTranslateLink value={data.wordText}>
                            <Typography variant="subtitle1" component="span" color="secondary">
                                {' ' + data.wordText}
                            </Typography>
                        </GoogleTranslateLink>
                    </div>
                </CustomDialogTitle>
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
                                        <FormikInput name="translationText" label="Translation" />
                                        <FormikSelect name="wordType" label="Word type" options={wordTypeOptions} />
                                    </div>
                                    <FormikInput name="category" label="Category" />
                                    {dictName.split('-')[0] === 'en' && (
                                        <FormikInput name="definition" label="Definition" fullWidth />
                                    )}
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

export default TranslationEditingForm;
