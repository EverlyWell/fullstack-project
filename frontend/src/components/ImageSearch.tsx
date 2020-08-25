import React, {Component} from 'react';
import ImageFavorite from './ImageFavorite';

export default class ImageSearch extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      query: '',
      items: this.props.items
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

  renderSearchResults = (items: any) => {
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
      <div className={"search"}>
        <h2>Search for an image</h2>
        <form role="search" onSubmit={this.handleSubmit}>
          <input type="search" value={this.state.query} onChange={this.handleQueryChange} />
          <input type="submit" value="Image Search" />
        </form>
        {this.renderSearchResults(this.state.items)}
      </div>
    );
  }
}
