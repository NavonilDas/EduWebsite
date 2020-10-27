import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Link } from 'react-router-dom';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';
// Icons
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';

const drawerWidth = 240;

const style = theme => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
});


class SideBar extends React.Component {

    render() {
        const { classes } = this.props;
        const items = [
            {
                name: 'Home',
                icon: <HomeIcon />,
                to: '/'
            },
            {
                name: 'Users',
                icon: <SupervisedUserCircleIcon />,
                to: '/users'
            },
            {
                name: 'Analytics',
                icon: <DashboardIcon />,
                to: '/dashboard'
            },
            {
                name: 'Profile',
                icon: <AccountCircleIcon />,
                to: '/profile'
            }
        ];

        return (
            <div>
                <CssBaseline />
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    anchor="left">
                    <div className={classes.toolbar} >
                        <Typography variant="h6" noWrap>
                            Edu+ Admin
                        </Typography>
                    </div>
                    <Divider />
                    <List>
                        {
                            items.map((ele, index) => (
                                <Link to={ele.to} key={`link-${index}`}>
                                    <ListItem button key={ele.name}>
                                        <ListItemIcon>
                                            {ele.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={ele.name} />
                                    </ListItem>
                                </Link>
                            ))
                        }
                    </List>
                </Drawer>
            </div>
        );
    }
}

export default withStyles(style)(SideBar);