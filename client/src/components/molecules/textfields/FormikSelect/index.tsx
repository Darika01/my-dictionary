import { useState } from 'react';

import clsx from 'clsx';
import { connect, FormikValues } from 'formik';

import { TextField } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

import useStyles from './styles';

interface FormikSelectI extends FormikValues {
    name: string;
    options: {
        value: string;
        label: string;
    }[];
    label: string;
    disabled?: boolean;
    variant?: 'standard' | 'outlined';
}

const FormikSelect: React.FC<FormikSelectI> = ({
    name,
    options,
    disabled = false,
    label,
    multiple,
    variant = 'outlined',
    formik
}) => {
    const classes = useStyles();
    const { values, setFieldValue } = formik;
    const [SelectIconMenuOpened, setSelectIconMenuOpened] = useState(false);

    return (
        <div className={clsx('fieldContainer', classes.selectFieldContainer)}>
            <TextField
                name={name}
                id={name}
                label={label}
                value={values[name]}
                select
                variant={variant}
                disabled={disabled}
                onChange={(event: React.BaseSyntheticEvent) => {
                    setFieldValue(name, event.target.value);
                    // if (!newValue) setTouched({ ...touched, [name]: true });
                }}
                SelectProps={{
                    IconComponent: () => (
                        <div className="selectIcon">{SelectIconMenuOpened ? <ExpandLess /> : <ExpandMore />}</div>
                    ),
                    MenuProps: {
                        getContentAnchorEl: null,
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'center'
                        },
                        transformOrigin: {
                            vertical: 'top',
                            horizontal: 'center'
                        },
                        classes: {
                            list: clsx('mainInputSelect', disabled && 'inputBlockedValue'),
                            paper: 'selectPaper'
                        },
                        TransitionProps: {
                            onExit: () => setSelectIconMenuOpened(false),
                            onEnter: () => setSelectIconMenuOpened(true)
                        }
                    }
                }}
            >
                {options !== null &&
                    options !== undefined &&
                    options.map(item => {
                        return (
                            <MenuItem key={item.value} value={item.value}>
                                {item.label}
                            </MenuItem>
                        );
                    })}
            </TextField>
        </div>
    );
};
export default connect(FormikSelect);
