import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux' ;
import logo from './logo.svg';
import './App.css';
import reducer from './reducers';

import theme from './assets/react-toolbox/theme.js'
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
import './assets/react-toolbox/theme.css'; 
/**import '../node_modules/mdi/css/materialdesignicons.min.css' **/
import '../node_modules/material-design-icons/iconfont/material-icons.css'



import HomePage from './views/HomePage';
import PostDetailView from './views/PostDetailView';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducer,  composeEnhancers(applyMiddleware(thunk)))

class App extends Component {
  render() {

    return (
      <Provider store={store}> 
      <ThemeProvider theme={theme}>     
        <BrowserRouter>
          <Switch> 
            <Route exact path='/' component={HomePage}/>
            <Route exact path='/viewpost/:id' component={PostDetailView}/>
          </Switch>
        </BrowserRouter>
       </ThemeProvider>
      </Provider>
    );
  }
}

export default App;
