import { useEffect, useState } from 'react';

import axios from 'axios';
import RectangularButton from 'components/atoms/buttons/RectangularButton';
import BackdropLoader from 'components/molecules/BackdropLoader';
import FormikInput from 'components/molecules/textfields/FormikInput';
import FormikSelect from 'components/molecules/textfields/FormikSelect';
import CustomTable from 'components/organisms/CustomTable';
import { Form, Formik } from 'formik';
import moment from 'moment';
import * as Yup from 'yup';

import { Save } from '@material-ui/icons';

import WordInfoDialog from './WordInfoDialog/WordInfoDialog';

export type wordTypeTYPE = 'word' | 'phrase' | 'sentence';
type dataTYPE = {
    word: string;
    wordType: wordTypeTYPE;
};

export type worDataTYPE = {
    category: string;
    createdAt: string;
    definition: string;
    en: string;
    id: string;
    pl: string;
    updatedAt: string;
    wordType: string;
};
export type googleTranslateWordDataTYPE = {
    definition: string;
    example?: string;
    synonyms?: string[];
};

const Dashboard: React.FC = () => {
    const columns = [
        { title: 'EN', value: 'en' },
        { title: 'PL', value: 'pl' },
        { title: 'Definition', value: 'definition', cellSize: 'small' },
        { title: 'Category', value: 'category', cellSize: 'small' },
        { title: 'Word type', value: 'wordType', cellSize: 'small' },
        { title: 'Date', value: 'updatedAt', cellSize: 'small' }
    ];

    const [DetailsData, setDetailsData] = useState<any>(null);

    const [Loading, setLoading] = useState(false);

    const getData = () => {
        setLoading(true);
        axios
            .get('http://localhost:8080/api/words')
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
            });
    };

    const [Data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const postData = async (data: dataTYPE, { resetForm }: any) => {
        // await new Promise(resolve => setTimeout(resolve, 1500));
        await axios
            .post('http://localhost:8080/api/word', {
                text: data.word,
                wordType: data.wordType,
                langTo: 'pl'
            })
            .then(() => {
                getData();
                resetForm();
            })
            .catch(err => {
                console.log(err);
            });
    };
    const deleteWord = async ({ id }: any) => {
        // await new Promise(resolve => setTimeout(resolve, 1500));
        axios
            .delete(`http://localhost:8080/api/word/${id}`)
            .then(() => {
                getData();
            })
            .catch(err => console.log(err));
    };
    const detailsWord = async ({ id }: any) => {
        setLoading(true);
        // await new Promise(resolve => setTimeout(resolve, 1500));
        await axios
            .get(`http://localhost:8080/api/word/details/${id}`)
            .then(res => {
                setDetailsData(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
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

    return (
        <div>
            {Loading && <BackdropLoader />}
            <Formik
                initialValues={{ word: '', wordType: 'word' }}
                validationSchema={validationSchema}
                initialErrors={setInitErrors()}
                onSubmit={postData}
            >
                {formProps => (
                    <Form className="formContainer">
                        <div className="formContent">
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
                        <RectangularButton
                            text="Submit"
                            type="submit"
                            loading={formProps.isSubmitting}
                            disabled={formProps.isSubmitting || !formProps.isValid}
                            startIcon={<Save />}
                        />
                    </Form>
                )}
            </Formik>
            <CustomTable columns={columns} data={Data} onDelete={deleteWord} onDetails={detailsWord} />
            {DetailsData && <WordInfoDialog detailsData={DetailsData} onCloseDialog={() => setDetailsData(null)} />}
        </div>
    );
};
export default Dashboard;
