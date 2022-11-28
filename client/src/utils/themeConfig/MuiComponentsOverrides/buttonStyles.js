import typography from '../typography';

const buttonStyles = {
    MuiButton: {
        styleOverrides: {
            root: {
                borderRadius: '.4rem',
                padding: '.9rem 1.2rem' // default style
            },
            outlined: {
                border: '.1rem solid',
                padding: '.9rem 1.2rem'
            },
            outlinedSizeLarge: {
                padding: '.8rem 1.5rem'
            },
            outlinedSizeMedium: {
                padding: '.7rem 1.3rem'
            },
            outlinedSizeSmall: {
                padding: '.6rem 1.1rem'
            },
            text: {
                padding: '.9rem 1.2rem'
            },
            label: {
                ...typography.button
            },
            sizeLarge: {
                padding: '.9rem 1.6rem',
                fontSize: '1.4rem'
            },
            sizeMedium: {
                padding: '.8rem 1.4rem'
            },
            sizeSmall: {
                padding: '.7rem 1.2rem',
                fontSize: '1.2rem'
            },
            startIcon: {
                marginRight: '.8rem',
                marginLeft: '0'
            },
            endIcon: {
                marginLeft: '.8rem',
                marginRight: '0'
            },
            iconSizeLarge: {
                '& .MuiSvgIcon-root': {
                    fontSize: '2rem'
                }
            },
            iconSizeMedium: {
                '& .MuiSvgIcon-root': {
                    fontSize: '1.6rem'
                }
            },
            iconSizeSmall: {
                '& .MuiSvgIcon-root': {
                    fontSize: '1.6rem'
                }
            }
        }
    },
    MuiSwitch: {
        styleOverrides: {
            root: {
                width: '5.8rem',
                height: '3.8rem',
                padding: '1.2rem'
            },
            switchBase: {
                padding: '.9rem',
                '&.Mui-checked': {
                    transform: 'translateX(2rem)'
                }
            },
            thumb: {
                width: '2rem',
                height: '2rem'
            },
            track: {
                borderRadius: '.7rem'
            }
        }
    }
};
export default buttonStyles;
