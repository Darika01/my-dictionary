import typography from '../typography';

const buttonStyles = {
    MuiButton: {
        root: {
            borderRadius: '.4rem',
            padding: '.9rem 1.2rem' // default style
        },
        outlined: {
            border: '.1rem solid',
            padding: '.9rem 1.2rem'
        },
        text: {
            padding: '.9rem 1.2rem'
        },
        label: {
            ...typography.button
        },
        sizeLarge: {
            padding: '1.1rem 1.6rem 1.2rem 1.6rem'
        },
        iconSizeLarge: {
            '& > *:first-child': {
                fontSize: 'inherit',
                height: '1.4rem',
                width: 'auto'
            }
        },
        sizeSmall: {
            padding: '.6rem .8rem'
        },
        startIcon: {
            marginRight: '.8rem',
            marginLeft: '0'
        },
        endIcon: {
            marginLeft: '.8rem',
            marginRight: '0'
        }
    }
};
export default buttonStyles;
