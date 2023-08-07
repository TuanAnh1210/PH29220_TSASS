/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteCourse, getAllCourse } from '../../../api/courses';
import { ICourses } from '../../../types/ICourses';

interface DataType {
  [x: string]: any;
  image: string | undefined;
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const Course: React.FC = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getAllCourse().then((res) => setCourses(res.data));
  }, []);

  const handleDelete = (id: number) => {
    if (confirm('Bạn chắc chắn muốn xóa')) {
      deleteCourse(id).then(() => {
        setCourses(courses.filter((course: ICourses) => course.id !== id));
      });
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (_, record) => (
        <Space>
          <img width='200px' src={record.image} alt='' />
        </Space>
      ),
    },
    {
      title: 'Description',
      key: 'description',
      dataIndex: 'description',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <Link to={`/admin/update-course/${record.id}`}>
            <Button type='primary'>Edit</Button>
          </Link>
          <Button onClick={() => handleDelete(record.id)} type='primary' danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Link to={'/admin/add-course'}>
        <Button type='primary' ghost>
          Add new course
        </Button>
      </Link>
      <Table
        style={{ marginTop: '20px' }}
        columns={columns}
        dataSource={courses}
      />
    </>
  );
};

export default Course;
