import RectangularButton from 'components/atoms/buttons/RectangularButton';
import { SnackbarTYPE } from 'components/molecules/InfoSnackbar';
import FormikInput from 'components/molecules/textfields/FormikInput';
import FormikSelect from 'components/molecules/textfields/FormikSelect';
import { Form, Formik } from 'formik';

import { Save } from '@material-ui/icons';

import { setInitErrors, setInitValues, validationSchema } from '../dashboardHelpers';
import useAddingWordForm from './AddingWordForm.hook';
import useStyles from './styles';

export interface AddingWordFormProps {
    getData: () => void;
    setSnackbarData: (data: SnackbarTYPE) => void;
}

const AddingWordForm: React.FC<AddingWordFormProps> = ({ getData, setSnackbarData }) => {
    const classes = useStyles();
    const { postData } = useAddingWordForm(getData, setSnackbarData);

    return (
        <Formik
            initialValues={setInitValues()}
            validationSchema={validationSchema}
            initialErrors={setInitErrors()}
            onSubmit={postData}
        >
            {formProps => (
                <Form className="formContainer">
                    <div className={classes.form}>
                        <div>
                            <FormikInput name="word" label="Word" />
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
                        <FormikInput name="definition" label="Definition" fullWidth />
                    </div>
                    <div>
                        <RectangularButton
                            text="Submit"
                            type="submit"
                            loading={formProps.isSubmitting}
                            disabled={formProps.isSubmitting || !formProps.isValid}
                            startIcon={<Save />}
                        />
                    </div>
                </Form>
            )}
        </Formik>
    );
};
export default AddingWordForm;
