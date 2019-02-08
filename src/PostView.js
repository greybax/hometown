import React, { Component } from 'react';
import './PostView.css';

import './font-awesome/css/font-awesome.css';
import renderHTML from 'react-render-html';

class PostView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="wrap">
        <article>
          <h1> {this.props.data.title} </h1>
          <i className="fa fa-calendar">
            <time>{this.props.data.date}</time>
          </i>
          <br />
          <i className="fa fa-tags">
            {this.props.data.tags}
          </i>
          {renderHTML(`${this.props.data.content ? this.props.data.content : ''}`)}
        </article>
      </div>
    );
  }

}

export default PostView

