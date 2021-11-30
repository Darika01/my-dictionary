import { useEffect, useState } from 'react';

import API from 'api';
import axios from 'axios';
import { OPEN_ALERT } from 'context/actions';
import { useGlobalContext } from 'context/globalContext';
import { getErrorMessage } from 'utils/getErrorMessage';

type otherDataProps = {
    showSnackbar?: boolean;
    isArray?: boolean;
};

function useFetchData<M>(
    endPoint: string,
    otherData: otherDataProps
): {
    // fetchUpdate: (endPoint: string) => Promise<void>;
    fetcher: (endPoint?: string, showSnackbar?: boolean) => void;
    fetchedData?: M | null | [];
    loading: boolean;
} {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const { dispatchContext } = useGlobalContext();

    const [State, setState] = useState<{
        fetchedData?: M | null | [];
        loading: boolean;
    }>({ fetchedData: null, loading: false });

    const fetcher = (url?: string, showSnackbar?: boolean) => {
        setState({
            fetchedData: otherData?.isArray ? [] : null,
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
                    fetchedData: otherData?.isArray ? [] : null,
                    loading: false
                });
                showSnackbar &&
                    dispatchContext({
                        type: OPEN_ALERT,
                        message: getErrorMessage(err.response.status, err?.response?.data?.message),
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
    }, [endPoint]);

    return { ...State, fetcher };
}
export default useFetchData;
