import { makeStyles, Theme } from '@material-ui/core/styles';

import breakpoints, { breakpointsTYPE } from './themeConfig/breakpoints';
import rootFonts from './themeConfig/rootFontsConfig';

const setRootFont = (theme: Theme) => {
    const htmlFontSizes = {};
    Object.entries(breakpoints as breakpointsTYPE).map(([viewPortKey, viewPortValue]) => {
        return Object.assign(htmlFontSizes, {
            [theme.breakpoints.up(viewPortValue)]: {
                html: {
                    fontSize: rootFonts[viewPortKey] + 'px'
                }
            }
        });
    });

    return Object.assign({ '@global': htmlFontSizes });
};

const useRootFontStyles = makeStyles(theme => setRootFont(theme));
export default useRootFontStyles;
