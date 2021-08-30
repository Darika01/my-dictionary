import { useEffect, useState } from 'react';

import API from 'api';
import { SnackbarTYPE } from 'components/molecules/InfoSnackbar';
import _ from 'lodash';
import moment from 'moment';
import { worDataTYPE } from 'utils/types';

import { Typography } from '@material-ui/core';

import { setErrorMes } from './dashboardHelpers';

function useDashboard() {
    const [Data, setData] = useState<worDataTYPE[]>([]);
    const [TableData, setTableData] = useState([]);
    const [DetailsData, setDetailsData] = useState<any>(null);
    const [EditData, setEditData] = useState<worDataTYPE | null>(null);

    const [Loading, setLoading] = useState(false);

    const [SnackbarData, setSnackbarData] = useState<SnackbarTYPE | null>(null);

    const getData = () => {
        setLoading(true);
        API.get('words')
            .then(res => {
                setData(res.data);
                const data = _.cloneDeep(res.data);
                setTableData(
                    data.map((el: any) => {
                        el.updatedAt = moment(el.updatedAt).format('DD-MM-YYYY');
                        el.en = (
                            <>
                                {el.en}
                                {el.phonetic && (
                                    <Typography variant="caption" component="p">
                                        [{el.phonetic}]
                                    </Typography>
                                )}
                            </>
                        );
                        el.isAudio = Boolean(el.phoneticAudio);
                        return el;
                    })
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
        API.delete(`word/${id}`)
            .then(res => {
                getData();
                setSnackbarData({
                    title: 'Word ' + res.data.data.en + ' deleted',
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
    const onDetailsWord = async ({ id }: any) => {
        setLoading(true);
        // await new Promise(resolve => setTimeout(resolve, 1500));
        await API.get(`word/details/${id}`)
            .then(res => {
                setDetailsData(res.data);
                setLoading(false);
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
        DetailsData,
        EditData,
        SnackbarData,
        setSnackbarData,
        closeEditDialog,
        onDetailsWord,
        onEditData,
        onDeleteWord,
        setDetailsData,
        onPlayAudio
    };
}

export default useDashboard;
