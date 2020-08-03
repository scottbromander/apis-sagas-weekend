import React, { Component } from 'react';
import { connect } from 'react-redux';

class Edit extends Component {
  state = {
    title: '',
    description: '',
  };

  componentDidMount() {
    if (!this.props.store.currentMovie.title) {
      this.props.dispatch({
        type: 'GET_MOVIE_DETAILS',
        payload: this.props.match.params.id,
      });
    }
  }

  onCancelClick = (event) => {
    this.props.history.push(`/details/${this.props.store.currentMovie.id}`);
  };

  onSaveClick = (event) => {
    const dataForServer = {
      id: this.props.store.currentMovie.id,
      title: this.state.title,
      description: this.state.description,
    };

    this.props.dispatch({
      type: 'UPDATE_MOVIE_DETAILS',
      payload: dataForServer,
    });

    this.props.history.push(`/details/${this.props.store.currentMovie.id}`);
  };

  onInputChange = (input) => (event) => {
    this.setState({
      [input]: event.target.value,
    });
  };

  render() {
    if (!this.props.store.currentMovie.title) {
      return (
        <div>
          <h1>Movie Not Loaded</h1>
          <button onClick={(event) => this.props.history.push('/')}>
            Go Home
          </button>
        </div>
      );
    }

    return (
      <div>
        <h1>Editing {this.props.store.currentMovie.title}</h1>
        <div>
          <input
            type="text"
            placeholder="Title"
            style={{ width: '200px' }}
            onChange={this.onInputChange('title')}
          />
        </div>

        <div>
          <textarea
            placeholder="Description"
            style={{ height: '100px', width: '200px' }}
            onChange={this.onInputChange('description')}
          />
        </div>

        <div>
          <button onClick={this.onCancelClick} style={{ marginRight: '20px' }}>
            Cancel
          </button>
          <button onClick={this.onSaveClick}>Save</button>
        </div>
      </div>
    );
  }
}

const mapStoreToProps = (store) => ({ store });

export default connect(mapStoreToProps)(Edit);
