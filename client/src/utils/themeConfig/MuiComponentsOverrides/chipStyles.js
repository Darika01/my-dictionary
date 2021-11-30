import typography from '../typography';

const chipStyles = {
    MuiChip: {
        styleOverrides: {
            root: {
                height: '3.2rem'
            },
            outlined: {
                border: '.1rem solid #e0e0e0'
            },
            label: {
                ...typography.body2,
                fontSize: '1.2rem',
                paddingLeft: '1.2rem',
                paddingRight: '1.2rem'
            }
        }
    }
};

export default chipStyles;
