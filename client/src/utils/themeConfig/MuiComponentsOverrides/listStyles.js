const listStyles = {
    MuiList: {
        styleOverrides: {
            padding: {
                paddingTop: '.8rem',
                paddingBottom: '.8rem'
            },
            root: {
                '& .MuiListItemIcon-root': {
                    minWidth: '4.6rem'
                },
                '& .MuiListItem-gutters': {
                    padding: '.8rem 1.6rem'
                },
                '& .MuiListItemText-root': {
                    marginTop: '.4rem',
                    marginBottom: '.4rem'
                }
            }
        }
    }
};
export default listStyles;
