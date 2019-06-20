import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import 'styled-components/macro';
import tw from 'tailwind.macro';
import Header from './Header';
import Home from './Home';
import Results from './Results';
import Details from './Details';
import Footer from './Footer';

class App extends Component {
  render() {
    return (
      <div css={tw`font-sans text-gray-900 leading-normal overflow-hidden`}>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/results" component={Results} />
          <Route path="/details" component={Details} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
