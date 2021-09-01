import RectangularButton from 'components/atoms/buttons/RectangularButton';
import FormikInput from 'components/molecules/textfields/FormikInput';
import FormikSelect from 'components/molecules/textfields/FormikSelect';
import { Form, Formik } from 'formik';

import { Save } from '@material-ui/icons';

import useAddingWordForm from './AddingWordForm.hook';
import { setInitErrors, setInitValues, validationSchema, wordTypeOptions } from './helpers';
import useStyles from './styles';

export interface AddingWordFormProps {
    getData: () => void;
    dictName: string;
}

const AddingWordForm: React.FC<AddingWordFormProps> = ({ dictName, getData }) => {
    const classes = useStyles();
    const { postData } = useAddingWordForm(dictName, getData);

    return (
        <Formik
            initialValues={setInitValues(dictName.split('-')[0] === 'en')}
            validationSchema={validationSchema}
            initialErrors={setInitErrors()}
            onSubmit={postData}
        >
            {formProps => (
                <Form className="formContainer">
                    <div className={classes.form}>
                        <div>
                            <FormikInput name="wordText" label="Word" />
                            <FormikSelect name="wordType" label="Word type" options={wordTypeOptions} />
                        </div>
                        {dictName.split('-')[0] === 'en' && (
                            <FormikInput name="definition" label="Definition" fullWidth />
                        )}
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
