import axios from 'axios';
axios.defaults.baseURL = "http://localhost:3020/api/v1/cats"

export const getBreeds = async () => {
  const res = await axios('/breeds');
  return res.data;
}

export const getCategories = async () => {
  const res = await axios('/categories');
  return res.data;
}

export const getCatsImages = async (breed_id, category_id, amount, animated) => {
  const res = await axios('/search', {
    params: { breed_id: breed_id, category_id: category_id, limit: amount, animated: animated }
  });
  return res.data;
}

// export const getCatsImagesByBreed = async (breed_id, amount) => {
//   const res = await axios('/search_by_breed', {
//     params: { breed_id: breed_id, limit: amount }
//   });
//   return res.data;
// }
