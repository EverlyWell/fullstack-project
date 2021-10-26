import { FunctionComponent, useEffect, useState } from "react";
import { Container, FormControl, FormLabel, InputLabel, MenuItem, Paper, Select } from "@mui/material";
import {ICategory} from '../../typings/typings';
import { fetchCategories } from "./utils";

interface IFiltersView {
  handleCategorySelect: any
}

const FiltersView: FunctionComponent<IFiltersView> = ({
  handleCategorySelect
}) => {

  const [categoryId, setCategoryId] = useState(0);
  const [category, setCategory] = useState<ICategory>();
  const [categories, setCategories] = useState<Array<ICategory>>([]);

  useEffect(() => {
    async function fetchCategoryPrivate() {
      setCategories(await fetchCategories());
    }

    if (categories.length === 0) {
      fetchCategoryPrivate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  useEffect(() => handleCategorySelect(category), [handleCategorySelect, category])

  const handleCategoryChange = (evt: any) => {
    const categoryId = evt.target.value
    setCategoryId(categoryId);
    const selectedCategory = categories.filter((category: ICategory) => category.id === categoryId)[0]
    setCategory(selectedCategory);
  }

  return (
    <Container maxWidth="sm" className="App">
      <Paper>
        <FormLabel component="legend">Filters</FormLabel>
        <FormControl id="filters-form" fullWidth>
          <InputLabel id="categories-label">Categories</InputLabel>
          <Select
            labelId="categories-label"
            id="categories-select"
            value={categoryId}
            label="Category"
            onChange={handleCategoryChange}
          >
            {categories.map((category: ICategory, index: number) => (
              <MenuItem
                key={`category_item_${index}`}
                value={category.id}
              >
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>
    </Container>
  )
}

export default FiltersView;
