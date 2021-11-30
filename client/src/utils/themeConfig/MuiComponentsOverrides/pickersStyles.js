import typography from '../typography';

const pickersStyles = {
    MuiPickersBasePicker: {
        styleOverrides: {
            pickerView: {
                maxWidth: '32.5rem',
                minWidth: '31rem',
                minHeight: '30.5rem',
                borderRadius: '.4rem',
                border: '.1rem solid #e0e0e0'
            },
            container: {
                '& .MuiSvgIcon-root': {
                    fontSize: '2.4rem'
                }
            }
        }
    },
    MuiPickersCalendar: {
        styleOverrides: {
            transitionContainer: {
                marginTop: '1.2rem',
                minHeight: '21.6rem'
            }
        }
    },
    MuiPickersCalendarHeader: {
        styleOverrides: {
            switchHeader: {
                marginTop: '.4rem',
                marginBottom: '.8rem',
                '& .MuiTypography-root': {
                    ...typography.body1
                }
            },
            transitionContainer: {
                height: '2.3rem'
            },
            iconButton: {
                '& svg': {
                    fontSize: '2.4rem'
                }
            },
            daysHeader: {
                maxHeight: '1.6rem'
            },
            dayLabel: {
                width: '3.6rem',
                margin: '0 .2rem'
            }
        }
    },
    MuiPickersDay: {
        styleOverrides: {
            day: {
                width: '3.6rem',
                height: '3.6rem',
                margin: '0 .2rem'
            }
        }
    },
    MuiPickersYearSelection: {
        styleOverrides: {
            container: {
                height: '30rem'
            }
        }
    },
    MuiPickersYear: {
        styleOverrides: {
            root: {
                height: '4rem',
                '&.MuiTypography-subtitle1': {
                    fontSize: '1.4rem',
                    ...typography.body1
                }
            },
            yearSelected: {
                margin: '1rem 0',
                '&.MuiTypography-h5': {
                    fontSize: '2.4rem',
                    color: '#212121'
                }
            }
        }
    },
    MuiPickersClock: {
        styleOverrides: {
            container: {
                margin: '1.6rem 0 .8rem'
            }
        }
    },
    MuiPickersToolbar: {
        styleOverrides: {
            toolbar: {
                height: '10rem',
                paddingLeft: '1.6rem !important',
                paddingRight: '1.6rem !important'
            }
        }
    },
    MuiPickersToolbarText: {
        styleOverrides: {
            toolbarTxt: {
                '&.MuiTypography-h4': {
                    fontSize: '3.4rem'
                },
                '&.MuiTypography-h3': {
                    fontSize: '4.8rem'
                },
                '&.MuiTypography-subtitle1': {
                    fontSize: '1.4rem',
                    ...typography.body1
                }
            }
        }
    }
};

export default pickersStyles;
