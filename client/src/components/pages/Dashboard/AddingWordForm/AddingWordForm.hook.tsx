import API from 'api';
import { SnackbarTYPE } from 'components/molecules/InfoSnackbar';

import { formDataTYPE, setErrorMes } from '../dashboardHelpers';

const useAddingWordForm = (getData: () => void, setSnackbarData: (data: SnackbarTYPE) => void) => {
    const postData = async ({ word, wordType, definition }: formDataTYPE, { resetForm }: any) => {
        await API.post('word', {
            text: word,
            wordType: wordType,
            definition: definition,
            langTo: 'pl'
        })
            .then(res => {
                getData();
                resetForm();
                setSnackbarData({
                    title: 'Word ' + res.data.data.en + ' added',
                    variant: 'success'
                });
            })
            .catch(err => {
                console.log(err);
                setSnackbarData({
                    title: setErrorMes(err.response.status, err.message),
                    variant: 'error'
                });
            });
    };

    return {
        postData
    };
};

export default useAddingWordForm;
