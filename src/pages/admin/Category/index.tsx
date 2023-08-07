import { Button, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteCategory, getAllCategory } from '../../../api/categories';
import ICategory from '../../../types/ICategory';
interface DataType {
  [x: string]: any;
  image: string | undefined;
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const Category = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategory().then((res) => setCategories(res.data));
  }, []);

  const handleDelete = (id: number) => {
    if (confirm('Bạn chắc chắn muốn xóa')) {
      deleteCategory(id).then(() => {
        setCategories(
          categories.filter((category: ICategory) => category.id !== id),
        );
      });
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <Link to={`/admin/update-category/${record.id}`}>
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
      <Link to={'/admin/add-category'}>
        <Button type='primary' ghost>
          Add new Category
        </Button>
      </Link>
      <Table
        style={{ marginTop: '20px' }}
        columns={columns}
        dataSource={categories}
      />
    </>
  );
};

export default Category;
