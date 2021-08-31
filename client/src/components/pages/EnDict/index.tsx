import { useState } from 'react';

import BackdropLoader from 'components/molecules/BackdropLoader';
import CustomSwitch from 'components/molecules/CustomSwitch';
import InfoSnackbar from 'components/molecules/InfoSnackbar';
import CustomTable from 'components/organisms/CustomTable';

import AddingWordForm from './AddingWordForm/AddingWordForm';
import useEnDict from './EnDict.hook';
import { columns } from './enDictHelpers';
import useStyles from './styles';
import WordEditDialog from './WordEditDialog/WordEditDialog';
import WordInfoDialog from './WordInfoDialog/WordInfoDialog';

const EnDict: React.FC = () => {
    const classes = useStyles();
    const {
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
    } = useEnDict();

    const [LangSwitch, setLangSwitch] = useState<'wordText' | 'translationText'>('translationText');

    return (
        <div>
            {Loading && <BackdropLoader />}
            <AddingWordForm getData={getData} setSnackbarData={setSnackbarData} />

            <CustomSwitch
                labelOn="EN"
                labelOff="PL"
                checked={LangSwitch === 'translationText'}
                onChange={() => setLangSwitch(LangSwitch === 'wordText' ? 'translationText' : 'wordText')}
            />
            <CustomTable
                columns={columns}
                data={TableData}
                onDetails={onDetailsWord}
                onEdit={onEditData}
                onDelete={onDeleteWord}
                onPlayAudio={onPlayAudio}
                visibilityCol={LangSwitch}
            />
            {DetailsData && <WordInfoDialog detailsData={DetailsData} onCloseDialog={() => setDetailsData(null)} />}
            {EditData && (
                <WordEditDialog data={EditData} onCloseDialog={closeEditDialog} setSnackbarData={setSnackbarData} />
            )}
            {SnackbarData && (
                <InfoSnackbar
                    title={SnackbarData.title}
                    variant={SnackbarData.variant}
                    onClose={() => setSnackbarData(null)}
                />
            )}
        </div>
    );
};
export default EnDict;
