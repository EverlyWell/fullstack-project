import React, { Component } from 'react';
import './App.css';
import * as services from './services/cats';

class App extends Component {

  async loadBreedImages() {
    let breed_images = await services.getCatsImages(
      this.state.selected_breed, this.state.selected_category, 5
    );
    this.setState({ images: breed_images });
    this.setState({ loader: false })
  }

  constructor(...args) {

    super(...args);
    this.state = {
        images: [],
        breeds: [],
        categories: [],
        selected_breed: 'abys',
        selected_category: 'none',
    };

    this.onBreedSelectChange = this.onBreedSelectChange.bind(this);
    this.onCategorySelectChange = this.onCategorySelectChange.bind(this);
  }
  async onBreedSelectChange(e) {
    await this.setState({selected_breed: e.target.value});
    await this.loadBreedImages();
  }
  async onCategorySelectChange(e) {
    await this.setState({selected_category: e.target.value});
    await this.loadBreedImages();
  }
  componentDidMount() {
    if (this.state.breeds.length===0) {
      (async () => {
        try {
          this.setState({ breeds: await this.getBreeds() });
          this.setState({ categories: await this.getCategories() });
        } catch (e) {
          //...handle the error...
          console.error(e)
        }
      })();
    }
  }
  render() {
    return (
      <div>
        Breed:
        <select
          value={this.state.selected_breed}
          onChange={this.onBreedSelectChange}
        >
          { this.state.breeds.map((breed) =>
            <option key={breed.id} value={breed.id}>{breed.name}</option>) }
        </select>

        &nbsp;&nbsp;

        Category:
        <select
          value={this.state.selected_category}
          onChange={this.onCategorySelectChange}
        >
          <option value='none'>None</option>
          { this.state.categories.map((category) =>
            <option key={category.id} value={category.id}>{category.name}</option>) }
        </select>

        <div className="images">
          { this.state.images.map((image, i) => (
            <img key={i} className="cat-image" alt="" src={image.url}></img>
          ))}
        </div>

      </div>
    );
  }
}

export default App;
