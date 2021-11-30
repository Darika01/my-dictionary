import { NavLink } from 'react-router-dom';

import { ListItem, ListItemIcon, ListItemText } from '@mui/material';

import { useStyles } from './styles';

interface NavigationListItemProps {
    text: string;
    icon?: React.ReactNode;
    to?: string;
}

const NavigationListItem: React.FC<NavigationListItemProps> = ({ text, icon, to }) => {
    const classes = useStyles();
    const itemContent = (
        <>
            {icon && <ListItemIcon>{icon}</ListItemIcon>}
            <ListItemText primary={text} />
        </>
    );

    return to ? (
        <NavLink
            to={location => {
                return location.pathname === to
                    ? { ...location, pathname: to }
                    : { pathname: to, state: { title: text } };
            }}
            className={classes.navLink}
            activeClassName={classes.activeNavLink}
        >
            <ListItem button className={classes.listItem} onClick={() => null}>
                {itemContent}
            </ListItem>
        </NavLink>
    ) : (
        <ListItem button className={classes.listItem} disabled>
            {itemContent}
        </ListItem>
    );
};

export default NavigationListItem;
