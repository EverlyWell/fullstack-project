import { useEffect, useState } from "react";
import { getCategories } from "../../services/categories.service";
import { ICategory } from "../../typings";

interface IFiltersProps {
  categoryId: number;
  handleCategoryChange: any;
}

const Filters = ({categoryId, handleCategoryChange}: IFiltersProps) => {
  const [categories, setCategories] = useState<Array<ICategory>>([]);

  useEffect(() => {
    async function getCategoriesPrivate() {
      try {
        const categories = await getCategories()
        setCategories(categories);
      } catch(e) {
        console.log(e);
      }
    }

    if (categories.length === 0) {
      getCategoriesPrivate();
    }
  }, [categories]);

  const onCategoryChange = (evt: any) => {
    const categoryId = parseInt(evt.target.value);
    const selectedCategory = categories.filter((category: ICategory) => category.id === categoryId)[0];
    handleCategoryChange(categoryId, selectedCategory);
  }

  return (
    <div className="col-md-8">
      <div className="form-group form-inline">
        <div className="input-group">
        <label htmlFor="categories">Category:</label>
          <select
            id="categories"
            data-testid="categories"
            aria-label="Category"
            onChange={onCategoryChange}
            value={categoryId}
          >
            {categories.map((category: ICategory, index: number) => (
              <option
                key={`category_item_${index}`}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default Filters;
