import React, { Component } from 'react';
import Post from './Post';
import PostView from './PostView';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isNewPost: false,
      data: ''
    };

    // This binding is necessary to make `this` work in the callback
    this.createNewPost = this.createNewPost.bind(this);
  }

  fromPostEditor(params) {
    this.setState({
      data : params
    })
  }

  createNewPost = (props) => {
    this.setState({ isNewPost: true });
  }

  render() {
    let isNewPost = this.state.isNewPost;

    return (
      <div className="App">
        <div className="control-panel">
          <button onClick={this.createNewPost}>
            New Post
          </button>
        </div>
        {isNewPost ? (
          <div className="main-panel">
            <div className="source">
              <Post callback={this.fromPostEditor.bind(this)} />
            </div>
            <div className="destination">
              <PostView data={this.state.data} />
            </div>
          </div>
        ) : (
            ''
          )}
      </div>
    );
  }
}

export default App;
