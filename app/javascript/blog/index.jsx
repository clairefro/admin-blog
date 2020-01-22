import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import logger from 'redux-logger';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createHistory as history } from 'history';
import { reducer as formReducer } from 'redux-form';

import PostsIndex from './containers/posts_index';
import PostsShow from './containers/posts_show';
import PostsNew from './containers/posts_new';

// remove for rails
// import '../assets/stylesheets/application.scss';
import postsReducer from './reducers/posts_reducer';

const root = document.getElementById('root');

const reducers = combineReducers({
  posts: postsReducer,
  form: formReducer
});

// pre-load posts from db before render
const initialState = { posts: JSON.parse(root.dataset.posts)};

const middlewares = applyMiddleware(reduxPromise, logger);

// render an instance of the component in the DOM
ReactDOM.render(
  <Provider store={createStore(reducers, initialState, middlewares)}>
    <Router history={history}>
      <div className="thin-container">
        <Switch>
          <Route path="/" exact component={PostsIndex} />
          <Route path="/posts/new" exact component={PostsNew} />
          <Route path="/posts/:id" component={PostsShow} />
        </Switch>
      </div>
    </Router>
  </Provider>,
  root
);
