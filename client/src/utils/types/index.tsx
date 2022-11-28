export type worDataTYPE = {
    category: string | null;
    createdAt: string;
    definition: string | null;
    id: string;
    word: {
        text: string;
        lang: string;
    };
    translation: {
        text: string;
        lang: string;
    };
    wordText: string;
    translationText: string;
    updatedAt: string;
    phonetic: string | null;
    phoneticAudio: string | null;
    wordType: string;
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

export type ColorTYPE = 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'grey';
