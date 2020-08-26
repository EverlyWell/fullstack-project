import React, {Component} from 'react';
import ImageFavorite from '../components/ImageFavorite';

export default class Favorites extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      items: []
    }
  }

  getFavorites() {
    const requestOptions = {
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${document.cookie.split('token=')[1]}` }
    };

    fetch("/api/v1/favorites", requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            items: result
          });
        }
      )
  }

  componentDidMount() {
    this.getFavorites();
  }

  handleFavoriteChange = (slug: any) => {
    let items = this.state.items.filter((item: any) => item.slug !== slug)
    this.setState({ items: items })
  }

  renderFavoriteResults = (items: any) => {
    let itemsList = items.map((item: any) => (
      <li key={item.slug}>
        <img alt='' src={item.thumbnail} />
        <ImageFavorite slug={item.slug} isFavorite={true} imageSource={item.source} onChange={this.handleFavoriteChange} />
      </li>
    ))

    return (
      <ul>
        {itemsList}
      </ul>
    )
  }

  render() {
    let { items } = this.state;

    return (
      <div>
        {(items && items.length > 0) &&
          <>
          <h2>Your saved favorites</h2>
          <div className={"favorites"}>{ this.renderFavoriteResults(items) }</div>
          </>
        }
      </div>
    );
  }
}
