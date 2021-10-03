import typography from '../typography';

const inputStyles = {
    MuiInputBase: {
        styleOverrides: {
            input: {
                padding: 0,
                paddingBottom: '.4rem',
                ...typography.body1
            },
            root: {
                lineHeight: 1.37,
                width: '100%',
                '& .MuiInputAdornment-positionEnd': {
                    marginLeft: '.3rem',
                    '& .MuiIconButton-root': {
                        padding: '1.1rem',
                        marginBottom: '.4rem',
                        marginRight: '-1.1rem',
                        '& svg': {
                            width: '1.4rem',
                            height: '1.4rem'
                        }
                    },
                    '& .MuiTypography-root': {
                        ...typography.body2
                    }
                },
                '& .MuiSelect-select:focus': {
                    backgroundColor: 'inherit'
                },
                '& .selectIcon': {
                    position: 'absolute',
                    right: '1.6rem',
                    top: 'calc(50% - 1rem)',
                    pointerEvents: 'none',
                    '& > .MuiSvgIcon-root': {
                        width: '2rem',
                        height: 'auto'
                    }
                }
            },
            adornedEnd: {
                paddingRight: 0
            }
        }
    },
    MuiInput: {
        styleOverrides: {
            underline: {
                '&.Mui-error:after': {
                    borderWidth: '.1rem'
                },
                '&.Mui-focused.Mui-error:after': {
                    borderWidth: '.2rem'
                },
                '&.Mui-focused': {
                    '&::after': {
                        borderWidth: '.2rem'
                    }
                }
            }
        }
    },
    MuiOutlinedInput: {
        styleOverrides: {
            input: {
                padding: '1rem 1.4rem',
                '&.MuiSelect-outlined.MuiSelect-outlined': {
                    paddingRight: '3.2rem'
                }
            },
            root: {
                height: '3.9rem',
                borderRadius: '.4rem',
                '& .MuiInputAdornment-positionEnd': {
                    marginRight: '.4rem',
                    '& .MuiIconButton-root': {
                        marginRight: 0,
                        marginBottom: 0
                    }
                },
                '& fieldset': {
                    borderWidth: '.1rem',
                    paddingLeft: '.8rem',
                    '& legend': {
                        '& span': {
                            paddingLeft: '.5rem',
                            paddingRight: '.5rem'
                        }
                    }
                },
                '&.Mui-focused fieldset': {
                    borderWidth: '.2rem'
                },
                '&.Mui-focused': {
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderWidth: '.2rem'
                    }
                },
                '& .MuiSelect-select': {
                    // padding: '0',
                    // height: '3.9rem',
                    paddingRight: '2.8rem',
                    '& > span, .MuiTypography-body1': {
                        padding: '1rem 1.4rem',
                        display: 'block',
                        // ...typography.body1,
                        lineHeight: 1.2
                    }
                }
            },
            adornedEnd: {
                paddingRight: 0
            }
        }
    },
    MuiInputLabel: {
        styleOverrides: {
            outlined: {
                transform: 'translate(1.4rem, 1rem) scale(1)',
                ...typography.body1,
                '&.MuiInputLabel-shrink': {
                    transform: 'translate(1.4rem, -0.8rem) scale(0.75)'
                }
            }
        }
    },
    MuiFormHelperText: {
        styleOverrides: {
            root: {
                ...typography.caption,
                marginTop: '.8rem'
            }
        }
    },
    MuiAutocomplete: {
        styleOverrides: {
            inputRoot: {
                padding: '0 !important'
            },
            input: {
                padding: '.4rem 0 !important'
            },
            endAdornment: {
                marginLeft: '.8rem',
                position: 'relative',
                height: '0.01em',
                display: 'flex',
                maxHeight: '2em',
                alignItems: 'center',
                whiteSpace: 'nowrap',
                top: 'auto'
            }
        }
    }
};

export default inputStyles;
