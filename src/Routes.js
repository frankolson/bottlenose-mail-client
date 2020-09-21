import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Header } from './components/Header';
import { Home } from './views/Home';
import { Inbox } from './views/Inbox';
import { ShowEmail } from './views/ShowEmail';
import { FourZeroFour } from './views/FourZeroFour';

export default function Routes() {
  return (
    <Container>
      <Header />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/inbox/:inbox" component={Inbox} />
        <Route path="/emails/:email" component={ShowEmail} />

        <Route component={FourZeroFour} />
      </Switch>
    </Container>
  );
}
