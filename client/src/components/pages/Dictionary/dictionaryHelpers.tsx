export const setColumns = (langFrom: string, langTo: string) =>
    langFrom === 'EN'
        ? [
              { title: 'EN', value: 'wordText' },
              { title: langTo, value: 'translationText' },
              // { title: 'Phonetic', value: 'phonetic' },
              { title: 'Definition', value: 'definition', cellSize: 'small' },
              { title: 'Category', value: 'category', cellSize: 'small' },
              { title: 'Word type', value: 'wordType', cellSize: 'small' },
              { title: 'Date', value: 'updatedAt', cellSize: 'small' }
          ]
        : [
              { title: langFrom, value: 'wordText' },
              { title: langTo, value: 'translationText' },
              { title: 'Word type', value: 'wordType', cellSize: 'small' },
              { title: 'Date', value: 'updatedAt', cellSize: 'small' }
          ];
