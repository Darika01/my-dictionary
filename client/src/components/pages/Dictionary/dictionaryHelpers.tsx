export const setColumns = (isEnDict: boolean) =>
    isEnDict
        ? [
              { title: 'EN', value: 'wordText' },
              { title: 'PL', value: 'translationText' },
              // { title: 'Phonetic', value: 'phonetic' },
              { title: 'Definition', value: 'definition', cellSize: 'small' },
              { title: 'Category', value: 'category', cellSize: 'small' },
              { title: 'Word type', value: 'wordType', cellSize: 'small' },
              { title: 'Date', value: 'updatedAt', cellSize: 'small' }
          ]
        : [
              { title: 'PL', value: 'wordText' },
              { title: 'RU', value: 'translationText' },
              { title: 'Word type', value: 'wordType', cellSize: 'small' },
              { title: 'Date', value: 'updatedAt', cellSize: 'small' }
          ];
