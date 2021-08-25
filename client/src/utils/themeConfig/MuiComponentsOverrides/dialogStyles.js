const dialogStyles = {
    MuiDialog: {
        paper: {
            minWidth: '60%',
            minHeight: 'calc(100% - 6.4rem)',
            margin: '3.2rem'
            // justifyContent: 'space-between'
        },
        paperScrollPaper: {
            maxHeight: 'calc(100% - 6.4rem)'
        }
    },
    MuiDialogActions: {
        root: {
            padding: '1.6rem 2.4rem'
        },
        spacing: {
            '& > :not(:first-child)': {
                marginLeft: '1.6rem'
            }
        }
    },
    MuiDialogTitle: {
        root: {
            padding: '1.6rem 2.4rem',
            minHeight: '5.9rem'
        }
    },
    MuiDialogContent: {
        root: {
            padding: '3.2rem 2.4rem'
        }
    }
};

export default dialogStyles;
