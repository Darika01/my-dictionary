import { useEffect, useState } from 'react';

import API from 'api';
import RectangularButton from 'components/atoms/buttons/RectangularButton';
import BackdropLoader from 'components/molecules/BackdropLoader';
import InfoSnackbar, { SnackbarVariantTYPE } from 'components/molecules/InfoSnackbar';
import FormikInput from 'components/molecules/textfields/FormikInput';
import FormikSelect from 'components/molecules/textfields/FormikSelect';
import CustomTable from 'components/organisms/CustomTable';
import { Form, Formik } from 'formik';
import moment from 'moment';
import { worDataTYPE } from 'utils/types';
import * as Yup from 'yup';

import { Save } from '@material-ui/icons';

import useStyles from './styles';
import WordEditDialog from './WordEditDialog/WordEditDialog';
import WordInfoDialog from './WordInfoDialog/WordInfoDialog';

export type wordTypeTYPE = 'word' | 'phrase' | 'sentence';
type dataTYPE = {
    word: string;
    wordType: wordTypeTYPE;
    definition?: string;
};

export type googleTranslateWordDataDefinitionTYPE = {
    definition: string;
    example: string;
    synonyms: string[] | [];
    antonyms: string[] | [];
};
export type googleTranslateWordDataTYPE = {
    partOfSpeech: string;
    definitions: googleTranslateWordDataDefinitionTYPE[];
};

export const setErrorMes = (code: number, message: string) => 'Error ' + code + '. ' + message;

const Dashboard: React.FC = () => {
    const classes = useStyles();
    const columns = [
        { title: 'EN', value: 'en' },
        { title: 'PL', value: 'pl' },
        { title: 'Definition', value: 'definition', cellSize: 'small' },
        { title: 'Category', value: 'category', cellSize: 'small' },
        { title: 'Word type', value: 'wordType', cellSize: 'small' },
        { title: 'Date', value: 'updatedAt', cellSize: 'small' }
    ];

    const [DetailsData, setDetailsData] = useState<any>(null);
    const [EditData, setEditData] = useState<worDataTYPE | null>(null);

    const [Loading, setLoading] = useState(false);

    const [SnackbarData, setSnackbarData] = useState<{ title: string; variant: SnackbarVariantTYPE } | null>(null);

    const getData = () => {
        setLoading(true);
        API.get('words')
            .then(res => {
                setData(
                    res.data.map((el: worDataTYPE) => {
                        el.updatedAt = moment(el.updatedAt).format('DD-MM-YYYY');
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

    const [Data, setData] = useState([]);

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const postData = async ({ word, wordType, definition }: dataTYPE, { resetForm }: any) => {
        // await new Promise(resolve => setTimeout(resolve, 1500));
        await API.post('word', {
            text: word,
            wordType: wordType,
            definition: definition,
            langTo: 'pl'
        })
            .then(res => {
                console.log(res);
                getData();
                resetForm();
                setSnackbarData({
                    title: 'Word ' + res.data.data.en + ' added',
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

    const deleteWord = async ({ id }: any) => {
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
    const detailsWord = async ({ id }: any) => {
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

    const validationSchema = Yup.object().shape({
        word: Yup.string().required('This field is required')
    });

    const setInitErrors = () => {
        return {
            word: 'This field is required'
        };
    };

    const closeEditDialog = (shouldUpdateTableData: boolean) => {
        setEditData(null);
        if (shouldUpdateTableData) getData();
    };

    return (
        <div>
            {Loading && <BackdropLoader />}
            <Formik
                initialValues={{ word: '', wordType: 'word', definition: '' }}
                validationSchema={validationSchema}
                initialErrors={setInitErrors()}
                onSubmit={postData}
            >
                {formProps => (
                    <Form className="formContainer">
                        <div className={classes.form}>
                            <div>
                                <FormikInput name="word" label="Word" />
                                <FormikSelect
                                    name="wordType"
                                    label="Word type"
                                    options={[
                                        { value: 'word', label: 'Word' },
                                        { value: 'sentence', label: 'Sentence' },
                                        { value: 'phrase', label: 'Phrase' }
                                    ]}
                                />
                            </div>
                            <FormikInput name="definition" label="Definition" fullWidth />
                        </div>
                        <div>
                            <RectangularButton
                                text="Submit"
                                type="submit"
                                loading={formProps.isSubmitting}
                                disabled={formProps.isSubmitting || !formProps.isValid}
                                startIcon={<Save />}
                            />
                        </div>
                    </Form>
                )}
            </Formik>
            <CustomTable
                columns={columns}
                data={Data}
                onDetails={detailsWord}
                onEdit={(row: worDataTYPE) => setEditData(row)}
                onDelete={deleteWord}
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
