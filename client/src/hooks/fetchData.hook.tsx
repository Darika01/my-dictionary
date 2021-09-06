import { useEffect, useState } from 'react';

import API from 'api';
import axios from 'axios';
import { OPEN_ALERT } from 'context/actions';
import { useGlobalContext } from 'context/globalContext';
import { getErrorMessage } from 'utils/getErrorMessage';

function useFetchData<M>(endPoint: string): {
    // fetchUpdate: (endPoint: string) => Promise<void>;
    fetcher: (endPoint?: string, showSnackbar?: boolean) => void;
    fetchedData?: M | null | undefined;
    loading: boolean;
} {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const { dispatchContext } = useGlobalContext();

    const [State, setState] = useState<{
        fetchedData?: M | null;
        loading: boolean;
    }>({ fetchedData: null, loading: false });

    const fetcher = (url?: string, showSnackbar?: boolean) => {
        setState({
            ...State,
            loading: true
        });
        API.get(url ?? endPoint)
            .then(res => {
                setState({
                    fetchedData: res.data,
                    loading: false
                });
            })
            .catch(err => {
                console.log(err);
                setState({
                    fetchedData: null,
                    loading: false
                });
                showSnackbar &&
                    dispatchContext({
                        type: OPEN_ALERT,
                        message: getErrorMessage(err.response.status, err.message),
                        variant: 'error'
                    });
            });
    };
    // const fetchUpdate = async (endPoint: string) => {
    //     await fetcher(endPoint);
    // };

    useEffect(() => {
        fetcher(endPoint, true);

        return () => {
            source.cancel();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { ...State, fetcher };
}
export default useFetchData;
