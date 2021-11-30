import clsx from 'clsx';
import RoundButton from 'components/atoms/buttons/RoundButton';

import { Translate } from '@mui/icons-material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Drawer, List, Toolbar, Typography } from '@mui/material';

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
