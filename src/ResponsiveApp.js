import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import MenuIcon from '@material-ui/icons/Menu';
import AppleIcon from '@material-ui/icons/Apple';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import NoteIcon from '@material-ui/icons/Note';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { useAuth0 } from './react-auth0-spa';
import { Router, Route, Switch, Link } from "react-router-dom";
import Profile from "./components/Profile";
import history from "./utils/history";
import PrivateRoute from "./components/PrivateRoute";
import ProfileMenu from './components/navigation/ProfileMenu';
import ProfileSetUpForm from './components/stepper/ProfileSetUpForm';
import Foods from './components/foods/foods'
import CalorieTracker from './components/calorieTracker/CalorieTracker';
import Meals from './components/meals/Meals';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './components/loginPage/LoginPage';
import { useSelector } from "react-redux";
import HomeRoute from './components/HomeRoute';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },

    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    menu_links: {
        textDecoration: 'none',
        color: 'black'
    }
}));

function ResponsiveDrawer(props) {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const { isAuthenticated, loginWithRedirect } = useAuth0();
    const calorieLimit = useSelector((state) => state.profileInfo.calorieLimit);
    const calorieNeeds = useSelector((state) => state.profileInfo.calorieNeeds);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                <Link to='/foods' color='inherit' className={classes.menu_links}>
                    <ListItem button key='Foods' >
                        <ListItemIcon><AppleIcon /></ListItemIcon>
                        <ListItemText primary={'Foods'} />
                    </ListItem>
                </Link>
                <Link to='/meals' color='inherit' className={classes.menu_links}>
                    <ListItem button key='Meals'>
                        <ListItemIcon><FastfoodIcon /></ListItemIcon>
                        <ListItemText primary={'Meals'} />
                    </ListItem>
                </Link>

                <Link to='/calorie-tracker' color='inherit' className={classes.menu_links}>
                    <ListItem button key='Foods'>
                        <ListItemIcon><NoteIcon /></ListItemIcon>
                        <ListItemText primary={'Calorie Tracker'} />
                    </ListItem>
                </Link>

            </List>

        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;


    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.navbar}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h4" noWrap>
                        Health Nut
                     </Typography>
                    {(isAuthenticated ? <ProfileMenu /> : <Button variant="contained" onClick={() => loginWithRedirect({})} color="primary">Log In</Button>)}
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">

                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <div>
                    <Router history={history}>
                        <Switch>
                            <HomeRoute path="/" exact />
                            <PrivateRoute path="/profile" component={Profile} calorieLimit={calorieLimit} calorieNeeds={calorieNeeds} />
                            <PrivateRoute path="/foods" component={Foods} calorieLimit={calorieLimit} calorieNeeds={calorieNeeds} />
                            <PrivateRoute path="/calorie-tracker" component={CalorieTracker} calorieLimit={calorieLimit} calorieNeeds={calorieNeeds} />
                            <PrivateRoute path='/meals' component={Meals} calorieLimit={calorieLimit} calorieNeeds={calorieNeeds} />
                            <ProtectedRoute path="/set-up" component={ProfileSetUpForm} />
                            <Route path='/login' component={LoginPage} />
                        </Switch>
                    </Router>
                </div>
            </main>
        </div >
    );
}

ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default ResponsiveDrawer;
