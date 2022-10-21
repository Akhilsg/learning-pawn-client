import React, { useState, useCallback, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';
import { useDispatch } from 'react-redux';

import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation()
  const classes = useStyles();
  const userId = user?.token

  const logout = useCallback(() => {
    dispatch({ type: actionType.LOGOUT });
    history.push('/auth');

    setUser(null);
  }, [history, dispatch, setUser])

  useEffect(() => {
    if (userId) {
      const decodedToken = decode(userId);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location, logout, userId]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <Typography
          component="h2"
          variant="h4"
          color='textPrimary'
        >
          Learning Pawn
        </Typography>
        <img
          className={classes.image}
          src={"https://media.gettyimages.com/photos/black-pawn-picture-id173838005"}
          alt="icon"
          height="40px"
        />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <>
            <div className={classes.profile} >
              <Avatar
                className={classes.purple}
                alt={user?.result.name}
                src={user?.result.imageUrl}
              >
                {user?.result.name.toUpperCase().charAt(0)}
              </Avatar>
              <Typography 
                className={classes.userName} 
                variant="h6"
                component={Link}
                to='/profile'
              >
                {user?.result.name}
              </Typography>
              <Button
                variant="contained"
                className={classes.logout}
                color="secondary"
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          </>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
