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
    updatedAt: string;
    phonetic: string | null;
    phoneticAudio: string | null;
    wordType: string;
};
