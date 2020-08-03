import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';

import axios from 'axios';

function* getMovies(action) {
  try {
    const response = yield axios.get('/api/movies');
    yield put({
      type: 'SET_MOVIES',
      payload: response.data,
    });
  } catch (err) {
    console.warn(err);
  }
}

function* getMovieDetails(action) {
  try {
    const response = yield axios.get(`/api/movies/details/${action.payload}`);
    yield put({
      type: 'SET_CURRENT_MOVIE',
      payload: response.data,
    });
  } catch (err) {
    console.warn(err);
  }
}

function* updateMovieDetails(action) {
  try {
    const response = yield axios.put(
      `/api/movies/update/${action.payload.id}`,
      action.payload
    );
    yield put({
      type: 'GET_MOVIE_DETAILS',
      payload: action.payload.id,
    });
    yield put({
      type: 'GET_MOVIES',
    });
  } catch (err) {
    console.warn(err);
  }
}

// Create the rootSaga generator function
function* rootSaga() {
  yield takeEvery('GET_MOVIES', getMovies);
  yield takeEvery('GET_MOVIE_DETAILS', getMovieDetails);
  yield takeEvery('UPDATE_MOVIE_DETAILS', updateMovieDetails);
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return action.payload;
    default:
      return state;
  }
};

const currentMovie = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CURRENT_MOVIE':
      return action.payload;
    case 'CLEAR_CURRENT_MOVIE':
      return {};
    default:
      return state;
  }
};

// Used to store the movie genres
const genres = (state = [], action) => {
  switch (action.type) {
    case 'SET_GENRES':
      return action.payload;
    default:
      return state;
  }
};

// Create one store that all components can use
const storeInstance = createStore(
  combineReducers({
    movies,
    genres,
    currentMovie,
  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger)
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={storeInstance}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
