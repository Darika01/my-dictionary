const getLighterColor = (color: string, opacity: number): string => {
    // usage example
    // backgroundColor: getLighterColor(theme.palette.primary.main, 0.5)
    if (color) {
        return color.slice(0, -2).concat(`${opacity})`);
    } else return 'white';
};

export default getLighterColor;
