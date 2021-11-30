export const getAccessToken = (): string | null => localStorage.getItem('access_token');

export const checkUserIsLoggedIn = (): boolean => {
    const accessToken = getAccessToken();
    return !!accessToken;
};
