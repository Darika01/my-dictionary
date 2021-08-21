import typography from '../typography';

const tableStyles = {
    MuiTableCell: {
        root: {
            padding: '1.6rem'
        },
        head: { ...typography.body2, fontWeight: 500 },
        body: typography.body1
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
