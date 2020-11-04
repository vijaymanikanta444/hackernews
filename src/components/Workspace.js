import React, { Component } from 'react';

export default class Workspace extends Component {
  state = {
    items: [],
  };
  async componentDidMount() {
    let data = await fetch(
      'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty'
    );
    data = await data.json();
    console.log(data);
    let items = data.splice(1, 90).map(
      (id) =>
        fetch(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
        )
      //   this.setState({ items: [...this.state.items, item] });
    );
    // console.log(items);
    let results = await Promise.all(items);
    console.log(results);
    results = results.map((result) => result.json());
    let stories = await Promise.all(results);
    console.log(stories.slice());
    stories.sort((a, b) => {
      return b.time - a.time;
    });
    console.log(
      stories.map((story) => {
        return {
          ...story,
          date: new Date(story.time),
        };
      })
    );
  }

  render() {
    return (
      <div>
        <h1>hi</h1>
      </div>
    );
  }
}
