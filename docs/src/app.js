import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Router } from 'react-static';
import { ThemeProvider } from 'styled-components';
import { hot } from 'react-hot-loader';
import Template from './template';
import Analytics from './google-analytics';
import { theme } from './theme';
// Routes generated at build-time
// eslint-disable-next-line import/no-unresolved
import Routes from 'react-static-routes';
// import default prism theme styles
import 'prismjs/themes/prism.css';

const scrollSidebar = (location, activeItemClass = '.active') => {
  const actives = document.querySelectorAll(activeItemClass);
  const last = actives[actives.length - 1];
  last.scrollIntoView();
};

const checkScrollRoutes = (pathname, routes = ['docs']) =>
  routes.some(r => pathname.includes(r));

class ScrollToTop extends Component {
  componentDidMount() {
    if (
      typeof window !== 'undefined' &&
      checkScrollRoutes(this.props.location.pathname)
    ) {
      scrollSidebar(this.props.location);
    }
  }

  componentDidUpdate() {
    if (
      typeof window !== 'undefined' &&
      checkScrollRoutes(this.props.location.pathname)
    ) {
      scrollSidebar(this.props.location);
    }
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

ScrollToTop.propTypes = {
  children: PropTypes.object,
  location: PropTypes.object,
};

const WrappedScrollToTop = withRouter(ScrollToTop);

let history;
let basename;
if (typeof window !== 'undefined') {
  const createBrowserHistory = require('history').createBrowserHistory;
  const { stage, landerBasePath } = require('../static-config-parts/constants');
  basename = `/${landerBasePath}`;
  history =
    stage === 'development'
      ? createBrowserHistory()
      : createBrowserHistory({ basename });
}

// eslint-disable-next-line react/no-multi-comp
const App = () => (
  <Router
    showErrorsInProduction={false}
    autoScrollToHash={false}
    scrollToHashDuration={100}
    autoScrollToTop
    history={history}
  >
    <WrappedScrollToTop>
      <ThemeProvider theme={theme}>
        <Analytics id="UA-43290258-1" basename={basename}>
          <Template>
            <Routes />
          </Template>
        </Analytics>
      </ThemeProvider>
    </WrappedScrollToTop>
  </Router>
);

export default hot(module)(App);
