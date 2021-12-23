import history from 'utils/history';

export const logoutUser = () => {
    localStorage.clear();
    history.push('/login');
};
