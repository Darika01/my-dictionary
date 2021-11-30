import React from 'react';

import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import clsx from 'clsx';
import CircularLoader from 'components/atoms/CircularLoader';
import { connect, FormikValues } from 'formik';

import { Autocomplete, FormHelperText, useTheme } from '@mui/material';
import TextField, { BaseTextFieldProps } from '@mui/material/TextField';

import useStyles from './styles';

interface FormikAutosuggestProps extends BaseTextFieldProps, FormikValues {
    name: string;
    loading?: boolean;
    options: Array<{ [k: string]: any }>;
    labelingFunction: (a: any) => string;
    label: string;
    required?: boolean;
    nameKey?: string;
    multiple?: boolean;
}

const FormikAutosuggest: React.FC<FormikAutosuggestProps> = ({
    name,
    loading = false,
    options,
    labelingFunction,
    label,
    multiple,
    formik
}) => {
    const classes = useStyles();
    const theme = useTheme();
    const { setFieldValue, errors, setTouched, touched, values } = formik;

    const showError = Boolean(touched[name] && errors[name]);

    const [autosuggestOpen, setAutosuggestOpen] = React.useState(false);

    return (
        <Autocomplete
            id={`${name}-autocomplete`}
            className={clsx('fieldContainer', classes.autosuggest)}
            fullWidth
            multiple={multiple}
            includeInputInList
            autoHighlight
            autoComplete
            value={values[name]}
            ChipProps={{ color: 'primary' }}
            open={autosuggestOpen}
            classes={{
                paper: classes.paper,
                option: classes.option
            }}
            noOptionsText={'No results'}
            onOpen={() => {
                setAutosuggestOpen(true);
            }}
            onClose={(event: React.BaseSyntheticEvent, reason: string) => {
                setAutosuggestOpen(false);
                reason === 'selectOption' && setTouched({ ...touched, [name]: false });

                reason === 'blur' && setTouched({ ...touched, [name]: true });
            }}
            options={options}
            getOptionLabel={labelingFunction}
            // getOptionSelected={(option, value) => _.isEqual(option, value)}
            onChange={(event: React.BaseSyntheticEvent, newValue: any) => {
                setFieldValue(name, newValue);
                if (!newValue) setTouched({ ...touched, [name]: true });
            }}
            ListboxProps={{
                style: {
                    maxHeight: '24rem',
                    marginTop: '.4rem',
                    lineHeight: 2,
                    border: `1px solid ${theme.palette.grey[300]}`,
                    backgroundColor: theme.palette.common.white,
                    transition: `opacity 0.3s ${theme.transitions.easing.easeInOut} 0ms, transform 149ms ${theme.transitions.easing.easeInOut} 0ms, top 0.1s ease-out 0s !important`
                }
            }}
            renderInput={params => (
                <>
                    <TextField
                        {...params}
                        label={label}
                        variant="outlined"
                        error={showError}
                        InputProps={{
                            ...params.InputProps,
                            autoComplete: 'off',
                            endAdornment: (
                                <>
                                    {loading && <CircularLoader overlay />}
                                    {params.InputProps.endAdornment}
                                </>
                            )
                        }}
                    />
                    {showError && <FormHelperText error>{errors[name] as string}</FormHelperText>}
                </>
            )}
            renderOption={(option, { inputValue }) => {
                const matches = match(labelingFunction(option), inputValue);
                const parts = parse(labelingFunction(option), matches);
                return (
                    <>
                        {parts.map(
                            (
                                part: {
                                    highlight: boolean;
                                    text: string;
                                },
                                index: number
                            ) => (
                                <span
                                    key={index}
                                    style={{
                                        fontWeight: part.highlight ? 800 : 400,
                                        whiteSpace: 'pre'
                                    }}
                                >
                                    {part.text}
                                </span>
                            )
                        )}
                    </>
                );
            }}
        />
    );
};

export default connect(FormikAutosuggest);
