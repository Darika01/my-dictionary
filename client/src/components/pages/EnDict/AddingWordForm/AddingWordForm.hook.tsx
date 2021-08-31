import API from 'api';
import { SnackbarTYPE } from 'components/molecules/InfoSnackbar';

import { formDataTYPE, setErrorMes } from '../enDictHelpers';

const useAddingWordForm = (getData: () => void, setSnackbarData: (data: SnackbarTYPE) => void) => {
    const postData = async ({ wordText, wordType, definition }: formDataTYPE, { resetForm }: any) => {
        await API.post('en-pl/word', {
            wordText: wordText,
            wordType: wordType,
            definition: definition,
            translationLang: 'pl'
        })
            .then(res => {
                getData();
                resetForm();
                setSnackbarData({
                    title: 'Word ' + res.data.data.word.text + ' added',
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
