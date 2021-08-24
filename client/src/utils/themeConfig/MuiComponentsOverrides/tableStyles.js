import typography from '../typography';

const tableStyles = {
    MuiTableCell: {
        root: {
            padding: '1.6rem',
            borderBottomWidth: '.1rem'
        },
        head: {
            ...typography.body2,
            fontWeight: 600,
            backgroundColor: 'rgba(240, 240, 240, 1) !important'
        },
        body: typography.body1,
        sizeSmall: {
            padding: '1.6rem',
            fontSize: '1.4rem'
        }
    },

    MuiTableSortLabel: {
        root: {
            '& > div:focus': {
                outline: 0
            }
        },
        icon: {
            fontSize: '1.8rem',
            marginLeft: '.4rem',
            marginRight: '.4rem'
        }
    }
};

export default tableStyles;
