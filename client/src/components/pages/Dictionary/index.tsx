import { useState } from 'react';

import BackdropLoader from 'components/molecules/BackdropLoader';
import CustomSwitch from 'components/molecules/CustomSwitch';
import AddingWordForm from 'components/organisms/AddingWordForm';
import CustomTable from 'components/organisms/CustomTable';
import TranslationEditingForm from 'components/organisms/TranslationEditingForm';
import WordDetailsDialog from 'components/organisms/WordDetailsDialog';

import usePlRuDict from './Dictionary.hook';
import { setColumns } from './dictionaryHelpers';

// import WordEditDialog from './WordEditDialog/WordEditDialog';

const PlRuDict: React.FC = () => {
    const {
        dictName,
        langFrom,
        langTo,
        loading,
        Loading,
        fetcher,
        TableData,
        onDetailsWord,
        EditData,
        closeEditDialog,
        onPlayAudio,
        onEditData,
        onDeleteWord,
        DetailsData,
        setDetailsData
    } = usePlRuDict();

    const [LangSwitch, setLangSwitch] = useState<'wordText' | 'translationText'>('translationText');

    return (
        <div>
            {(Loading || loading) && <BackdropLoader />}
            <AddingWordForm dictName={dictName} getData={fetcher} />

            <CustomSwitch
                labelOn={langFrom.toLocaleUpperCase()}
                labelOff={langTo.toLocaleUpperCase()}
                checked={LangSwitch === 'translationText'}
                onChange={() => setLangSwitch(LangSwitch === 'wordText' ? 'translationText' : 'wordText')}
            />
            <CustomTable
                columns={setColumns(langFrom === 'en')}
                data={TableData}
                onDetails={onDetailsWord}
                onEdit={onEditData}
                onDelete={onDeleteWord}
                onPlayAudio={onPlayAudio}
                visibilityCol={LangSwitch}
            />
            {DetailsData && (
                <WordDetailsDialog data={DetailsData} onCloseDialog={() => setDetailsData(null)} dictName={dictName} />
            )}
            {EditData && <TranslationEditingForm data={EditData} onCloseDialog={closeEditDialog} dictName={dictName} />}
        </div>
    );
};
export default PlRuDict;
