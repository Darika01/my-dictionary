import API from 'api';
import { AxiosError } from 'axios';
import clsx from 'clsx';
import RoundButton from 'components/atoms/buttons/RoundButton';
import { OPEN_ALERT } from 'context/actions';
import { useGlobalContext } from 'context/globalContext';
import { useHistory } from 'react-router-dom';

import { Logout } from '@mui/icons-material';
import { AppBar, Toolbar, Typography } from '@mui/material';

import useStyles from './styles';

interface AppbarProps {
    isSidebarOpen: boolean;
}

const Appbar: React.FC<AppbarProps> = ({ isSidebarOpen }) => {
    const classes = useStyles();
    const history = useHistory();
    const { dispatchContext } = useGlobalContext();

    const logout = () => {
        API.get('user/logout')
            .then(res => {
                localStorage.clear();
                history.push('/login');
            })
            .catch((err: AxiosError) => {
                dispatchContext({
                    type: OPEN_ALERT,
                    message: err?.response?.data?.message ?? 'Undefined error',
                    variant: 'error'
                });
            });
    };

    return (
        <AppBar position="fixed" color="inherit" className={clsx(classes.appBar, !isSidebarOpen && classes.appBarFull)}>
            <Toolbar className={classes.toolbar}>
                <Typography variant="h1" noWrap>
                    Some title
                </Typography>
                <RoundButton size="small" handleClick={logout}>
                    <Logout />
                </RoundButton>
            </Toolbar>
        </AppBar>
    );
};

export default Appbar;
