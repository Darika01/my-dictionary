const snackbarStyles = {
    MuiSnackbar: {
        root: {
            zIndex: 2000,
            left: 0,
            right: 0,
            bottom: '3.2rem !important',
            width: '100%'
        },
        anchorOriginBottomLeft: {
            left: '3.2rem !important',
            width: 'auto'
        }
    },
    MuiSnackbarContent: {
        message: {
            padding: 0
        },
        action: {
            paddingLeft: '1.3rem',
            marginRight: '-1.1rem'
        }
    }
};
export default snackbarStyles;
