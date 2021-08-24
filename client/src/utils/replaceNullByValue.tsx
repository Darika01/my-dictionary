export const replaceNullByValue = (arr: any[], emptyValue: string) => {
    arr.forEach(el =>
        Object.keys(el).forEach(key => {
            if (el[key] === null) {
                el[key] = '-';
            }
        })
    );
    return arr;
};
