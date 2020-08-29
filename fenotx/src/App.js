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
        loader: false,
        selected_breed: 'abys',
        selected_category: 'none',
    };

    this.onBreedSelectChange = this.onBreedSelectChange.bind(this);
    this.onCategorySelectChange = this.onCategorySelectChange.bind(this);
  }
  async onBreedSelectChange(e) {
    this.setState({ loader: true })
    await this.setState({ selected_breed: e.target.value });
    await this.loadBreedImages();
  }
  async onCategorySelectChange(e) {
    this.setState({ loader: true })
    await this.setState({ selected_category: e.target.value });
    await this.loadBreedImages();
  }
  componentDidMount() {
    if (this.state.breeds.length===0) {
      (async () => {
        try {
          this.setState({ breeds: await services.getBreeds() });
          this.setState({ categories: await services.getCategories() });
        } catch (e) {
          //...handle the error...
          console.error(e)
        }
      })();
    }
  }
  render() {
    function Loader(props) {
      if(props.loaderState)
        return <div><h3>Loading...</h3></div>
      return (null);
    }
    function ImageDisplay(props){
      if(!props.loaderState)
        return props.images.map((image, i) => (
          <img key={i} className="cat-image" alt="" src={image.url}></img>
        ))
      return (null);
    }
    function Select(props){
      return(
        <select
          value={props.selected}
          onChange={props.onSelectChange}
        >
          <option value='none'>None</option>
          {
            props.items.map((item) =>
              <option key={item.id} value={item.id}>{item.name}</option>)
          }
        </select>
      )
    }

    return (
      <div>
        <div className="controls">
          Breed:
          <Select
            items={this.state.breeds}
            selected={this.state.selected_breed}
            onSelectChange={this.onBreedSelectChange} />

          &nbsp;&nbsp;

          Category:
          <Select
            items={this.state.categories}
            selected={this.state.selected_category}
            onSelectChange={this.onCategorySelectChange} />
        </div>

        <div className="images">
          <Loader loaderState={this.state.loader} />
          <ImageDisplay images={this.state.images} loaderState={this.state.loader} />
        </div>

      </div>
    );
  }
}

export default App;
