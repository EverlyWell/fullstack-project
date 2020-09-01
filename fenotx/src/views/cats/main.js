import React, { Component } from 'react';
import './main.css';
import '../../spinner.css';
import * as service from '../../services/cats';

class Main extends Component {

  constructor(...args) {
    super(...args);
    const IMAGE_COUNT = [
      { id: 1, name: 1 },
      { id: 2, name: 2 },
      { id: 3, name: 3 },
      { id: 4, name: 4 },
      { id: 5, name: 5 },
      { id: 6, name: 6 }
    ]
    this.state = {
      images: [],
      breeds: [],
      categories: [],
      loader: false,
      image_count: IMAGE_COUNT,
      animated: [{id: 'false', name: 'No'}, {id: 'true', name: 'Yes'}],
      selected_image_count: 3,
      selected_breed: 'abys',
      selected_category: 'none',
      selected_animated: 'false',
      showAnimatedInput: false
    };
    this.onBreedSelectChange = this.onBreedSelectChange.bind(this);
    this.onCategorySelectChange = this.onCategorySelectChange.bind(this);
    this.onImageCountSelectChange = this.onImageCountSelectChange.bind(this);
    this.onAnimatedSelectChange = this.onAnimatedSelectChange.bind(this);
  }
  async loadBreedImages() {
    let breed_images = await service.getCatsImages(
      this.state.selected_breed,
      this.state.selected_category,
      this.state.selected_image_count,
      this.state.selected_animated
    )
    this.setState({ images: breed_images })
    this.setState({ loader: false })
  }
  async onBreedSelectChange(e) {
    this.setState({ loader: true })
    await this.setState({ selected_breed: e.target.value });
    if(this.state.selected_category !== 'none')
      this.setState({ selected_category: 'none' });
    await this.loadBreedImages();
  }
  async onCategorySelectChange(e) {
    this.setState({ loader: true })
    await this.setState({ selected_category: e.target.value });
    if(this.state.selected_breed !== 'none')
      this.setState({ selected_breed: 'none' });
    await this.loadBreedImages();
  }
  async onImageCountSelectChange(e) {
    this.setState({ loader: true })
    await this.setState({ selected_image_count: e.target.value });
    await this.loadBreedImages();
  }
  async onAnimatedSelectChange(e) {
    this.setState({ loader: true })
    await this.setState({ selected_animated: e.target.value });
    await this.loadBreedImages();
  }
  componentDidMount() {
    this.setState({ loader: true })
    if (this.state.breeds.length === 0) {
      (async () => {
        try {
          this.setState({ breeds: await service.getBreeds() });
          this.setState({ categories: await service.getCategories() });
          await this.loadBreedImages();
        } catch (e) {
          console.error(e)
        }
      })();
    }
  }
  render() {
    function Loader(props) {
      if(props.loaderState)
        return (
          <div>
            <div className="lds-hourglass"></div>
            <div>loading...</div>
          </div>
        )
      return (null);
    }
    function ImageDisplay(props){
      if(!props.loaderState)
        return props.images.map((image, i) => (
          <img key={i} className="cat-image" alt="" src={image.url}></img>
        ))
      return (null);
    }
    function SelectWithDefault(props){
      const first_opt = props.default ?
        <option value={props.default.id}>{props.default.name}</option> : null
      return(
        <select
          value={props.selected}
          onChange={props.onSelectChange}
        >
          {first_opt}
          {
            props.items.map((item) =>
              <option key={item.id} value={item.id}>{item.name}</option>)
          }
        </select>
      )
    }
    function Select(props){
      return(
        <select
          value={props.selected}
          onChange={props.onSelectChange}
        >
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
          <SelectWithDefault
            default={{id: 'none', name: 'None'}}
            items={this.state.breeds}
            selected={this.state.selected_breed}
            onSelectChange={this.onBreedSelectChange} />

          &nbsp;&nbsp;

          Category:
          <SelectWithDefault
            default={{id: 'none', name: 'None'}}
            items={this.state.categories}
            selected={this.state.selected_category}
            onSelectChange={this.onCategorySelectChange} />

          &nbsp;&nbsp;

          Count:
          <Select
            items={this.state.image_count}
            selected={this.state.selected_image_count}
            onSelectChange={this.onImageCountSelectChange} />

          &nbsp;&nbsp;

          {
            this.state.showAnimatedInput && <span>
            Animated:
            <Select
              items={this.state.animated}
              selected={this.state.selected_animated}
              onSelectChange={this.onAnimatedSelectChange} />
            </span>
          }
        </div>

        <div className="images">
          <Loader loaderState={this.state.loader} />
          <ImageDisplay images={this.state.images} loaderState={this.state.loader} />
        </div>

      </div>
    );
  }
}

export default Main;
