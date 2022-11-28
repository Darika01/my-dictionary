import { useState } from 'react';

import RectangularButton from 'components/atoms/buttons/RectangularButton';
import BackdropLoader from 'components/molecules/BackdropLoader';
import CustomSwitch from 'components/molecules/CustomSwitch';
import AddingWordForm from 'components/organisms/AddingWordForm';
import CustomTable from 'components/organisms/CustomTable';
import TranslationEditingForm from 'components/organisms/TranslationEditingForm';
import WordDetailsDialog from 'components/organisms/WordDetailsDialog';

import { FileDownload } from '@mui/icons-material';
import { Typography } from '@mui/material';

import usePlRuDict from './Dictionary.hook';
import { setColumns } from './dictionaryHelpers';
import { TableHeader } from './styles';

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
        setDetailsData,
        downloadWords
    } = usePlRuDict();

    const [LangSwitch, setLangSwitch] = useState<'wordText' | 'translationText'>('translationText');

    return (
        <div>
            {(Loading || loading) && <BackdropLoader />}
            <AddingWordForm dictName={dictName} getData={fetcher} />

            <TableHeader>
                <div>
                    <Typography variant="body1" mr={2}>
                        Show text in selected language
                    </Typography>
                    <CustomSwitch
                        labelOn={langFrom.toLocaleUpperCase()}
                        labelOff={langTo.toLocaleUpperCase()}
                        checked={LangSwitch === 'translationText'}
                        onChange={() => setLangSwitch(LangSwitch === 'wordText' ? 'translationText' : 'wordText')}
                    />
                </div>
                <RectangularButton
                    text="Export words"
                    size="small"
                    variant="outlined"
                    handleClick={downloadWords}
                    startIcon={<FileDownload />}
                />
            </TableHeader>
            <CustomTable
                columns={setColumns(langFrom.toLocaleUpperCase(), langTo.toLocaleUpperCase())}
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
