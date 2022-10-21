import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import PostDetails from './components/PostDetails/PostDetails';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import ErrorPage from './components/ErorrPage/ErorrPage';
import CreatorOrTag from './components/CreatorOrTag/CreatorOrTag';
import Profile from './components/Profile/Profile';
import PricingCard from './components/Profile/PricingCard/PricingCard';
import TournamentCreate from './components/Create/Create';

const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/posts" />} />
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/search" exact component={Home} />
          <Route path="/posts/:id" exact component={PostDetails} />
          <Route path={['/creators/:name', '/tags/:name']} component={CreatorOrTag} />
          <Route path="/auth" exact component={Auth} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/pricing" exact component={PricingCard} />
          <Route path={['/edit/:id', '/create']} exact component={TournamentCreate} />
          <Route path="*" exact component={ErrorPage} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
