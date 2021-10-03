const fabStyles = {
    MuiFab: {
        styleOverrides: {
            root: {
                boxShadow: 'none',
                minHeight: 'auto',
                width: 'auto',
                height: 'auto',
                backgroundColor: 'transparent',
                '&:active': {
                    boxShadow: 'none'
                }
            },
            label: {
                justifyContent: 'center'
            }
        }
    }
};
export default fabStyles;
