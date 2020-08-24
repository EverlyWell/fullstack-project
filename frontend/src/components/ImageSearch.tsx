import React, {Component} from 'react';
import ImageFavorite from './ImageFavorite';

export default class ImageSearch extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      query: '',
      items: []
    };
  }

  searchImages() {
    fetch(`/api/v1/images/search.json?query=${this.state.query}`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            items: result.data
          });
        }
      )
  }

  handleFavoriteChange = (slug: any) => {
  }

  renderSearchResults = () => {
    const { items } = this.state;

    if (items && items.length > 0) {
      let itemsList = items.map((item: any) => (
        <li key={item.slug}>
          <img alt='Thumbnail image' src={item.thumbnail} />
          <ImageFavorite slug={item.slug} isFavorite={item.isFavorite} imageSource={item.source} onChange={this.handleFavoriteChange} />
        </li>
      ))

      return (
        <ul>
          {itemsList}
        </ul>
      )
    }
  }


  handleQueryChange = (event: any) => {
    this.setState({ query: event.target.value });
  }

  handleSubmit = (event: any) => {
    event.preventDefault();
    this.searchImages();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.query} onChange={this.handleQueryChange} />
          <input type="submit" value="Image Search" />
        </form>
        {this.renderSearchResults()}
      </div>
    );
  }
}
