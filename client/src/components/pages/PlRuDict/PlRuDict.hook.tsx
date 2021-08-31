import { useEffect, useState } from 'react';

import API from 'api';
import { SnackbarTYPE } from 'components/molecules/InfoSnackbar';
import _ from 'lodash';
import moment from 'moment';
import { worDataTYPE } from 'utils/types';

import { setErrorMes } from './plRuDictHelpers';

function usePlRuDict() {
    const [Data, setData] = useState<worDataTYPE[]>([]);
    const [TableData, setTableData] = useState([]);
    const [DetailsData, setDetailsData] = useState<any>(null);
    const [EditData, setEditData] = useState<worDataTYPE | null>(null);

    const [Loading, setLoading] = useState(false);

    const [SnackbarData, setSnackbarData] = useState<SnackbarTYPE | null>(null);

    const getData = () => {
        setLoading(true);
        API.get('pl-ru/words')
            .then(res => {
                setData(res.data);
                const data = _.cloneDeep(res.data);
                setTableData(
                    data.map((el: any) => {
                        return {
                            wordText: el.word.text,
                            translationText: el.translation.text,
                            wordType: el.wordType,
                            updatedAt: moment(el.updatedAt).format('DD-MM-YYYY'),
                            id: el.id
                        };
                    })

                    // data.map((el: any) => {
                    //     el.updatedAt = moment(el.updatedAt).format('DD-MM-YYYY');
                    //     el.wordText = el.word.text;
                    //     el.translationText = el.translation.text;
                    //     return el;
                    // })
                );
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
                setSnackbarData({
                    title: setErrorMes(err.code, err.message),
                    variant: 'error'
                });
            });
    };

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onDeleteWord = async ({ id }: any) => {
        setLoading(true);
        // await new Promise(resolve => setTimeout(resolve, 1500));
        API.delete(`pl-ru/word/${id}`)
            .then(res => {
                getData();
                setSnackbarData({
                    title: 'Word ' + res.data.data.word.text + ' deleted',
                    variant: 'success'
                });
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
                setSnackbarData({
                    title: setErrorMes(err.response.status, err.message),
                    variant: 'error'
                });
            });
    };

    const closeEditDialog = (shouldUpdateTableData: boolean) => {
        setEditData(null);
        if (shouldUpdateTableData) getData();
    };

    const onPlayAudio = ({ phoneticAudio }: worDataTYPE) => {
        phoneticAudio && new Audio(phoneticAudio).play();
    };

    const onEditData = (row: any) => {
        const dataRow = Data.find(el => el.id === row.id);
        if (dataRow) {
            Object.keys(dataRow).forEach(key => {
                // @ts-ignore
                if (dataRow[key] === null) dataRow[key] = '';
            });
            setEditData(dataRow);
        }
    };

    return {
        Loading,
        getData,
        TableData,
        EditData,
        SnackbarData,
        setSnackbarData,
        closeEditDialog,
        onEditData,
        onDeleteWord
    };
}

export default usePlRuDict;
