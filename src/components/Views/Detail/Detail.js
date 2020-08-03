import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Detail.css';

class Detail extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_MOVIE_DETAILS',
      payload: this.props.match.params.id,
    });
  }

  onBackClick = (event) => {
    this.props.dispatch({ type: 'CLEAR_CURRENT_MOVIE' });
    this.props.history.push('/');
  };

  onEditClick = (id) => (event) => {
    this.props.history.push(`/edit/${id}`);
  };

  render() {
    let genreArray = [];
    if (this.props.store.currentMovie && this.props.store.currentMovie.genres) {
      genreArray = this.props.store.currentMovie.genres.map((item, index) => {
        return (
          <span className="genre" key={index}>
            {item}{' '}
          </span>
        );
      });
    }

    return (
      <div>
        <div>
          <button onClick={this.onBackClick} style={{ marginRight: '20px' }}>
            Back
          </button>
          {this.props.store.currentMovie.id && (
            <button
              onClick={this.onEditClick(this.props.store.currentMovie.id)}
            >
              Edit
            </button>
          )}
        </div>
        {this.props.store.currentMovie.title ? (
          <div>
            <h1>{this.props.store.currentMovie.title}</h1>
            <img
              src={this.props.store.currentMovie.poster}
              alt={this.props.store.currentMovie.title}
            />

            <h5>{genreArray}</h5>

            <p>{this.props.store.currentMovie.description}</p>
          </div>
        ) : (
          <div>Loading</div>
        )}
      </div>
    );
  }
}

const mapStoreToProps = (store) => ({ store });

export default connect(mapStoreToProps)(Detail);
