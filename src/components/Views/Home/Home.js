import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Home.css';

class Home extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'GET_MOVIES' });
  }

  clickMovie = (id) => (event) => {
    this.props.history.push(`/details/${id}`);
  };

  render() {
    const moviesArray = this.props.store.movies.map((movie, index) => {
      return (
        <div
          key={index}
          className="movie-cell"
          onClick={this.clickMovie(movie.id)}
        >
          <h1>{movie.title}</h1>
          <img src={movie.poster} />
        </div>
      );
    });

    return (
      <div>
        <h1>Home Page!</h1>
        <div>{moviesArray}</div>
      </div>
    );
  }
}

const mapStoreToProps = (store) => ({ store });

export default connect(mapStoreToProps)(Home);
