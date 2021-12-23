import { useEffect, useState } from 'react';

import API from 'api';
import { OPEN_ALERT } from 'context/actions';
import { useGlobalContext } from 'context/globalContext';
import useFetchData from 'hooks/fetchData.hook';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { getErrorMessage } from 'utils/getErrorMessage';
import { worDataTYPE } from 'utils/types';

import { Typography } from '@mui/material';

function usePlRuDict() {
    const { dispatchContext } = useGlobalContext();
    const { dictName }: { dictName: string } = useParams();
    const langFrom = dictName.split('-')[0];
    const langTo = dictName.split('-')[1];

    const dataUrl = `/dictionaries/${dictName}/words`;

    const { fetchedData: data, loading, fetcher } = useFetchData<any>(dataUrl, { isArray: true });

    const [TableData, setTableData] = useState([]);
    const [DetailsData, setDetailsData] = useState<any>(null);
    const [EditData, setEditData] = useState<worDataTYPE | null>(null);
    const [Loading, setLoading] = useState(false);

    useEffect(() => {
        data &&
            setTableData(
                data.map((el: any) => {
                    if (langFrom === 'en') {
                        return {
                            text: el.wordText,
                            wordText: (
                                <>
                                    {el.wordText}
                                    {el.phonetic && (
                                        <Typography variant="caption" component="p">
                                            [{el.phonetic}]
                                        </Typography>
                                    )}
                                </>
                            ),
                            translationText: el.translationText,
                            wordType: el.wordType,
                            definition: el.definition,
                            category: el.category,
                            updatedAt: moment(el.updatedAt).format('DD-MM-YYYY'),
                            phoneticAudio: el.phoneticAudio,
                            isAudio: Boolean(el.phoneticAudio),
                            id: el.id
                        };
                    } else
                        return {
                            text: el.wordText,
                            wordText: el.wordText,
                            translationText: el.translationText,
                            wordType: el.wordType,
                            updatedAt: moment(el.updatedAt).format('DD-MM-YYYY'),
                            id: el.id
                        };
                })
            );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const onDetailsWord = async ({ id }: any) => {
        setLoading(true);
        await API.get(`word/${dictName}/${id}`)
            .then(res => {
                setDetailsData(res.data);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                dispatchContext({
                    type: OPEN_ALERT,
                    message: getErrorMessage(err.response.status, err?.response?.data?.message),
                    variant: 'error'
                });
            });
    };

    const onDeleteWord = async ({ id }: any) => {
        setLoading(true);
        API.delete(`word/${dictName}/${id}`)
            .then(res => {
                fetcher(dataUrl, false);
                dispatchContext({
                    type: OPEN_ALERT,
                    message: 'Word ' + res.data.data.wordText + ' deleted',
                    variant: 'success'
                });
            })
            .catch(err => {
                console.log(err);
                dispatchContext({
                    type: OPEN_ALERT,
                    message: getErrorMessage(err.response.status, err?.response?.data?.message),
                    variant: 'error'
                });
            })
            .finally(() => setLoading(false));
    };

    const closeEditDialog = (shouldUpdateTableData: boolean) => {
        setEditData(null);
        if (shouldUpdateTableData) fetcher(dataUrl, false);
    };

    const onEditData = (row: any) => {
        const dataRow = data.find((el: any) => el.id === row.id);
        if (dataRow) {
            Object.keys(dataRow).forEach(key => {
                // @ts-ignore
                if (dataRow[key] === null) dataRow[key] = '';
            });
            setEditData(dataRow);
        }
    };

    const onPlayAudio = ({ phoneticAudio }: worDataTYPE) => {
        phoneticAudio && new Audio(phoneticAudio).play();
    };

    const downloadWords = () => {
        console.log(
            TableData.map((el: any) => {
                return { [el.text]: el.translationText };
            })
        );
    };

    return {
        dictName,
        langFrom,
        langTo,
        loading,
        Loading,
        fetcher,
        TableData,
        EditData,
        closeEditDialog,
        onDetailsWord,
        onEditData,
        onDeleteWord,
        onPlayAudio,
        DetailsData,
        setDetailsData,
        downloadWords
    };
}

export default usePlRuDict;
