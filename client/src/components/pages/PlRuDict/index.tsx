import { useState } from 'react';

import BackdropLoader from 'components/molecules/BackdropLoader';
import CustomSwitch from 'components/molecules/CustomSwitch';
import InfoSnackbar from 'components/molecules/InfoSnackbar';
import CustomTable from 'components/organisms/CustomTable';

import AddingWordForm from './AddingWordForm/AddingWordForm';
import usePlRuDict from './PlRuDict.hook';
import { columns } from './plRuDictHelpers';

// import WordEditDialog from './WordEditDialog/WordEditDialog';

const PlRuDict: React.FC = () => {
    const {
        Loading,
        getData,
        TableData,
        EditData,
        SnackbarData,
        setSnackbarData,
        closeEditDialog,
        onEditData,
        onDeleteWord
    } = usePlRuDict();

    const [LangSwitch, setLangSwitch] = useState<'wordText' | 'translationText'>('translationText');

    return (
        <div>
            {Loading && <BackdropLoader />}
            <AddingWordForm getData={getData} setSnackbarData={setSnackbarData} />

            <CustomSwitch
                labelOn="PL"
                labelOff="RU"
                checked={LangSwitch === 'translationText'}
                onChange={() => setLangSwitch(LangSwitch === 'wordText' ? 'translationText' : 'wordText')}
            />
            <CustomTable
                columns={columns}
                data={TableData}
                onEdit={onEditData}
                onDelete={onDeleteWord}
                visibilityCol={LangSwitch}
            />
            {/* {EditData && (
                <WordEditDialog data={EditData} onCloseDialog={closeEditDialog} setSnackbarData={setSnackbarData} />
            )} */}
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
export default PlRuDict;
