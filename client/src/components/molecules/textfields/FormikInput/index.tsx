import { connect, Field, FormikValues } from 'formik';

import { FormHelperText } from '@mui/material';
import TextField from '@mui/material/TextField';

export interface FormikInputProps extends FormikValues {
    name: string;
    label: string;
    type?: string;
    fullWidth?: boolean;
    showError?: boolean;
}

const FormikInput: React.FC<FormikInputProps> = ({
    formik,
    name,
    label,
    type = 'text',
    fullWidth,
    showError = false
}) => {
    const { isSubmitting, isValid, errors, touched } = formik;

    const error = showError && Boolean(errors[name] && touched[name]);

    const onSubmit = () => {
        if (!isSubmitting && isValid) {
            formik.submitForm();
        }
    };

    return (
        <div className="fieldContainer">
            <Field
                name={name}
                id={name}
                as={TextField}
                variant="outlined"
                label={label}
                type={type}
                error={error}
                onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        onSubmit();
                    }
                }}
                fullWidth={fullWidth}
            />
            {error && <FormHelperText error>{errors[name]}</FormHelperText>}
        </div>
    );
};

export default connect(FormikInput);
