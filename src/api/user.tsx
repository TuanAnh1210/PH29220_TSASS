import IUser from '../types/IUser';
import instance from './instance';

const getAllUser = () => {
  return instance.get('/users');
};

const getAllRole = () => {
  return instance.get('/roles');
};
const getOneUser = (id: number | string) => {
  return instance.get('/users/' + id);
};
const addUser = (user: IUser) => {
  return instance.post('/users', user);
};
const deleteUser = (id: number) => {
  return instance.delete(`/users/${id}`);
};
const updateUser = (user: IUser) => {
  return instance.put('/users/' + user.id, user);
};

export { getAllUser, getAllRole, getOneUser, addUser, deleteUser, updateUser };
