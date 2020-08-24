import React, {Component} from 'react';

export default class ImageFavorite extends Component<any, any> {
  constructor(props: any) {
    super(props);
    
    this.state = {
      isFavorite: props.isFavorite
    }
  }

  setFavorite() {
    const requestOptions = {
      method: this.state.isFavorite ? 'DELETE' : 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ favorite: { slug: this.props.slug, type: `Favorite::${this.props.imageSource}` }})
    };

    fetch("/api/v1/favorites", requestOptions)
  }

  handleFavoriteChange = (event: any) => {
    this.setState({ isFavorite: !this.state.isFavorite })
    this.setFavorite();
    if (this.state.isFavorite) {
      this.props.onChange(this.props.slug);
    }
  }

  render() {
    let { isFavorite } = this.state;

    return (
      <input type="checkbox" checked={isFavorite} onChange={this.handleFavoriteChange} />
    );
  }
}
