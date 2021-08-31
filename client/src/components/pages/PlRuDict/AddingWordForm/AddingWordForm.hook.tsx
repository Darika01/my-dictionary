import API from 'api';
import { SnackbarTYPE } from 'components/molecules/InfoSnackbar';

import { formDataTYPE, setErrorMes } from '../plRuDictHelpers';

const useAddingWordForm = (getData: () => void, setSnackbarData: (data: SnackbarTYPE) => void) => {
    const postData = async ({ wordText, wordType }: formDataTYPE, { resetForm }: any) => {
        await API.post('pl-ru/word', {
            wordText: wordText,
            wordType: wordType,
            translationLang: 'ru'
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
