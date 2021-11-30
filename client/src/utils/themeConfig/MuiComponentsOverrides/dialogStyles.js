const dialogStyles = {
    MuiDialog: {
        styleOverrides: {
            paper: {
                minWidth: '60%',
                minHeight: 'calc(100% - 6.4rem)',
                margin: '3.2rem'
                // justifyContent: 'space-between'
            },
            paperScrollPaper: {
                maxHeight: 'calc(100% - 6.4rem)'
            }
        }
    },
    MuiDialogActions: {
        styleOverrides: {
            root: {
                padding: '1.6rem 2.4rem'
            },
            spacing: {
                '& > :not(:first-child)': {
                    marginLeft: '1.6rem'
                }
            }
        }
    },
    MuiDialogTitle: {
        styleOverrides: {
            root: {
                padding: '1.6rem 2.4rem',
                minHeight: '5.9rem'
            }
        }
    },
    MuiDialogContent: {
        styleOverrides: {
            root: {
                padding: '3.2rem 2.4rem'
            }
        }
    }
};

export default dialogStyles;
