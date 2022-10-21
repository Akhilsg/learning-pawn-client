import React, { useState } from 'react';
import { Container, Grow, Grid, Divider, Paper, Typography } from '@material-ui/core';
import Form from './Form/Form';
import useStyles from '../styles';
import DynamicForm from './Form/Components/DynamicRound';

const TournamentCreate = () => {
  const classes = useStyles();
  const [currentId, setCurrentId] = useState(0);
  const user = JSON.parse(localStorage.getItem('profile'));

  //Checking if user is signed in
  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own tournaments and like other's tournaments.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <Grow in>
        <Container maxWidth="xl">
          <Grid
            container
            alignItems="stretch"
            spacing={3}
            className={classes.gridContainer}
          >
            <Grid item xs={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
            <Divider
              orientation='vertical'
              variant="middle"
              flexItem
            />
            <Grid item xs={4}>
              <DynamicForm />
            </Grid>
            <Divider
              orientation='vertical'
              variant="middle"
              flexItem
            />
          </Grid>
        </Container>
      </Grow>
    </Paper>
  );
};

export default TournamentCreate;
