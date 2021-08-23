import { useEffect, useState } from 'react';

import axios from 'axios';
import RectangularButton from 'components/atoms/buttons/RectangularButton';
import FormikInput from 'components/molecules/textfields/FormikInput';
import FormikSelect from 'components/molecules/textfields/FormikSelect';
import CustomTable from 'components/organisms/CustomTable';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    Typography
} from '@material-ui/core';
import { Close, Save } from '@material-ui/icons';

export type wordTypeTYPE = 'word' | 'phrase' | 'sentence';
type dataTYPE = {
    word: string;
    wordType: wordTypeTYPE;
};

const Dashboard: React.FC = () => {
    const columns = [
        { title: 'EN', value: 'en' },
        { title: 'PL', value: 'pl' },
        { title: 'Definition', value: 'definition', cellSize: 'small' },
        { title: 'Category', value: 'category', cellSize: 'small' }
    ];

    const [DetailsData, setDetailsData] = useState<any>(null);

    const getData = () => {
        axios
            .get('http://localhost:8080/api/words')
            .then(res => {
                console.log(res.data);
                setData(res.data);
            })
            .catch(err => console.log(err));
    };

    const [Data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const postData = async (data: dataTYPE, { resetForm }: any) => {
        // await new Promise(resolve => setTimeout(resolve, 1500));
        axios
            .post('http://localhost:8080/api/word', {
                text: data.word,
                wordType: data.wordType,
                langTo: 'pl'
            })
            .then(res => {
                console.log(res);
                getData();
                resetForm();
            })
            .catch(err => console.log(err));
    };
    const deleteWord = async ({ id }: any) => {
        // await new Promise(resolve => setTimeout(resolve, 1500));
        axios
            .delete(`http://localhost:8080/api/word/${id}`)
            .then(res => {
                console.log(res);
                getData();
            })
            .catch(err => console.log(err));
    };
    const detailsWord = async ({ id }: any) => {
        // await new Promise(resolve => setTimeout(resolve, 1500));
        axios
            .get(`http://localhost:8080/api/word/details/${id}`)
            .then(res => {
                console.log(res);
                setDetailsData(res.data);
                getData();
            })
            .catch(err => console.log(err));
    };
    console.log('DetailsData :>> ', DetailsData);

    const validationSchema = Yup.object().shape({
        word: Yup.string().required('This field is required')
        // word: Yup.string().required('This field is required')
    });

    const setInitErrors = () => {
        return {
            word: 'This field is required'
        };
    };

    return (
        <div>
            <Formik
                initialValues={{ word: '', wordType: 'word' }}
                validationSchema={validationSchema}
                initialErrors={setInitErrors()}
                onSubmit={postData}
                // onReset={() => history.push("/tickets")}
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
                            color="primary"
                            type="submit"
                            loading={formProps.isSubmitting}
                            disabled={formProps.isSubmitting || !formProps.isValid}
                            startIcon={<Save />}
                        />
                    </Form>
                )}
            </Formik>
            <CustomTable columns={columns} data={Data} onDelete={deleteWord} onDetails={detailsWord} />
            {DetailsData && (
                <Dialog open={Boolean(DetailsData)}>
                    <DialogTitle>
                        Word details{' '}
                        <Typography variant="body1" component="span" color="primary">
                            {DetailsData.word.en}
                        </Typography>
                    </DialogTitle>
                    <DialogContent>
                        {Object.entries(DetailsData).map(([key, value]: any) => {
                            if (key === 'word') {
                                return (
                                    <List key={key}>
                                        {Object.entries(value).map(([elKey, elVal]: any) => {
                                            return (
                                                <ListItem key={elKey}>
                                                    {elKey}:{' '}
                                                    <Typography variant="body2" component="span">
                                                        {elVal}
                                                    </Typography>
                                                </ListItem>
                                            );
                                        })}
                                    </List>
                                );
                            } else
                                return (
                                    <List key={key}>
                                        {value.map((defEl: any) => {
                                            return (
                                                <ListItem key={defEl.definition}>
                                                    <div>
                                                        <div>
                                                            definition:{' '}
                                                            <Typography variant="body2" component="span">
                                                                {defEl.definition}
                                                            </Typography>
                                                        </div>
                                                        {defEl.example && (
                                                            <div>
                                                                example:{' '}
                                                                <Typography variant="body2" component="span">
                                                                    {defEl.example}
                                                                </Typography>
                                                            </div>
                                                        )}
                                                        {defEl.synonyms?.length > 0 && (
                                                            <div>
                                                                synonyms:{' '}
                                                                <Typography variant="body2" component="span">
                                                                    {defEl.synonyms?.map((el: string, id: number) =>
                                                                        id !== defEl.synonyms.length - 1
                                                                            ? el + ', '
                                                                            : el
                                                                    )}
                                                                </Typography>
                                                            </div>
                                                        )}
                                                    </div>
                                                </ListItem>
                                            );
                                        })}
                                    </List>
                                );
                        })}
                    </DialogContent>
                    <DialogActions>
                        <RectangularButton
                            text="Close"
                            color="primary"
                            handleClick={() => setDetailsData(null)}
                            startIcon={<Close />}
                        />
                    </DialogActions>
                </Dialog>
            )}
        </div>
    );
};
export default Dashboard;
