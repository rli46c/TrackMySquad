import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fade, makeStyles,AppBar, Toolbar, IconButton, Typography, 
  InputBase, Badge, MenuItem, Menu,Container } from '@material-ui/core';
import { AirlineSeatReclineExtra, LiveHelp, LocalAtm, GetApp, 
  Menu as MenuIcon, Search, AccountCircle, Mail, Notifications, More } from '@material-ui/icons';

import { createBareBoneStructure } from '../../actions/authAction';

const useStyles = makeStyles(theme => ({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    navSpan: {
      fontSize: '0.7em',
      paddingLeft: '2px',
    },
    navLink: {
      textDecoration: 'none',
      color: '#fff',
      display:'flex'
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 200,
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
      menuitem:{
        padding:'8px',
      }
    },
    headertop:{
      background:'#151515',
    },
  }));

export const Appbar = ({ createBareBoneStructure }) => {

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  
    const handleProfileMenuOpen = event => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
      handleMobileMenuClose();
    };
  
    const handleMobileMenuOpen = event => {
      setMobileMoreAnchorEl(event.currentTarget);
    };
  
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      </Menu>
    );
  
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="secondary">
              <Mail />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem>
          <IconButton aria-label="show 11 new notifications" color="inherit">
            <Badge badgeContent={11} color="secondary">
              <Notifications />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );
  
    return (
      <div className={classes.grow}>
        <AppBar position="relative" className={classes.headertop}>
          <Container >
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              <Link to="/" className={classes.navLink} style={{ color: 'white' }}>TrackMySquad</Link>
            </Typography>
            <div className={classes.search} style={{ display: 'none' }}>
              <div className={classes.searchIcon}>
                <Search />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>

              <IconButton aria-label="show 4 new mails" color="inherit" className={classes.menuitem}>
                <Badge badgeContent={ null } color="secondary">
                  <Link to="/" className={classes.navLink}>
                    <AirlineSeatReclineExtra fontSize="small" />
                    <span className={ classes.navSpan } >Demo</span>
                  </Link>
                </Badge>
              </IconButton>

              <IconButton aria-label="show 4 new mails" color="inherit" className={classes.menuitem}>
                <Badge badgeContent={ null } color="secondary">
                  <LiveHelp fontSize="small" />
                  <span className={ classes.navSpan } >How it works</span>
                </Badge>
              </IconButton>
              <IconButton aria-label="show 4 new mails" color="inherit" className={classes.menuitem}>
                <Badge badgeContent={ null } color="secondary">
                  <LocalAtm fontSize="small" />
                  <span className={ classes.navSpan } >Pricing</span>
                </Badge>
              </IconButton>
              <IconButton aria-label="show 4 new mails" color="inherit" className={classes.menuitem}>
                <Badge badgeContent={ null } color="secondary">
                  <GetApp fontSize="small" />
                  <span className={ classes.navSpan } >Download</span>
                </Badge>
              </IconButton>
              <IconButton aria-label="show 4 new mails" color="inherit" className={classes.menuitem}>
                <Badge badgeContent={ null } color="secondary">
                  <Link to="/register" className={classes.navLink}>
                    <span className={ classes.navSpan } >Sign up!</span>
                  </Link>
                </Badge>
              </IconButton>
              <IconButton aria-label="show 4 new mails" color="inherit" className={classes.menuitem}>
                <Badge badgeContent={ null } color="secondary">
                  <span className={ classes.navSpan } >Support</span>
                </Badge>
              </IconButton>
              <IconButton aria-label="show 4 new mails" color="inherit" className={classes.menuitem}>
                <Badge badgeContent={ null } color="secondary">
                  <span className={ classes.navSpan } >Blog</span>
                </Badge>
              </IconButton>
              <IconButton aria-label="show 4 new mails" color="inherit" className={classes.menuitem}>
                <Badge badgeContent={4} color="secondary">
                  <Mail />
                </Badge>
              </IconButton>
              <IconButton aria-label="show 17 new notifications" color="inherit" className={classes.menuitem}>
                <Badge badgeContent={17} color="secondary">
                  <Notifications />
                </Badge>
              </IconButton>
              {/* <IconButton edge="end" aria-label="account of current user" aria-controls={menuId} aria-haspopup="true" onClick={handleProfileMenuOpen} color="inherit" > */}
              <IconButton edge="end" aria-label="account of current user" aria-controls={menuId} aria-haspopup="true" onClick={()=>createBareBoneStructure()} color="inherit" >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <More />
              </IconButton>
            </div>
          </Toolbar>
          </Container>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
    </div>
    );
};

Appbar.propTypes = {
  createBareBoneStructure: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    
});

const mapDispatchToProps = {
  createBareBoneStructure
};

export default connect(mapStateToProps, mapDispatchToProps)(Appbar);