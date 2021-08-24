import clsx from 'clsx';
import RoundButton from 'components/atoms/buttons/RoundButton';

import { Drawer, List, Toolbar, Typography } from '@material-ui/core';
import { Translate } from '@material-ui/icons';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import NavigationListItem from '../../atoms/NavigationListItem';
import { sidebarItemsList } from './sidebarItems';
import useStyles from './styles';

interface SideBarProps {
    isSidebarOpen: boolean;
    matchesDownSM: boolean;
    handleDrawer: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SideBarProps> = ({ isSidebarOpen, handleDrawer, matchesDownSM }) => {
    const classes = useStyles();
    return (
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: isSidebarOpen,
                [classes.drawerClose]: !isSidebarOpen
            })}
            classes={{
                paper: clsx(classes.drawerPaper, {
                    [classes.drawerOpen]: isSidebarOpen,
                    [classes.drawerClose]: !isSidebarOpen
                })
            }}
        >
            <div>
                <Toolbar>
                    <Translate fontSize="large" color="secondary" />
                    <Typography variant="h2" component="span" color="secondary" style={{ marginLeft: '2.4rem' }}>
                        My Dictionary
                    </Typography>
                </Toolbar>
                <div>
                    {sidebarItemsList.map((list, i) => (
                        <div key={i}>
                            <List className={i !== 0 ? classes.divider : ''}>
                                {list.map(({ title, ...otherProps }) => (
                                    <NavigationListItem key={title} text={title} {...otherProps} />
                                ))}
                            </List>
                        </div>
                    ))}
                </div>
            </div>
            {!matchesDownSM && (
                <div className={classes.collapseIcon}>
                    <RoundButton
                        color="secondary"
                        size="large"
                        handleClick={() => handleDrawer(!isSidebarOpen)}
                        tooltipTitle={isSidebarOpen ? 'Collapse' : 'Uncollapse'}
                    >
                        <>{isSidebarOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}</>
                    </RoundButton>
                </div>
            )}
        </Drawer>
    );
};

export default Sidebar;
