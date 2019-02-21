import React, { Component } from 'react';
import extract from 'md-article';
import cyrillicToTranslit from 'cyrillic-to-translit-js';
import './Post.css';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      tags: [],
      date: new Date(),
      content: '',
      md:
        `# title

#tag1, #tag2, #tag3;

_March 03, 2014_

desc

content1

content2`,
    };

    this.handleTextChange = this.handleTextChange.bind(this);
  }

  render() {
    return (
      <div className="post-controls">
        <textarea value={this.state.md} rows="30" placeholder="Write your post here..." onChange={this.handleTextChange} />
      </div>
    );
  }

  getFilename(dateIn, title) {
    console.log(dateIn);
    var yyyy = dateIn.getFullYear();
    var mm = dateIn.getMonth() + 1; // getMonth() is zero-based
    var dd = dateIn.getDate();
    let date = new String(10000 * yyyy + 100 * mm + dd); // Leading zeros for mm and dd

    // String -> Array
    date = date.split('');

    date.splice(4, 0, '-');
    date.splice(date.length - 2, 0, '-');

    // Array -> String
    date = date.join('');
    let ctt = cyrillicToTranslit().transform(title, '-');
    return `${date}-${ctt}`;
  }

  updateState(event = null) {
    let value = event ? event.target.value : this.state.md;
    let articleData = extract(value, 'MMMM D, YYYY', 'en');

    //filename
    console.log(this.getFilename(new Date(articleData.date.text), articleData.title.text));

    this.setState({
      title: articleData.title.text,
      tags: this.createTagsListHtml(articleData.tags.list),
      date: articleData.date.text,
      content: articleData.content.html,
      md: value
    }, () => {
      // new state here, because setState is asynchronously
      this.props.callback(this.state);
      console.log(this.state);
    });
  }

  componentDidMount() {
    this.updateState();
  }

  createTagsListHtml(tags) {
    let tagsHtmlArr = [];
    for (let i = 0; i < tags.length; i++) {
      let href = `/tags/index.html#${tags[i]}`;
      tagsHtmlArr.push(<a href={href} key={i}> {tags[i]} </a>);
    }
    return tagsHtmlArr;
  }

  handleTextChange(event) {
    this.updateState(event);
  }
}

export default Post
