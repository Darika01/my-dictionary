import { useState } from 'react';

import BackdropLoader from 'components/molecules/BackdropLoader';
import InfoSnackbar from 'components/molecules/InfoSnackbar';
import CustomTable from 'components/organisms/CustomTable';

import { Switch, Typography } from '@material-ui/core';

import AddingWordForm from './AddingWordForm/AddingWordForm';
import useDashboard from './Dashboard.hook';
import { columns } from './dashboardHelpers';
import useStyles from './styles';
import WordEditDialog from './WordEditDialog/WordEditDialog';
import WordInfoDialog from './WordInfoDialog/WordInfoDialog';

const Dashboard: React.FC = () => {
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
    } = useDashboard();

    const [LangSwitch, setLangSwitch] = useState<'en' | 'pl'>('pl');

    return (
        <div>
            {Loading && <BackdropLoader />}
            <AddingWordForm getData={getData} setSnackbarData={setSnackbarData} />
            <Typography component="label" className={classes.switchContainer}>
                <Typography variant="body1">EN</Typography>
                <Switch
                    checked={LangSwitch === 'pl'}
                    onChange={() => setLangSwitch(LangSwitch === 'en' ? 'pl' : 'en')}
                    name="langSwitch"
                />
                <Typography variant="body1">PL</Typography>
            </Typography>
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
export default Dashboard;
