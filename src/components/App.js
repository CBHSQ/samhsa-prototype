import React, { Component } from 'react';
import tw from 'tailwind.macro';
import { createGlobalStyle } from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import withSizes from 'react-sizes';

import content from '../utils/content';

import ScreenContext from './ScreenContext';
import Header from './Header';
import Home from './Home';
import Results from './Results';
import Details from './Details';
import Content from './Content';
import NoMatch from './NoMatch';
import Footer from './Footer';

const GlobalStyle = createGlobalStyle`
  body {
    ${tw`font-sans text-gray-900 leading-normal print:text-black`}
  }
`;

class App extends Component {
  render() {
    return (
      <ScreenContext.Provider value={this.props.isDesktop}>
        <GlobalStyle />
        <Header />
        <Switch>
          <Route exact path="/" render={() => <Home content={content()} />} />
          <Route path="/results" component={Results} />
          <Route path="/details" component={Details} />
          <Route
            path="/content/:pageId"
            render={() => <Content content={content()} />}
          />
          <Route component={NoMatch} />
        </Switch>
        <Footer />
      </ScreenContext.Provider>
    );
  }
}

const mapSizesToProps = sizes => ({
  isDesktop: withSizes.isDesktop(sizes)
});

export default withSizes(mapSizesToProps)(App);
