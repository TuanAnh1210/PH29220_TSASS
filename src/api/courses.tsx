import instance from './instance';
import { ICourses } from '../types/ICourses';

const getAllCourse = () => {
  return instance.get('/courses');
};
const getOneCourse = (id: number | string) => {
  return instance.get('/courses/' + id);
};
const addCourse = (course: ICourses) => {
  return instance.post('/courses', course);
};
const deleteCourse = (id: number) => {
  return instance.delete(`/courses/${id}`);
};
const updateCourse = (course: ICourses) => {
  return instance.put('/courses/' + course.id, course);
};

export { getAllCourse, getOneCourse, addCourse, deleteCourse, updateCourse };
