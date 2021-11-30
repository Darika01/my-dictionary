import typography from '../typography';

const tabsStyles = {
    MuiTabs: {
        styleOverrides: {
            indicator: {
                height: '.2rem',
                borderRadius: '.4rem'
            },
            scrollButtons: {
                width: '4.2rem',
                height: '4.9rem',
                '& .MuiSvgIcon-root': {
                    fontSize: '1.6rem'
                }
            },
            flexContainerVertical: {
                '& .MuiTab-wrapper': {
                    alignItems: 'flex-start'
                },
                '& .MuiTab-root': {
                    textAlign: 'left',
                    padding: '1.5rem 2rem'
                }
            }
        }
    },
    MuiTab: {
        styleOverrides: {
            root: {
                ...typography.body2,
                padding: '1.4rem 2.6rem',
                textTransform: 'none',
                minWidth: 'unset !important',
                maxWidth: 'unset',
                whiteSpace: 'nowrap',
                opacity: '1 !important'
            }
        }
    }
};
export default tabsStyles;
