import { makeStyles, Theme } from "@material-ui/core";
import getLighterColor from "utils/getLighterColor";

type StylesProps = {
    color: "primary" | "secondary" | "error" | "info" | "success" | "warning";
};

export const useStyles = makeStyles((theme: Theme) => ({
    wrapper: {
        position: "relative"
    },
    buttonProgress: {
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: "-0.8rem",
        marginLeft: "-0.8rem",
        color: ({ color }) => theme.palette[color].main
    },
    contained: {
        color: theme.palette.common.white,
        backgroundColor: ({ color }: StylesProps) => theme.palette[color].main,
        "&:hover": {
            backgroundColor: ({ color }) => theme.palette[color].dark
        },
        "&:active": {
            backgroundColor: ({ color }) => theme.palette[color].light
        }
    },
    outlined: {
        color: ({ color }) => theme.palette[color].main,
        borderColor: ({ color }) => theme.palette[color].main,
        "&:hover": {
            backgroundColor: ({ color }) =>
                getLighterColor(theme.palette[color].main, 0.08),
            borderColor: ({ color }) => theme.palette[color].main
        },
        "&:active": {
            backgroundColor: ({ color }) =>
                getLighterColor(theme.palette[color].main, 0.15),
            borderColor: ({ color }) => theme.palette[color].main
        }
    },

    text: {
        color: ({ color }) => theme.palette[color].main,
        backgroundColor: theme.palette.common.white,
        "&:hover": {
            backgroundColor: ({ color }) =>
                getLighterColor(theme.palette[color].main, 0.08)
        },
        "&:active": {
            backgroundColor: ({ color }) =>
                getLighterColor(theme.palette[color].main, 0.15)
        }
    }
}));
