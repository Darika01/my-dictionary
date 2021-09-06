import API from 'api';
import { OPEN_ALERT } from 'context/actions';
import { useGlobalContext } from 'context/globalContext';
import { getErrorMessage } from 'utils/getErrorMessage';

import { formDataTYPE } from './helpers';

const useAddingWordForm = (dictName: string, getData: () => void) => {
    const { dispatchContext } = useGlobalContext();

    const postData = async ({ wordText, wordType, definition }: formDataTYPE, { resetForm }: any) => {
        await API.post(`word/${dictName}`, {
            wordText: wordText,
            wordType: wordType,
            definition: definition
        })
            .then(res => {
                getData();
                resetForm();
                dispatchContext({
                    type: OPEN_ALERT,
                    message: 'Word ' + res.data.data.wordText + ' added',
                    variant: 'success'
                });
            })
            .catch(err => {
                console.log(err);
                dispatchContext({
                    type: OPEN_ALERT,
                    message: getErrorMessage(err.response.status, err.message),
                    variant: 'error'
                });
            });
    };

    return {
        postData
    };
};

export default useAddingWordForm;
