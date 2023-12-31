import instance from './instance';
import ICategory from '../types/ICategory';

const getAllCategory = () => {
  return instance.get('/categories');
};
const getOneCategory = (id: number | string) => {
  return instance.get('/categories/' + id);
};
const addCategory = (category: ICategory) => {
  return instance.post('/categories', category);
};
const deleteCategory = (id: number) => {
  return instance.delete(`/categories/${id}`);
};
const updateCategory = (category: ICategory) => {
  return instance.put('/categories/' + category.id, category);
};

export {
  getAllCategory,
  getOneCategory,
  addCategory,
  deleteCategory,
  updateCategory,
};
